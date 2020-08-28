/* eslint-disable max-lines */

// FIXME: Remove it when axios 0.20.1 release
/// <reference lib="DOM" />

export type ImageMode =
  | "widthFix"
  | "scaleToFill"
  | "aspectFit"
  | "aspectFill"
  | "top"
  | "bottom"
  | "center"
  | "left"
  | "right"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

export interface TitleComponentConfig {
  tag: "title";
  /** 标题文字 */
  text: string;
  /** 标题 css 样式 */
  style: string;
}

export type TextAlign =
  | "text-align: left;"
  | "text-align: center;"
  | "text-align: right;"
  | "text-align: justify;";

export interface TextComponentConfig {
  tag: "text";
  /** 段落类型 */
  type?: "p" | "text" | "ol" | "ul";
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

export interface ImageComponentConfig {
  tag: "img";
  /** 图片的本地路径或在线网址 */
  src: string;
  /** 图片在服务器上的网址 */
  res?: string;
  /** 图片的描述文字 */
  desc?: string;
  /**
   * 图片懒加载
   *
   * @default true
   */
  lazy?: false;
  /**
   * 图片显示模式
   *
   * @default "widthFix"
   */
  imgmode?: ImageMode;
}

export interface BaseListComponentItemConfig {
  /** 列表单元的显示文字 */
  text: string;
  /** 列表图标的本地路径或在线网址 */
  icon?: string;
  /** 列表内容的描述 */
  desc?: string;
  /**
   * 隐藏该列表项
   *
   * @default false
   */
  hidden?: boolean;
}

export interface NormalListComponentItemConfig
  extends BaseListComponentItemConfig {
  /** 对应界面的文件路径 */
  path?: string;
  /** 列表指向的界面路径或短名称 */
  url?: string;
}

export interface ListComponentConfig {
  tag: "list";
  /** 列表标题 */
  header?: string | false;
  /** 列表内容 */
  content: NormalListComponentItemConfig[];
  /** 列表页脚 */
  footer?: string;
}

export interface NaviagatorListComponentItemConfig
  extends BaseListComponentItemConfig {
  /** 是否使用 navigator 组件 */
  navigate: true;
  /** 小程序提供的开放能力 */
  openType?:
    | "navigate"
    | "redirect"
    | "switchTab"
    | "reLaunch"
    | "navigateBack"
    | "exit";
  /** 跳转目标 */
  target?: "self" | "miniProgram";
}

export interface SwitchListComponentItemConfig
  extends BaseListComponentItemConfig {
  /** 所控变量在 storage 中的 key 值 */
  swiKey: string;
  /**
   * 开关对应的函数名称
   *
   * 不填仅改变 storage 中 swiKey 的值
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Switch?: string;
  /** 开关颜色 */
  color?: string;
}

export interface PickerListComponentItemConfig
  extends BaseListComponentItemConfig {
  /** 选择器中包含的值 */
  pickerValue: string;
  /** 选择器所改变的变量在本地存储中的名称 */
  key: string;
  /**
   * 设置 true 时为单列选择器
   *
   * 默认为多列选择器
   */
  single?: boolean;
  /**
   * 默认为弹出式 picker
   *
   * 设置 true 时为嵌入式 picker
   */
  inlay?: boolean;
  /**
   * picker 选择器对应的函数名称
   *
   * 不填仅改变界面显示值与 storage 中 key 的值
   */
  picker?: string;
}

export interface ButtonListComponnetItemConfig
  extends BaseListComponentItemConfig {
  /**
   * 按钮函数名
   *
   * 填入按钮点击后触发的函数名
   */
  button: string;
  /**
   * 是否禁用按钮
   *
   * @default false
   */

  disabled?: boolean;
}

export interface AdvancedListComponentConfig {
  tag: "List";
  /** 列表标题 */
  header?: string | false;
  /** 列表内容 */
  content: (
    | NormalListComponentItemConfig
    | NaviagatorListComponentItemConfig
    | SwitchListComponentItemConfig
    | PickerListComponentItemConfig
    | ButtonListComponnetItemConfig
  )[];
  /** 列表页脚 */
  footer?: string;
}

export interface GridComponenntItemComfig {
  /** 网格文字 */
  text: string;
  /** 网格图标的在线路径或本地路径 */
  icon: string;
  /** 对应页面的文件路径 */
  path?: string;
  /** 对应页面界面的路径 */
  url?: string;
  /** 对应的英文名 */
  name?: string;
}

export interface GridComponentConfig {
  tag: "grid";
  heading?: string | false;
  content: GridComponenntItemComfig[];
  /** 网格页脚 */
  footer?: string;
}

export interface FooterComponentConfig {
  tag: "footer";
  /** 作者 */
  author?: string;
  /** 最后更新日期 */
  time?: string;
  /** 额外描述 */
  desc?: string;
}

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

export interface PhoneComponentConfig {
  tag: "phone";
  /** 联系人电话号码 */
  num: string;
  /** 联系人的名 */
  fName: string;
  /** 联系人的姓 */
  lName?: string;
  /** 联系人所在公司 */
  org?: string;
  /** 联系人的备注 */
  remark?: string;
  /** 联系人的工作电话 */
  workNum?: string;
  /** 联系人的昵称 */
  nickName?: string;
  /** 联系人头像图片路径(仅限本地路径) */
  head?: string;
  /** 联系人的微信号 */
  wechat?: string;
  /** 联系人的地址省份 */
  province?: string;
  /** 联系人的地址城市 */
  city?: string;
  /** 联系人的地址街道 */
  street?: string;
  /** 联系人的地址邮政编码 */
  postCode?: string;
  /** 联系人的职位 */
  title?: string;
  /** 联系人的公司电话 */
  hostNum?: string;
  /** 联系人的网站 */
  website?: string;
  /** 联系人的电子邮件 */
  email?: string;
  /** 联系人的住宅电话 */
  homeNum?: string;
}

export interface SwiperComponentConfig {
  tag: "swiper";
  /** swiper 展示的图片的在线网址或本地路径 */
  url: string[];
  /** swiper 的类名 */
  class?: string;
  /** swiper 的样式 */
  style?: string;
  /**
   * 面板指示点
   *
   * @default true
   */
  indicatorDots?: boolean;
  /**
   * 指示点颜色
   *
   * @default '#ffffff88'
   */
  dotColor?: string;
  /**
   * 当前选中的指示点颜色
   *
   * @default '#fff'
   */
  dotActiveColor?: string;
  /**
   * 自动切换
   *
   * @default true
   */
  autoplay?: boolean;
  /**
   * 自动切换时间间隔
   *
   * @default 5000
   */
  interval?: number;
  /**
   * 滑动动画时长
   *
   * @default 500
   */
  duration?: number;
  /**
   * 衔接滑动
   *
   * @default true
   */
  circular?: boolean;
  /**
   * 是否是纵向滑动
   *
   * @default false
   */
  vertical?: boolean;
  /**
   * 前一项露出边距
   *
   * 默认为 0px，接受 px 和 rpx 值
   */
  preMargin?: string;
  /**
   * 后一项露出边距
   *
   * 默认为 0px，接受 px 和 rpx 值
   */
  nextMargin?: string;
  /** swiper 改变时触发的函数名称 */
  change?: string;
  /** swiper 动画结束时触发的函数名称 */
  animation?: string;
  /**
   * swiper 中图片的类名
   *
   * 默认样式为 'width:100%!important;height:100%!important;'
   */
  imgClass?: string;
  /** 图片的显示模式 */
  imgmode?: ImageMode;
}

interface MediaBaseComponentConfig {
  tag: "media";
  /** 媒体文件的在线网址或本地路径	 */
  src: string;
  /**
   * 是否循环播放
   *
   * @default false
   */
  loop?: boolean;
  /**
   * 是否显示默认控件
   *
   * @default true
   */
  controls?: boolean;
}

export interface AudioConponentConfig extends MediaBaseComponentConfig {
  type: "audio";
  /**
   * 音频名字
   *
   * @description controls 为 false 时无效
   */
  name?: string;
  /**
   * 音频作者
   *
   * @description controls 为 false 时无效
   */
  author?: string;
}

export interface VideoComponentConfig extends MediaBaseComponentConfig {
  type: "video";
  /**
   * 视频封面的图片网络资源地址
   *
   * @description controls 为 false 时无效
   */
  poster?: string;
  /**
   * 是否自动播放
   *
   * @default false
   */
  autoplay?: boolean;
  /** 视频初始播放位置 */
  startTime?: number;
  /** 弹幕列表 */
  "danmu-list": any[];
  /**
   * 是否显示弹幕按钮
   *
   * @description 只在初始化有效
   * @default false
   */
  "danmu-btn"?: boolean;
}

export type MediaComponentConfig = AudioConponentConfig | VideoComponentConfig;

export interface CardComponentConfig {
  tag: "card";
  /** 卡片类型 */
  type: "web" | "page";
  /** 跳转的链接 */
  url: string;
  /** 封面图片在线地址 */
  src: string;
  /** 卡片标题 */
  title?: string;
  /** 卡片描述 */
  desc?: string;
  /** 卡片 Logo 地址 */
  logo?: string;
  /** 卡片 Logo 名称 */
  name?: string;
}

export interface CopyComponentConfig {
  tag: "copy";
  /** 复制文字 */
  text: string;
}

export interface IntroComponentConfig {
  tag: "intro";
  /** 主体名称 */
  name: string;
  /** 图标地址 */
  logo: string;
  /** 主体描述 */
  desc?: string;
}

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
  | "ex-list"
  | "doc"
  | "phone"
  | "media"
  | "swiper";

export type ComponentConfig =
  | TitleComponentConfig
  | TextComponentConfig
  | ImageComponentConfig
  | ListComponentConfig
  | GridComponentConfig
  | FooterComponentConfig
  | DocComponentConfig
  | PhoneComponentConfig
  | SwiperComponentConfig
  | MediaComponentConfig
  | CardComponentConfig
  | CopyComponentConfig
  | IntroComponentConfig;

export interface GeneralScopeData {
  "@type": "general";
  /**
   * 内容标识
   *
   * appid下全局唯一，长度不大于256字符
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  uniq_id: string;
  /**
   * 内容标题
   *
   * 该页面内容的主题，不超过100个字符
   */
  title: string;
  /**
   * 内容缩略图
   *
   * 该页面包含图片或者能描述该页面的图片URL，宽高比1: 1，建议500x500px，不超过10张
   */
  thumbs: string[];
  /**
   * 内容封面大图
   *
   * 能描述该页面的封面大图URL，适用于需要大图表现的内容(如视频)，宽高比16: 9，宽度不低于800px，限定1张
   */
  cover?: string;
  /**
   * 内容摘要
   *
   * 该页面的摘要内容，不超过200个字符
   */
  digest: string;
  /**
   * 内容关键词
   *
   * 能描述该页面的关键词，不超过10个，每个关键词不超过10个字符
   */
  tags: string[];
}

/** 页面配置 */
export interface PageConfig {
  /** 页面标题 */
  title: string;
  /** 页面描述 */
  desc?: string;
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
  /**
   * 是否隐藏导航栏
   */
  hidden?: boolean;
  /**
   * 结构化数据
   */
  scopeData?: GeneralScopeData;
}

/** 标记点 */
export interface Marker {
  /** 经度 */
  latitude: number;
  /** 纬度 */
  longitude: number;
  /** 地点名称 */
  name: string;
  /** 地点详细名称 */
  detail: string;
  /** 地点介绍路径 */
  path?: string;
}

/** 标记点数据 */
export interface MarkerData extends Marker {
  id: number;
}

export interface ResolvedMarkerData extends MarkerData {
  iconPath: string;
  width: number;
  height: number;
  alpha: number;
  label: {
    content: string;
    color: string;
    fontSize: number;
    anchorX: number;
    anchorY: number;
    bgColor: string;
    borderWidth: number;
    borderColor: string;
    borderRadius: number;
    padding: number;
  };
  callout: {
    content: string;
    color: string;
    fontSize: number;
    bgColor: string;
    borderRadius: number;
    padding: number;
    display: "BYCLICK" | "ALWAYS";
  };
}

export interface Category {
  path: string;
  name: string;
}

export interface MarkerConfig {
  category: Category[];

  marker: Record<string, MarkerData[]>;
}

export interface SearchInfoItem {
  /** 页面名称 */
  name: string;
  /** 页面描述 */
  desc?: string;
  /** 页面标题 */
  title: string[];
  /** 页面段落标题 */
  heading: string[];
  /** 页面文字 */
  text: string[];
  /** 页面卡片 */
  card: { title: string; desc: string }[];
  /** 页面文档 */
  doc: { name: string; icon: string }[];
}

export type SearchInfo = Record<string, SearchInfoItem>;

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
