export * from "../script/components/common";
export * from "../script/components/typings";
export * from "../script/gen/marker";
export * from "../script/gen/search";

export interface WechatDetail {
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
    title: string;
    /** 图文摘要 */
    desc?: string;
    /** 图文封面 */
    cover: string;
    /** 图文地址 */
    url: string;
  }[];
}
