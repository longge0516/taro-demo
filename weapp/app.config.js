/**
 * @file 微信小程序配置信息文件
 */
let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};

var appid = "wx1746b19d13d9bbe7";
if (extConfig.hasOwnProperty("appId")) {
  appid = extConfig.appId
};

var config = {
  "wx0e6ed4f51db9d078": {
    "appId": 'wx0e6ed4f51db9d078',//独立小程序的APPID (必须修改)
    "accesscode": "XTHYY69RNSKLWEICHATMINI",//授权登录接入识别码
    "tabbar": ["pages/home/homepage", "pages/myctrip/list/list"], //每一个Tab的首页，用来判断页面层级，(按需修改)
    "getIDsWhenLaunch": true, //启动的时候获取openid 和 unionid,为true时，启动会请求获取用户昵称授权，如果授权失败，则opened = '' union ='' (按需修改)
    "version": "1.1.19",
    "cversion": "101.019",
    "env": "prd",//prd uat fat 网络环境 ， 发布前一定要设置为prd
    "host": "m.ctrip.com", //默认都是用这个域名，建议不要修改 (禁止修改)
    "uat": "gateway.m.uat.qa.nt.ctripcorp.com", //uat域名
    "fat": "gateway.m.fws.qa.nt.ctripcorp.com",
    "supportPhone": "4006125929",
  },
  
   "wx1746b19d13d9bbe7": {
    "appId": 'wx1746b19d13d9bbe7',//独立小程序的APPID (必须修改)
    "accesscode": "FDCC0EB391BC24087",//授权登录接入识别码
    "tabbar": ["pages/home/homepage", "pages/myctrip/list/list"], //每一个Tab的首页，用来判断页面层级，(按需修改)
    "getIDsWhenLaunch": true, //启动的时候获取openid 和 unionid,为true时，启动会请求获取用户昵称授权，如果授权失败，则opened = '' union ='' (按需修改)
    "version": "1.1.19",
    "cversion": "101.019",
    "env": "prd",//prd uat fat 网络环境 ， 发布前一定要设置为prd
    "host": "m.ctrip.com", //默认都是用这个域名，建议不要修改 (禁止修改)
    "uat": "gateway.m.uat.qa.nt.ctripcorp.com", //uat域名
    "fat": "gateway.m.fws.qa.nt.ctripcorp.com",
    "supportPhone": "400-18-12308",
   }
}


var appConfig = Object.assign({}, config["wx0e6ed4f51db9d078"], config[appid] || {},extConfig);
module.exports = appConfig;