import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { getFileList } from "../util/file";
import { SearchInfo } from "../../typings";

// 创建搜索字典
const createSearchMap = (folder: string): SearchInfo => {
  const fileList = getFileList(folder, "json").filter(
    (filepath) => filepath !== "keywords.json"
  );

  const searchMap: SearchInfo = {};

  fileList.forEach((filePath) => {
    const content = readFileSync(resolve(folder, filePath), {
      encoding: "utf-8",
    });
    const pageConfig = JSON.parse(content);
    const pathName = `${folder}/${filePath}`
      .replace("./", "")
      .replace("resource/", "")
      .replace(".json", "");

    // 生成对应页面的索引对象
    searchMap[pathName] = {
      name: pageConfig.title,
      title: [],
      heading: [],
      text: [],
      card: [],
      doc: [],
    };

    if (pageConfig.desc) searchMap[pathName].desc = pageConfig.desc;

    // 将页面的标题写入搜索详情中
    pageConfig.content.forEach((element: any) => {
      /** 写入段落大标题 */
      if (element.tag === "title") searchMap[pathName].title.push(element.text);

      if (element.tag === "text") {
        /** 写入段落标题 */
        if (element.heading) searchMap[pathName].heading.push(element.heading);

        /** 写入段落文字 */
        if (element.text) searchMap[pathName].text.push(...element.text);
      }

      if (element.tag === "list" && element.content) {
        /** 写入段落标题 */
        if (element.header) searchMap[pathName].heading.push(element.header);

        /** 写入段落文字  */
        element.content.forEach((config: any) => {
          if (config.text && !config.path && !config.url)
            searchMap[pathName].text.push(config.text);
        });
      }

      if (element.tag === "card" && element.type === "web")
        searchMap[pathName].card.push({
          title: element.title,
          desc: element.desc,
        });

      if (element.tag === "doc")
        searchMap[pathName].doc.push({
          name: element.name,
          icon: element.icon,
        });

      if (element.tag === "img" && element.desc)
        searchMap[pathName].text.push(element.desc);

      if (element.tag === "intro") {
        searchMap[pathName].heading.push(element.name);
        if (element.desc) searchMap[pathName].text.push(element.desc);
      }
    });
  });

  return searchMap;
};

/** 生成关键词 */
export const genSearchMap = (): void => {
  console.log("开始生成搜索索引");

  const guideSearchMap = createSearchMap("./resource/guide");
  const introSearchMap = createSearchMap("./resource/intro");

  // 写入关键词列表
  writeFileSync("./resource/guide-search.json", JSON.stringify(guideSearchMap));
  writeFileSync("./resource/intro-search.json", JSON.stringify(introSearchMap));
  writeFileSync(
    "./resource/all-search.json",
    JSON.stringify({ ...guideSearchMap, ...introSearchMap })
  );

  console.log("搜索索引生成完成");
};
