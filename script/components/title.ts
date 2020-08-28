import { checkKeys } from "@mr-hope/assert-type";
import { resolveStyle } from "./utils";
import { TitleComponentConfig } from "../../typings";

export const resolveTitle = (
  element: TitleComponentConfig,
  location = ""
): void => {
  // 处理样式
  if (typeof element.style === "object")
    element.style = resolveStyle(element.style);

  checkKeys(
    element,
    {
      tag: "string",
      text: "string",
      style: ["string", "undefined"],
    },
    location
  );
};
