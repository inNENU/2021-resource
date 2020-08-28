import { TextAlign, TextComponentConfig } from "../../typings";
import { checkKeys } from "@mr-hope/assert-type";
import { resolveStyle } from "./utils";

export const resolveText = (
  element: TextComponentConfig,
  location = ""
): void => {
  if (
    element.align &&
    ["left", "right", "center", "justify"].includes(element.align)
  )
    element.align = `text-align: ${element.align};` as TextAlign;

  // 处理样式
  if (typeof element.style === "object")
    element.style = resolveStyle(element.style);

  // 处理段落
  if (typeof element.text === "string") element.text = [element.text];

  // 处理段落缩进
  if (element.type === "p")
    element.style = `text-indent: 1.5em; ${element.style || ""}`;

  checkKeys(
    element,
    {
      tag: "string",
      heading: ["string", "boolean", "undefined"],
      type: { type: ["string", "undefined"], enum: ["ul", "ol", "p"] },
      text: ["string[]", "undefined"],
      style: ["string", "undefined"],
      align: ["string", "undefined"],
    },
    location
  );
};
