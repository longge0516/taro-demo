const path = require("path");
module.exports = function (rootPath, miniType) {
  rootPath = rootPath.replace(/\\/g, "/");
  let miniappPath = path.join(rootPath, "../", miniType);
  let releasePath = path.join(rootPath, "../", miniType + "Release");
  if (rootPath.split("/").slice(-2, -1)[0] === ".minicache") {
    miniappPath = path.join(rootPath, "../../", miniType);
    releasePath = path.join(rootPath, "../../", miniType + "Release");
  }
  return {
    miniappPath,
    releasePath
  }
}
