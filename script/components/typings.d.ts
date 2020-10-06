import { CardComponentConfig } from "./card/typings";
import { CopyComponentConfig } from "./copy/typings";
import { DocComponentConfig } from "./doc/typings";
import { FooterComponentConfig } from "./footer/typings";
import { GridComponentConfig } from "./grid/typings";
import { ImageComponentConfig } from "./img/typings";
import { IntroComponentConfig } from "./intro/typings";
import {
  AdvancedListComponentConfig,
  ListComponentConfig,
} from "./list/typings";
import { MediaComponentConfig } from "./media/typings";
import { PhoneComponentConfig } from "./phone/typings";
import { SwiperComponentConfig } from "./swiper/typings";
import { TextComponentConfig } from "./text/typings";
import { TitleComponentConfig } from "./title/typings";

import { GeneralScopeData } from "./scopeData/typings";

export * from "./card/typings";
export * from "./copy/typings";
export * from "./doc/typings";
export * from "./footer/typings";
export * from "./grid/typings";
export * from "./img/typings";
export * from "./intro/typings";
export * from "./list/typings";
export * from "./media/typings";
export * from "./phone/typings";
export * from "./swiper/typings";
export * from "./text/typings";
export * from "./title/typings";

export type PageTag =
  | "title"
  | "text"
  | "img"
  | "list"
  | "footer"
  | "grid"
  | "card"
  | "copy"
  | "intro"
  | "advanced-list"
  | "doc"
  | "phone"
  | "media"
  | "swiper";

export type ComponentConfig =
  | TitleComponentConfig
  | TextComponentConfig
  | ImageComponentConfig
  | ListComponentConfig
  | AdvancedListComponentConfig
  | GridComponentConfig
  | FooterComponentConfig
  | DocComponentConfig
  | PhoneComponentConfig
  | SwiperComponentConfig
  | MediaComponentConfig
  | CardComponentConfig
  | CopyComponentConfig
  | IntroComponentConfig;

/** 页面配置 */
export interface PageConfig {
  /** 页面标题 */
  title: string;
  /** 页面描述 */
  desc?: string;
  /** 页面作者 */
  author?: string;
  /** 页面最后更新时间 */
  time?: string;
  /** 页面标识 */
  id: string;
  /** 是否是灰色背景 */
  grey?: boolean;
  /** 页面内容 */
  content: ComponentConfig[];
  /** 页面图片 */
  images?: string[];
  /**
   * 是否可以使用小程序的界面分享
   *
   * @default false
   */
  shareable?: boolean;
  /**
   * 是否可以下载二维码
   *
   * @default true when shareable is true
   */
  qrcode?: boolean | boolean;
  /**
   * 是否在分享弹出菜单中显示联系客服
   *
   * @default true
   */
  contact?: boolean;
  /**
   * 是否在分享弹出菜单中显示反馈页面
   *
   * @default true
   */
  feedback?: boolean;
  /** 是否隐藏导航栏 */
  hidden?: boolean;
  /** 结构化数据 */
  scopeData?: GeneralScopeData;
}
