"use strict";

import { client, putFolder } from "ftp-hope";
import { loginInfo } from "./info";

// 连接客户端
client.connect(loginInfo);

client.on("ready", () => {
  putFolder("./service/info").then(() => {
    console.log("upload success");
    client.end();
  });
});
