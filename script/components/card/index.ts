import { CardComponentConfig } from "./typings";
import { checkKeys } from "@mr-hope/assert-type";

export const resolveCard = (
  element: CardComponentConfig,
  location = ""
): void => {
  checkKeys(
    element,
    {
      tag: "string",
      type: "string",
      src: "string",
      url: "string",
      title: "string",
      desc: ["string", "undefined"],
      logo: ["string", "undefined"],
      base64Logo: ["string", "undefined"],
      name: ["string", "undefined"],
    },
    location
  );
};
