import React, {Component} from 'react'
import cwx from '@miniapp/cwx/cwx'
import ubt_cwx from '@miniapp/cwx/cpage/ubt_wx';
import {getNavigatorUid, navigatorOpts, pageStack} from "@miniapp/cwx/cpage/initNavigator"
import __global from "@miniapp/cwx/ext/global";
import Taro from '@tarojs/taro'

function serializeQueryObj(obj) {
  const ret = [];
  for (let k in obj) {
    if (k !== '__navigator') {
      let t = typeof obj[k];
      if (t === 'string' || t === 'number' || t === 'boolean') {
        ret.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]));
      }
    }
  }
  return ret.length > 0 ? ('?' + ret.join('&')) : ''
}

const tabs = (function () {
  let ret = [];
  let __wxConfig = __global.__wxConfig || {};
  if (__wxConfig.tabBar && __wxConfig.tabBar.list) {
    ret = __wxConfig.tabBar.list.map(function (item) {
      return item.pagePath;
    });
  } else {
    ret = __global.tabbar;//安卓检测不到tabbar
  }
  return ret;
})();

function __getIndex(tabs, route) {
  let index = -1;
  for (let i = 0; i < tabs.length; i++) {
    let r = tabs[i];
    if (r.indexOf(route) != -1) {
      index = i;
      break;
    }
  }
  return index;
}

const noop = function () {
}
const lifeCycleFns = [
  // 注意：Taro 页面没有 onShow, onHide, onUnload
  "onLoad", // 可访问页面路由参数：通过访问 options 参数或调用 getCurrentInstance().router。
  "onReady", // 可访问小程序渲染层的 DOM 节点：使用 createCanvasContext 或 createSelectorQuery 等 API 。【使用时，需查看官方文档中的注意事项】
  "componentDidShow", // 页面显示/切入前台时触发。【页面没有 onShow, 只有页面组件才会触发 onShow 生命周期】
  "componentWillUnmount", // 页面显示/切入前台时触发。【页面没有 onShow, 只有页面组件才会触发 onShow 生命周期】
  "componentDidHide",  // 页面隐藏/切入后台时触发。【页面没有 onHide, 只有页面组件才会触发 onHide 生命周期】
];
const ubtFns = ["ubtSendPV", "ubtTrace", "ubtMetric", "ubtDevTrace", "__ubt_getPageInfo", "ubtSet", "navigateTo", "navigateBack", "invokeCallback"];
export default class taroBase extends Component {
  constructor(props) {
    super(props);
    const currentPage = cwx.getCurrentPage();
    //= 创建PV
    this.cwx = cwx;
    this.__ubt_events = {};
    this.__ubt_instance = ubt_cwx.createPV();
    if (currentPage && currentPage.__route__ === (props && props.tid && props.tid.split("?")[0])) {
      //绑定当前页面的ubt
      this._bindPageIns();
    }
    this.wrapLifeCycle();
  }

  wrapLifeCycle() {
    lifeCycleFns.forEach(fnName => {
      const oldFn = this[fnName] || noop;
      const newFn = (args) => {
        this["_" + fnName].call(this, args);
        oldFn.call(this, args)
      }
      this[fnName] = newFn.bind(this);
    })
  }

  bindUbtApiToPage() {
    ubtFns.forEach((item) => {
      this.__page[item] = this[item].bind(this);
    })
  }

  userActionWrapper(fnName) {
    const _this = this;
    return function eventWrapper(e) {
      if (typeof _this[fnName] === 'function') {
        //上报event
        try {
          cwx.uploadUserAction(e, fnName, _this);
        } catch (e) {

        }
        _this[fnName].apply(_this, arguments);
      }
    }
  }

  ubtSendPV(options) {
    /**
     * 如果产生了新的PV需要更新当前page下的ubt.pv实例对象
     * 避免新PV下的埋点数据（tracelog,metric）关联到上一个PV
     */
    this.__ubt_instance = this.__ubt_instance.send('pv', options || {});
  }

