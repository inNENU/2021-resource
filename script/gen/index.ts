import { exec } from "child_process";
import { sync as del } from "del";
import { convertFolder } from "../util/yml2json";
import { resolvePage } from "../components/page";
import { count } from "./count";
import { genLyric } from "./lyric";
import { genPEScore } from "./peScore";
import { genQRCode } from "./QRCode";
import { genSearchMap } from "./search";
// import { genSitemap } from "./sitemap";
import { resolveMarker } from "./marker";
import { pushPages } from "./push";
import { zip } from "./zip";
// 删除旧的文件
del([
  "./resource/function/**",
  "./resource/guide/**",
  "./resource/intro/**",
  "./resource/other/**",
]);

// 生成对应的 JSON
convertFolder("./res/intro", "./resource/intro", (data, filePath) =>
  resolvePage(data, `intro/${filePath}`)
);
convertFolder("./res/function", "./resource/function", (data, filePath) =>
  filePath.match(/map\/marker\/(benbu|jingyue)/u)
    ? resolveMarker(data)
    : filePath.match(/map\/(benbu|jingyue)\//u)
    ? resolvePage(data, filePath)
    : filePath.match(/PEcal\/(male|female)-(low|high)/u)
    ? genPEScore(data)
    : data
);
convertFolder("./res/guide", "./resource/guide", (data, filePath) =>
  resolvePage(data, `guide/${filePath}`)
);
convertFolder("./res/other", "./resource/other", (data, filePath) =>
  resolvePage(data, `other/${filePath}`)
);

// 生成搜索索引
genSearchMap();

// 生成歌词
genLyric();

// 生成 Sitemap
// genSitemap();
count();

convertFolder("./res/config", "./resource/config", (data, filePath) =>
  filePath.match(/(function|guide|intro|main)/u)
    ? resolvePage(data, filePath)
    : data
);

// 生成二维码
genQRCode()
  .then(() => pushPages())
  .then(() => {
    exec("git diff --name-status", (_err, gitDiffResult) => {
      // 功能配置有更新
      if (gitDiffResult.match(/resource\/function/u)) zip("function");

      // 指南配置有更新
      if (gitDiffResult.match(/resource\/guide/u)) zip("guide");

      // 介绍配置有更新
      if (gitDiffResult.match(/resource\/guide/u)) zip("intro");
    });
    console.log("全部完成");
  });
