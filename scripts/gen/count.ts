import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

import { PageConfig } from "../components/typings";
import { getFileList, getWordNumber } from "../util";

export const getJSONValue = (content: unknown): string => {
  if (typeof content === "number") return content.toString();
  if (typeof content === "string") return content;
  if (typeof content === "object") {
    if (Array.isArray(content)) return content.map(getJSONValue).join(" ");
    else if (content) {
      let result = "";

      for (const key in content)
        result += ` ${getJSONValue((content as Record<string, unknown>)[key])}`;

      return result;
    }
  }

  return "";
};

export const getWords = (path: string): number => {
  let words = 0;

  getFileList(path, ".json").forEach((filePath) => {
    const pageContent = JSON.parse(
      readFileSync(resolve(path, filePath), {
        encoding: "utf-8",
      })
    ) as PageConfig;

    delete pageContent.scopeData;

    const content = getJSONValue(pageContent);

    words += getWordNumber(content);
  });

  return words;
};

export const count = (): void => {
  const functionwords = getWords("./resource/function");
  const guidewords = getWords("./resource/guide");
  const introWords = getWords("./resource/intro");
  const otherWords = getWords("./resource/other");
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