  ubtTrace(name, value) {
    let valueStr = '';
    switch (cwx.util.type(value)) {
      case 'string':
      case 'number':
        valueStr = value;
        break;
      default:
        valueStr = JSON.stringify(value);
        break;
    }
    if (cwx.config.ubtDebug) {
      let ubtTrace = this.__ubt_getPageInfo();
      ubtTrace.traceName = name;
      ubtTrace.traceValue = valueStr;
      console.log('UBT Page Trace', ubtTrace);
    }
    this.__ubt_instance.send('tracelog', {
      name: name,
      value: valueStr
    });
  }

  ubtDevTrace(name, value) {
    let option = {
      "$.ubt.hermes.topic.classifier": "DebugCustom",
      key: name,
      val: typeof value != 'object' ? {data: value + ''} : value,
      applet_scene: (cwx.scene || "") + ""
    }
    this.__ubt_instance.send('trace', option);
  }

  ubtMetric(option) {
    // 想办法让ubt取到pageId
    this.__ubt_instance.send('metric', option || {});
  }

  ubtSet(name, value) {
    // 想办法让ubt取到pageId
    ubt_cwx.ubtSet(name, value);
  }

  _bindPageIns() {
    if (this.isBindedUbt) {
      return;
    }
    this.isBindedUbt = true;
    const allPages = Taro.getCurrentPages();
    this.__page = allPages[allPages.length - 1];
    this.__page.__ubt_instance = this.__ubt_instance
    //添加一个双向绑定
    this.__page.__cpage = {
      __ubt_querystring: this.__ubt_querystring,
      pageId: this.pageId,
      __ubt_instance: this.__ubt_instance
    };
    this.bindUbtApiToPage();
  }

  _onLoad(options = {}) {
    this.__ubt_totalActiveTime = 0;
    this.__ubt_onLoadTime = +new Date();
    this._bindPageIns();
    this.__ubt_querystring = serializeQueryObj(options);
    // loadTime
    this.__ubt_onLoadTime = +new Date();
    this.__ubt_isBack = false;
    this.__ubt_isBackFlag = false;

    if (pageStack.length === 1 && __getIndex(tabs, this.__page.__route__) !== -1) {
      pageStack.splice(0, 1, this.__page.__route__);
    } else {
      pageStack.push(this.__page.__route__);
    }
    let uid = null;
    delete this.__navigator_fromUid;
    if (options && options['__navigator']) {
      uid = options.__navigator;
      delete options.__navigator;
      let opts = navigatorOpts[uid];
      if (opts) {
        console.log('__navigator_fromUid', uid);
        this.__navigator_fromUid = uid;
        options.data = opts.data;
      }
    }
    this.__navigator_isBack = false;
    this.__navigator_isBackFlag = false;
    cwx._wxGetCurrentPages = Taro.getCurrentPages();
    try {
      cwx._currentPage = cwx._wxGetCurrentPages[cwx._wxGetCurrentPages.length - 1];
    } catch (e) {
    }

  }

  _onReady() {
    // active
    if (!this.__ubt_isBack) {
      this.__ubt_onActiveTime = +new Date();
    }
    this.__ubt_instance.send('metric', {
      name: 100359,       //perf.weixin.ready
      value: +new Date() - this.__ubt_onLoadTime
    });
  }

