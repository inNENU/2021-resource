import { checkKeys } from "@mr-hope/assert-type";
import { resolvePath } from "../utils";
import type {
  AdvancedListComponentConfig,
  ListComponentConfig,
} from "./typings";

export const resolveList = (
  element: ListComponentConfig | AdvancedListComponentConfig,
  pageId: string,
  location = ""
): void => {
  checkKeys(
    element,
    {
      tag: "string",
      header: ["string", "boolean", "undefined"],
      content: "array",
      footer: ["string", "undefined"],
    },
    location
  );

  element.content.forEach((listItem, index) => {
    if ("type" in listItem) {
      if (listItem.type === "navigator")
        checkKeys(
          listItem,
          {
            text: "string",
            icon: ["string", "undefined"],
            base64Icon: ["string", "undefined"],
            desc: ["string", "undefined"],
            hidden: ["boolean", "undefined"],
            type: {
              type: "string",
              enum: ["navigator"],
            },
            openType: {
              type: ["string", "undefined"],
              enum: [
                "navigate",
                "redirect",
                "switchTab",
                "reLaunch",
                "navigateBack",
                "exit",
                undefined,
              ],
            },
            target: {
              type: ["string", "undefined"],
              enum: ["self", "miniProgram", undefined],
            },
            url: ["string", "undefined"],
          },
          `${location}.content[${index}]`
        );
      else if (listItem.type === "switch")
        checkKeys(
          listItem,
          {
            text: "string",
            icon: ["string", "undefined"],
            base64Icon: ["string", "undefined"],
            desc: ["string", "undefined"],
            hidden: ["boolean", "undefined"],
            type: {
              type: "string",
              enum: ["switch"],
            },
            key: "string",
            handler: ["string", "undefined"],
            color: ["string", "undefined"],
          },
          `${location}.content[${index}]`
        );
      else if (listItem.type === "slider")
        checkKeys(
          listItem,
          {
            text: "string",
            icon: ["string", "undefined"],
            base64Icon: ["string", "undefined"],
            desc: ["string", "undefined"],
            hidden: ["boolean", "undefined"],
            type: {
              type: "string",
              enum: ["slider"],
            },
            key: "string",
            handler: ["string", "undefined"],
            min: ["number", "undefined"],
            max: ["number", "undefined"],
            step: ["number", "undefined"],
          },
          `${location}.content[${index}]`
        );
      else if (listItem.type === "picker")
        checkKeys(
          listItem,
          {
            text: "string",
            icon: ["string", "undefined"],
            base64Icon: ["string", "undefined"],
            desc: ["string", "undefined"],
            hidden: ["boolean", "undefined"],
            type: {
              type: "string",
              enum: ["picker"],
            },
            select: "array",
            key: "string",
            handler: ["string", "undefined"],
            single: ["boolean", "undefined"],
            inlay: ["boolean", "undefined"],
          },
          `${location}.content[${index}]`
        );
      else if (listItem.type === "button")
        checkKeys(
          listItem,
          {
            text: "string",
            icon: ["string", "undefined"],
            base64Icon: ["string", "undefined"],
            desc: ["string", "undefined"],
            hidden: ["boolean", "undefined"],
            type: {
              type: "string",
              enum: ["button"],
            },
            handler: ["string", "undefined"],
            openType: {
              type: ["string", "undefined"],
              enum: [
                "contact",
                "share",
                "launchApp",
                "openSetting",
                "feedback",
                "getPhoneNumber",
                "openGroupProfile",
                "addFriend",
                "addColorSign",
                "openPublicProfile",
                "addGroupApp",
                "shareMessageToFriend",
                "addToFavorites",
                undefined,
              ],
            },
            openId: ["string", "undefined"],
            groupId: ["string", "undefined"],
            disabled: ["boolean", "undefined"],
          },
          `${location}.content[${index}]`
        );
      else
        console.error(
          `${location}.content[${index}] 存在未知 item 配置 ${listItem}`
        );
    }
    // 处理路径
    else if (listItem.path) {
      if (listItem.path.startsWith("/"))
        listItem.path = resolvePath(listItem.path);
      else {
        const paths = pageId.split("/");

        paths.pop();

        listItem.path = resolvePath(`${paths.join("/")}/${listItem.path}`);
      }

      checkKeys(
        listItem,
        {
          text: "string",
          icon: ["string", "undefined"],
          base64Icon: ["string", "undefined"],
          desc: ["string", "undefined"],
          hidden: ["boolean", "undefined"],
          path: ["string"],
          url: ["string", "undefined"],
        },
        `${location}.content[${index}]`
      );
    } else
      checkKeys(
        listItem,
        {
          text: "string",
          icon: ["string", "undefined"],
          base64Icon: ["string", "undefined"],
          desc: ["string", "undefined"],
          hidden: ["boolean", "undefined"],
          url: ["string", "undefined"],
        },
        `${location}.content[${index}]`
      );
  });
};
