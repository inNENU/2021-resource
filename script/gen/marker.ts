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

/**
 * 处理 marker
 *
 * @param marker 待处理的 Marker
 *
 * @returns 处理后的marker
 */
const genMarker = (
  marker: Marker,
  category: string,
  id: number
): MarkerData => ({
  id,
  ...marker,
  path: marker.path ? `${category}/${marker.path}` : undefined,
});

interface MarkerOption {
  [props: string]: {
    /** 分类名称 */
    name: string;
    content: Marker[];
  };
}

/**
 * 设置Marker
 *
 * @param data marker数据
 * @param name marker名称
 */
export const resolveMarker = (data: MarkerOption): MarkerConfig => {
  const categories = Object.keys(data);

  const categoryConfig = categories.map((category) => ({
    path: category,
    name: data[category].name,
  }));

  let id = 0;
  const markers = { all: [] } as Record<string, MarkerData[]>;

  categories.forEach((category) => {
    markers[category] = data[category].content.map((marker) =>
      // eslint-disable-next-line no-plusplus
      genMarker(marker, category, id++)
    );

    markers.all = markers.all.concat(markers[category]);
  });

  return { category: categoryConfig, marker: markers };
};
