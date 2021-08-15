import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import axios from "axios";
import { toFile } from "qrcode";

import { appIDInfo } from "../info";
import { getFileList, getWechatAccessToken, promiseQueue } from "../util";

const appidList = Object.keys(appIDInfo);

const removeQRCode = (name: string): void => {
  const fileList = getFileList(`./res/${name}`, ".yml").map((filePath) =>
    filePath.replace(/\.yml$/gu, "")
  );

  appidList.forEach((appid) => {
    const imgList = getFileList(`./qrcode/${appid}/${name}`, ".png").map(
      (filePath) => filePath.replace(/\.png$/gu, "")
    );

    imgList.forEach((imgPath) => {
      if (!fileList.includes(imgPath))
        unlinkSync(`./qrcode/${appid}/${name}/${imgPath}.png`);
    });
  });
};

const getWechatQRCode = (accessToken: string, scene: string): Promise<string> =>
  axios
    .post(
      `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessToken}`,
      {
        page: "module/page",
        scene,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        auto_color: true,
      },
      { responseType: "arraybuffer" }
    )
    .then(({ data }) => data as string);

const getQRCode = (name: string): Promise<void> => {
  const fileList = getFileList(`./res/${name}`, ".yml").map((filePath) =>
    filePath.replace(/\.yml$/gu, "")
  );

  const promises = appidList.map((appid) => {
    if (appid === "1109559721") {
      const photoPromises = fileList.map(
        (filePath): (() => Promise<void>) =>
          (): Promise<void> => {
            const folderPath = dirname(
              resolve(`./qrcode`, appid, name, filePath)
            );

            if (
              !existsSync(resolve(`./qrcode`, appid, name, `${filePath}.png`))
            ) {
              console.log(`${appid}: ${filePath}.png 不存在`);
              if (!existsSync(folderPath))
                mkdirSync(folderPath, { recursive: true });

              return toFile(
                resolve(`./qrcode`, appid, name, `${filePath}.png`),
                `https://m.q.qq.com/a/p/${appid}?s=${encodeURI(
                  `module/page?path=/${filePath}`
                )}`
              ).then(() => {
                console.log(`${appid}: ${name}/${filePath}.png 生成完成`);
              });
            } else return new Promise((resolve) => resolve());
          }
      );

      return promiseQueue(photoPromises, 5);
    }

    return getWechatAccessToken(appid).then((accessToken) => {
      const photoPromises = fileList.map(
        (filePath): (() => Promise<void>) =>
          (): Promise<void> => {
            const folderPath = dirname(
              resolve(`./qrcode`, appid, name, filePath)
            );

            if (
              !existsSync(resolve(`./qrcode`, appid, name, `${filePath}.png`))
            ) {
              console.log(`${appid}: ${name}/${filePath}.png 不存在`);

              // 创建文件夹
              if (!existsSync(folderPath))
                mkdirSync(folderPath, { recursive: true });

              const scene = `${
                name === "guide"
                  ? "G"
                  : name === "intro"
                  ? "I"
                  : name === "other"
                  ? "O"
                  : ""
              }${filePath.replace(/\/index$/, "/")}`;

              // 判断 scene 长度
              if (scene.length > 32) {
                console.error(`\nLong Scene: ${scene}\n`);

                return new Promise((resolve) => resolve());
              }

              return getWechatQRCode(accessToken, scene).then((data) => {
                console.log(`${appid}: ${name}/${filePath}.png 下载完成`);

                writeFileSync(
                  resolve(`./qrcode`, appid, name, `${filePath}.png`),
                  data
                );

                console.log(`${appid}: ${name}/${filePath}.png 写入完成`);
              });
            } else return new Promise((resolve) => resolve());
          }
      );

      return promiseQueue(photoPromises, 5);
    });
  });

  return Promise.all(promises).then(() => {
    console.log("QRCode generated");
  });
};

export const genQRCode = (): Promise<void[]> =>
  Promise.all(
    ["guide", "intro", "other"].map((name) => {
      removeQRCode(name);

      return getQRCode(name);
    })
  );
