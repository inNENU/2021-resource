export interface CardComponentConfig {
  tag: "card";
  /** 卡片类型 */
  type: "web" | "page";
  /** 跳转的链接 */
  url: string;
  /** 封面图片在线地址 */
  src: string;
  /** 卡片标题 */
  title: string;
  /** 卡片描述 */
  desc?: string;
  /** 卡片 Logo 地址 */
  logo?: string;
  /** 卡片 Logo Base64 内容 */
  base64Logo?: string;
  /** 卡片 Logo 名称 */
  name?: string;
}
