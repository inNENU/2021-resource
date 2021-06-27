import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { load } from "js-yaml";
import { dirname, resolve, relative } from "path";
import { getFileList } from "./file";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertFolder = <T = any>(
  sourceFolder: string,
  targetFolder = sourceFolder,
  convertFunction: (data: T, filePath: string) => T = (data): T => data,
  dir = ""
): void => {
  const fileList = getFileList(sourceFolder, "yml");

  fileList.forEach((filePath) => {
    const folderPath = dirname(resolve(targetFolder, filePath));

    if (!existsSync(folderPath)) mkdirSync(folderPath, { recursive: true });

    const content = readFileSync(resolve(sourceFolder, filePath), {
      encoding: "utf-8",
    });
    const json = load(content) as unknown as T;

    writeFileSync(
      resolve(targetFolder, filePath.replace(/\.yml/u, ".json")),
      JSON.stringify(
        convertFunction(
          json,
          relative("./", resolve(dir, filePath.replace(/\.yml/u, ""))).replace(
            /\\/gu,
            "/"
          )
        )
      ),
      { encoding: "utf-8" }
    );
  });
};
