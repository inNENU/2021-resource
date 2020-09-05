import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { getFileList } from "../util/file";

export const genIcon = (): void => {
  const fileList = getFileList("./res/icon", "svg");

  fileList.forEach((filePath) => {
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
  });
};
