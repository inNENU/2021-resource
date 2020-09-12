import { toFile } from "qrcode";
import axios from "axios";
import { appIDInfo } from "../info";
import { getFileList } from "../util/file";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { promiseQueue } from "../util/queue";

const guideFileList = getFileList("./res/guide", ".yml").map(
  (filePath) => `guide/${filePath.replace(/\.yml$/gu, "")}`
);

const introFileList = getFileList("./res/intro", ".yml").map(
  (filePath) => `intro/${filePath.replace(/\.yml$/gu, "")}`
);

const fileList = [...guideFileList, ...introFileList];

const appidList = Object.keys(appIDInfo);

const removeQRCode = (): void => {
  appidList.forEach((appid) => {
    const imgList = getFileList(
      `./img/QRCode/${appid}`,
      ".png"
    ).map((filePath) => filePath.replace(/\.png$/gu, ""));

    imgList.forEach((imgPath) => {
      if (!fileList.includes(imgPath))
        unlinkSync(`./img/QRCode/${appid}/${imgPath}.png`);
    });
  });
};

const getWechatAccessToken = (appid: string): Promise<string> =>
  axios
    .get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appIDInfo[appid]}`
    )
    // eslint-disable-next-line @typescript-eslint/naming-convention
    .then(({ data: { access_token } }) => access_token);

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
    .then(({ data }) => data);

const getQRCode = (): Promise<void> => {
  const promises = appidList.map((appid) => {
    if (appid === "1109559721") {
      const photoPromises = fileList.map((filePath): (() => Promise<
        void
      >) => (): Promise<void> => {
        const folderPath = dirname(resolve(`./img/QRCode/${appid}`, filePath));

        if (!existsSync(`./img/QRCode/${appid}/${filePath}.png`)) {
          console.log(`${appid}: ${filePath}.png 不存在`);
          if (!existsSync(folderPath))
            mkdirSync(folderPath, { recursive: true });

          return toFile(
            resolve(`./img/QRCode/${appid}`, `${filePath}.png`),
            `https://m.q.qq.com/a/p/${appid}?s=${encodeURI(
              `module/page?id=/${filePath}`
            )}`
          ).then(() => {
            console.log(`${appid}: ${filePath}.png 生成完成`);
          });
        } else return new Promise((resolve) => resolve());
      });

      return promiseQueue(photoPromises, 5);
    }

    return getWechatAccessToken(appid).then((accessToken) => {
      const photoPromises = fileList.map((filePath): (() => Promise<
        void
      >) => (): Promise<void> => {
        const folderPath = dirname(resolve(`./img/QRCode/${appid}`, filePath));

        if (!existsSync(`./img/QRCode/${appid}/${filePath}.png`)) {
          console.log(`${appid}: ${filePath}.png 不存在`);

          // 创建文件夹
          if (!existsSync(folderPath))
            mkdirSync(folderPath, { recursive: true });

          const scene = filePath.replace("guide/", "#").replace("intro/", "@");

          // 判断 scene 长度
          if (scene.length > 32) {
            console.error(`\nLong Scene: ${scene}\n`);
            return new Promise((resolve) => resolve());
          }

          return getWechatQRCode(accessToken, scene).then((data) => {
            console.log(`${appid}: ${filePath}.png 下载完成`);

            writeFileSync(
              resolve(`./img/QRCode/${appid}`, `${filePath}.png`),
              data
            );

            console.log(`${appid}: ${filePath}.png 写入完成`);
          });
        } else return new Promise((resolve) => resolve());
      });

      return promiseQueue(photoPromises, 5);
    });
  });

  return Promise.all(promises).then(() => {
    console.log("二维码生成完成");
  });
};

export const genQRCode = (): Promise<void> => {
  removeQRCode();

  return getQRCode();
};
