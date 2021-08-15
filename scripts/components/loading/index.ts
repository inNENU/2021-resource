import { checkKeys } from "@mr-hope/assert-type";
import type { LoadingComponentConfig } from "./typings";

export const resolveLoading = (
  element: LoadingComponentConfig,
  location = ""
): void => {
  checkKeys(element, { tag: "string" }, location);
};
