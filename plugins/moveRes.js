const fs = require('fs-extra')
const path = require('path')
const beautify = require("json-beautify")
const isInPipeline = require("./isInPipeline");
const getMiniAppPath = require("./utils/getMiniAppPath");
const isEqualRoot = require("./utils/isEqualRoot");

export default (ctx, options = {}) => {
  const ctxOptions = ctx.runOpts.options || ctx.runOpts;
  const miniType = ctxOptions.platform;
  console.log("ctxOptions----", ctxOptions);
  ctx.onBuildFinish(() => {
    const taroConfig = options.taroConfig;
    if (!ctxOptions.blended) return
    console.log('编译结束！')
    const rootPath = process.cwd();
    let {miniappPath, releasePath,} = getMiniAppPath(rootPath, miniType);
    const outputPath = path.resolve(__dirname, '../dist')
    const taroBasePath = path.join(miniappPath, 'taroBase')
    let releaseTaroBasePath = path.join(releasePath, "taroBase")
    if (isInPipeline) {
      if (fs.existsSync(releasePath)) {
        fs.removeSync(releasePath)
      }
      fs.mkdirSync(releasePath);
      fs.mkdirSync(releaseTaroBasePath);
    } else {
      releasePath = null;
      if (fs.existsSync(taroBasePath)) {
        fs.removeSync(taroBasePath)
      }
      fs.mkdirSync(taroBasePath);
    }
    const files = fs.readdirSync(outputPath);
    //compatibility taro bug
    const mainPagePath = path.join(outputPath, "pages/mainPage");
    if (fs.existsSync(mainPagePath)) {
      console.log("remove MainPage :", mainPagePath);
      fs.removeSync(mainPagePath)
    }
    files.forEach(function (fileName) {
      const filePath = path.join(outputPath, fileName);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        if (!isInPipeline) {
          fs.copySync(filePath, path.join(miniappPath, fileName))
        }
        if (releasePath) {
          fs.copySync(filePath, path.join(releasePath, fileName))
        }
      } else {
        if (!isInPipeline) {
          fs.copyFileSync(filePath, path.join(taroBasePath, fileName))
        }
        if (releasePath) {
          fs.copyFileSync(filePath, path.join(releaseTaroBasePath, fileName))
        }
      }
    })
    let {pages = [], subPackages = []} = taroConfig;
    //删除pages/mainPage/index 小程序配置文件
    pages = pages.filter(function (item) {
      return item !== "pages/mainPage/index";
    });
    if (pages.length === 1 && pages[0] === "") {
      pages = [];
    }
    taroConfig.pages = pages;
    if (!isInPipeline) {
      //将taroConfig中的pages信息合并到小程序的app.json中
      const appJSONPath = path.join(miniappPath, "app.json");
      let appJSON = require(appJSONPath)
      pages.forEach(function (item) {
        if (appJSON.pages.indexOf(item) === -1) {
          appJSON.pages.push(item); //此处 后面需要删除，不可以直接往pages下塞文件
        }
      });
      subPackages.forEach(function (item) {
        let needAdd = true;
        for (let i = 0, a = appJSON.subPackages; i < a.length; i++) {
          if (isEqualRoot(item.root, a[i].root)) { //如果app.json中有当前root,直接替换
            needAdd = false;
            item.pages.forEach(function (sPage) {
              if (!a[i].pages.includes(sPage)) {
                a[i].pages.push(sPage);
              } else {
                console.log(`Page Already Exist in Main AppJSON,Root:${item.root},Page:${sPage}`);
              }
            });
            // a[i] = item;
            break;
          }
        }
        if (needAdd) {
          appJSON.subPackages.push(item);
        }
      });
      fs.writeFileSync(appJSONPath, beautify(appJSON, null, 2, 100));
    }
    if (releasePath) {
      fs.writeFileSync(path.join(releasePath, "taroBase/app.json"), beautify(taroConfig, null, 2, 100));
    }
    //todo? 建议写死，处理miniapp/app.js 加载taroBase的处理，或者在微信小程序编译时处理
    console.log('拷贝结束！')
  })
}
