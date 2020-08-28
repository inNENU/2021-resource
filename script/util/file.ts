import { readdirSync, statSync } from "fs";
import { resolve, relative } from "path";

export interface ReadDirResult {
  file: string[];
  dir: string[];
}

export const readDir = (dirPath: string, prefix = ""): ReadDirResult => {
  const files = readdirSync(resolve(prefix, dirPath));
  const result: ReadDirResult = { file: [], dir: [] };
  files.forEach((file) => {
    const filePath = resolve(prefix, dirPath, file);

    if (statSync(filePath).isFile()) result.file.push(file);
    else if (statSync(filePath).isDirectory()) result.dir.push(file);
  });

  return result;
};

const getFiles = (base: string, dir = "", ext?: string): string[] => {
  const result = readDir("", resolve(base, dir));
  const fileList = result.file
    .filter((filename) => (ext ? filename.endsWith(ext) : true))
    .map((filePath) => relative("./", resolve(dir, filePath)));

  if (result.dir.length !== 0)
    result.dir.forEach((dirPath) => {
      fileList.push(
        ...getFiles(base, relative("./", resolve(dir, dirPath)), ext)
      );
    });

  return fileList;
};

export const getFileList = (dirPath: string, ext?: string): string[] =>
  getFiles(dirPath, "", ext).map((filePath) => filePath.replace(/\\/gu, "/"));
