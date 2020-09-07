import { sync as del } from "del";
import { convertFolder } from "../util/yml2json";
import { resolvePage } from "../components/page";
import { count } from "./count";
import { genIcon } from "./icon";
import { genLyric } from "./lyric";
import { genPEScore } from "./peScore";
import { genQRCode } from "./QRCode";
import { genSearchMap } from "./search";
// import { genSitemap } from "./sitemap";
import { resolveMarker } from "./marker";
import { pushPages } from "./push";
import { genResource } from "./zip";

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
  filePath.match(/map\/marker\/(benbu|jingyue)/u)
    ? resolveMarker(data)
    : filePath.match(/map\/(benbu|jingyue)\//u)
    ? resolvePage(data, filePath)
    : filePath.match(/PEcal\/(male|female)-(low|high)/u)
    ? genPEScore(data)
    : data
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
  filePath.match(/(function|guide|intro|main)/u)
    ? resolvePage(data, filePath)
    : data
);

// 生成资源
genResource();

// 生成二维码
genQRCode()
  .then(() => pushPages())
  .then(() => {
    console.log("全部完成");
  });
