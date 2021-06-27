export interface BaseListComponentItemConfig {
  /** 列表单元的显示文字 */
  text: string;
  /** 列表图标的本地路径或在线网址 */
  icon?: string;
  /** Base64 icon 路径 */
  base64Icon?: string;
  /** 列表内容的描述 */
  desc?: string;
  /**
   * 隐藏该列表项
   *
   * @default false
   */
  hidden?: boolean;
}

export interface ListComponentItemConfig extends BaseListComponentItemConfig {
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
  content: ListComponentItemConfig[];
  /** 列表页脚 */
  footer?: string;
}

export interface NaviagatorListComponentItemConfig
  extends BaseListComponentItemConfig {
  type: "navigator";
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
  /** 跳转到的 url */
  url?: string;
}

export interface SwitchListComponentItemConfig
  extends BaseListComponentItemConfig {
  type: "switch";
  /** 所控变量在 storage 中的 key 值 */
  key: string;
  /**
   * 开关对应的函数名称
   *
   * 不填仅改变 storage 中 key 的值
   */
  handler?: string;
  /** 开关颜色 */
  color?: string;
  /** 开关状态 */
  status?: boolean;
}

export interface SliderListComponentItemConfig<T = unknown>
  extends BaseListComponentItemConfig {
  type: "slider";
  /** 滑块所控变量在 storage 中的 key 值 */
  key: string;
  /** 滑块对应的的函数名称 */
  handler?: string;
  /**
   * 滑块的最小值
   *
   * @default 0
   */
  min?: number;
  /**
   * 滑块的最大值
   *
   * @default 100
   */
  max?: number;
  /**
   * 滑块的步长
   *
   * @default 1
   */
  step?: number;
  /** 滑块对应的值*/
  value?: T;
  /** 是否显示滑块 */
  visible?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PickerListComponentItemConfig<T = any>
  extends BaseListComponentItemConfig {
  type: "picker";
  /** 选择器中包含的值 */
  select: T[];

  /** 选择器所改变的变量在本地存储中的名称 */
  key: string;
  /**
   * picker 选择器对应的函数名称
   *
   * 不填仅改变界面显示值与 storage 中 key 的值
   */
  handler?: string;

  /**
   * 设置 true 时为单列选择器
   *
   * 默认为多列选择器
   */
  single?: boolean;
  /**
   * 默认为弹出式 picker
   *
   * 设置 `true` 时为嵌入式 picker
   */
  inlay?: boolean;
  /** 是否显示选择器 */
  visible?: boolean;
  /** picker 选择器对应的键 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentValue?: T extends any[] ? number[] : number;
  /** picker 选择器对应的值 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: T;
}

export interface ButtonListComponnetItemConfig
  extends BaseListComponentItemConfig {
  type: "button";
  /**
   * 按钮函数名
   *
   * 填入按钮点击后触发的函数名
   */
  handler: string;
  /**
   * 按钮的开放能力
   */
  openType?:
    | "contact"
    | "share"
    | "launchApp"
    | "openSetting"
    | "feedback"
    // 微信
    | "getPhoneNumber"
    // QQ
    | "openGroupProfile"
    | "addFriend"
    | "addColorSign"
    | "openPublicProfile"
    | "addGroupApp"
    | "shareMessageToFriend"
    | "addToFavorites";

  /** 添加好友开放能力 */
  openId?: string;
  /** 打开群资料卡片开放能力 */
  groupId?: string;

  /**
   * 是否禁用按钮
   *
   * @default false
   */

  disabled?: boolean;
}

export type AdvancedListComponentItemConfig =
  | ListComponentItemConfig
  | NaviagatorListComponentItemConfig
  | SwitchListComponentItemConfig
  | PickerListComponentItemConfig
  | SliderListComponentItemConfig
  | ButtonListComponnetItemConfig;

export interface AdvancedListComponentConfig {
  tag: "advanced-list";
  /** 列表标题 */
  header?: string | false;
  /** 列表内容 */
  content: AdvancedListComponentItemConfig[];
  /** 列表页脚 */
  footer?: string;
}
