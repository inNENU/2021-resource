import { sync as del } from "del";
import { convertFolder } from "../util/yml2json";
import { resolvePage } from "../components/page";
import { count } from "./count";
import { genIcon } from "./icon";
import { genLyric } from "./lyric";
import { genPEScore } from "./peScore";
import { genQRCode } from "./QRCode";
import { genSearchMap } from "./search";
import { resolveMarker } from "./marker";
import { genResource } from "./resource";

// 删除旧的文件
del([
  "./resource/function/**",
  "./resource/guide/**",
  "./resource/intro/**",
  "./resource/icon/**",
  "./resource/other/**",
]);

// 生成对应的 JSON

// 功能大厅
convertFolder("./res/function", "./resource/function", (data, filePath) =>
  /map\/marker\/(benbu|jingyue)/u.exec(filePath)
    ? resolveMarker(data)
    : /map\/(benbu|jingyue)\//u.exec(filePath)
    ? resolvePage(data, filePath)
    : /PEcal\/(male|female)-(low|high)/u.exec(filePath)
    ? genPEScore(data)
    : (data as unknown)
);
// 东师介绍
convertFolder("./res/intro", "./resource/intro", (data, filePath) =>
  resolvePage(data, `intro/${filePath}`)
);

// 东师指南
convertFolder("./res/guide", "./resource/guide", (data, filePath) =>
  resolvePage(data, `guide/${filePath}`)
);

// 其他文件
convertFolder("./res/other", "./resource/other", (data, filePath) =>
  resolvePage(data, `other/${filePath}`)
);

// 生成转码后的图标
genIcon();

// 生成搜索索引
genSearchMap();

// 生成歌词
genLyric();

// 生成 Sitemap
// genSitemap();
count();

// 生成 tab 页
convertFolder("./res/config", "./resource/config", (data, filePath) =>
  /(function|guide|intro|main)/u.exec(filePath)
    ? resolvePage(data, filePath)
    : (data as unknown)
);

// 生成资源
genResource();

// 生成二维码
genQRCode().then(() => {
  console.log("All completed");
});
