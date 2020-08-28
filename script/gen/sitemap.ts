import { readFileSync, writeFileSync } from "fs";
import { getFileList } from "../util/file";

export const genSitemap = (): void => {
  console.log("开始生成 Sitemap");
  const fileList = getFileList("./res/guide", "yml");
  const sitemapContent = JSON.parse(
    readFileSync("../app/sitemap.json", { encoding: "utf-8" })
  );
  sitemapContent.rules[0].param = fileList.map(
    (filePath) => `scene=${filePath.replace(/\.yml$/u, "")}`
  );

  writeFileSync("../app/sitemap.json", JSON.stringify(sitemapContent), {
    encoding: "utf-8",
  });
  console.log("Sitemap 生成完毕");
};
