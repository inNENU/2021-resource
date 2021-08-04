import { checkKeys } from "@mr-hope/assert-type";
import { readFileSync, writeFileSync } from "fs";
import { resolveTitle } from "./title";
import { resolveCard } from "./card";
import { resolveCopy } from "./copy";
import { resolveDoc } from "./doc";
import { resolveText } from "./text";
import { resolveFooter } from "./footer";
import { resolveList } from "./list";
import { resolveGrid } from "./grid";
import { resolvePhone } from "./phone";
import { resolveImg } from "./img";
import { resolveSwiper } from "./swiper";
import { resolveIntro } from "./intro";
import { resolveMedia } from "./media";
import { genScopeData } from "./scopeData";

import type { PageConfig } from "./typings";

/**
 * 处理页面数据
 *
 * @param page 页面数据
 * @param pagePath 页面路径
 *
 * @returns 处理之后的page
 */
// eslint-disable-next-line max-lines-per-function
export const resolvePage = (
  page: PageConfig,
  pagePath = "",
  diffResult = ""
): PageConfig => {
  page.images = [];

  if (!page.id) page.id = pagePath;

  checkKeys(
    page,
    {
      title: "string",
      id: "string",
      desc: ["string", "undefined"],
      author: ["string", "undefined"],
      time: ["string", "undefined"],
      grey: ["boolean", "undefined"],
      content: "object[]",
      hidden: ["boolean", "undefined"],
      shareable: ["boolean", "undefined"],
      contact: ["boolean", "undefined"],
      photo: ["string[]", "undefined"],
      images: "string[]",
    },
    `${pagePath} page`
  );

  if (page.content) {
    // eslint-disable-next-line max-lines-per-function
    page.content.forEach((element, index) => {
      const position = `${pagePath} page.content[${index}]`;

      // 处理图片
      if (element.tag === "img") {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        page.images!.push(element.res || element.src);

        resolveImg(element, position);
      }
      // 设置标题
      else if (element.tag === "title") resolveTitle(element, position);
      // 设置文字
      else if (
        element.tag === "text" ||
        element.tag === "p" ||
        element.tag === "ul" ||
        element.tag === "ol"
      )
        resolveText(element, position);
      // 设置文档
      else if (element.tag === "doc") resolveDoc(element, position);
      // 设置列表组件
      else if (element.tag === "list" || element.tag === "advanced-list")
        resolveList(element, page.id, position);
      // 设置网格组件
      else if (element.tag === "grid") resolveGrid(element, page.id, position);
      // 设置页脚
      else if (element.tag === "footer") resolveFooter(element, position);
      // 设置电话
      else if (element.tag === "phone") resolvePhone(element, position);
      // 设置轮播图
      else if (element.tag === "swiper") resolveSwiper(element, position);
      // 设置介绍
      else if (element.tag === "intro") resolveIntro(element, position);
      // 设置媒体
      else if (element.tag === "media") resolveMedia(element, position);
      // 设置卡片
      else if (element.tag === "card") resolveCard(element, position);
      // 检测复制
      else if (element.tag === "copy") resolveCopy(element, position);
      else
        console.warn(
          `${pagePath} page.content[${index}] 存在非法 tag ${element.tag}`
        );
    });
  } else console.warn(`${pagePath} 不存在页面内容`);

  genScopeData(page, page.id);

  // 页面有更新
  if (page.time && diffResult.includes(`res/${page.id}`)) {
    const date = new Date();

    const time = `${date.getFullYear()}年${
      date.getMonth() + 1
    }月${date.getDate()}日`;

    writeFileSync(
      `./res/${pagePath}.yml`,
      readFileSync(`./res/${pagePath}.yml`, { encoding: "utf-8" }).replace(
        page.time,
        time
      ),
      { encoding: "utf-8" }
    );

    page.time = time;
  }

  // 返回处理后的 page
  return page;
};
