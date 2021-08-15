import axios from "axios";
import { appIDInfo } from "../info";

export const getWechatAccessToken = (appid: string): Promise<string> =>
  axios
    .get(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appIDInfo[appid]}`
    )
    // eslint-disable-next-line @typescript-eslint/naming-convention
    .then(({ data: { access_token } }) => access_token as string);
