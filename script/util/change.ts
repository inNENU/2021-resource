import { readFileSync, writeFileSync } from "fs";
import { resolve, relative } from "path";
import { getFileList } from "./file";

export const convertFolder = (
  sourceFolder: string,
  convertFunction: (data: string, filePath: string) => any = (data): string =>
    data,
  dir = ""
): void => {
  const fileList = getFileList(sourceFolder, "yml");

  fileList.forEach((filePath) => {
    const content = readFileSync(resolve(sourceFolder, filePath), {
      encoding: "utf-8",
    });

    writeFileSync(
      resolve(sourceFolder, filePath),
      convertFunction(
        content,
        relative("./", resolve(dir, filePath.replace(/\.yml/u, ""))).replace(
          /\\/gu,
          "/"
        )
      ),
      { encoding: "utf-8" }
    );
  });
};
