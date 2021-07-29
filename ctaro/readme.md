## taro基础模版使用说明：

   整个项目允许修改的部分：
        app.config.js 修改pages以及subpackges属性
        src/pages/  目录下新增taro-xxxx的bundle名称
        
   仓库名称以taro-xxxx开头
   
   
## 关于公共模块的引用：
    模版项目路径:http://git.dev.sh.ctripcorp.com/tinyapp/tarobaseproject
    目前公共模块的引用已经直接影响到了主包的size，所以以后公共模块的依赖，不再主动安装。
    对于公共模块的引用，按照以下例子处理：
        1：添加scripts 命令：
            "buildCommon": "webpack --config ./webpack.common.js"
            //如不满足需求，webpack文件可自行修改
            //默认的文件基本可以满足需求，然后将安装依赖添加到devDependencies
            //"@babel/plugin-proposal-function-bind": "^7.14.5",
            //"webpack": "^4.41.3",
            //"webpack-cli": "^3.3.6"
            
        2:将公共的文件模块全部写入webpack入口文件：例如commonModule.js
            import { Stopwatch } from '@ctrip/bbz-accounts-utils';
            import { BusinessScenarioScene } from '@ctrip/bbz-accounts-log/taro';
            import { silentLogin } from '@ctrip/bbz-accounts-service/miniapp';
            
            export default {
                Stopwatch,
                BusinessScenarioScene,
                silentLogin
            }
        3:页面引用时，直接引用编译完的产物：
            import commonModule from "../../../../commonModule.prod"
            const {Stopwatch,BusinessScenarioScene} = commonModule;
            

## 注意事项：
    打包时要尽量避免将Taro使用的模块打包到common文件中，如果发现需要将模块添加到webpack.common.js的
     externales属性中。   

## 原生组件的标签嵌套次数：
   在编译时，会默认扫描出所有的原生小程序组件，对于原生组件的标签，默认生成的模版数量都是1。
   如果使用的模版会嵌套多次，则按照如下配置：
    {
      navigationBarTitleText: "我携",
      navigationBarBackgroundColor: "#ffffff",
      navigationBarTextStyle: "black",
      backgroundColor: "#eeeeee",
      backgroundTextStyle: "light",
    
      enablePullDownRefresh: true,
      onReachBottomDistance: 50,
   
      usingComponents: {
        'nps-score': './modules/nps/nps-score',
      },
      //此属性来控制模版的嵌套次数，默认是1
      'nps-score':3
    };

## 依赖模块分析工具：
    
    更新：
        执行miniTools taro --updateTaro
        检查plugin下是否有analyzerplugin.js
    package.json ：
        1：新增依赖 "webpack-bundle-analyzer": "^4.4.2"
        2:scripts中新增执行命令：
            "analyzer": "taro build --type weapp --blended --analyzer",
    运行：
        npm run analyzer
     
    结果：
        浏览器打开 analyzer 
        详细依赖文件：plugin/analyzer.json
       
      
