// import { WechatDetail } from "../../typings";
// import axios from "axios";

export interface WechatConfig {
  /** 公众号名称 */
  name: string;
  /** 公众号描述 */
  desc: string;
  /** 公众号 Logo */
  logo: string;
  /** 是否关联 */
  authorized?: boolean;
  /** 关注链接 */
  follow?: string;
  /** 图文列表 */
  content: {
    /** 标题 */
    title?: string;
    /** 图文摘要 */
    desc?: string;
    /** 图文封面 */
    cover?: string;
    /** 图文地址 */
    url: string;
  }[];
}

// export const genWechat = (data: WechatConfig): Promise<WechatDetail> => {
//   const promises = [];
//   data.content.forEach((item) => {
//     if (!item.cover || !item.title) axios();
//   });

//   return data;
// };
