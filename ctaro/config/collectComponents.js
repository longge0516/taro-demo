const fs = require("fs");
const del = require("del");
const path = require("path");
const srcDir = path.join(__dirname, "../src/pages");
const tmpDir = path.join(__dirname, "tmp");

const collectComponentLabels = function () {
  const labels = {};
  let n = 0;

  function loopDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(function (fileName) {
      const filePath = path.join(dir, fileName);
      const fileStat = fs.statSync(filePath);
      if (fileStat.isDirectory()) {
        loopDir(filePath);
      } else {
        if (fileName.endsWith(".config.js") || fileName.endsWith(".config.ts")) {
          try {
            const pageConfigString = fs.readFileSync(filePath, "utf-8");
            const pageConfigStr = pageConfigString.match(/\{[\s\S]*}/)[0];
            if (!fs.existsSync(tmpDir)) {
              fs.mkdirSync(tmpDir);
            }
            const tmpJSPath = path.join(tmpDir, `tmp_${n++}.js`);
            fs.writeFileSync(tmpJSPath, `
              module.exports = ${pageConfigStr};
            `, "utf-8");
            const pageConfig = require(tmpJSPath);
            if (pageConfig && pageConfig.usingComponents) {
              const pageLabels = Object.keys(pageConfig.usingComponents);
              pageLabels.forEach(function (label) {
                const labelsKeys = Object.keys(labels);
                if (!labelsKeys.includes(label)) {
                  labels[label] = pageConfig[label] || 1;
                }
              })
            }
          } catch (e) {
            console.log(`get ${fileName} usingComponents failed.`, e.message);
          }
        }
      }
    })
  }

  loopDir(srcDir);
  console.log("labels--", labels);
  del.sync(tmpDir, {force: true});
  return labels;
}
module.exports = collectComponentLabels
