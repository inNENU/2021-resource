import { exec } from "child_process";
import { sync as del } from "del";
import { readFileSync, writeFileSync } from "fs";
import { type } from "os";

export const zip = (name: string): void => {
  del(`./resource/${name}.zip`);
  // 读取旧版本号
  const version = readFileSync(`./resource/${name}Version.json`, {
    encoding: "utf-8",
  }).trim();

  // 更新 ${name} 版本号
  writeFileSync(`./resource/${name}Version.json`, `${Number(version) + 1}\n`);

  // 压缩文件
  if (type() === "Linux")
    exec(
      `zip -r resource/${name}.zip resource/${name} resource/${name}Version.json`
    );
  else if (type() === "Windows_NT")
    exec(
      `cd ./resource && "../lib/7z" a -r ${name}.zip "@../lib/${name}" && cd ..`
    );
  else throw new Error("Mac OS is not supported");
};
