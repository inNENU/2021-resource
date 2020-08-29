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

export type AdvancedListComponentItemConfig =
  | ListComponentItemConfig
  | NaviagatorListComponentItemConfig
  | SwitchListComponentItemConfig
  | PickerListComponentItemConfig
  | ButtonListComponnetItemConfig;

export interface AdvancedListComponentConfig {
  tag: "List";
  /** 列表标题 */
  header?: string | false;
  /** 列表内容 */
  content: AdvancedListComponentItemConfig[];
  /** 列表页脚 */
  footer?: string;
}
