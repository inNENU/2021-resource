import { checkKeys } from "@mr-hope/assert-type";
import { resolvePath } from "../utils";
import type { ListComponentConfig } from "./typings";

export const resolveList = (
  element: ListComponentConfig,
  pageId: string,
  location = ""
): void => {
  checkKeys(
    element,
    {
      tag: "string",
      header: ["string", "boolean", "undefined"],
      content: "array",
      footer: ["string", "undefined"],
    },
    location
  );

  element.content.forEach((listItem) => {
    // 处理路径
    if (listItem.path)
      if (listItem.path.startsWith("/"))
        listItem.path = resolvePath(listItem.path);
      else {
        const paths = pageId.split("/");

        paths.pop();

        listItem.path = resolvePath(`${paths.join("/")}/${listItem.path}`);
      }

    checkKeys(
      listItem,
      {
        text: "string",
        icon: ["string", "undefined"],
        base64Icon: ["string", "undefined"],
        desc: ["string", "undefined"],
        path: ["string", "undefined"],
        url: ["string", "undefined"],
      },
      `${location}.content`
    );
  });
};
