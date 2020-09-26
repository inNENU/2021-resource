import { convertFolder } from "./change";

convertFolder("./res/guide", (content) => {
  return content
    .replace(
      /content:([\s\S]*) {2}- tag: footer\n {4}author: (.*)\n {4}time: (.*)\n\nshareable: true/u,
      "author: $2\ntime: $3\nshareable: true\ncontent:$1"
    )
    .replace(
      /shareable: true\ncontent:([\s\S]*) {2}- tag: footer\n {4}author: (.*)\n {4}time: (.*)\n/u,
      "author: $2\ntime: $3\nshareable: true\ncontent:$1"
    )
    .replace(
      /content:([\s\S]*) {2}- tag: footer\n {4}desc: ((?:.| )*)\n {4}author: (.*)\n {4}time: (.*)\n\nshareable: true/u,
      "author: $3\ndesc: $2\ntime: $4\nshareable: true\ncontent:$1"
    )
    .replace(
      /shareable: true\ncontent:([\s\S]*) {2}- tag: footer\n {4}desc: ((?:.| )*)\n {4}author: (.*)\n {4}time: (.*)\n/u,
      "author: $3\ndesc: $2\ntime: $4\nshareable: true\ncontent:$1"
    )
    .replace(
      /content:([\s\S]*) {2}- tag: footer\n {4}author: (.*)\n {4}desc: ((?:.| )*)\n {4}time: (.*)\n\nshareable: true/u,
      "author: $2\ndesc: $3\ntime: $4\nshareable: true\ncontent:$1"
    )
    .replace(
      /shareable: true\ncontent:([\s\S]*) {2}- tag: footer\n {4}author: (.*)\n {4}desc: ((?:.| )*)\n {4}time: (.*)\n/u,
      "author: $2\ndesc: $3\ntime: $4\nshareable: true\ncontent:$1"
    )
    .replace(
      /content:([\s\S]*) {2}- tag: footer\n {4}desc: ((?:.| )*)\n {4}time: (.*)\n\nshareable: true/u,
      "desc: $2\ntime: $3\nshareable: true\ncontent:$1"
    )
    .replace(
      /shareable: true\ncontent:([\s\S]*) {2}- tag: footer\n {4}desc: ((?:.| )*)\n {4}time: (.*)/u,
      "desc: $2\ntime: $3\nshareable: true\ncontent:$1"
    )
    .replace(
      /content:([\s\S]*) {2}- tag: footer\n\nshareable: true/u,
      "shareable: true\ncontent:$1"
    )
    .replace(/content:([\s\S]*) {2}- tag: footer\n$/u, "content:$1");
});

convertFolder("./res/other", (content) => {
  return content
    .replace(
      /content:([\s\S]*) {2}- tag: footer\n {4}author: (.*)\n {4}time: (.*)\n\nshareable: true/u,
      "author: $2\ntime: $3\nshareable: true\ncontent:$1"
    )
    .replace(
      /shareable: true\ncontent:([\s\S]*) {2}- tag: footer\n {4}author: (.*)\n {4}time: (.*)\n/u,
      "author: $2\ntime: $3\nshareable: true\ncontent:$1"
    )
    .replace(
      /content:([\s\S]*) {2}- tag: footer\n {4}desc: ((?:.| )*)\n {4}author: (.*)\n {4}time: (.*)\n\nshareable: true/u,
      "author: $3\ndesc: $2\ntime: $4\nshareable: true\ncontent:$1"
    )
    .replace(
      /shareable: true\ncontent:([\s\S]*) {2}- tag: footer\n {4}desc: ((?:.| )*)\n {4}author: (.*)\n {4}time: (.*)\n/u,
      "author: $3\ndesc: $2\ntime: $4\nshareable: true\ncontent:$1"
    )
    .replace(
      /content:([\s\S]*) {2}- tag: footer\n {4}author: (.*)\n {4}desc: ((?:.| )*)\n {4}time: (.*)\n\nshareable: true/u,
      "author: $2\ndesc: $3\ntime: $4\nshareable: true\ncontent:$1"
    )
    .replace(
      /shareable: true\ncontent:([\s\S]*) {2}- tag: footer\n {4}author: (.*)\n {4}desc: ((?:.| )*)\n {4}time: (.*)\n/u,
      "author: $2\ndesc: $3\ntime: $4\nshareable: true\ncontent:$1"
    )
    .replace(
      /content:([\s\S]*) {2}- tag: footer\n {4}desc: ((?:.| )*)\n {4}time: (.*)\n\nshareable: true/u,
      "desc: $2\ntime: $3\nshareable: true\ncontent:$1"
    )
    .replace(
      /shareable: true\ncontent:([\s\S]*) {2}- tag: footer\n {4}desc: ((?:.| )*)\n {4}time: (.*)/u,
      "desc: $2\ntime: $3\nshareable: true\ncontent:$1"
    )
    .replace(
      /content:([\s\S]*) {2}- tag: footer\n\nshareable: true/u,
      "shareable: true\ncontent:$1"
    )
    .replace(
      /content:([\s\S]*) {2}- tag: footer\n {4}author: (.*)\n\nshareable: true/u,
      "author: $2\nshareable: true\ncontent:$1"
    )
    .replace(/content:([\s\S]*) {2}- tag: footer\n$/u, "content:$1");
});
