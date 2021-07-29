const {RawSource} = require("webpack-sources")
const isInPipeline = require("./isInPipeline");
const fsSync = require('fs-extra')
const path = require('path')
const fs = require('fs')
const correctionPath = require("./utils/correctionPath");
const getMiniAppPath = require("./utils/getMiniAppPath");
const taroCommonFiles = [
  "app.js", "app.wxss", "base.wxml", "comp.js", "comp.json", "comp.wxml", "common.js",
  "custom-wrapper.js", "custom-wrapper.json", "custom-wrapper.wxml", "runtime.js", "taro.js", "utils.wxs", "vendors.js"
]
const tempFiles = ["wxml", "swan", "axml", "ttml", "qxml"];
export default (ctx) => {
  const ctxOptions = ctx.runOpts.options || ctx.runOpts;
  const miniType = ctxOptions.platform;
  ctx.modifyBuildAssets(({assets}) => {
    if (!ctxOptions.blended) return
    console.log('修改文件相对路径开始！')
    const rootPath = process.cwd();
    const {miniappPath} = getMiniAppPath(rootPath, miniType);
    const miniAppTaroBasePath = path.join(miniappPath, 'taroBase');
    if (!isInPipeline) {
      if (fsSync.existsSync(miniAppTaroBasePath)) {
        fsSync.removeSync(miniAppTaroBasePath)
      }
      fsSync.mkdirSync(miniAppTaroBasePath);
    }
    const assetsKeys = Object.keys(assets);
    for (let pro in assets) {
      const asset = assets[pro];
      let filePath;
      if (taroCommonFiles.includes(pro)) {
        filePath = path.join(miniAppTaroBasePath, pro);
      } else {
        filePath = path.join(miniappPath, pro);
      }

      const rootRelativePath = correctionPath(path.relative(path.dirname(filePath), miniappPath));

      if (pro.substr(pro.lastIndexOf('.')) === ".js") {
        let content = asset.source()
        //处理js文件
        //兼容老的写法
        const miniappReg = /require\s*\(\s*"([^"]*@miniapp[^"]+)"\s*\)/g;
        if (miniappReg.test(content)) {
          content = content.replace(miniappReg, function ($0, $1) {
            const newPath = rootRelativePath + $1.substr($1.indexOf('@miniapp') + 8);
            return `require("${newPath}")`;
          });
        }
        //新的兼容H5写法
        const miniappRegH5 = /require\s*\(\s*"([^"]*@\/miniapp[^"]+)"\s*\)/g;
        if (miniappRegH5.test(content)) {
          content = content.replace(miniappRegH5, function ($0, $1) {
            const newPath = rootRelativePath + $1.substr($1.indexOf('@/miniapp') + 9);
            return `require("${newPath}")`;
          });
        }
        const taroCommonReg = /require\s*\(\s*"([^"]*taroCommon[^"]*)"\s*\)(;|\,)?/;
        const matchArr = content.match(taroCommonReg);
        if (matchArr) {
          const taroCommonRelativePath = correctionPath(path.relative(miniappPath, path.join(path.dirname(filePath), matchArr[1])));
          const taroCmomonJsPath = taroCommonRelativePath + ".js";
          const taroCmomonWxssPath = taroCommonRelativePath + ".wxss";
          const pageWxsspath = correctionPath(path.relative(miniappPath, filePath.replace(/\.js$/, ".wxss")))
          if (!assetsKeys.includes(taroCmomonJsPath)) {
            //如果没有taroCommon.js，则删除引用
            content = content.replace(matchArr[0], "");
          }
          if (assetsKeys.includes(pageWxsspath) && assetsKeys.includes(taroCmomonWxssPath)) {
            //如果有页面的wxss以及taroCommonWxss,则将taroCommonWxss添加进去
            const relativePath = matchArr[1] + ".wxss";
            const wxssAsset = assets[pageWxsspath];
            let wxssContent = wxssAsset.source();
            wxssContent = `@import "${relativePath}";\n` + wxssContent;
            assets[pageWxsspath] = new RawSource(wxssContent);
          }
        }
        assets[pro] = new RawSource(content);
      }
      if (pro.indexOf("pages/") !== -1) { //只需要处理pages文件夹下的内容
        const tarBasePath = path.join(miniappPath, "taroBase");
        const taroBaseRelativePath = correctionPath(path.relative(path.dirname(filePath), tarBasePath));
        if (pro.substr(pro.lastIndexOf('.')) === ".json") {
          //处理json文件
          const jsonObj = JSON.parse(asset.source());
          if (jsonObj && jsonObj.usingComponents) {
            for (let k in jsonObj.usingComponents) {
              const v = jsonObj.usingComponents[k];
              if (k === "custom-wrapper" || k === "comp") {
                jsonObj.usingComponents[k] = taroBaseRelativePath + "/" + k;
              }
              if (v && v.indexOf("@/miniapp") !== -1) {
                jsonObj.usingComponents[k] = rootRelativePath + v.substr(v.indexOf('@/miniapp') + 9);
              }
              if (v && v.indexOf("@miniapp") !== -1) {
                jsonObj.usingComponents[k] = rootRelativePath + v.substr(v.indexOf('@miniapp') + 8);
              }
            }
          }
          const sourceStr = JSON.stringify(jsonObj);
          assets[pro] = {
            size: () => sourceStr.length,
            source: () => sourceStr
          };
        }
        //判断是否是模版文件
        const extname = pro.substr(pro.lastIndexOf('.') + 1);
        const baseFileReg = new RegExp(`"([^"]*base.${extname})"`, "g")
        if (tempFiles.includes(extname)) {
          //处理wxml文件
          let wxStr = asset.source();
          if (wxStr && typeof wxStr === "object" && Buffer.isBuffer(wxStr)) {
            wxStr = wxStr.toString();
          }
          try {
            wxStr = wxStr.replace(baseFileReg, function ($0, $1) {
              const newPath = taroBaseRelativePath + $1.substr($1.indexOf(`/base.${extname}`));
              return `"${newPath}"`;
            });
            assets[pro] = {
              size: () => wxStr.length,
              source: () => wxStr
            };
          } catch (e) {
            console.log("模版替换base失败！", pro);
          }
        }

        //判断是否是base目录下的utils.wsx
      }
    }

    console.log('修改文件相对路径结束！')
  })
}
