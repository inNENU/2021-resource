export interface GridComponentItemComfig {
  /** 网格文字 */
  text: string;
  /** 网格图标的在线路径或本地路径 */
  icon: string;
  /** 九宫格背景颜色 (仅 Android 主题) */
  color: string;
  /** 对应的英文名 */
  name: string;
  /** 对应页面的文件路径 */
  path?: string;
  /** 对应页面界面的路径 */
  url?: string;
}

export interface GridComponentConfig {
  tag: "grid";
  header?: string | false;
  content: GridComponentItemComfig[];
  /** 网格页脚 */
  footer?: string;
}
