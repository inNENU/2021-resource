import { SwiperComponentConfig } from "./typings";
import { checkKeys } from "@mr-hope/assert-type";

export const resolveSwiper = (
  element: SwiperComponentConfig,
  location = ""
): void => {
  checkKeys(
    element,
    {
      tag: "string",
      url: "string[]",
      class: ["string", "undefined"],
      style: ["string", "undefined"],
      indicatorDots: ["boolean", "undefined"],
      dotColor: ["string", "undefined"],
      dotActiveColor: ["string", "undefined"],
      autoplay: ["boolean", "undefined"],
      interval: ["number", "undefined"],
      duration: ["number", "undefined"],
      circular: ["boolean", "undefined"],
      vertical: ["boolean", "undefined"],
      preMargin: ["string", "undefined"],
      nextMargin: ["string", "undefined"],
      change: ["string", "undefined"],
      animation: ["string", "undefined"],
      imgClass: ["string", "undefined"],
      imgmode: {
        type: ["string", "undefined"],
        enum: [
          "widthFix",
          "scaleToFill",
          "aspectFit",
          "aspectFill",
          "top",
          "bottom",
          "center",
          "left",
          "right",
          "top left",
          "top right",
          "bottom left",
          "bottom right",
          undefined,
        ],
      },
    },
    location
  );
};