  _componentDidShow() {
    // active
    if (this.__ubt_isBack) {
      this.__ubt_onActiveTime = +new Date();
    }
    if (this.hasOwnProperty('__navigator_isBackFlag')) {
      delete this.__navigator_isBackFlag;
    } else {
      this.__navigator_isBack = true;
    }
    if (this.__navigator_isBack) {
      if (pageStack.length === 1 && tabs.indexOf(this.__page.__route__) !== -1) {
        pageStack.splice(0, 1, this.__page.__route__);
      }
      let uid = this.__navigator_toUid;
      if (uid && navigatorOpts[uid] && (!cwx.__skipCallback)) {
        if (navigatorOpts[uid].callback) {
          navigatorOpts[uid].backDatas.forEach((function (data) {
            navigatorOpts[uid].callback.call(this.__page, data);
          }).bind(this));
        }
        if (navigatorOpts[uid].navComplete) {
          navigatorOpts[uid].navComplete.call(this.__page);
        }
        delete this.__navigator_toUid;
      }
      if (cwx.__skipCallback == true) {
        cwx.__skipCallback = false;
      }
    }
    cwx._wxGetCurrentPages = Taro.getCurrentPages();
    try {
      cwx._currentPage = cwx._wxGetCurrentPages[cwx._wxGetCurrentPages.length - 1];
    } catch (e) {
    }
    // back
    if (this.hasOwnProperty('__ubt_isBackFlag')) {
      delete this.__ubt_isBackFlag;
    } else {
      this.__ubt_isBack = true;
    }
    // log pv
    //处理ubt返回相关
    let ubtPv = this.__ubt_getPageInfo();
    ubtPv.url = '' + this.props.tid + this.__ubt_querystring;
    ubtPv.isBack = this.__ubt_isBack;
    //=发送PV数据，包含是否需要生成新PV的逻辑
    if (ubtPv.pageId !== 'ignore_page_pv') {
      console.log('UBT Pageview=======', ubtPv);
      this.__ubt_instance = this.__ubt_instance.send('pv', ubtPv);
    }
  }

  _componentWillUnmount() {
    if (pageStack[pageStack.length - 1] == this.__page.__route__) {
      pageStack.pop();
    }
    cwx._wxGetCurrentPages.pop()
    try {
      cwx._currentPage = cwx._wxGetCurrentPages[cwx._wxGetCurrentPages.length - 1];
    } catch (e) {
    }
  }

  _componentDidHide() {

  }

  __ubt_getPageInfo() {
    return {
      pageId: '' + (this.pageId || this.pageid || '0')
    };
  };

  navigateTo(opts) {
    let uid = getNavigatorUid();
    let url = opts.url;

    const navOpts = {
      url: url + (/\?/.test(url) ? '&' : '?') + '__navigator=' + encodeURIComponent(uid),
      success: opts.success ? opts.success.bind(this.__page) : null,
      fail: opts.fail ? opts.fail.bind(this.__page) : null,
      complete: opts.complete ? opts.complete.bind(this.__page) : null
    };

    if (this.getPageLevel() >= 10) {
      var err = {
        error: '页面层级超过10层',
        errorCode: '500'
      };
      console.log("CPage.navigateTo :", err, url);
      // console.log( "CPage.stack :", this.getPageStack() );

      navOpts.fail && navOpts.fail(err);
      navOpts.complete && navOpts.complete(err);
      return;
    }

    navigatorOpts[uid] = {
      data: opts.data,
      immediateCallback: opts.immediateCallback ? opts.immediateCallback.bind(this.__page) : null,
      callback: opts.callback ? opts.callback.bind(this.__page) : null,
      navComplete: opts.navComplete ? opts.navComplete.bind(this.__page) : null,
      backDatas: []
    };

    this.__navigator_toUid = uid;
    cwx.navigateTo(navOpts);
  };

  navigateBack(data) {
    let uid = this.__navigator_fromUid;
    if (uid && navigatorOpts[uid] && arguments.length > 0) {
      navigatorOpts[uid].backDatas.push(data);
      navigatorOpts[uid].immediateCallback && navigatorOpts[uid].immediateCallback(data);
    }
    cwx.navigateBack();
  };

  invokeCallback(data) {
    let uid = this.__navigator_fromUid;
    if (uid && navigatorOpts[uid]) {
      navigatorOpts[uid].backDatas.push(data);
      navigatorOpts[uid].immediateCallback && navigatorOpts[uid].immediateCallback(data);
    }
  };

  getPageStack() {
    return cwx.util.copy(pageStack);
  };

  getPageLevel() {
    return this.getPageStack().length;
  };

}
