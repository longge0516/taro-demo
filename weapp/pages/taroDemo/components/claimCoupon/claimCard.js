(wx["tripTaroGlobal11"] = wx["tripTaroGlobal11"] || []).push([["pages/taroDemo/components/claimCoupon/claimCard"],{

/***/ "./src/pages/taroDemo/components/claimCoupon/claimCard.js":
/*!****************************************************************!*\
  !*** ./src/pages/taroDemo/components/claimCoupon/claimCard.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var _defineProperty = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");

var _typeof = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

module.exports = function (t) {
  var e = {};

  function n(i) {
    if (e[i]) return e[i].exports;
    var o = e[i] = {
      i: i,
      l: !1,
      exports: {}
    };
    return t[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
  }

  return n.m = t, n.c = e, n.d = function (t, e, i) {
    n.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: i
    });
  }, n.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }, n.t = function (t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;
    if (4 & e && "object" == _typeof(t) && t && t.__esModule) return t;
    var i = Object.create(null);
    if (n.r(i), Object.defineProperty(i, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var o in t) {
      n.d(i, o, function (e) {
        return t[e];
      }.bind(null, o));
    }
    return i;
  }, n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default;
    } : function () {
      return t;
    };
    return n.d(e, "a", e), e;
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, n.p = "", n(n.s = 3);
}([function (t, e, n) {
  "use strict";

  var _p;

  n.d(e, "a", function () {
    return p;
  }), n.d(e, "d", function () {
    return c;
  }), n.d(e, "m", function () {
    return C;
  }), n.d(e, "f", function () {
    return O;
  }), n.d(e, "g", function () {
    return l;
  }), n.d(e, "j", function () {
    return a;
  }), n.d(e, "k", function () {
    return f;
  }), n.d(e, "i", function () {
    return I;
  }), n.d(e, "n", function () {
    return h;
  }), n.d(e, "h", function () {
    return _;
  }), n.d(e, "e", function () {
    return S;
  }), n.d(e, "b", function () {
    return T;
  }), n.d(e, "c", function () {
    return v;
  }), n.d(e, "l", function () {
    return b;
  });
  var i = n(2),
      o = n(1);
  var a = i.version;
  var s = void 0 !== s ? s : global && global.cwx && global.cwx.cwx,
      r = void 0 !== r ? r : global && global.cwx && global.cwx.__global;
  var u = {
    id: 2,
    name: "detail_claimcoupon"
  },
      p = (_p = {}, _defineProperty(_p, o.e.TICKET, "tkt"), _defineProperty(_p, o.e.THINGS_TODO, "act"), _defineProperty(_p, o.e.TOUR, "grp"), _defineProperty(_p, o.e.CRUISE, "cru"), _p);

  function c(t) {
    var e;
    return e = {
      pageId: t.pageId,
      componentId: u.id,
      componentName: u.name,
      componentVersion: a,
      ubtSourceKey: p[t.source]
    }, e;
  }

  function d(t, e) {
    var n = Math.abs(t),
        i = e - (n + "").length;
    return (t < 0 ? "-" : "") + "0".repeat(i < 0 ? 0 : i) + n;
  }

  function l() {
    var t = new Date().getTimezoneOffset(),
        e = Math.abs(t / 60),
        n = Math.abs(t % 60);
    return {
      desc: "GMT".concat(t > 0 ? "-" : "+").concat(d(Math.floor(e), 2), ":").concat(d(n, 2)),
      offset: t
    };
  }

  function m(t) {
    var e;
    return t || (e = global && global.cwx && global.cwx.cwx), t && (e = t), e;
  }

  function b(t) {
    return t || (t = global && global.cwx && global.cwx.__global), t && (t = t), t;
  }

  function I(t, e) {
    var n = m();
    var i = null;
    if (n && (i = n && n.sendUbtByPage && n.sendUbtByPage.ubtTrace), i) try {
      i(t, e);
    } catch (t) {}
  }

  function f() {
    m();
    return wx.request;
  }

  function h() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var e = arguments.length > 1 ? arguments[1] : undefined;
    var n = m();
    n && n.user.login({
      param: t,
      callback: e
    });
  }

  function g(t) {
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
        t.disableButton = !0, t.buttonText = "";
    }

    return t;
  }

  function _(t) {
    var e = [[], []];
    return e[0] = t.claimList.map(function (t) {
      return g(t);
    }), e[1] = t.useableList.map(function (t) {
      return t.status ? t.promotionStatus = 2 : t.promotionStatus = 3, g(t);
    }), e;
  }

  var S = function S(t) {
    var e = {
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
      };
    }

    function i(t) {
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
          e.singkekList.push(n(t));
      }
    }

    return t.claimList.forEach(function (t) {
      i(t);
    }), t.useableList.forEach(function (t) {
      t.status ? t.promotionStatus = 2 : t.promotionStatus = 3, i(t);
    }), e;
  };

  function v(t) {
    var e = t.ctrlName,
        n = t.productId,
        i = t.scenicSpotId,
        o = t.promotionId,
        s = t.positionId,
        r = t.pageId;
    var u = c(t);
    var p = "".concat(u.ubtSourceKey, "-").concat(r, "-coupon-").concat(e, "-").concat(u.componentName, "-").concat(a);
    return o > 0 ? "".concat(p, "-").concat(n || i, "-").concat(o, "-").concat(s) : p;
  }

  var T = function T(t) {
    return 2 != t.promotionStatus && 3 != t.promotionStatus || (t.showImg = !0), t;
  };

  function C(t, e, n, i) {
    var o = e - t;
    if (o <= 0) return n(), null;
    {
      var _t;

      return o > 3e3 ? (o -= 3e3, _t = i) : _t = n, setTimeout(function () {
        _t();
      }, o);
    }
  }

  function O(t) {
    var e = new Date(t);
    return 1e3 * (60 * (60 * (24 - e.getHours()) - e.getMinutes()) - e.getSeconds()) - e.getMilliseconds();
  }
}, function (t, e, n) {
  "use strict";

  var i, o, a, s, r, u, p, c, d;
  n.d(e, "c", function () {
    return i;
  }), n.d(e, "e", function () {
    return s;
  }), n.d(e, "d", function () {
    return r;
  }), n.d(e, "a", function () {
    return p;
  }), n.d(e, "b", function () {
    return c;
  }), function (t) {
    t.Fat = "fat", t.Uat = "uat", t.Prod = "prd";
  }(i || (i = {})), function (t) {
    t[t.Ctrip_Online = 2] = "Ctrip_Online", t[t.Ctrip_App = 5] = "Ctrip_App", t[t.Ctrip_H5 = 7] = "Ctrip_H5", t[t.Ctrip_Mina = 21] = "Ctrip_Mina", t[t.Trip_Online = 24] = "Trip_Online", t[t.Trip_App = 25] = "Trip_App", t[t.Trip_H5 = 26] = "Trip_H5", t[t.Offline = 3] = "Offline", t[t.CompanyShop = 110] = "CompanyShop", t[t.BestonShop = 111] = "BestonShop", t[t.QunarShop = 112] = "QunarShop", t[t.LvJing = 113] = "LvJing";
  }(o || (o = {})), function (t) {
    t[t.Ctrip_Online = 114] = "Ctrip_Online", t[t.Ctrip_App = 115] = "Ctrip_App", t[t.Ctrip_H5 = 116] = "Ctrip_H5", t[t.Ctrip_Mina = 117] = "Ctrip_Mina", t[t.Trip_Online = 118] = "Trip_Online", t[t.Trip_App = 119] = "Trip_App", t[t.Trip_H5 = 120] = "Trip_H5", t[t.Offline = 121] = "Offline", t[t.CompanyShop = 502] = "CompanyShop", t[t.BestonShop = 503] = "BestonShop", t[t.QunarShop = 504] = "QunarShop", t[t.LvJing = 505] = "LvJing";
  }(a || (a = {})), function (t) {
    t.TICKET = "TICKET", t.THINGS_TODO = "THINGS_TODO", t.TOUR = "TOUR", t.CRUISE = "CRUISE";
  }(s || (s = {})), function (t) {
    t.PRODUCTID = "PRODUCTID", t.VENDORID = "VENDORID", t.SCENICSPOTID = "SCENICSPOTID", t.POIID = "POIID";
  }(r || (r = {})), function (t) {
    t[t.Company = 1] = "Company", t[t.Vendor = 2] = "Vendor";
  }(u || (u = {})), function (t) {
    t[t.H5 = 1] = "H5", t[t.PC = 2] = "PC", t[t.RN = 3] = "RN", t[t.MiniProgram = 4] = "MiniProgram", t[t.Taro = 5] = "Taro";
  }(p || (p = {})), function (t) {
    t[t.OrderUse = 1] = "OrderUse", t[t.DetailClaim = 2] = "DetailClaim", t[t.PopClaim = 3] = "PopClaim", t[t.ShopClaim = 4] = "ShopClaim";
  }(c || (c = {})), function (t) {
    t.AVAILABlE_CLAIM_LIST = "availableClaimList", t.AVAILABLE_USE_LIST = "availableUseList", t.RECEIVED_NOUSE_LIST = "receivedNouseList", t.ROBBED_LIST = "robbedList", t.EXPIRED_LIST = "expiredList", t.NOT_STARTED = "notStartedList", t.SINGKEK_LIST = "singkekList";
  }(d || (d = {}));
}, function (t) {
  t.exports = JSON.parse('{"name":"@ctrip/ttd-marketing-wechat","version":"1.0.25","description":"","main":"miniprogram_dist/index.js","scripts":{"dev":"cross-env NODE_ENV=development gulp dev --develop","watch":"cross-env NODE_ENV=development gulp watch --develop --watch","build":"cross-env NODE_ENV=production gulp","dist":"npm run build","clean-dev":"gulp clean --develop","clean":"gulp clean","test":"jest --bail","test-debug":"node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand --bail","coverage":"jest ./test/* --coverage --bail","lint":"eslint \\"src/**/*.js\\" --fix","lint-tools":"eslint \\"tools/**/*.js\\" --rule \\"import/no-extraneous-dependencies: false\\" --fix","baidu":"npm run build && cd miniprogram_dist && antmove wx-baidu"},"miniprogram":"miniprogram_dist","jest":{"testEnvironment":"jsdom","testURL":"https://jest.test","collectCoverageFrom":["miniprogram_dist/**/*.js"],"moduleDirectories":["node_modules","miniprogram_dist"]},"files":["miniprogram_dist"],"repository":{"type":"git","url":"http://git.ctripcorp.com/ttd/ttd-front-marketing-components/tree/wechatCoupon"},"author":"zhijie.su","license":"MIT","devDependencies":{"@typescript-eslint/eslint-plugin":"^2.28.0","@typescript-eslint/parser":"^2.28.0","antmove":"^1.1.12","babel-core":"^6.26.3","babel-loader":"^7.1.5","babel-plugin-module-resolver":"^3.2.0","babel-preset-env":"^1.7.0","colors":"^1.3.1","cross-env":"^7.0.3","eslint":"^5.14.1","eslint-config-airbnb-base":"13.1.0","eslint-loader":"^2.1.2","eslint-plugin-import":"^2.16.0","eslint-plugin-node":"^7.0.1","eslint-plugin-promise":"^3.8.0","gulp":"^4.0.0","gulp-clean":"^0.4.0","gulp-if":"^2.0.2","gulp-install":"^1.1.0","gulp-less":"^4.0.1","gulp-rename":"^1.4.0","gulp-sourcemaps":"^2.6.5","jest":"^23.5.0","miniprogram-api-typings":"^2.10.3-1","miniprogram-simulate":"^1.2.5","thread-loader":"^2.1.3","through2":"^2.0.3","ts-loader":"^7.0.0","typescript":"^3.8.3","vinyl":"^2.2.0","webpack":"^4.29.5","webpack-node-externals":"^1.7.2"},"dependencies":{}}');
}, function (t, e, n) {
  "use strict";

  n.r(e);
  var i = n(0);
  Component({
    properties: {
      couponItem: {
        type: Object,
        value: {}
      },
      isOpen: {
        type: Boolean,
        value: !1
      },
      positionId: {
        type: Number,
        value: 0
      },
      businessParams: {
        type: Object,
        value: {}
      }
    },
    data: {
      animationData: {},
      animated: !1,
      startAnimationWidthTransition: !1,
      startAnimationWidthOutTransition: !1,
      dataUbtKey_more: "",
      dataUbtKey_claim: ""
    },
    observers: {
      "couponItem.claimAnimation": function couponItemClaimAnimation(t) {
        var _this = this;

        t && this.data.couponItem.showImg && this.animation && !this.data.animated ? (this.animation.rotate(-15).scale(5).opacity(0).step({
          duration: 0
        }), this.setData({
          animationData: this.animation.export()
        }, function () {
          _this.animation.rotate(0).scale(1).opacity(1).step({
            duration: 300,
            timingFunction: "ease"
          }), _this.setData({
            animationData: _this.animation.export(),
            animated: !0
          });
        })) : !t && this.data.animated && this.setData({
          animated: !1
        });
      }
    },
    methods: {
      openDetail: function openDetail() {
        var t = this.data.couponItem.promotionId;
        this.data.isOpen && (t = 0);
        var e = {
          promotionId: t
        };
        this.triggerEvent("opendetail", e, {
          bubbles: !0,
          composed: !0,
          capturePhase: !1
        });
        var n = i.a[this.data.businessParams.source] + "_detail_claimcoupon_more";
        i.i(n, {
          ttdver: i.j,
          pageId: this.data.businessParams.pageId,
          promotionId: this.data.couponItem.promotionId,
          source: this.data.businessParams.source,
          productId: this.data.businessParams.productId,
          scenicSpotId: this.data.businessParams.scenicSpotId,
          positionId: this.data.positionId
        });
      },
      claimCoupon: function claimCoupon() {
        if (this.data.couponItem.disableButton) return;
        var t = {
          promotionSecretId: this.data.couponItem.promotionSecretId,
          promotionId: this.data.couponItem.promotionId
        };
        this.triggerEvent("claimCoupon", t, {
          bubbles: !0,
          composed: !0,
          capturePhase: !1
        });
        var e = i.a[this.data.businessParams.source] + "_detail_claimcoupon_receive";
        i.i(e, {
          ttdver: i.j,
          pageId: this.data.businessParams.pageId,
          promotionId: this.data.couponItem.promotionId,
          source: this.data.businessParams.source,
          productId: this.data.businessParams.productId,
          scenicSpotId: this.data.businessParams.scenicSpotId,
          positionId: this.data.positionId
        });
      }
    },
    lifetimes: {
      attached: function attached() {
        var t = wx.createAnimation({
          duration: 300,
          timingFunction: "ease"
        });
        this.animation = t;
        var e = "",
            n = "";
        e = i.c({
          ctrlName: "more",
          pageId: this.data.businessParams.pageId,
          promotionId: this.data.couponItem.promotionId,
          source: this.data.businessParams.source,
          productId: this.data.businessParams.productId,
          scenicSpotId: this.data.businessParams.scenicSpotId,
          positionId: this.data.positionId
        }), n = i.c({
          ctrlName: "receive",
          pageId: this.data.businessParams.pageId,
          promotionId: this.data.couponItem.promotionId,
          source: this.data.businessParams.source,
          productId: this.data.businessParams.productId,
          scenicSpotId: this.data.businessParams.scenicSpotId,
          positionId: this.data.positionId
        }), this.setData({
          dataUbtKey_more: e,
          dataUbtKey_claim: n
        });
      }
    }
  });
}]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ })

},[["./src/pages/taroDemo/components/claimCoupon/claimCard.js","runtime","pages/taroDemo/taroCommon","taro","vendors"]]]);