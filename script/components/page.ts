import {
  CardComponentConfig,
  CopyComponentConfig,
  DocComponentConfig,
  PageConfig,
  TextComponentConfig,
  TitleComponentConfig,
  FooterComponentConfig,
  ListComponentConfig,
  GridComponentConfig,
  PhoneComponentConfig,
  ImageComponentConfig,
  SwiperComponentConfig,
  IntroComponentConfig,
  MediaComponentConfig,
} from "../../typings";
import { checkKeys } from "@mr-hope/assert-type";
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

/**
 * 处理页面数据
 *
 * @param page 页面数据
 * @param pagePath 页面路径
 *
 * @returns 处理之后的page
 */
// eslint-disable-next-line max-lines-per-function
export const resolvePage = (page: PageConfig, pagePath = ""): PageConfig => {
  page.images = [];

  if (!page.id) page.id = pagePath;

  checkKeys(
    page,
    {
      title: "string",
      id: "string",
      author: ["string", "undefined"],
      time: ["string", "undefined"],
      desc: ["string", "undefined"],
      grey: ["boolean", "undefined"],
      content: "object[]",
      hidden: ["boolean", "undefined"],
      shareable: ["boolean", "undefined"],
      feedback: ["boolean", "undefined"],
      contact: ["boolean", "undefined"],
      photo: ["string[]", "undefined"],
      images: "string[]",
    },
    `${pagePath} page`
  );

  if (page.content)
    // eslint-disable-next-line max-lines-per-function
    page.content.forEach((element, index) => {
      // 处理图片
      if (element.tag === "img") {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        page.images!.push(
          (element as ImageComponentConfig).res ||
            (element as ImageComponentConfig).src
        );

        resolveImg(
          element as ImageComponentConfig,
          `${pagePath} page.content[${index}]`
        );
      }
      // 设置标题
      else if (element.tag === "title")
        resolveTitle(
          element as TitleComponentConfig,
          `${pagePath} page.content[${index}]`
        );
      // 设置文字
      else if (element.tag === "text")
        resolveText(
          element as TextComponentConfig,
          `${pagePath} page.content[${index}]`
        );
      // 设置文档
      else if (element.tag === "doc")
        resolveDoc(
          element as DocComponentConfig,
          `${pagePath} page.content[${index}]`
        );
      // 设置列表组件
      else if (element.tag === "list")
        resolveList(
          element as ListComponentConfig,
          page.id,
          `${pagePath} page.content[${index}]`
        );
      // 设置网格组件
      else if (element.tag === "grid")
        resolveGrid(
          element as GridComponentConfig,
          page.id,
          `${pagePath} page.content[${index}]`
        );
      // 设置页脚
      else if (element.tag === "footer")
        resolveFooter(
          element as FooterComponentConfig,
          `${pagePath} page.content[${index}]`
        );
      // 设置电话
      else if (element.tag === "phone")
        resolvePhone(
          element as PhoneComponentConfig,
          `${pagePath} page.content[${index}]`
        );
      // 设置轮播图
      else if (element.tag === "swiper")
        resolveSwiper(
          element as SwiperComponentConfig,
          `${pagePath} page.content[${index}]`
        );
      // 设置介绍
      else if (element.tag === "intro")
        resolveIntro(
          element as IntroComponentConfig,
          `${pagePath} page.content[${index}]`
        );
      // 设置媒体
      else if (element.tag === "media")
        resolveMedia(
          element as MediaComponentConfig,
          `${pagePath} page.content[${index}]`
        );
      // 设置卡片
      else if (element.tag === "card")
        resolveCard(
          element as CardComponentConfig,
          `${pagePath} page.content[${index}]`
        );
      // 检测复制
      else if (element.tag === "copy")
        resolveCopy(
          element as CopyComponentConfig,
          `${pagePath} page.content[${index}]`
        );
    });
  else console.warn(`${pagePath} 不存在页面内容`);

  genScopeData(page, page.id);

  return page; // 返回处理后的 page
};
