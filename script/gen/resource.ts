import { execSync } from "child_process";
import { sync as del } from "del";
import { readFileSync, statSync, writeFileSync } from "fs";
import { type } from "os";

// 生成排列组合
const getCombine = <T = string>(
  data: T[],
  index = 0,
  group: T[][] = []
): T[][] => {
  if (data.length === 0) return [];
  const temp: T[][] = [[data[index]]];

  for (let i = 0; i < group.length; i++)
    temp.push(group[i].concat(data[index]));

  if (index === data.length - 1) return group.concat(temp);

  return getCombine(data, index + 1, group.concat(temp));
};

export const zip = (nameList: string[]): void => {
  /** 文件名 */
  const fileName = nameList.join("-");

  del(`./resource/${fileName}.zip`);

  // 压缩文件
  if (type() === "Linux")
    execSync(
      `zip -r resource/${fileName}.zip ${nameList
        .map((name) => `resource/${name}`)
        .join(" ")}`
    );
  else if (type() === "Windows_NT")
    execSync(
      `cd ./resource && "../assets/lib/7z" a -r ${fileName}.zip ${nameList
        .map((name) => `"${name}/"`)
        .join(" ")} && cd ..`
    );
  else throw new Error("Mac OS is not supported");
};

export const genResource = (): void => {
  /** 资源列表 */
  const resouceList = ["function", "guide", "icon", "intro"];
  /** 差异列表 */
  const diffResult = `${execSync("git diff --cached --name-status")}${execSync(
    "git diff --name-status"
  )}`;

  /** 版本信息 */
  const versionInfo = JSON.parse(
    readFileSync("./resource/version.json", { encoding: "utf-8" })
  );

  resouceList.forEach((name) => {
    // 更新版本号
    if (diffResult.match(`resource/${name}`)) versionInfo.version[name] += 1;
  });

  // 生成 zip 并统计大小
  getCombine(resouceList).forEach((resCombine) => {
    zip(resCombine);

    const fileName = resCombine.join("-");

    versionInfo.size[fileName] = Math.round(
      statSync(`./resource/${fileName}.zip`).size / 1024
    );
  });

  // 写入版本信息
  writeFileSync("./resource/version.json", JSON.stringify(versionInfo), {
    encoding: "utf-8",
  });
};
