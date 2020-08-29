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
  card: { title: string; desc?: string }[];
  /** 页面文档 */
  doc: { name: string; icon: string }[];
}

export type SearchInfo = Record<string, SearchInfoItem>;

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
