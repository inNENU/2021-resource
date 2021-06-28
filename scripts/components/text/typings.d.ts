export type TextAlign =
  | "text-align: left;"
  | "text-align: center;"
  | "text-align: right;"
  | "text-align: justify;";

export interface TextComponentConfig {
  /** 文字标签 */
  tag: "text" | "p" | "ol" | "ul";
  /** 段落类型 */
  type?: "p" | "ol" | "ul" | "info" | "tip" | "warning" | "danger";
  /** 容器类型 */
  pattern?: "info" | "tip" | "warning" | "danger";
  /** 段落标题 */
  heading?: string | true;
  /** 段落文字 */
  text?: string[];
  /** 段落文字样式 */
  style?: string;
  /**
   * 段落对齐方式
   *
   * @default "left"
   */

  align?: TextAlign;
}
