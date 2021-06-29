import { execSync } from "child_process";
import { sync as del } from "del";
import { readFileSync, statSync, writeFileSync } from "fs";
import { type } from "os";

// 生成排列组合
const getCombine = <T = string>(
  list: T[],
  index = 0,
  result: T[][] = []
): T[][] => {
  if (list.length === 0) return [];
  const temp: T[][] = [[list[index]]];

  for (let i = 0; i < result.length; i++)
    temp.push(result[i].concat(list[index]));

  if (index === list.length - 1) return result.concat(temp);

  return getCombine(list, index + 1, result.concat(temp));
};

const getUpdateCombine = <T = string>(
  updateList: T[],
  fullList: T[][]
): T[][] =>
  fullList.filter((list) =>
    list.some((item) => updateList.some((updateItem) => updateItem === item))
  );

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
  const diffResult = execSync("git status -s").toString();

  /** 版本信息 */
  const versionInfo = JSON.parse(
    readFileSync("./resource/version.json", { encoding: "utf-8" })
  ) as { version: Record<string, number>; size: Record<string, number> };
  /** 更新列表 */
  const updateList: string[] = [];

  resouceList.forEach((name) => {
    // 更新版本号
    if (diffResult.includes(`resource/${name}/`)) {
      updateList.push(name);
      versionInfo.version[name] += 1;
    }
  });

  // 生成 zip 并统计大小
  getUpdateCombine(updateList, getCombine(resouceList)).forEach(
    (resCombine) => {
      zip(resCombine);

      const fileName = resCombine.join("-");

      versionInfo.size[fileName] = Math.round(
        statSync(`./resource/${fileName}.zip`).size / 1024
      );
    }
  );

  // 写入版本信息
  writeFileSync("./resource/version.json", JSON.stringify(versionInfo), {
    encoding: "utf-8",
  });
};
