import { assertType } from "@mr-hope/assert-type";

export const camelCase2kebabCase = (str: string): string => {
  const hyphenateRE = /([^-])([A-Z])/gu;

  return str
    .replace(hyphenateRE, "$1-$2")
    .replace(hyphenateRE, "$1-$2")
    .toLowerCase();
};

export const resolvePath = (path: string) =>
  path.replace(/\/\//u, "/").replace(/^\//u, "").replace(/\/$/u, "/index");

/** 处理样式 */
export const resolveStyle = (styleObj: Record<string, string>): string => {
  assertType(styleObj, "Record<string,string>", "style");

  let result = "";

  for (const key in styleObj)
    result += `${camelCase2kebabCase(key)}: ${styleObj[key]};`;

  return result;
};
