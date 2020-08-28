import {
  PageConfig,
  TitleComponentConfig,
  TextComponentConfig,
} from "../../typings";

const getText = (page: PageConfig): string => {
  const pageContent = (page.content.filter(
    (element) => element.tag === "text"
  ) as TextComponentConfig[])
    .map(
      (element) =>
        `${element.heading ? `${element.heading} ` : ""}${
          element.text ? `${element.text.join(" ")}` : ""
        }`
    )
    .join("");

  return pageContent.length > 120 ? pageContent.slice(0, 120) : pageContent;
};

const getTags = (page: PageConfig): string[] => {
  const titles = (page.content.filter(
    (element) => element.tag === "title"
  ) as TitleComponentConfig[]).map((element) => element.text);

  return titles.length <= 10 ? titles : titles.slice(0, 10);
};

const getImages = (page: PageConfig): string[] =>
  page.images
    ? page.images.length > 10
      ? page.images.slice(0, 10)
      : page.images.length === 0
      ? ["https://mp.innenu.com/img/inNENU.jpg"]
      : page.images
    : ["https://mp.innenu.com/img/inNENU.jpg"];

export const genScopeData = (page: PageConfig, filePath: string): void => {
  page.scopeData = {
    "@type": "general", // 不要忘了这个
    // eslint-disable-next-line @typescript-eslint/naming-convention
    uniq_id: filePath,
    cover: page.images ? page.images[0] : "",
    title: page.title,
    digest: getText(page),
    thumbs: getImages(page), //你可以填写多个
    tags: getTags(page),
  };
};
