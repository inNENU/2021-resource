import { MediaComponentConfig } from "./typings";
import { checkKeys } from "@mr-hope/assert-type";

export const resolveMedia = (
  element: MediaComponentConfig,
  location = ""
): void => {
  checkKeys(
    element,
    {
      tag: "string",
      type: "string",
      src: "string",
      loop: ["boolean", "undefined"],
      controls: ["boolean", "undefined"],
      name: ["string", "undefined"],
      author: ["string", "undefined"],
      poster: ["string", "undefined"],
      autoplay: ["boolean", "undefined"],
      startTime: ["number", "undefined"],
      "danmu-list": ["array", "undefined"],
      "danmu-btn": ["number", "undefined"],
    },
    location
  );
};
