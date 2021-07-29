module.exports = function (t) {
  var e = {};

  function n(o) {
    if (e[o]) return e[o].exports;
    var i = e[o] = {i: o, l: !1, exports: {}};
    return t[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
  }

  return n.m = t, n.c = e, n.d = function (t, e, o) {
    n.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: o})
  }, n.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
  }, n.t = function (t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var o = Object.create(null);
    if (n.r(o), Object.defineProperty(o, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var i in t) n.d(o, i, function (e) {
      return t[e]
    }.bind(null, i));
    return o
  }, n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default
    } : function () {
      return t
    };
    return n.d(e, "a", e), e
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, n.p = "", n(n.s = 4)
}([function (t, e, n) {
  "use strict";
  n.d(e, "a", (function () {
    return c
  })), n.d(e, "d", (function () {
    return l
  })), n.d(e, "m", (function () {
    return _
  })), n.d(e, "f", (function () {
    return C
  })), n.d(e, "g", (function () {
    return p
  })), n.d(e, "j", (function () {
    return a
  })), n.d(e, "k", (function () {
    return b
  })), n.d(e, "i", (function () {
    return g
  })), n.d(e, "n", (function () {
    return h
  })), n.d(e, "h", (function () {
    return S
  })), n.d(e, "e", (function () {
    return T
  })), n.d(e, "b", (function () {
    return v
  })), n.d(e, "c", (function () {
    return y
  })), n.d(e, "l", (function () {
    return f
  }));
  var o = n(2), i = n(1);
  const a = o.version;
  var s = void 0 !== s ? s : global && global.cwx && global.cwx.cwx,
    r = void 0 !== r ? r : global && global.cwx && global.cwx.__global;
  const u = {id: 2, name: "detail_claimcoupon"},
    c = {[i.e.TICKET]: "tkt", [i.e.THINGS_TODO]: "act", [i.e.TOUR]: "grp", [i.e.CRUISE]: "cru"};

  function l(t) {
    let e;
    return e = {
      pageId: t.pageId,
      componentId: u.id,
      componentName: u.name,
      componentVersion: a,
      ubtSourceKey: c[t.source]
    }, e
  }

  function d(t, e) {
    let n = Math.abs(t), o = e - (n + "").length;
    return (t < 0 ? "-" : "") + "0".repeat(o < 0 ? 0 : o) + n
  }

  function p() {
    let t = (new Date).getTimezoneOffset(), e = Math.abs(t / 60), n = Math.abs(t % 60);
    return {desc: `GMT${t > 0 ? "-" : "+"}${d(Math.floor(e), 2)}:${d(n, 2)}`, offset: t}
  }

  function m(t) {
    let e;
    return t || (e = global && global.cwx && global.cwx.cwx), t && (e = t), e
  }

  function f(t) {
    return t || (t = global && global.cwx && global.cwx.__global), t && (t = t), t
  }

  function g(t, e) {
    const n = m();
    let o = null;
    if (n && (o = n && n.sendUbtByPage && n.sendUbtByPage.ubtTrace), o) try {
      o(t, e)
    } catch (t) {
    }
  }

  function b() {
    m();
    return wx.request
  }

  function h(t = {}, e) {
    const n = m();
    n && n.user.login({param: t, callback: e})
  }

  function I(t) {
    switch (t.promotionStatus) {
      case 1:
        t.disableButton = !1, t.buttonText = "立即领取";
        break;
      case 2:
      case 3:
        t.disableButton = !0, t.buttonText = "已领取", t.showImg = !0;
        break;
      case 4:
        t.disableButton = !0, t.buttonText = "已抢光";
        break;
      case 5:
        t.disableButton = !0, t.buttonText = "已过期";
        break;
      case 6:
        t.disableButton = !0, t.buttonText = "未开始";
        break;
      case 7:
        t.disableButton = !0, t.buttonText = "新客专享";
        break;
      default:
        t.disableButton = !0, t.buttonText = ""
    }
    return t
  }

  function S(t) {
    const e = [[], []];
    return e[0] = t.claimList.map(t => I(t)), e[1] = t.useableList.map(t => (t.status ? t.promotionStatus = 2 : t.promotionStatus = 3, I(t))), e
  }

  const T = t => {
    const e = {
      availableClaimList: [],
      availableUseList: [],
      receivedNouseList: [],
      robbedList: [],
      expiredList: [],
      notStartedList: [],
      singkekList: []
    };

    function n(t) {
      return {
        promotionId: t.promotionId,
        couponCode: t.couponCode,
        couponName: t.couponName,
        deductionStrategyType: t.deductionStrategyType,
        deductionList: t.deductionList,
        deductionAmount: t.deductionAmount,
        matchedQuantity: t.matchedQuantity
      }
    }

    function o(t) {
      switch (t.promotionStatus) {
        case 1:
          e.availableClaimList.push(n(t));
          break;
        case 2:
          e.availableUseList.push(n(t));
          break;
        case 3:
          e.receivedNouseList.push(n(t));
          break;
        case 4:
          e.robbedList.push(n(t));
          break;
        case 5:
          e.expiredList.push(n(t));
          break;
        case 6:
          e.notStartedList.push(n(t));
          break;
        case 7:
          e.singkekList.push(n(t))
      }
    }

    return t.claimList.forEach(t => {
      o(t)
    }), t.useableList.forEach(t => {
      t.status ? t.promotionStatus = 2 : t.promotionStatus = 3, o(t)
    }), e
  };

  function y(t) {
    let {ctrlName: e, productId: n, scenicSpotId: o, promotionId: i, positionId: s, pageId: r} = t;
    const u = l(t);
    let c = `${u.ubtSourceKey}-${r}-coupon-${e}-${u.componentName}-${a}`;
    return i > 0 ? `${c}-${n || o}-${i}-${s}` : c
  }

  let v = t => (2 != t.promotionStatus && 3 != t.promotionStatus || (t.showImg = !0), t);

  function _(t, e, n, o) {
    let i = e - t;
    if (i <= 0) return n(), null;
    {
      let t;
      return i > 3e3 ? (i -= 3e3, t = o) : t = n, setTimeout(() => {
        t()
      }, i)
    }
  }

  function C(t) {
    const e = new Date(t);
    return 1e3 * (60 * (60 * (24 - e.getHours()) - e.getMinutes()) - e.getSeconds()) - e.getMilliseconds()
  }
}, function (t, e, n) {
  "use strict";
  var o, i, a, s, r, u, c, l, d;
  n.d(e, "c", (function () {
    return o
  })), n.d(e, "e", (function () {
    return s
  })), n.d(e, "d", (function () {
    return r
  })), n.d(e, "a", (function () {
    return c
  })), n.d(e, "b", (function () {
    return l
  })), function (t) {
    t.Fat = "fat", t.Uat = "uat", t.Prod = "prd"
  }(o || (o = {})), function (t) {
    t[t.Ctrip_Online = 2] = "Ctrip_Online", t[t.Ctrip_App = 5] = "Ctrip_App", t[t.Ctrip_H5 = 7] = "Ctrip_H5", t[t.Ctrip_Mina = 21] = "Ctrip_Mina", t[t.Trip_Online = 24] = "Trip_Online", t[t.Trip_App = 25] = "Trip_App", t[t.Trip_H5 = 26] = "Trip_H5", t[t.Offline = 3] = "Offline", t[t.CompanyShop = 110] = "CompanyShop", t[t.BestonShop = 111] = "BestonShop", t[t.QunarShop = 112] = "QunarShop", t[t.LvJing = 113] = "LvJing"
  }(i || (i = {})), function (t) {
    t[t.Ctrip_Online = 114] = "Ctrip_Online", t[t.Ctrip_App = 115] = "Ctrip_App", t[t.Ctrip_H5 = 116] = "Ctrip_H5", t[t.Ctrip_Mina = 117] = "Ctrip_Mina", t[t.Trip_Online = 118] = "Trip_Online", t[t.Trip_App = 119] = "Trip_App", t[t.Trip_H5 = 120] = "Trip_H5", t[t.Offline = 121] = "Offline", t[t.CompanyShop = 502] = "CompanyShop", t[t.BestonShop = 503] = "BestonShop", t[t.QunarShop = 504] = "QunarShop", t[t.LvJing = 505] = "LvJing"
  }(a || (a = {})), function (t) {
    t.TICKET = "TICKET", t.THINGS_TODO = "THINGS_TODO", t.TOUR = "TOUR", t.CRUISE = "CRUISE"
  }(s || (s = {})), function (t) {
    t.PRODUCTID = "PRODUCTID", t.VENDORID = "VENDORID", t.SCENICSPOTID = "SCENICSPOTID", t.POIID = "POIID"
  }(r || (r = {})), function (t) {
    t[t.Company = 1] = "Company", t[t.Vendor = 2] = "Vendor"
  }(u || (u = {})), function (t) {
    t[t.H5 = 1] = "H5", t[t.PC = 2] = "PC", t[t.RN = 3] = "RN", t[t.MiniProgram = 4] = "MiniProgram", t[t.Taro = 5] = "Taro"
  }(c || (c = {})), function (t) {
    t[t.OrderUse = 1] = "OrderUse", t[t.DetailClaim = 2] = "DetailClaim", t[t.PopClaim = 3] = "PopClaim", t[t.ShopClaim = 4] = "ShopClaim"
  }(l || (l = {})), function (t) {
    t.AVAILABlE_CLAIM_LIST = "availableClaimList", t.AVAILABLE_USE_LIST = "availableUseList", t.RECEIVED_NOUSE_LIST = "receivedNouseList", t.ROBBED_LIST = "robbedList", t.EXPIRED_LIST = "expiredList", t.NOT_STARTED = "notStartedList", t.SINGKEK_LIST = "singkekList"
  }(d || (d = {}))
}, function (t) {
  t.exports = JSON.parse('{"name":"@ctrip/ttd-marketing-wechat","version":"1.0.25","description":"","main":"miniprogram_dist/index.js","scripts":{"dev":"cross-env NODE_ENV=development gulp dev --develop","watch":"cross-env NODE_ENV=development gulp watch --develop --watch","build":"cross-env NODE_ENV=production gulp","dist":"npm run build","clean-dev":"gulp clean --develop","clean":"gulp clean","test":"jest --bail","test-debug":"node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand --bail","coverage":"jest ./test/* --coverage --bail","lint":"eslint \\"src/**/*.js\\" --fix","lint-tools":"eslint \\"tools/**/*.js\\" --rule \\"import/no-extraneous-dependencies: false\\" --fix","baidu":"npm run build && cd miniprogram_dist && antmove wx-baidu"},"miniprogram":"miniprogram_dist","jest":{"testEnvironment":"jsdom","testURL":"https://jest.test","collectCoverageFrom":["miniprogram_dist/**/*.js"],"moduleDirectories":["node_modules","miniprogram_dist"]},"files":["miniprogram_dist"],"repository":{"type":"git","url":"http://git.ctripcorp.com/ttd/ttd-front-marketing-components/tree/wechatCoupon"},"author":"zhijie.su","license":"MIT","devDependencies":{"@typescript-eslint/eslint-plugin":"^2.28.0","@typescript-eslint/parser":"^2.28.0","antmove":"^1.1.12","babel-core":"^6.26.3","babel-loader":"^7.1.5","babel-plugin-module-resolver":"^3.2.0","babel-preset-env":"^1.7.0","colors":"^1.3.1","cross-env":"^7.0.3","eslint":"^5.14.1","eslint-config-airbnb-base":"13.1.0","eslint-loader":"^2.1.2","eslint-plugin-import":"^2.16.0","eslint-plugin-node":"^7.0.1","eslint-plugin-promise":"^3.8.0","gulp":"^4.0.0","gulp-clean":"^0.4.0","gulp-if":"^2.0.2","gulp-install":"^1.1.0","gulp-less":"^4.0.1","gulp-rename":"^1.4.0","gulp-sourcemaps":"^2.6.5","jest":"^23.5.0","miniprogram-api-typings":"^2.10.3-1","miniprogram-simulate":"^1.2.5","thread-loader":"^2.1.3","through2":"^2.0.3","ts-loader":"^7.0.0","typescript":"^3.8.3","vinyl":"^2.2.0","webpack":"^4.29.5","webpack-node-externals":"^1.7.2"},"dependencies":{}}')
}, , function (t, e, n) {
  "use strict";
  n.r(e);
  var o = n(0);
  const i = "\nfragment claimCouponInfoFields on ClaimCouponInfoType{\n    promotionId\n    couponName\n    couponCode\n    couponType\n    promotionSecretId\n    leftCount\n    promotionStatus\n    status\n    shortRemark\n    jumpUrl\n    productLineIcon\n    detailRemarkShown\n    startDateShown\n    endDateShown\n    useDateShown\n    deductionInfoShown {\n        type\n        fullDeduction\n        desc\n        amount\n        discountUnit\n        deductionList\n        deductionAmount\n    }\n    deductionAmount\n    deductionStrategyType\n    deductionList{\n        id\n        deductionType\n        startAmount\n        deductionAmount\n        deductionAmountLimit\n        hit\n    }\n    unavailableReasonShown\n    unavailableReasonList{\n        code\n        message\n    }\n    extendInfo{\n        userFilter\n    }\n    promotionLabel\n    activityStatus\n    nextAvailableTime\n    activityStatus\n    disableButton\n    buttonText\n}\n",
    a = `\n${i}\n\nfragment couponInfoFields on CouponInfoType{\n    promotionId\n    couponName\n    couponCode\n    couponType\n    status\n    shortRemark\n    detailRemarkShown\n    startDateShown\n    endDateShown\n    useDateShown\n    deductionInfoShown {\n        type\n        fullDeduction\n        desc\n        amount\n        discountUnit\n        deductionList\n    }\n    deductionAmount\n    matchedQuantity\n    deductionStrategyType\n    deductionList{\n        id\n        deductionType\n        startAmount\n        deductionAmount\n        deductionAmountLimit\n        hit\n    }\n    unavailableReasonShown\n    isTopOne\n    extendInfo{\n        userFilter\n    }\n}\n\nquery($baseInfo:BaseInfoType,$productId:Int,$scenicSpotId:Int,$queryShark:Boolean=false,$sharkLocale:String,$needUseableList:Boolean){\n    claimCouponList:getClaimCouponList(baseInfo:$baseInfo,productId:$productId,scenicSpotId:$scenicSpotId,needUseableList:$needUseableList){\n        __typename\n       ...on GetClaimCouponData{\n           claimList{\n                ...claimCouponInfoFields,\n           }\n           useableList{\n                ...couponInfoFields,\n           }\n       }\n       ...on Error{\n           message\n           code\n       }\n    }\n    sharkData:getShark(local:$sharkLocale) @include(if: $queryShark) {\n        __typename\n       ...on SharkData{\n           data\n       }\n       ...on Error{\n           message\n           code\n       }\n    }\n }\n `,
    s = `  \n${i}\n\nquery($baseInfo:BaseInfoType,$relationDetail:RelationDetailType,$receivePromotionType:Int,$shownewuserpromo:Boolean,\n    $filterType:Int,$utcOffset:Int,$getServerTime:Boolean=false){\n    receivePromotionData: getReceivePromotionByRelationId(baseInfo:$baseInfo,relationDetail:$relationDetail,\n    receivePromotionType:$receivePromotionType,shownewuserpromo:$shownewuserpromo,filterType:$filterType){\n        __typename\n       ...on GetReceivePromotionByRelationIdData{\n           list{\n                ...claimCouponInfoFields,\n           }\n       }\n       ...on Error{\n           message\n           code\n       }\n    }\n    serverTime:getServerTime(utcOffset:$utcOffset) @include(if: $getServerTime) {\n        __typename\n        ...on GetServerTimeData{\n            serverTime\n        }\n    }\n }  \n`;
  var r = n(1);
  const u = {
    fat: "https://gateway.m.fws.qa.nt.ctripcorp.com/restapi",
    uat: "https://gateway.m.uat.qa.nt.ctripcorp.com/restapi",
    prd: "https://m.ctrip.com/restapi"
  };

  function c(t) {
    return {
      allianceId: t.allianceId,
      channelId: t.saleChannel,
      clientId: t.clientId,
      currency: t.currency,
      locale: t.locale,
      siteId: t.siteId,
      source: t.source,
      uid: t.uid || "",
      utcOffset: o.g().offset,
      rmsToken: t.rmsToken,
      requestScene: r.b.DetailClaim,
      version: o.j,
      componentType: r.a.MiniProgram
    }
  }

  function l(t, e) {
    let n = u[t], o = "";
    return t == r.c.Fat && (o = "fat6"), n + function (t) {
      return t ? "/ttd/marketing-bff-" + t : "/ttd/marketing-bff"
    }(o) + "/graphql/" + e
  }

  function d(t = !0, e, n, i, a) {
    let u, d;
    if (e.productId > 0) u = e.productId, d = r.d.PRODUCTID; else if (e.scenicSpotId > 0) u = e.scenicSpotId, d = r.d.SCENICSPOTID; else {
      if (!(e.poiId > 0)) throw new Error("参数错误，productId、scenicSpotId、poiId至少传入一个");
      u = e.poiId, d = r.d.POIID
    }
    const m = {
      query: s,
      queryName: "getReceivePromotionByRelationId",
      head: {ctType: 0, auth: wx.getStorageSync("auth") ? wx.getStorageSync("auth") : ""},
      variables: {
        relationDetail: {relationType: d, relationId: u},
        receivePromotionType: e.receivePromotionType,
        shownewuserpromo: !0,
        filterType: t ? e.needUseableList ? 1 : 2 : 0,
        utcOffset: o.g().offset,
        getServerTime: !0,
        baseInfo: c(e)
      }
    };
    console.log("ttd-marketing-getReceivePromotionByRelationId requestOption:", m);
    const f = l(n, "getReceivePromotionByRelationId");
    return p(f, m, t => {
      console.log("ttd-marketing-getReceivePromotionByRelationId responseData:", t), i && i(t.data && t.data.data), o.i("ttd_marketing_bffextensions", {
        queryName: "getReceivePromotionByRelationId",
        extensions: {url: f, requestBody: Object.assign({}, e), responseBody: Object.assign({}, t)}
      })
    }, () => {
      a && a()
    })
  }

  function p(t, e, n, i) {
    return o.k()({
      url: t,
      data: Object.assign({}, e),
      header: {"content-type": "application/json"},
      method: "POST",
      dataType: "json",
      responseType: "text",
      success: t => {
        n && n(t)
      },
      fail: () => {
        i && i(), o.i("ttd_marketing_jserror", {
          queryName: "claimCoupon",
          extensions: {url: t, requestBody: Object.assign({}, e)}
        })
      },
      complete: () => {
      }
    })
  }

  let m = !1;
  Component({
    options: {multipleSlots: !0, addGlobalClass: !0, pureDataPattern: /^coupon_/},
    properties: {
      title: {type: String, value: "优惠券"},
      extClass: {type: String, value: ""},
      visible: {type: Boolean, value: !1, observer: "_showChange"},
      maskClosable: {type: Boolean, value: !0},
      businessParams: {type: Object, value: {}},
      isShowEmptyContent: {type: Boolean, value: !0}
    },
    data: {
      timeZone: o.g(),
      interfaceList: [],
      claimList: [],
      usebleList: [],
      openCode: 0,
      toView: "green",
      __businessParams: {
        allianceId: 0,
        clientId: "",
        currency: "CNY",
        locale: "zh-CN",
        needUseableList: !0,
        pageId: "",
        env: o.l() && o.l().env ? o.l().env : "fat"
      },
      coupon_flagd: !1
    },
    lifetimes: {
      attached() {
        console.log("current ttd-marketing-cliamCoupon-package version is:", o.j), this._timerMap = {};
        const t = Object.assign({}, this.data.__businessParams, this.data.businessParams),
          e = Object.keys(this.data.businessParams);
        e && 0 !== e.length && this.setData({businessParams: t}, () => {
          this.initPageList(t => {
            const {serverTime: e, claimList: n, usebleList: o} = t;
            this.setActivityTimeTask(n, e), this.setZeroRefeshTask(e, n)
          })
        })
      }, detached() {
        if (this._timerMap) {
          const t = Object.keys(this._timerMap);
          t.forEach(e => {
            clearTimeout(t[e])
          })
        }
      }
    },
    observers: {
      visible: function (t) {
        const e = o.d(this.data.businessParams), n = e.ubtSourceKey + "_" + e.componentName + "_exposure";
        t ? o.i(n, {
          comptID: e.componentId,
          ttdver: o.j,
          productId: this.data.businessParams.productId ? this.data.businessParams.productId : void 0,
          scenicSpotId: this.data.businessParams.scenicSpotId ? this.data.businessParams.scenicSpotId : void 0
        }) : this._commonLogTrace("ttd_marketing_claimcoupon_close")
      }
    },
    methods: {
      setActivityTimeTask(t, e) {
        t && 0 != t.length && t.forEach(n => {
          if (1 == n.promotionStatus && 1 == n.activityStatus) {
            let i = this._timerMap[n.promotionId];
            i && clearTimeout(i);
            let a = o.m(e, n.nextAvailableTime, () => {
              this._changeCouponStatus(n.promotionId, !1, "一键领取", {showImg: !1, activityStatus: 2})
            }, () => {
              this.refreshCoupon([n.promotionId], t)
            });
            a && (this._timerMap[n.promotionId] = a)
          }
        })
      }, setZeroRefeshTask(t, e) {
        let n = o.f(t), i = e.filter(t => 1 == t.promotionStatus && 1 == t.activityStatus).map(t => t.promotionId),
          a = setTimeout(() => {
            this.refreshCoupon(i, e)
          }, n);
        this._timerMap.ZERO_TASK = a
      }, refreshCoupon(t, e) {
        if (!t || 0 == t.length) return;
        let n = [...e];
        d(!0, Object.assign({}, this.data.__businessParams, this.data.businessParams), this.data.__businessParams.env, e => {
          const o = e && e.receivePromotionData && e.receivePromotionData.list || [],
            i = e && e.serverTime && e.serverTime.serverTime ? parseInt(e.serverTime.serverTime) : null;
          t.forEach(t => {
            let e = o.find(e => e.promotionId == t), a = n.find(e => e.promotionId == t);
            if (e && a) if (Object.assign(a, {
              disableButton: e.disableButton,
              buttonText: e.buttonText,
              activityStatus: e.activityStatus,
              promotionStatus: e.promotionStatus
            }), 1 == e.promotionStatus && 1 == e.activityStatus) this.setActivityTimeTask([e], i); else {
              let t = this._timerMap[e.promotionId];
              t && clearTimeout(t)
            }
          }), n.forEach(e => {
            let n = o.find(t => t.promotionId == e.promotionId);
            if (t.includes(e.promotionId) && n) if (Object.assign(e, {
              disableButton: n.disableButton,
              buttonText: n.buttonText,
              activityStatus: n.activityStatus,
              promotionStatus: n.promotionStatus
            }), 1 == n.promotionStatus && 1 == n.activityStatus) this.setActivityTimeTask([n], i); else {
              let t = this._timerMap[n.promotionId];
              t && clearTimeout(t)
            }
          }), this.setData({claimList: n})
        })
      }, initPageList(t) {
        let e = null;
        const n = Object.assign({}, this.data.__businessParams, this.data.businessParams);
        let i = new Promise((t, i) => {
          d(!0, n, this.data.__businessParams.env, n => {
            const i = n && n.receivePromotionData && n.receivePromotionData.list || [];
            e = n && n.serverTime && n.serverTime.serverTime ? parseInt(n.serverTime.serverTime) : null, i.forEach(t => {
              o.b(t)
            }), t(i)
          }, () => {
            i(null)
          })
        }), a = new Promise((t, e) => {
          !function (t = !0, e, n, i, a) {
            if (!e.needUseableList) return i && i(null);
            if (!e.productId) throw new Error("productId can't be null if needUseableList !");
            const s = {
              query: "\n    \n    fragment couponInfoFields on CouponInfoType{\n        promotionId\n        couponName\n        couponCode\n        couponType\n        status\n        shortRemark\n        detailRemarkShown\n        startDateShown\n        endDateShown\n        useDateShown\n        deductionInfoShown {\n            type\n            fullDeduction\n            desc\n            amount\n            discountUnit\n            deductionList\n            deductionAmount\n        }\n        deductionAmount\n        matchedQuantity\n        deductionStrategyType\n        deductionList{\n            id\n            deductionType\n            startAmount\n            deductionAmount\n            deductionAmountLimit\n            hit\n        }\n        unavailableReasonShown\n        isTopOne\n        extendInfo{\n            userFilter\n            scheduleFrom\n            scheduleTo\n        }\n        unavailableReasonList{\n            code\n            message\n        }\n        promotionLabel\n        promotionStatus\n        disableButton\n        buttonText\n}\n\n    query($baseInfo:BaseInfoType,$productIDList:[Int],$filterType:Int){\n        promotionTagData: getPromotionTag(baseInfo:$baseInfo,productIDList:$productIDList, filterType:$filterType){\n            __typename\n           ...on GetPromotionTagData{\n               list{\n                    ...couponInfoFields,\n               }\n           }\n           ...on Error{\n               message\n               code\n           }\n        }\n     }  \n\n",
              queryName: "getPromotionTag",
              head: {ctType: 0, auth: wx.getStorageSync("auth") ? wx.getStorageSync("auth") : ""},
              variables: {productIDList: [e.productId], filterType: t ? 1 : 0, baseInfo: c(e)}
            };
            console.log("ttd-marketing-getPromotionTag requestOption:", s);
            const r = l(n, "getPromotionTag");
            p(r, s, t => {
              console.log("ttd-marketing-getPromotionTag responseData:", t), i && i(t.data && t.data.data), o.i("ttd_marketing_bffextensions", {
                queryName: "getPromotionTag",
                extensions: {url: r, requestBody: Object.assign({}, e), responseBody: Object.assign({}, t)}
              })
            }, () => {
              a && a()
            })
          }(!0, n, this.data.__businessParams.env, e => {
            const n = e && e.promotionTagData && e.promotionTagData.list || [];
            n.forEach(t => {
              o.b(t)
            }), t(n)
          }, () => {
            e(null)
          })
        });
        Promise.all([i, a]).then(n => {
          let i = {claimList: n[0] || [], useableList: n[1] || []};
          const a = o.e(i);
          let s = Object.assign({list: i}, a);
          this.setData({claimList: n[0] || [], usebleList: n[1] || []}, () => {
            t && t(Object.assign(Object.assign({}, i), {serverTime: e}))
          }), this.triggerEvent("load-data", s), this._commonLogTrace("ttd_marketing_claimcoupon_load")
        })
      }, getCouponById(t, e) {
        !function (t, e, n, i) {
          const s = {
            query: a,
            queryName: "claimCouponList",
            head: {auth: wx.getStorageSync("auth") ? wx.getStorageSync("auth") : ""},
            variables: {
              needUseableList: t.needUseableList,
              productId: t.productId,
              scenicSpotId: t.scenicSpotId,
              baseInfo: c(t)
            }
          };
          console.log("ttd-marketing-claimCouponList requestOption:", s);
          const r = l(e, "claimCouponList");
          p(r, s, e => {
            console.log("ttd-marketing-claimCouponList responseData:", e), n && n(e), o.i("ttd_marketing_bffextensions", {
              queryName: "claimCouponList",
              extensions: {url: r, requestBody: Object.assign({}, t), responseBody: Object.assign({}, e)}
            })
          }, () => {
            i && i()
          })
        }(Object.assign({}, this.data.__businessParams, this.data.businessParams), this.data.__businessParams.env, n => {
          if (n.data.data && n.data.data.claimCouponList) {
            const i = n.data.data.claimCouponList, a = o.h(i);
            let s = null;
            s = a[0].find(e => e.promotionId === t && 1 != e.promotionStatus), s || (s = a[1].find(e => e.promotionId === t && 1 != e.promotionStatus)), e && e(s)
          } else e && e("")
        })
      }, close(t) {
        const {type: e} = t.currentTarget.dataset;
        (this.data.maskClosable || "close" === e) && (this.setData({visible: !1}, () => {
          const {coupon_flagd: t} = this.data;
          t && this.initPageList(() => {
            this.setData({coupon_flagd: !1})
          })
        }), this.triggerEvent("close"))
      }, opendetail(t) {
        const {promotionId: e} = t.detail;
        this.setData({openCode: e})
      }, claimCoupon(t) {
        const {promotionSecretId: e, promotionId: n} = t.detail,
          i = Object.assign(Object.assign({}, Object.assign({}, this.data.__businessParams, this.data.businessParams)), {promotionSecretIds: [e]});
        m || (m = !0, function (t, e, n, i) {
          const a = {
            query: "\nquery($baseInfo:BaseInfoType,$promotionSecretIds:[String]){\n    claimCoupon(baseInfo:$baseInfo,promotionSecretIds:$promotionSecretIds){\n        __typename\n        ...on ClaimCouponData{\n            claimResultList{\n                promotionId\n                couponCode\n                promotionSecretId\n                buttonText\n                disableButton\n                success\n                showToast\n                toastType\n                code\n                message\n                serviceMessage\n            }\n        }\n        ...on Error{\n            message\n            code\n        }\n    }\n    \n    }  \n",
            queryName: "claimCoupon",
            head: {auth: wx.getStorageSync("auth") ? wx.getStorageSync("auth") : ""},
            variables: {promotionSecretIds: t.promotionSecretIds, baseInfo: c(t)}
          };
          console.log("claimCoupon requestOption:", a);
          const s = l(e, "claimCoupon");
          p(s, a, e => {
            console.log("claimCoupon responseData:", e), n && n(e), o.i("ttd_marketing_bffextensions", {
              queryName: "claimCoupon",
              extensions: {url: s, requestBody: Object.assign({}, t), responseBody: Object.assign({}, e)}
            })
          }, () => {
            i && i()
          })
        }(i, this.data.__businessParams.env, t => {
          m = !1;
          let i = t.data && t.data.data ? t.data.data.claimCoupon : {};
          if (200 == t.statusCode) if ("Error" == i.__typename) i && 4001 == i.code && o.n({}, t => {
            if (t && "0" === t.ReturnCode) return console.log("登录成功！！"), void this.initPageList(() => {
              const t = this.data.claimList.filter((function (t) {
                return t.promotionSecretId == e
              }));
              t.length > 0 && 1 == t[0].promotionStatus && this.claimCoupon({
                detail: {
                  promotionSecretId: e,
                  promotionId: n
                }
              })
            })
          }); else {
            let t = i.claimResultList[0], e = {};
            e.buttonText = t.buttonText, e.disableButton = t.disableButton, e.showImg = t.success, e.claimAnimation = t.success, this.getCouponById(n, o => {
              e.useDateShown = o.useDateShown, e.promotionStatus = o.promotionStatus, e.activityStatus = o.activityStatus, this.setData({coupon_flagd: !0}, () => {
                this._changeCouponStatus(n, !0, "", e), t.showToast && t.message && wx.showToast({
                  title: t.message,
                  icon: "none"
                })
              })
            })
          } else wx.showToast({title: "领取失败", icon: "none"})
        }, () => {
          m = !1, wx.showToast({title: "领取失败", icon: "none"})
        }))
      }, _changeCouponStatus(t, e, n, o) {
        const i = this.data.claimList.slice();
        i.forEach(i => {
          i.promotionId == t && (i.disableButton = e, i.buttonText = n, o && Object.assign(i, o))
        }), this.setData({claimList: i})
      }, _commonLogTrace(t, e) {
        let n = e || {props: Object.assign({}, this.data)};
        o.i(t, n)
      }, onConentMousemove(t) {
      }, onMaskMouseMove(t) {
      }
    }
  })
}]);
