import { Marker, MarkerConfig, MarkerData } from "./typings";

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

  const categoryConfig = [
    { path: "all", name: "全部" },
    ...categories.map((category) => ({
      path: category,
      name: data[category].name,
    })),
  ];

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
