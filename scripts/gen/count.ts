import { readFileSync, writeFileSync } from "fs";
import { getFileList } from "../util/file";
import { resolve } from "path";

const chineseREG = /[\u4E00-\u9FA5]/gu;

export const getWords = (path: string): number => {
  let words = 0;

  getFileList(path, ".yml").forEach((filePath) => {
    const chineseWords = readFileSync(resolve(path, filePath), {
      encoding: "utf-8",
    }).match(chineseREG);

    if (chineseWords) words += chineseWords.length - 1;
  });

  return words;
};

export const count = (): void => {
  const functionwords = getWords("./res/function");
  const guidewords = getWords("./res/guide");
  const introWords = getWords("./res/intro");
  const otherWords = getWords("./res/other");
  const wordsTip = `小程序现有字数为 ${
    functionwords + guidewords + introWords + otherWords
  } 字，其中东师介绍部分 ${introWords} 字，东师指南部分 ${guidewords} 字，功能大厅部分 ${functionwords} 字，其他部分 ${otherWords} 字。`;

  console.log(wordsTip);

  getFileList("./res/config", ".yml").forEach((filePath) => {
    if (/\/about.yml/u.exec(filePath)) {
      const content = readFileSync(resolve("./res/config/", filePath), {
        encoding: "utf-8",
      });
      const newContent = content.replace(
        /小程序现有字数为 .* 字，其中东师介绍部分 .* 字，东师指南部分 .* 字，功能大厅部分 .* 字，其他部分 .* 字。/u,
        wordsTip
      );

      writeFileSync(resolve("./res/config/", filePath), newContent);
    }
  });
};
