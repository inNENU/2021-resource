import { IntroComponentConfig } from "./typings";
import { checkKeys } from "@mr-hope/assert-type";

export const resolveIntro = (
  element: IntroComponentConfig,
  location = ""
): void => {
  checkKeys(
    element,
    {
      tag: "string",
      name: "string",
      logo: "string",
      desc: ["string", "undefined"],
    },
    location
  );
};
