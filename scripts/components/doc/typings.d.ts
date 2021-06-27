export interface DocComponentConfig {
  tag: "doc";
  /** 文档名称 */
  name: string;
  /** 文档图标 */
  icon: string;
  /** 文档地址 */
  url: string;
  /**
   * 文档是否可下载
   *
   * @default true
   */
  downloadable?: false;
}
