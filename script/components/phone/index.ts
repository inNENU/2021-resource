import { PhoneComponentConfig } from "./typings";
import { checkKeys } from "@mr-hope/assert-type";

export const resolvePhone = (
  element: PhoneComponentConfig,
  location = ""
): void => {
  for (const key in element)
    if (typeof element[key as keyof PhoneComponentConfig] === "number")
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      element[key] = element[key].toString();

  checkKeys(
    element,
    {
      tag: "string",
      num: "string",
      fName: "string",
      lName: ["string", "undefined"],
      org: ["string", "undefined"],
      remark: ["string", "undefined"],
      workNum: ["string", "undefined"],
      nickName: ["string", "undefined"],
      head: ["string", "undefined"],
      wechat: ["string", "undefined"],
      province: ["string", "undefined"],
      city: ["string", "undefined"],
      street: ["string", "undefined"],
      postCode: ["string", "undefined"],
      title: ["string", "undefined"],
      hostNum: ["string", "undefined"],
      website: ["string", "undefined"],
      email: ["string", "undefined"],
      homeNum: ["string", "undefined"],
    },
    location
  );
};
