import { ImageComponentConfig } from "../../typings";
import { checkKeys } from "@mr-hope/assert-type";

export const resolveImg = (
  element: ImageComponentConfig,
  location = ""
): void => {
  checkKeys(
    element,
    {
      tag: "string",
      src: "string",
      res: ["string", "undefined"],
      desc: ["string", "undefined"],
      lazy: ["boolean", "undefined"],
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
