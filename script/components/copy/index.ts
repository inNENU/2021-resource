import { CopyComponentConfig } from "./typings";
import { checkKeys } from "@mr-hope/assert-type";

export const resolveCopy = (
  element: CopyComponentConfig,
  location = ""
): void => {
  checkKeys(element, { tag: "string", text: "string" }, location);
};
