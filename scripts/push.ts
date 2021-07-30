import axios from "axios";
import { appIDInfo } from "./info";
import { getFileList } from "./util/file";

const appidList = Object.keys(appIDInfo);

export const pushPages = (): Promise<void> => {
  const fileList = getFileList("./res/guide", "yml")
    .map((filePath) => `G${filePath}`)
    .concat(
      getFileList("./res/intro", "yml").map(
        (filePath) =>
          `I${filePath.replace(/\.yml$/u, "").replace(/\/index$/, "/")}`
      )
    );

  const pageLists = fileList.map((filePath) => ({
    path: "module/page",
    query: `path=${filePath}`,
  }));

  const promises = appidList.map((appid) => {
    if (appid === "1109559721") return Promise.resolve();

    return axios
      .get<{ access_token: string }>(
        `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appIDInfo[appid]}`
      )
      .then(({ data }) =>
        axios.post(
          `https://api.weixin.qq.com/wxa/search/wxaapi_submitpages?access_token=${data.access_token}`,
          { pages: pageLists }
        )
      )
      .then(({ data }) => {
        console.log(data);
      });
  });

  return Promise.all(promises).then(() => {
    console.log("All pages are published");
  });
};
