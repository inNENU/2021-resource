import { execSync } from "child_process";
import { sync as del } from "del";
import { readFileSync, writeFileSync, statSync, existsSync } from "fs";
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
  const diffResult = `${execSync("git diff --cached --name-status")}${execSync(
    "git diff --name-status"
  )}`;

  /** 需要更新的资源 */
  const updateRes: string[] = [];
  /** 版本信息 */
  const versionInfo = JSON.parse(
    readFileSync("./resource/version.json", { encoding: "utf-8" })
  );

  ["function", "guide", "icon", "intro"].forEach((name) => {
    if (diffResult.match(`resource/${name}`)) updateRes.push(name);
  });

  /** 需要更新的组合 */
  const updateCombine = getCombine(updateRes);

  // 生成 zip 并统计大小
  updateCombine.forEach((resCombine) => {
    zip(resCombine);

    const fileName = resCombine.join("-");

    versionInfo.size[fileName] = Math.round(
      statSync(`./resource/${fileName}.zip`).size / 1024
    );
  });

  // 更新版本号
  updateRes.forEach((name) => {
    versionInfo.version[name] += 1;
  });

  // 写入版本信息
  writeFileSync("./resource/version.json", JSON.stringify(versionInfo), {
    encoding: "utf-8",
  });
};
