import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { getFileList } from "../util/file";

export const genIcon = (): void => {
  const fileList = getFileList("./res/icon", "svg");
  const hintIconData: Record<string, string> = {};
  const weatherIconData: Record<string, string> = {};

  fileList.forEach((filePath) => {
    if (filePath.match(/weather\/hints\//u)) {
      const svgContent = readFileSync(resolve("./res/icon", filePath), {
        encoding: "utf-8",
      });
      const path = filePath.replace(/weather\/hints\/(.*)\.svg/u, "$1");

      hintIconData[path] = `data:image/svg+xml;base64,${Buffer.from(
        unescape(encodeURIComponent(svgContent)),
        "utf8"
      ).toString("base64")}`;
    } else if (filePath.match(/weather\//u)) {
      const svgContent = readFileSync(resolve("./res/icon", filePath), {
        encoding: "utf-8",
      });
      const path = filePath.replace(/weather\/(.*)\.svg/u, "$1");

      weatherIconData[path] = `data:image/svg+xml;base64,${Buffer.from(
        unescape(encodeURIComponent(svgContent)),
        "utf8"
      ).toString("base64")}`;
    } else {
      const folderPath = dirname(resolve("./resource/icon", filePath));

      if (!existsSync(folderPath)) mkdirSync(folderPath, { recursive: true });

      const svgContent = readFileSync(resolve("./res/icon", filePath), {
        encoding: "utf-8",
      });

      writeFileSync(
        resolve("./resource/icon", filePath.replace(/\.svg$/u, "")),
        `data:image/svg+xml;base64,${Buffer.from(
          unescape(encodeURIComponent(svgContent)),
          "utf8"
        ).toString("base64")}`,
        { encoding: "utf-8" }
      );
    }
  });

  // 生成天气图标
      const weatherFolderPath = "./resource/icon/weather";

      if (!existsSync(weatherFolderPath)) mkdirSync(weatherFolderPath, { recursive: true });

  writeFileSync("./resource/icon/weather/hint", JSON.stringify(hintIconData), {
    encoding: "utf-8",
  });

  writeFileSync("./resource/icon/weather/icon", JSON.stringify(weatherIconData), {
    encoding: "utf-8",
  });
};
