// ==UserScript==
// @name         JAV 添加跳转在线观看
// @namespace    https://github.com/ANDonekey/javjump
// @version      1.1.0
// @author       ANDonekey
// @description  为 JavDB、JavBus、JavLibrary、JMVBT 等站点添加跳转在线观看的链接
// @license      MIT
// @icon         https://javdb.com/favicon-32x32.png
// @homepageURL  https://github.com/ANDonekey/javjump
// @supportURL   https://github.com/ANDonekey/javjump/issues
// @downloadURL  https://raw.githubusercontent.com/ANDonekey/javjump/main/dist/JAV%20%E6%B7%BB%E5%8A%A0%E8%B7%B3%E8%BD%AC%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B.user.js
// @updateURL    https://raw.githubusercontent.com/ANDonekey/javjump/main/dist/JAV%20%E6%B7%BB%E5%8A%A0%E8%B7%B3%E8%BD%AC%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B.meta.js
// @include      /^https?:\/\/(\w*\.)?javdb(\d)*\.com\/v.*$/
// @include      /^https?:\/\/(\w*\.)?(javbus|seejav|javsee)*\.(com|cc|me|life|bid).*$/
// @include      /^https?:\/\/(\w*\.)?javlibrary\.com.*$/
// @include      /^http.*\/cn\/\?v=jav.*$/
// @include      /^https?:\/\/(\w*\.)?jmvbt\.com\/content_(uncensored|censored)\/.*\.htm$/
// @match        *://*.javdb.com/*
// @match        *://*.jmvbt.com/content_uncensored/*.htm
// @match        *://*.jmvbt.com/content_censored/*.htm
// @require      https://update.greasyfork.org/scripts/522123/1511104/tampermonkey%20parallel.js
// @require      https://cdn.jsdelivr.net/npm/hls.js@1.5.18/dist/hls.min.js
// @require      https://cdn.jsdelivr.net/npm/preact@10.25.4/dist/preact.min.js
// @connect      dmm.co.jp
// @connect      jable.tv
// @connect      missav.ws
// @connect      123av.com
// @connect      supjav.com
// @connect      www.bestjavporn.com
// @connect      javmenu.com
// @connect      jav.guru
// @connect      www.javmost.ws
// @connect      hayav.com
// @connect      avjoy.me
// @connect      paipancon.com
// @connect      ggjav.com
// @connect      www.av01.media
// @connect      highporn.net
// @connect      evojav.pro
// @connect      18av.mm-cg.com
// @connect      tojav.net
// @connect      javtiful.com
// @connect      javhub.net
// @connect      javgg.net
// @connect      7mmtv.sx
// @connect      fcjav.com
// @connect      javtrailers.com
// @connect      media.javtrailers.com
// @connect      javbus.com
// @connect      javdb.com
// @connect      javlibrary.com
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const t=document.createElement("style");t.textContent=o,document.head.append(t)})(' .jop-list{box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:flex-start;gap:10px;width:100%;height:100%;z-index:1;transition:right .2s ease-in-out;color:#000}.jop-button,.jop-button_def{position:relative;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:3px 10px;border-radius:4px;font-weight:500;font-size:14px;border:1px solid #dcdfe6;background-color:#fff;font:inherit;color:#606266;cursor:pointer}.jop-button_def{margin:10px 0;width:100px}.jop-button:visited{color:#606266}.jop-button:hover{text-decoration:none;color:#409eff;border:1px solid #c6e2ff;background-color:#ecf5ff}.jop-button_label{position:absolute;font-size:10px;padding:4px;border-radius:4px;top:-13px;right:-10px;line-height:.75;color:#67c23a;border:1px solid #e1f3d8;background:#fff}.jop-button_green{color:#fff!important;background-color:#67c23a}.jop-button_green:hover{color:#fff!important;background-color:#95d475}.jop-button_red{color:#fff!important;background-color:#f56c6c}.jop-button_red:hover{color:#fff!important;background-color:#f89898}.jop-button_yellow{color:#fff!important;background-color:#e6a23c}.jop-button_yellow:hover{color:#fff!important;background-color:#ebb563}.jop-setting{margin-top:20px}.jop-setting-list{display:flex;flex-wrap:wrap}.jop-setting-title{margin:10px 0 5px;font-weight:700}.db-panel .movie-panel-info div.panel-block{padding:5.5px 12px}.db-panel .jop-app{padding:15px 12px}.lib-panel .jop-app{padding:20px 30px;margin-top:10px}.infobox.jop-infobox{line-height:1.5!important;margin:0!important;padding:0!important}.infobox.jop-infobox .jop-app{display:inline;padding:0;margin:0;box-sizing:border-box;line-height:1.5}.infobox.jop-infobox .jop-list{display:inline;box-sizing:border-box;margin:0;padding:0;line-height:1.5}.infobox.jop-infobox .jop-button{display:inline-block;white-space:nowrap;margin:0 6px 0 0;vertical-align:baseline;line-height:1.5}.jop-tooltip-container{position:relative;display:inline-block}.jop-tooltip{position:absolute;bottom:100%;left:50%;transform:translate(-50%);background-color:#333;color:#fff;padding:5px 10px;border-radius:4px;font-size:12px;white-space:nowrap;z-index:1000}.jop-checkbox{display:inline-flex;align-items:center;cursor:pointer;margin-right:15px;-webkit-user-select:none;user-select:none}.jop-checkbox-input{position:absolute;opacity:0;cursor:pointer}.jop-checkbox-custom{position:relative;display:inline-block;width:16px;height:16px;background-color:#fff;border:1px solid #dcdfe6;border-radius:2px;transition:all .3s}.jop-checkbox-input:checked+.jop-checkbox-custom{background-color:#409eff;border-color:#409eff}.jop-checkbox-input:checked+.jop-checkbox-custom:after{content:"";position:absolute;top:1px;left:4px;width:5px;height:10px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}.jop-checkbox-label{margin-left:3px;font-size:14px;color:#606266}.jop-checkbox:hover .jop-checkbox-custom{border-color:#409eff} ');

(function (preact) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var f$1 = 0;
  function u$1(e2, t2, n, o2, i2, u2) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$1, __i: -1, __u: 0, __source: i2, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return preact.options.vnode && preact.options.vnode(l2), l2;
  }
  var t, r, u, i, o = 0, f = [], c = preact.options, e = c.__b, a = c.__r, v = c.diffed, l = c.__c, m = c.unmount, s = c.__;
  function d(n, t2) {
    c.__h && c.__h(r, n, o || t2), o = 0;
    var u2 = r.__H || (r.__H = { __: [], __h: [] });
    return n >= u2.__.length && u2.__.push({}), u2.__[n];
  }
  function h(n) {
    return o = 1, p(D, n);
  }
  function p(n, u2, i2) {
    var o2 = d(t++, 2);
    if (o2.t = n, !o2.__c && (o2.__ = [D(void 0, u2), function(n2) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r, !r.u)) {
      var f2 = function(n2, t2, r2) {
        if (!o2.__c.__H) return true;
        var u3 = o2.__c.__H.__.filter(function(n3) {
          return !!n3.__c;
        });
        if (u3.every(function(n3) {
          return !n3.__N;
        })) return !c2 || c2.call(this, n2, t2, r2);
        var i3 = o2.__c.props !== n2;
        return u3.forEach(function(n3) {
          if (n3.__N) {
            var t3 = n3.__[0];
            n3.__ = n3.__N, n3.__N = void 0, t3 !== n3.__[0] && (i3 = true);
          }
        }), c2 && c2.call(this, n2, t2, r2) || i3;
      };
      r.u = true;
      var c2 = r.shouldComponentUpdate, e2 = r.componentWillUpdate;
      r.componentWillUpdate = function(n2, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n2, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n2, t2, r2);
      }, r.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function y(n, u2) {
    var i2 = d(t++, 3);
    !c.__s && C(i2.__H, u2) && (i2.__ = n, i2.i = u2, r.__H.__h.push(i2));
  }
  function j$1() {
    for (var n; n = f.shift(); ) if (n.__P && n.__H) try {
      n.__H.__h.forEach(z), n.__H.__h.forEach(B$1), n.__H.__h = [];
    } catch (t2) {
      n.__H.__h = [], c.__e(t2, n.__v);
    }
  }
  c.__b = function(n) {
    r = null, e && e(n);
  }, c.__ = function(n, t2) {
    n && t2.__k && t2.__k.__m && (n.__m = t2.__k.__m), s && s(n, t2);
  }, c.__r = function(n) {
    a && a(n), t = 0;
    var i2 = (r = n.__c).__H;
    i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n2) {
      n2.__N && (n2.__ = n2.__N), n2.i = n2.__N = void 0;
    })) : (i2.__h.forEach(z), i2.__h.forEach(B$1), i2.__h = [], t = 0)), u = r;
  }, c.diffed = function(n) {
    v && v(n);
    var t2 = n.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f.push(t2) && i === c.requestAnimationFrame || ((i = c.requestAnimationFrame) || w)(j$1)), t2.__H.__.forEach(function(n2) {
      n2.i && (n2.__H = n2.i), n2.i = void 0;
    })), u = r = null;
  }, c.__c = function(n, t2) {
    t2.some(function(n2) {
      try {
        n2.__h.forEach(z), n2.__h = n2.__h.filter(function(n3) {
          return !n3.__ || B$1(n3);
        });
      } catch (r2) {
        t2.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), t2 = [], c.__e(r2, n2.__v);
      }
    }), l && l(n, t2);
  }, c.unmount = function(n) {
    m && m(n);
    var t2, r2 = n.__c;
    r2 && r2.__H && (r2.__H.__.forEach(function(n2) {
      try {
        z(n2);
      } catch (n3) {
        t2 = n3;
      }
    }), r2.__H = void 0, t2 && c.__e(t2, r2.__v));
  };
  var k = "function" == typeof requestAnimationFrame;
  function w(n) {
    var t2, r2 = function() {
      clearTimeout(u2), k && cancelAnimationFrame(t2), setTimeout(n);
    }, u2 = setTimeout(r2, 100);
    k && (t2 = requestAnimationFrame(r2));
  }
  function z(n) {
    var t2 = r, u2 = n.__c;
    "function" == typeof u2 && (n.__c = void 0, u2()), r = t2;
  }
  function B$1(n) {
    var t2 = r;
    n.__c = n.__(), r = t2;
  }
  function C(n, t2) {
    return !n || n.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n[r2];
    });
  }
  function D(n, t2) {
    return "function" == typeof t2 ? t2(n) : t2;
  }
  function g(n, t2) {
    for (var e2 in t2) n[e2] = t2[e2];
    return n;
  }
  function E(n, t2) {
    for (var e2 in n) if ("__source" !== e2 && !(e2 in t2)) return true;
    for (var r2 in t2) if ("__source" !== r2 && n[r2] !== t2[r2]) return true;
    return false;
  }
  function N(n, t2) {
    this.props = n, this.context = t2;
  }
  function M(n, e2) {
    function r2(n2) {
      var t2 = this.props.ref, r3 = t2 == n2.ref;
      return !r3 && t2 && (t2.call ? t2(null) : t2.current = null), E(this.props, n2);
    }
    function u2(e3) {
      return this.shouldComponentUpdate = r2, preact.createElement(n, e3);
    }
    return u2.displayName = "Memo(" + (n.displayName || n.name) + ")", u2.prototype.isReactComponent = true, u2.__f = true, u2;
  }
  (N.prototype = new preact.Component()).isPureReactComponent = true, N.prototype.shouldComponentUpdate = function(n, t2) {
    return E(this.props, n) || E(this.state, t2);
  };
  var T = preact.options.__b;
  preact.options.__b = function(n) {
    n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), T && T(n);
  };
  var F = preact.options.__e;
  preact.options.__e = function(n, t2, e2, r2) {
    if (n.then) {
      for (var u2, o2 = t2; o2 = o2.__; ) if ((u2 = o2.__c) && u2.__c) return null == t2.__e && (t2.__e = e2.__e, t2.__k = e2.__k), u2.__c(n, t2);
    }
    F(n, t2, e2, r2);
  };
  var U = preact.options.unmount;
  function V(n, t2, e2) {
    return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(n2) {
      "function" == typeof n2.__c && n2.__c();
    }), n.__c.__H = null), null != (n = g({}, n)).__c && (n.__c.__P === e2 && (n.__c.__P = t2), n.__c = null), n.__k = n.__k && n.__k.map(function(n2) {
      return V(n2, t2, e2);
    })), n;
  }
  function W(n, t2, e2) {
    return n && e2 && (n.__v = null, n.__k = n.__k && n.__k.map(function(n2) {
      return W(n2, t2, e2);
    }), n.__c && n.__c.__P === t2 && (n.__e && e2.appendChild(n.__e), n.__c.__e = true, n.__c.__P = e2)), n;
  }
  function P() {
    this.__u = 0, this.o = null, this.__b = null;
  }
  function j(n) {
    var t2 = n.__.__c;
    return t2 && t2.__a && t2.__a(n);
  }
  function B() {
    this.i = null, this.l = null;
  }
  preact.options.unmount = function(n) {
    var t2 = n.__c;
    t2 && t2.__R && t2.__R(), t2 && 32 & n.__u && (n.type = null), U && U(n);
  }, (P.prototype = new preact.Component()).__c = function(n, t2) {
    var e2 = t2.__c, r2 = this;
    null == r2.o && (r2.o = []), r2.o.push(e2);
    var u2 = j(r2.__v), o2 = false, i2 = function() {
      o2 || (o2 = true, e2.__R = null, u2 ? u2(c2) : c2());
    };
    e2.__R = i2;
    var c2 = function() {
      if (!--r2.__u) {
        if (r2.state.__a) {
          var n2 = r2.state.__a;
          r2.__v.__k[0] = W(n2, n2.__c.__P, n2.__c.__O);
        }
        var t3;
        for (r2.setState({ __a: r2.__b = null }); t3 = r2.o.pop(); ) t3.forceUpdate();
      }
    };
    r2.__u++ || 32 & t2.__u || r2.setState({ __a: r2.__b = r2.__v.__k[0] }), n.then(i2, i2);
  }, P.prototype.componentWillUnmount = function() {
    this.o = [];
  }, P.prototype.render = function(n, e2) {
    if (this.__b) {
      if (this.__v.__k) {
        var r2 = document.createElement("div"), o2 = this.__v.__k[0].__c;
        this.__v.__k[0] = V(this.__b, r2, o2.__O = o2.__P);
      }
      this.__b = null;
    }
    var i2 = e2.__a && preact.createElement(preact.Fragment, null, n.fallback);
    return i2 && (i2.__u &= -33), [preact.createElement(preact.Fragment, null, e2.__a ? null : n.children), i2];
  };
  var H = function(n, t2, e2) {
    if (++e2[1] === e2[0] && n.l.delete(t2), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.l.size)) for (e2 = n.i; e2; ) {
      for (; e2.length > 3; ) e2.pop()();
      if (e2[1] < e2[0]) break;
      n.i = e2 = e2[2];
    }
  };
  (B.prototype = new preact.Component()).__a = function(n) {
    var t2 = this, e2 = j(t2.__v), r2 = t2.l.get(n);
    return r2[0]++, function(u2) {
      var o2 = function() {
        t2.props.revealOrder ? (r2.push(u2), H(t2, n, r2)) : u2();
      };
      e2 ? e2(o2) : o2();
    };
  }, B.prototype.render = function(n) {
    this.i = null, this.l = /* @__PURE__ */ new Map();
    var t2 = preact.toChildArray(n.children);
    n.revealOrder && "b" === n.revealOrder[0] && t2.reverse();
    for (var e2 = t2.length; e2--; ) this.l.set(t2[e2], this.i = [1, 0, this.i]);
    return n.children;
  }, B.prototype.componentDidUpdate = B.prototype.componentDidMount = function() {
    var n = this;
    this.l.forEach(function(t2, e2) {
      H(n, e2, t2);
    });
  };
  var q = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, G = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, J = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, K = /[A-Z0-9]/g, Q = "undefined" != typeof document, X = function(n) {
    return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n);
  };
  preact.Component.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t2) {
    Object.defineProperty(preact.Component.prototype, t2, { configurable: true, get: function() {
      return this["UNSAFE_" + t2];
    }, set: function(n) {
      Object.defineProperty(this, t2, { configurable: true, writable: true, value: n });
    } });
  });
  var en = preact.options.event;
  function rn() {
  }
  function un() {
    return this.cancelBubble;
  }
  function on() {
    return this.defaultPrevented;
  }
  preact.options.event = function(n) {
    return en && (n = en(n)), n.persist = rn, n.isPropagationStopped = un, n.isDefaultPrevented = on, n.nativeEvent = n;
  };
  var ln = { enumerable: false, configurable: true, get: function() {
    return this.class;
  } }, fn = preact.options.vnode;
  preact.options.vnode = function(n) {
    "string" == typeof n.type && (function(n2) {
      var t2 = n2.props, e2 = n2.type, u2 = {}, o2 = -1 === e2.indexOf("-");
      for (var i2 in t2) {
        var c2 = t2[i2];
        if (!("value" === i2 && "defaultValue" in t2 && null == c2 || Q && "children" === i2 && "noscript" === e2 || "class" === i2 || "className" === i2)) {
          var l2 = i2.toLowerCase();
          "defaultValue" === i2 && "value" in t2 && null == t2.value ? i2 = "value" : "download" === i2 && true === c2 ? c2 = "" : "translate" === l2 && "no" === c2 ? c2 = false : "o" === l2[0] && "n" === l2[1] ? "ondoubleclick" === l2 ? i2 = "ondblclick" : "onchange" !== l2 || "input" !== e2 && "textarea" !== e2 || X(t2.type) ? "onfocus" === l2 ? i2 = "onfocusin" : "onblur" === l2 ? i2 = "onfocusout" : J.test(i2) && (i2 = l2) : l2 = i2 = "oninput" : o2 && G.test(i2) ? i2 = i2.replace(K, "-$&").toLowerCase() : null === c2 && (c2 = void 0), "oninput" === l2 && u2[i2 = l2] && (i2 = "oninputCapture"), u2[i2] = c2;
        }
      }
      "select" == e2 && u2.multiple && Array.isArray(u2.value) && (u2.value = preact.toChildArray(t2.children).forEach(function(n3) {
        n3.props.selected = -1 != u2.value.indexOf(n3.props.value);
      })), "select" == e2 && null != u2.defaultValue && (u2.value = preact.toChildArray(t2.children).forEach(function(n3) {
        n3.props.selected = u2.multiple ? -1 != u2.defaultValue.indexOf(n3.props.value) : u2.defaultValue == n3.props.value;
      })), t2.class && !t2.className ? (u2.class = t2.class, Object.defineProperty(u2, "className", ln)) : (t2.className && !t2.class || t2.class && t2.className) && (u2.class = u2.className = t2.className), n2.props = u2;
    })(n), n.$$typeof = q, fn && fn(n);
  };
  var an = preact.options.__r;
  preact.options.__r = function(n) {
    an && an(n), n.__c;
  };
  var sn = preact.options.diffed;
  preact.options.diffed = function(n) {
    sn && sn(n);
    var t2 = n.props, e2 = n.__e;
    null != e2 && "textarea" === n.type && "value" in t2 && t2.value !== e2.value && (e2.value = null == t2.value ? "" : t2.value);
  };
  const SP_PREFIX = "300";
  const VIDEO_CODE_REGEX = /[a-zA-Z]{2,10}[\s_-]*\d{2,6}/;
  const JMVBT_CODE_REGEX = /\b([A-Z]{2,5}-\d{3,5})\b/;
  const DMM_CID_REGEX = /\/cid=([^/]+)\//i;
  const SITE_NAMES = {
    AV01: "AV01",
    AVJOY: "AvJoy",
    BESTJP: "BestJP",
    EVOJAV: "evojav",
    GGJAV: "GGJAV",
    HAYAV: "HAYAV",
    HIGHPORN: "highporn",
    JAVBUS: "JavBus",
    JAVDB: "JavDB",
    JAVTIFUL: "Javtiful",
    JAVHUB: "javhub",
    JABLE: "Jable",
    JAVLIB: "JAVLib",
    JAVMENU: "JAVMENU",
    MISSAV: "MISSAV",
    ONE_TWO_THREE_AV: "123av",
    PAIPANCON: "paipancon",
    SUPJAV: "Supjav"
  };
  const JABLE_INFO_SELECTOR = ".info-header, .video-info, .video-title, .video-detail, .video-meta";
  const JABLE_PLAYER_SELECTOR = [
    "video",
    "iframe[src*='player']",
    "iframe[src*='embed']",
    ".video-player",
    ".player-wrapper",
    ".jwplayer",
    ".plyr",
    "[class*='player']",
    "[id*='player']"
  ].join(", ");
  const HAYAV_PLAYER_SELECTOR = [
    "video",
    "source[src]",
    "iframe[src]",
    "[class*='player']",
    "[id*='player']",
    "[data-plyr-provider]",
    "script[src*='player']"
  ].join(", ");
  const MISSAV_PLAYER_SELECTOR = [
    "video",
    "source[src]",
    "iframe[src*='embed']",
    "iframe[src*='player']",
    "[class*='player']",
    "[id*='player']",
    "[data-plyr-provider]",
    "script[src*='player']"
  ].join(", ");
  const JABLE_REQUEST_HEADERS = {
    Referer: "https://jable.tv/",
    Origin: "https://jable.tv",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
  };
  const SUPJAV_REQUEST_HEADERS = {
    Referer: "https://supjav.com/",
    Origin: "https://supjav.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
  };
  const BESTJP_REQUEST_HEADERS = {
    Referer: "https://www.bestjavporn.com/",
    Origin: "https://www.bestjavporn.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:137.0) Gecko/20100101 Firefox/137.0",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8"
  };
  const AV01_REQUEST_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
    Origin: "https://www.av01.media",
    Referer: "https://www.av01.media/jp/search"
  };
  const SEVEN_MMTV_REQUEST_HEADERS = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    Origin: "https://7mmtv.sx",
    Referer: "https://7mmtv.sx/zh/searchform_search/all/index.html"
  };
  const JAVGG_REQUEST_HEADERS = {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    Referer: "https://javgg.net/",
    "Upgrade-Insecure-Requests": "1"
  };
  const DEFAULT_DISABLED_SITES = [
    SITE_NAMES.AVJOY,
    SITE_NAMES.PAIPANCON,
    SITE_NAMES.GGJAV,
    SITE_NAMES.AV01,
    SITE_NAMES.HIGHPORN,
    SITE_NAMES.EVOJAV,
    SITE_NAMES.HAYAV,
    SITE_NAMES.JAVBUS,
    SITE_NAMES.JAVDB,
    SITE_NAMES.JAVLIB,
    SITE_NAMES.MISSAV,
    SITE_NAMES.ONE_TWO_THREE_AV,
    SITE_NAMES.JAVHUB,
    SITE_NAMES.JAVMENU
  ];
  function normalizeCode(str) {
    if (!str) return "";
    return str.toLowerCase().replace(/[\s_-]+/g, "");
  }
  function extractVideoCode(text) {
    var _a;
    const trimmedText = (text || "").trim();
    return ((_a = trimmedText.match(VIDEO_CODE_REGEX)) == null ? void 0 : _a[0]) || trimmedText;
  }
  function extractNodeCode(node) {
    var _a, _b, _c, _d;
    if (!node) return "";
    const attrTexts = [
      node.textContent,
      node.innerText,
      (_a = node.getAttribute) == null ? void 0 : _a.call(node, "title"),
      (_b = node.getAttribute) == null ? void 0 : _b.call(node, "alt"),
      (_c = node.getAttribute) == null ? void 0 : _c.call(node, "aria-label")
    ].filter(Boolean);
    for (const text of attrTexts) {
      const code = extractVideoCode(text);
      if (normalizeCode(code)) return code;
    }
    const hrefCode = extractVideoCode(((_d = node.getAttribute) == null ? void 0 : _d.call(node, "href")) || "");
    if (normalizeCode(hrefCode)) {
      return hrefCode;
    }
    return extractVideoCode(node.outerHTML || "");
  }
  function formatJableCode(preCode) {
    return extractVideoCode(preCode).replace(/[\s_]+/g, "-").toUpperCase();
  }
  function createHiddenCodeNode(codeText) {
    let hiddenEl = document.querySelector("[data-jav-code]");
    if (!hiddenEl) {
      hiddenEl = document.createElement("span");
      hiddenEl.style.display = "none";
      document.body.appendChild(hiddenEl);
    }
    hiddenEl.setAttribute("data-jav-code", codeText);
  }
  function extractJmvbtCode() {
    var _a, _b;
    const codeElements = document.querySelectorAll("strong, b, td, span, div");
    for (const element of codeElements) {
      const text = element.textContent || element.innerText || "";
      if ((text.includes("番号") || text.includes("番號")) && text.match(JMVBT_CODE_REGEX)) {
        return ((_a = text.match(JMVBT_CODE_REGEX)) == null ? void 0 : _a[1]) || "";
      }
    }
    const pageText = document.body.innerText || document.body.textContent || "";
    return ((_b = pageText.match(JMVBT_CODE_REGEX)) == null ? void 0 : _b[1]) || "";
  }
  function initJmvbtPage() {
    const infoPanel = document.querySelector("#info");
    infoPanel == null ? void 0 : infoPanel.classList.add("jmvbt-panel");
    const codeText = extractJmvbtCode();
    if (codeText) {
      createHiddenCodeNode(codeText);
    }
  }
  function extractJmvbtDmmCid() {
    var _a, _b, _c;
    const iframeSrc = ((_a = document.querySelector("#Preview_vedio_box iframe[src*='dmm.co.jp'][src*='cid=']")) == null ? void 0 : _a.getAttribute("src")) || "";
    return ((_c = (_b = iframeSrc.match(DMM_CID_REGEX)) == null ? void 0 : _b[1]) == null ? void 0 : _c.toLowerCase()) || "";
  }
  function buildJavTrailersM3u8Url(cid) {
    const normalizedCid = (cid || "").trim().toLowerCase();
    if (!normalizedCid || normalizedCid.length < 3) return "";
    return `https://media.javtrailers.com/hlsvideo/freepv/${normalizedCid[0]}/${normalizedCid.slice(
    0,
    3
  )}/${normalizedCid}/playlist.m3u8`;
  }
  function isJmvbtPage() {
    const url = window.location.href;
    return window.location.hostname.includes("jmvbt") && (url.includes("/content_uncensored/") || url.includes("/content_censored/")) && url.endsWith(".htm");
  }
  function getCode(libItem) {
    const codeNode = document.querySelector(libItem.queries.codeQueryStr);
    if (!codeNode) return "";
    const codeText = libItem.name === "javdb" ? codeNode.dataset.clipboardText || "" : (codeNode.innerText || "").replace("复制", "");
    if (codeText.includes("FC2")) return codeText.split("-")[1];
    if (codeText.startsWith(SP_PREFIX)) return codeText.substring(3);
    return codeText;
  }
  function resolveCode(libItem) {
    if (typeof libItem.getCode === "function") {
      const specialCode = libItem.getCode();
      if (specialCode) return specialCode;
    }
    return getCode(libItem);
  }
  const regEnum = {
    subtitle: /(中文|字幕|subtitle)/,
    leakage: /(无码|無碼|泄漏|泄露|Uncensored)/
  };
  function tagsQuery({
    leakageText,
    subtitleText
  }) {
    const tags = [];
    if (regEnum.leakage.test(leakageText)) tags.push("无码");
    if (regEnum.subtitle.test(subtitleText)) tags.push("字幕");
    return tags.join(" ");
  }
  const gm = {
    addStyle(css) {
      if (typeof GM_addStyle === "function") {
        GM_addStyle(css);
        return;
      }
      const style = document.createElement("style");
      style.textContent = css;
      document.head.append(style);
    },
    getValue(key, defaultValue) {
      if (typeof GM_getValue === "function") {
        return GM_getValue(key, defaultValue);
      }
      return defaultValue;
    },
    setValue(key, value) {
      if (typeof GM_setValue === "function") {
        GM_setValue(key, value);
      }
    }
  };
  const DEBUG_LOG_KEY = "debugLogs";
  const DEBUG_RESPONSE_LIMIT = 20;
  let debugLogsEnabled = gm.getValue(DEBUG_LOG_KEY, false);
  function getDebugWindow() {
    {
      return void 0;
    }
  }
  function setDebugLogsEnabled(enabled) {
    debugLogsEnabled = enabled;
    gm.setValue(DEBUG_LOG_KEY, enabled);
    const debugWindow = getDebugWindow();
    if (!enabled && debugWindow) {
      delete debugWindow.__javJumpDebug;
    }
  }
  function getDebugLogsEnabled() {
    return debugLogsEnabled;
  }
  function debugLog(scope, payload) {
    if (!debugLogsEnabled) return;
    console.log(`[JAVJump][${scope}]`, payload);
  }
  function getDebugResponseKey(siteItem, code, targetLink) {
    return `${(siteItem == null ? void 0 : siteItem.name) || "unknown"}:${code}:${targetLink}`;
  }
  function createDebugStore(lastResponse) {
    const debugStore = {
      keys: [],
      responses: {},
      lastResponse,
      listSites: () => Array.from(new Set(Object.values(debugStore.responses).map((item) => item.site))),
      getEntry: (key) => debugStore.responses[key] || null,
      getSite: (site) => Object.values(debugStore.responses).filter((item) => item.site === site),
      getLatestSite: (site) => {
        const matchedEntries = debugStore.getSite(site);
        return matchedEntries.length > 0 ? matchedEntries[matchedEntries.length - 1] : null;
      },
      getSiteHtml: (site) => {
        var _a;
        return ((_a = debugStore.getLatestSite(site)) == null ? void 0 : _a.html) || "";
      }
    };
    return debugStore;
  }
  function pushDebugResponse(siteItem, payload) {
    const debugWindow = getDebugWindow();
    if (!debugLogsEnabled || !debugWindow) return null;
    const responseText = payload.response.responseText || "";
    const responseHeaders = payload.response.responseHeaders || "";
    const key = getDebugResponseKey(siteItem, payload.code, payload.targetLink);
    const entry = {
      key,
      site: (siteItem == null ? void 0 : siteItem.name) || "unknown",
      code: payload.code,
      targetLink: payload.targetLink,
      fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: payload.response.status,
      finalUrl: payload.response.finalUrl || payload.response.responseURL || payload.targetLink,
      headers: responseHeaders,
      html: responseText
    };
    const debugStore = debugWindow.__javJumpDebug || createDebugStore(entry);
    const keys = debugStore.keys.filter((item) => item !== key);
    keys.push(key);
    while (keys.length > DEBUG_RESPONSE_LIMIT) {
      const removedKey = keys.shift();
      if (removedKey) {
        delete debugStore.responses[removedKey];
      }
    }
    debugStore.keys = keys;
    debugStore.responses[key] = entry;
    debugStore.lastResponse = entry;
    debugWindow.__javJumpDebug = debugStore;
    return {
      key,
      htmlLength: responseText.length,
      consoleHint: [
        `window.__javJumpDebug.lastResponse.html`,
        `window.__javJumpDebug.responses[${JSON.stringify(key)}].html`,
        `copy(window.__javJumpDebug.lastResponse.html)`
      ]
    };
  }
  function getDebugScope(siteItem, stage) {
    return `${(siteItem == null ? void 0 : siteItem.name) || "unknown"}:${stage}`;
  }
  function logSiteDebug(siteItem, stage, payload) {
    debugLog(getDebugScope(siteItem, stage), payload);
  }
  function summarizeResponse(response) {
    if (!response) return null;
    const responseText = response.responseText || "";
    const responseHeaders = (response.responseHeaders || "").toLowerCase();
    return {
      status: response.status,
      finalUrl: response.finalUrl || response.responseURL || "",
      length: responseText.length,
      preview: responseText.slice(0, 200),
      headers: (response.responseHeaders || "").slice(0, 500),
      cloudflareSignals: {
        hasCfMitigated: responseHeaders.includes("cf-mitigated"),
        hasCloudflareServer: responseHeaders.includes("server:cloudflare"),
        hasCfRay: responseHeaders.includes("cf-ray")
      }
    };
  }
  function logSiteRequest(siteItem, payload) {
    logSiteDebug(siteItem, "request", {
      code: payload.code,
      targetLink: payload.targetLink,
      requestConfig: {
        method: payload.requestConfig.method,
        url: payload.requestConfig.url,
        headers: payload.requestConfig.headers || {},
        hasData: !!payload.requestConfig.data
      }
    });
  }
  function logSiteResponse(siteItem, payload) {
    const debugDump = pushDebugResponse(siteItem, payload);
    logSiteDebug(siteItem, "response", {
      code: payload.code,
      targetLink: payload.targetLink,
      response: summarizeResponse(payload.response),
      debugDump
    });
  }
  function logSiteResult(siteItem, payload) {
    logSiteDebug(siteItem, "result", payload);
  }
  function logSiteError(siteItem, payload) {
    logSiteDebug(siteItem, "error", payload);
  }
  function logVideoPageDebug(siteItem, payload) {
    logSiteDebug(siteItem, "videoPage", payload);
  }
  function logSearchPageDebug(siteItem, payload) {
    logSiteDebug(siteItem, "searchPage", payload);
  }
  function logSiteSignals(siteItem, signalName, payload) {
    logSiteDebug(siteItem, signalName, payload);
  }
  function canUseNativeHls() {
    const ua = navigator.userAgent || "";
    return /Safari/i.test(ua) && !/Chrome|Chromium|Firefox|Edg/i.test(ua);
  }
  function ensureHlsScript() {
    if (window.Hls) return Promise.resolve(window.Hls);
    if (window.__javJumpHlsPromise) return window.__javJumpHlsPromise;
    window.__javJumpHlsPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/hls.js@1.5.18/dist/hls.min.js";
      script.onload = () => resolve(window.Hls);
      script.onerror = () => reject(new Error("加载 hls.js 失败"));
      document.head.appendChild(script);
    });
    return window.__javJumpHlsPromise;
  }
  class GmHlsLoader {
    constructor(config) {
      __publicField(this, "config");
      __publicField(this, "request", null);
      __publicField(this, "stats");
      __publicField(this, "context", null);
      __publicField(this, "callbacks", null);
      this.config = config;
      this.stats = this.createStats();
    }
    createStats() {
      const now = performance.now();
      return {
        aborted: false,
        loaded: 0,
        retry: 0,
        total: 0,
        chunkCount: 0,
        bwEstimate: 0,
        loading: { start: now, first: 0, end: 0 },
        parsing: { start: 0, end: 0 },
        buffering: { start: 0, first: 0, end: 0 },
        trequest: now,
        tfirst: 0,
        tload: 0
      };
    }
    resetStats() {
      this.stats = this.createStats();
    }
    destroy() {
      this.abort();
      this.callbacks = null;
      this.context = null;
    }
    abort() {
      if (this.request && typeof this.request.abort === "function") {
        this.request.abort();
      }
      this.stats.aborted = true;
      this.request = null;
    }
    load(context, _config, callbacks) {
      this.context = context;
      this.callbacks = callbacks;
      this.resetStats();
      const isBinaryRequest = context.responseType === "arraybuffer" || context.type === "fragment" || context.type === "key";
      const headers = { ...context.headers || {} };
      const { rangeStart, rangeEnd } = context;
      if (typeof rangeStart === "number" && Number.isFinite(rangeStart) && typeof rangeEnd === "number" && Number.isFinite(rangeEnd)) {
        headers.Range = `bytes=${rangeStart}-${rangeEnd - 1}`;
      } else if (typeof rangeStart === "number" && Number.isFinite(rangeStart)) {
        headers.Range = `bytes=${rangeStart}-`;
      }
      this.request = GM_xmlhttpRequest({
        method: "GET",
        url: context.url,
        headers,
        responseType: isBinaryRequest ? "arraybuffer" : "text",
        ontimeout: () => {
          this.stats.tload = performance.now();
          this.stats.loading.end = this.stats.tload;
          callbacks.onTimeout(this.stats, context, null);
        },
        onerror: (response) => {
          this.stats.tload = performance.now();
          this.stats.loading.end = this.stats.tload;
          callbacks.onError(
            { code: response.status || 0, text: response.statusText || "GM_xmlhttpRequest error" },
            context,
            response,
            this.stats
          );
        },
        onload: (response) => {
          const ok = response.status >= 200 && response.status < 300;
          this.stats.tload = performance.now();
          this.stats.tfirst = this.stats.tfirst || this.stats.tload;
          this.stats.loading.first = this.stats.loading.first || this.stats.tfirst;
          this.stats.loading.end = this.stats.tload;
          this.stats.parsing.start = this.stats.tload;
          this.stats.parsing.end = this.stats.tload;
          this.stats.loaded = response.loaded || this.stats.loaded || (response.response instanceof ArrayBuffer ? response.response.byteLength : 0);
          this.stats.total = this.stats.total || this.stats.loaded;
          if (!ok) {
            callbacks.onError(
              { code: response.status, text: response.statusText || "HTTP error" },
              context,
              response,
              this.stats
            );
            return;
          }
          callbacks.onSuccess(
            {
              url: response.finalUrl || response.responseURL || context.url,
              data: isBinaryRequest ? response.response : response.responseText,
              code: response.status
            },
            this.stats,
            context,
            response
          );
        }
      });
    }
  }
  async function mountInlineJavTrailersPlayer(m3u8Url, title = "JavTrailers M3U8") {
    const host = document.querySelector("#Preview_vedio_box");
    if (!host || !m3u8Url) return false;
    host.replaceChildren();
    const shell = document.createElement("div");
    shell.style.cssText = "width:644px;max-width:100%;background:#111;border-radius:10px;padding:12px;box-sizing:border-box;color:#f5f7fa;";
    const videoEl = document.createElement("video");
    videoEl.controls = true;
    videoEl.autoplay = true;
    videoEl.playsInline = true;
    videoEl.title = title;
    videoEl.style.cssText = "width:100%;max-width:100%;height:auto;min-height:360px;background:#000;border-radius:8px;display:block;";
    const errorEl = document.createElement("div");
    errorEl.style.cssText = "margin-top:10px;color:#ff9b9b;font-size:13px;white-space:pre-wrap;";
    shell.append(videoEl, errorEl);
    host.appendChild(shell);
    const showError = (message) => {
      errorEl.textContent = message;
    };
    try {
      const Hls = await ensureHlsScript().catch(() => null);
      if (Hls && Hls.isSupported()) {
        const hls = new Hls({ loader: GmHlsLoader });
        hls.loadSource(m3u8Url);
        hls.attachMedia(videoEl);
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data == null ? void 0 : data.fatal) {
            showError(`播放器加载失败: ${data.details || data.type || "unknown"}`);
          }
        });
      } else if (canUseNativeHls() && videoEl.canPlayType("application/vnd.apple.mpegurl")) {
        videoEl.src = m3u8Url;
      } else {
        showError("当前浏览器不支持直接播放 HLS，或 hls.js 加载失败。");
        return true;
      }
      videoEl.play().catch(() => {
      });
    } catch (error) {
      showError(error instanceof Error ? error.message : "播放器加载失败");
    }
    return true;
  }
  function resolveJavTrailersDirectLink(libItemName) {
    if (libItemName !== "jmvbt") return "";
    const cid = extractJmvbtDmmCid();
    return buildJavTrailersM3u8Url(cid);
  }
  const libSites = [
    {
      name: "javdb",
      identifier: "a[href*='javdb']",
      queries: {
        panelQueryStr: ".video-meta-panel>.columns.is-desktop .panel.movie-panel-info",
        codeQueryStr: "[data-clipboard-text]"
      },
      method() {
        var _a;
        const columnVideoCover = document.querySelector(".column-video-cover");
        if (columnVideoCover) {
          columnVideoCover.style.width = "60%";
        }
        (_a = document.querySelector(
          ".video-meta-panel>.columns.is-desktop>.column:not(.column-video-cover)"
        )) == null ? void 0 : _a.classList.add("db-panel");
      }
    },
    {
      name: "javbus",
      identifier: "a[href*='javbus']",
      queries: {
        panelQueryStr: ".movie>div.info",
        codeQueryStr: 'span[style="color:#CC0000;"]'
      },
      method() {
      }
    },
    {
      name: "javlib",
      identifier: "img[src*='logo-top']",
      queries: {
        panelQueryStr: "#video_jacket_info #video_info",
        codeQueryStr: "#video_id td.text"
      },
      method() {
        var _a;
        (_a = document.querySelector("#video_info")) == null ? void 0 : _a.classList.add("lib-panel");
      }
    },
    {
      name: "jmvbt",
      identifier: "body",
      queries: {
        panelQueryStr: "#info",
        codeQueryStr: "[data-jav-code]"
      },
      resolve: isJmvbtPage,
      getCode: extractJmvbtCode,
      method: initJmvbtPage
    }
  ];
  function parsePaipancon(responseText, siteItem, CODE) {
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const galleryLink = doc.querySelector(
      `a[href='/gallery/${CODE}'], a[href='/gallery/${CODE.toUpperCase()}']`
    );
    const resultLinkNode = doc.querySelector("div.card a[href$='.html']");
    const hasContent = !!galleryLink || !!resultLinkNode;
    if (!galleryLink || !resultLinkNode) {
      return { isSuccess: false, isCloudflare: false, hasContent };
    }
    const href = resultLinkNode.getAttribute("href");
    if (!href) {
      return { isSuccess: false, isCloudflare: false, hasContent };
    }
    return {
      isSuccess: true,
      isCloudflare: false,
      hasContent,
      resultLink: `https://${siteItem.hostname}${href}`
    };
  }
  function parseHighporn(responseText, siteItem, CODE, detectCloudflareFromText2) {
    var _a;
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const pageTitle = ((_a = doc.querySelector("title")) == null ? void 0 : _a.textContent) || "";
    const anchors = Array.from(doc.querySelectorAll("a[href]")).filter((node) => {
      const href = node.getAttribute("href") || "";
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) return false;
      if (href.includes("/search/videos")) return false;
      if (href.includes("/categories/") || href.includes("/models/") || href.includes("/pornstars/") || href.includes("/tags/")) {
        return false;
      }
      return node.href.startsWith(`https://${siteItem.hostname}/`) || node.href.startsWith(`http://${siteItem.hostname}/`);
    });
    const hasContent = anchors.length > 0 || pageTitle.toLowerCase().includes("search results");
    const isCloudflare = detectCloudflareFromText2(siteItem, responseText, { hasContent });
    logSiteSignals(siteItem, "highpornSignals", {
      code: CODE,
      pageTitle,
      anchorCount: anchors.length,
      hasContent,
      isCloudflare,
      responsePreview: responseText.slice(0, 200)
    });
    if (isCloudflare) {
      return { isSuccess: false, isCloudflare: true, hasContent };
    }
    const candidates = anchors.map((node, index) => {
      var _a2;
      const cardNode = node.closest("article, .item, .thumb, .card, .well, .video, li, .col") || node.parentElement || node;
      const candidateText = [
        node.textContent || "",
        node.getAttribute("title") || "",
        node.getAttribute("aria-label") || "",
        ((_a2 = node.querySelector("img")) == null ? void 0 : _a2.getAttribute("alt")) || "",
        cardNode.textContent || ""
      ].join(" ");
      return {
        index,
        href: node.href.replace(node.hostname, siteItem.hostname),
        candidateCode: extractVideoCode(candidateText),
        candidateText: candidateText.trim()
      };
    }).filter((item) => item.href && item.candidateText);
    const matchedItems = candidates.filter(
      (item) => normalizeCode(item.candidateCode) === normalizeCode(CODE)
    );
    logSiteSignals(siteItem, "highpornCandidates", {
      code: CODE,
      candidateCount: candidates.length,
      matchedCount: matchedItems.length,
      sampleCandidates: candidates.slice(0, 5).map((item) => ({
        href: item.href,
        candidateCode: item.candidateCode,
        candidateText: item.candidateText.slice(0, 120)
      }))
    });
    if (matchedItems.length === 0) {
      return { isSuccess: false, isCloudflare: false, hasContent };
    }
    const matchedItem = matchedItems[0];
    return {
      isSuccess: true,
      isCloudflare: false,
      hasContent,
      resultLink: matchedItem.href,
      multipleRes: matchedItems.length > 1,
      tag: tagsQuery({
        leakageText: matchedItem.candidateText,
        subtitleText: matchedItem.candidateText
      })
    };
  }
  function parseAV01(responseText, siteItem, CODE) {
    try {
      const payload = JSON.parse(responseText);
      const videos = Array.isArray(payload.videos) ? payload.videos : [];
      const hasContent = videos.length > 0;
      const matchedVideos = videos.filter((videoItem) => {
        const candidateCode = (videoItem == null ? void 0 : videoItem.dvd_id) || (videoItem == null ? void 0 : videoItem.dmm_id) || "";
        return normalizeCode(candidateCode) === normalizeCode(CODE);
      });
      const matchVideo = matchedVideos[0];
      if (!(matchVideo == null ? void 0 : matchVideo.id)) {
        return { isSuccess: false, isCloudflare: false, hasContent };
      }
      const resultCode = (matchVideo.dvd_id || CODE).toLowerCase();
      return {
        isSuccess: true,
        isCloudflare: false,
        hasContent,
        multipleRes: matchedVideos.length > 1,
        resultLink: `https://${siteItem.hostname}/jp/video/${matchVideo.id}/${resultCode}`
      };
    } catch {
      return { isSuccess: false, isCloudflare: false, hasContent: false };
    }
  }
  function parseSevenMmtv(responseText, siteItem, CODE, detectCloudflareFromText2) {
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const linkNodes = Array.from(
      doc.querySelectorAll("a[target='_top'][href$='.html']")
    ).filter((node) => !node.href.includes("/searchall_search/"));
    const uniqueLinks = Array.from(new Map(linkNodes.map((node) => [node.href, node])).values());
    const matchedLinks = uniqueLinks.filter((node) => {
      var _a, _b;
      const hrefCode = ((_a = node.href.split("/").pop()) == null ? void 0 : _a.replace(/\.html$/i, "")) || "";
      const imageAlt = ((_b = node.querySelector("img")) == null ? void 0 : _b.getAttribute("alt")) || "";
      const candidateCode = extractVideoCode([node.textContent || "", imageAlt, hrefCode].join(" "));
      return normalizeCode(candidateCode || hrefCode) === normalizeCode(CODE);
    });
    const hasContent = uniqueLinks.length > 0;
    const isCloudflare = detectCloudflareFromText2(siteItem, responseText, { hasContent });
    if (isCloudflare) {
      return { isSuccess: false, isCloudflare: true, hasContent };
    }
    if (matchedLinks.length === 0) {
      return { isSuccess: false, isCloudflare: false, hasContent };
    }
    const resultLink = matchedLinks[0].href.replace(matchedLinks[0].hostname, siteItem.hostname);
    const tagText = matchedLinks.map((node) => {
      var _a;
      return node.textContent || ((_a = node.querySelector("img")) == null ? void 0 : _a.getAttribute("alt")) || "";
    }).join(" ");
    return {
      isSuccess: true,
      isCloudflare: false,
      hasContent,
      resultLink,
      multipleRes: matchedLinks.length > 1,
      tag: tagsQuery({ leakageText: tagText, subtitleText: tagText })
    };
  }
  function parseJavtiful(responseText, siteItem, CODE) {
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const resultCards = Array.from(doc.querySelectorAll("#search-videos .card")).map((card) => {
      var _a, _b;
      const linkNode = card.querySelector("a.video-tmb[href*='/video/']");
      const titleNode = card.querySelector("a.video-link[title]");
      const imageNode = card.querySelector("img[alt]");
      const codeText = ((_a = card.querySelector(".label-code")) == null ? void 0 : _a.textContent) || "";
      const candidateText = [
        codeText,
        (titleNode == null ? void 0 : titleNode.getAttribute("title")) || "",
        (titleNode == null ? void 0 : titleNode.textContent) || "",
        (imageNode == null ? void 0 : imageNode.getAttribute("alt")) || "",
        (linkNode == null ? void 0 : linkNode.getAttribute("href")) || ""
      ].join(" ");
      return {
        href: ((_b = linkNode == null ? void 0 : linkNode.href) == null ? void 0 : _b.replace(linkNode.hostname, siteItem.hostname)) || "",
        candidateCode: extractVideoCode(candidateText),
        candidateText: candidateText.trim()
      };
    });
    const cardsWithLinks = resultCards.filter((item) => item.href);
    const hasContent = cardsWithLinks.length > 0;
    const matchedItems = cardsWithLinks.filter(
      (item) => normalizeCode(item.candidateCode) === normalizeCode(CODE)
    );
    if (matchedItems.length === 0) {
      return { isSuccess: false, isCloudflare: false, hasContent };
    }
    const matchedItem = matchedItems[0];
    return {
      isSuccess: true,
      isCloudflare: false,
      hasContent,
      resultLink: matchedItem.href,
      multipleRes: matchedItems.length > 1,
      tag: tagsQuery({
        leakageText: matchedItem.candidateText,
        subtitleText: matchedItem.candidateText
      })
    };
  }
  function createVideoSites(detectCloudflareFromText2) {
    const getSites = [
      {
        name: "FANZA 動画",
        hostname: "dmm.co.jp",
        url: "https://www.dmm.co.jp/digital/videoa/-/detail/=/cid={{code}}/",
        fetchType: "get",
        codeFormatter: (preCode) => {
          const [pre = "", num = ""] = preCode.split("-");
          if (!pre || !num) {
            return preCode;
          }
          const padNum = num.padStart(5, "0");
          if (pre.toLowerCase().startsWith("start")) {
            return `1${pre.toLowerCase()}${padNum}`;
          }
          return `${pre}${padNum}`;
        }
      },
      {
        name: SITE_NAMES.JAVMENU,
        hostname: "javmenu.com",
        url: "https://javmenu.com/{{code}}",
        fetchType: "get",
        domQuery: {
          videoQuery: "#primary-player video[src], #seo-main-video[src], #player-tab .nav-link[data-m3u8]"
        },
        cloudflare: {
          useChallengeText: false,
          useHeaders: false
        }
      },
      {
        name: SITE_NAMES.HAYAV,
        hostname: "hayav.com",
        url: "https://hayav.com/video/{{code}}/",
        fetchType: "get"
      },
      {
        name: SITE_NAMES.EVOJAV,
        hostname: "evojav.pro",
        url: "https://evojav.pro/video/{{code}}/",
        fetchType: "get"
      },
      {
        name: SITE_NAMES.JAVBUS,
        hostname: "javbus.com",
        url: "https://javbus.com/{{code}}",
        fetchType: "get",
        codeFormatter: (preCode) => preCode.startsWith("MIUM") ? `${SP_PREFIX}${preCode}` : preCode
      }
    ];
    const parserSites = [
      {
        name: "javtrailers",
        hostname: "javtrailers.com",
        url: "https://javtrailers.com/search/{{code}}",
        fetchType: "parser",
        strictParser: true,
        domQuery: {
          linkQuery: ".videos-list .video-link",
          titleQuery: ".videos-list .video-link p.card-text"
        }
      },
      {
        name: SITE_NAMES.ONE_TWO_THREE_AV,
        hostname: "123av.com",
        url: "https://123av.com/zh/search?keyword={{code}}",
        fetchType: "parser",
        strictParser: true,
        domQuery: {
          linkQuery: ".detail>a[href*='v/']",
          titleQuery: ".detail>a[href*='v/']"
        }
      },
      {
        name: SITE_NAMES.BESTJP,
        hostname: "www.bestjavporn.com",
        url: "https://www.bestjavporn.com/search/{{code}}",
        fetchType: "parser",
        strictParser: true,
        domQuery: {
          linkQuery: "a[href*='/video/']",
          titleQuery: "a[href*='/video/']"
        }
      },
      {
        name: "Jav.Guru",
        hostname: "jav.guru",
        url: "https://jav.guru/?s={{code}}",
        fetchType: "parser",
        domQuery: {
          linkQuery: ".imgg>a[href]",
          titleQuery: ".inside-article>.grid1 a[title]"
        }
      },
      {
        name: "JAVMOST",
        hostname: "www.javmost.ws",
        url: "https://www.javmost.ws/search/{{code}}/",
        fetchType: "parser",
        strictParser: true,
        domQuery: {
          linkQuery: "#content-update .card > center > a[href*='javmost.ws/']",
          titleQuery: "#content-update .card .card-block > a > h1.card-title"
        }
      },
      {
        name: SITE_NAMES.AVJOY,
        hostname: "avjoy.me",
        url: "https://avjoy.me/search/videos/{{code}}",
        fetchType: "parser",
        domQuery: {
          titleQuery: "#wrapper .row .content-info span.content-title",
          linkQuery: "#wrapper .row a[href^='/video/']"
        }
      },
      {
        name: SITE_NAMES.PAIPANCON,
        hostname: "paipancon.com",
        url: "https://paipancon.com/search/{{code}}",
        fetchType: "parser",
        strictParser: true,
        searchParser: (responseText, siteItem, code) => parsePaipancon(responseText, siteItem, code)
      },
      {
        name: SITE_NAMES.GGJAV,
        hostname: "ggjav.com",
        url: "https://ggjav.com/main/search?string={{code}}",
        fetchType: "parser",
        strictParser: true,
        domQuery: {
          titleQuery: "div.item > div.item_title > a.gray_a[href*='/main/video?id=']",
          linkQuery: "div.item > div.item_title > a.gray_a[href*='/main/video?id=']"
        }
      },
      {
        name: SITE_NAMES.HIGHPORN,
        hostname: "highporn.net",
        url: "https://highporn.net/search/videos?search_query={{code}}",
        fetchType: "parser",
        searchParser: (responseText, siteItem, code) => parseHighporn(responseText, siteItem, code, detectCloudflareFromText2)
      },
      {
        name: "18av",
        hostname: "18av.mm-cg.com",
        url: "https://18av.mm-cg.com/zh/fc_search/all/{{code}}/1.html",
        fetchType: "parser",
        domQuery: {
          linkQuery: ".posts h3>a[href]",
          titleQuery: ".posts h3>a[href]"
        }
      },
      {
        name: "ToJAV",
        hostname: "tojav.net",
        url: "https://tojav.net/search/{{code}}",
        fetchType: "parser",
        strictParser: true,
        domQuery: {
          linkQuery: ".tray-content .tray-item > a[href]",
          titleQuery: ".tray-content .tray-item .tray-item-title"
        }
      },
      {
        name: SITE_NAMES.JAVTIFUL,
        hostname: "javtiful.com",
        url: "https://javtiful.com/search/videos?search_query={{code}}",
        fetchType: "parser",
        strictParser: true,
        searchParser: (responseText, siteItem, code) => parseJavtiful(responseText, siteItem, code)
      },
      {
        name: SITE_NAMES.JAVHUB,
        hostname: "javhub.net",
        url: "https://javhub.net/search/{{code}}",
        fetchType: "parser",
        strictParser: true,
        domQuery: {
          linkQuery: "a.card-text[href*='play']",
          titleQuery: "a.card-text[href*='play']"
        }
      },
      {
        name: "fcjav",
        hostname: "fcjav.com",
        url: "https://fcjav.com/search/{{code}}",
        fetchType: "parser",
        strictParser: true,
        codeFormatter: (preCode) => preCode.toLowerCase(),
        domQuery: {
          linkQuery: "a.ml-mask.jt[href*='/v/']",
          titleQuery: "a.ml-mask.jt[href*='/v/']"
        }
      },
      {
        name: SITE_NAMES.JAVDB,
        hostname: "javdb.com",
        url: "https://javdb.com/search?q={{code}}",
        fetchType: "parser",
        domQuery: {
          linkQuery: ".movie-list>.item:first-child>a",
          titleQuery: ".video-title"
        }
      }
    ];
    const directSites = [
      {
        name: "预告播放",
        hostname: "media.javtrailers.com",
        url: "https://media.javtrailers.com/",
        fetchType: "direct",
        hideWhenNoDirectLink: true,
        directLinkResolver: ({ libItem }) => resolveJavTrailersDirectLink(libItem.name),
        inlinePlayerResolver: ({ directLink, CODE }) => mountInlineJavTrailersPlayer(directLink, `${CODE} JavTrailers M3U8`)
      },
      {
        name: SITE_NAMES.JAVLIB,
        hostname: "javlibrary.com",
        url: "https://www.javlibrary.com/cn/vl_searchbyid.php?keyword={{code}}",
        fetchType: "direct"
      }
    ];
    const specialSites = [
      {
        name: SITE_NAMES.AV01,
        hostname: "www.av01.media",
        url: "https://www.av01.media/api/v1/videos/search?lang=ja",
        browseUrl: "https://www.av01.media/jp/search?q={{code}}",
        fetchType: "parser",
        strictParser: true,
        request: ({ CODE, targetLink }) => ({
          method: "POST",
          url: targetLink,
          headers: AV01_REQUEST_HEADERS,
          data: JSON.stringify({
            query: CODE,
            pagination: { page: 1, limit: 24 }
          })
        }),
        searchParser: (responseText, siteItem, code) => parseAV01(responseText, siteItem, code)
      },
      {
        name: SITE_NAMES.JABLE,
        hostname: "jable.tv",
        url: "https://jable.tv/search/{{code}}/",
        fetchType: "parser",
        codeFormatter: formatJableCode,
        strictParser: true,
        domQuery: {
          linkQuery: "h6.title>a[href*='/videos/']",
          titleQuery: "h6.title>a[href*='/videos/']"
        }
      },
      {
        name: SITE_NAMES.MISSAV,
        hostname: "missav.ws",
        url: "https://missav.ws/{{code}}/",
        fetchType: "get",
        domQuery: {
          subQuery: '.space-y-2 a.text-nord13[href="https://missav.ws/chinese-subtitle"]',
          leakQuery: ".order-first div.rounded-md a[href]:last-child"
        }
      },
      {
        name: SITE_NAMES.SUPJAV,
        hostname: "supjav.com",
        url: "https://supjav.com/zh/?s={{code}}",
        fetchType: "parser",
        strictParser: true,
        domQuery: {
          linkQuery: ".posts.clearfix>.post>a.img[title]",
          titleQuery: "h3>a[rel='bookmark'][itemprop='url']"
        }
      },
      {
        name: "javgg",
        hostname: "javgg.net",
        url: "https://javgg.net/?s={{code}}",
        fetchType: "parser",
        strictParser: true,
        request: ({ targetLink }) => ({
          method: "GET",
          url: targetLink,
          headers: JAVGG_REQUEST_HEADERS
        }),
        domQuery: {
          linkQuery: "article .details .title a[href*='/jav/']",
          titleQuery: "article .details .title a[href*='/jav/']"
        }
      },
      {
        name: "7mmtv",
        hostname: "7mmtv.sx",
        url: "https://7mmtv.sx/zh/searchform_search/all/index.html",
        browseUrl: "https://7mmtv.sx/zh/searchall_search/all/{{code}}/1.html",
        fetchType: "parser",
        strictParser: true,
        request: ({ CODE, targetLink }) => ({
          method: "POST",
          url: targetLink,
          headers: SEVEN_MMTV_REQUEST_HEADERS,
          data: `search_keyword=${encodeURIComponent(CODE)}&search_type=searchall&op=search`
        }),
        searchParser: (responseText, siteItem, code) => parseSevenMmtv(responseText, siteItem, code, detectCloudflareFromText2)
      }
    ];
    const allSites = [...getSites, ...parserSites, ...directSites, ...specialSites];
    const prioritySiteNames = ["javtrailers", "预告播放"];
    return [
      ...prioritySiteNames.flatMap((name) => allSites.filter((site) => site.name === name)),
      ...allSites.filter((site) => !prioritySiteNames.includes(site.name))
    ];
  }
  function getRequestHeaders(siteItem) {
    if (siteItem.name === SITE_NAMES.JABLE) return void 0;
    if (siteItem.name === SITE_NAMES.SUPJAV) return SUPJAV_REQUEST_HEADERS;
    if (siteItem.name === SITE_NAMES.AV01) return AV01_REQUEST_HEADERS;
    if (siteItem.name === SITE_NAMES.BESTJP) return BESTJP_REQUEST_HEADERS;
    return void 0;
  }
  function getRequestConfig(siteItem, targetLink, CODE) {
    if (typeof siteItem.request === "function") {
      return siteItem.request({ siteItem, targetLink, CODE });
    }
    return {
      method: "GET",
      url: targetLink,
      headers: siteItem.name === SITE_NAMES.JABLE ? void 0 : getRequestHeaders(siteItem)
    };
  }
  function normalizeVideoSiteConfig(site) {
    return {
      strictParser: false,
      domQuery: {},
      codeFormatter: null,
      directLinkResolver: null,
      inlinePlayerResolver: null,
      hideWhenNoDirectLink: false,
      cloudflare: {},
      browseUrl: null,
      searchParser: null,
      request: null,
      ...site
    };
  }
  function isCloudflareChallenge(responseText) {
    if (!responseText || responseText.length < 100) return false;
    const lowerText = responseText.toLowerCase();
    const hasChallengeText = lowerText.includes("just a moment") || lowerText.includes("checking your browser") || lowerText.includes("please wait") && lowerText.includes("cloudflare");
    const hasChallengeElements = lowerText.includes("cf-browser-verification") || lowerText.includes("challenge-platform") || lowerText.includes("challenges.cloudflare.com");
    const hasDDoSProtection = lowerText.includes("ddos protection by cloudflare") && (lowerText.includes("checking") || lowerText.includes("please wait"));
    return hasChallengeText || hasChallengeElements || hasDDoSProtection;
  }
  function getCloudflarePolicy(siteItem) {
    return {
      useChallengeText: true,
      useHeaders: true,
      useStatus403: true,
      useErrorText: true,
      forceStatus: false,
      ...siteItem.cloudflare || {}
    };
  }
  function detectCloudflareFromText(siteItem, responseText, { hasContent = false } = {}) {
    const policy = getCloudflarePolicy(siteItem);
    if (policy.forceStatus) return true;
    if (hasContent || !policy.useChallengeText) return false;
    return isCloudflareChallenge(responseText);
  }
  function detectCloudflareFromResponse(siteItem, response, { hasContent = false } = {}) {
    const policy = getCloudflarePolicy(siteItem);
    if (policy.forceStatus) return true;
    if (hasContent) return false;
    const responseText = response.responseText || "";
    const responseHeaders = (response.responseHeaders || "").toLowerCase();
    const hasHeaderSignals = responseHeaders.includes("cf-mitigated") || responseHeaders.includes("server:cloudflare") || responseHeaders.includes("cf-ray");
    const hasChallengeText = isCloudflareChallenge(responseText);
    if (policy.useChallengeText && hasChallengeText) return true;
    if (policy.useHeaders && hasHeaderSignals && hasChallengeText) return true;
    if (policy.useStatus403 && response.status === 403 && (hasChallengeText || hasHeaderSignals)) {
      return true;
    }
    return false;
  }
  function detectCloudflareFromError(siteItem, error) {
    const policy = getCloudflarePolicy(siteItem);
    if (policy.forceStatus) return true;
    if (!policy.useErrorText) return false;
    const errorText = error instanceof Error ? error.message : String(error || "");
    return isCloudflareChallenge(errorText);
  }
  function gmRequest({ method = "GET", url, headers = {}, data }) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method,
        url,
        headers,
        data,
        onload: (response) => resolve(response),
        onerror: (error) => reject(error)
      });
    });
  }
  function isJableNotFoundResponse(response, targetLink) {
    const responseUrl = response.finalUrl || response.responseURL || targetLink;
    const responseText = response.responseText || "";
    const lowerText = responseText.toLowerCase();
    return response.status === 404 || responseUrl.includes("/404.php") || responseUrl.includes("404") && responseUrl !== targetLink || lowerText.includes("404 not found") || lowerText.includes("page not found") || lowerText.includes("video not found") || responseText.length < 5e3;
  }
  function searchPageCodeCheck(titleNodes, siteItem, CODE) {
    var _a, _b;
    if (!titleNodes || titleNodes.length === 0) {
      return { isSuccess: false, titleNodeText: "", matchedIndex: 0, multipleRes: false };
    }
    if (siteItem.strictParser) {
      const nodes = Array.from(titleNodes);
      const passNodes = nodes.map((node, index) => ({ node, index })).filter(({ node }) => normalizeCode(extractNodeCode(node)) === normalizeCode(CODE));
      return {
        titleNodeText: passNodes.map(({ node }) => node.outerHTML).join(" "),
        isSuccess: passNodes.length > 0,
        multipleRes: passNodes.length > 1,
        matchedIndex: ((_a = passNodes[0]) == null ? void 0 : _a.index) ?? 0
      };
    }
    const listIndex = ((_b = siteItem.domQuery) == null ? void 0 : _b.listIndex) ?? 0;
    const titleNode = Array.from(titleNodes)[listIndex];
    const titleNodeText = (titleNode == null ? void 0 : titleNode.outerHTML) || "";
    const matchCode = extractNodeCode(titleNode);
    return {
      titleNodeText,
      isSuccess: normalizeCode(matchCode) === normalizeCode(CODE),
      multipleRes: titleNodes.length > 1,
      matchedIndex: listIndex
    };
  }
  function analyzeSearchPageStructure(doc, responseText, titleNodes, linkNodes, siteItem) {
    var _a, _b, _c, _d;
    const pageTitle = ((_b = (_a = doc.querySelector("title")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) || "";
    const bodyText = ((_d = (_c = doc.body) == null ? void 0 : _c.textContent) == null ? void 0 : _d.trim()) || "";
    const lowerTitle = pageTitle.toLowerCase();
    const hasSearchPageTitle = /\bsearch(ed| results?)\b/i.test(pageTitle) || lowerTitle.includes("you searched for") || lowerTitle.includes("search results");
    const hasChallengeTitle = /just a moment|checking your browser/i.test(pageTitle);
    const hasNodeContent = titleNodes.length > 0 || linkNodes.length > 0;
    const hasNormalPageStructure = !!pageTitle && !hasChallengeTitle && (bodyText.length > 200 || hasSearchPageTitle);
    const hasContent = hasNodeContent || hasNormalPageStructure;
    return {
      pageTitle,
      hasSearchPageTitle,
      hasChallengeTitle,
      hasNodeContent,
      hasNormalPageStructure,
      hasContent,
      isCloudflare: hasNormalPageStructure ? false : detectCloudflareFromText(siteItem, responseText, { hasContent })
    };
  }
  function videoPageParser(responseText, domQuery = {}, siteItem, CODE, response) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const subNode = (domQuery == null ? void 0 : domQuery.subQuery) ? doc.querySelector(domQuery.subQuery) : null;
    const subNodeText = (subNode == null ? void 0 : subNode.innerHTML) || "";
    const leakNode = (domQuery == null ? void 0 : domQuery.leakQuery) ? doc.querySelector(domQuery.leakQuery) : null;
    const leakNodeText = (leakNode == null ? void 0 : leakNode.innerHTML) || "";
    let videoNode = null;
    if (siteItem.name === SITE_NAMES.JABLE) {
      const errorText = responseText.toLowerCase();
      const pageTitle = ((_a = doc.querySelector("title")) == null ? void 0 : _a.textContent) || "";
      const h1Title = ((_b = doc.querySelector("h1")) == null ? void 0 : _b.textContent) || "";
      const headerText = ((_c = doc.querySelector(".info-header")) == null ? void 0 : _c.textContent) || "";
      const normalizedCode = normalizeCode(CODE);
      const hasMatchedCode = [pageTitle, h1Title, headerText].some(
        (text) => normalizeCode(text).includes(normalizedCode)
      );
      const has404Error = errorText.includes("404") && (errorText.includes("not found") || errorText.includes("page not found") || pageTitle.toLowerCase().includes("404") || h1Title.toLowerCase().includes("404"));
      const hasNotFoundError = (errorText.includes("not found") || errorText.includes("page not found") || errorText.includes("video not found")) && (pageTitle.toLowerCase().includes("not found") || h1Title.toLowerCase().includes("not found"));
      const hasErrorElement = doc.querySelector(".error, .not-found, .404, .no-video, .page-not-found");
      if (has404Error || hasNotFoundError || hasErrorElement) {
        const result2 = {
          isSuccess: false,
          isCloudflare: false,
          resultLink: response.finalUrl || response.responseURL || "",
          hasContent: false,
          tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText })
        };
        logVideoPageDebug(siteItem, {
          code: CODE,
          reason: "explicit_not_found",
          responseStatus: response.status
        });
        return result2;
      }
      const hasVideoInfo = !!doc.querySelector(JABLE_INFO_SELECTOR);
      videoNode = doc.querySelector(JABLE_PLAYER_SELECTOR);
      if (!(videoNode || hasVideoInfo) || !hasMatchedCode) {
        const hasEnoughContent = responseText.length > 15e3;
        const hasVideoScript = responseText.includes("video") && (responseText.includes("player") || responseText.includes("embed") || responseText.includes("jwplayer") || responseText.includes("plyr"));
        videoNode = hasMatchedCode && hasVideoInfo && (hasEnoughContent || hasVideoScript) ? true : null;
      }
    } else if (siteItem.name === SITE_NAMES.HAYAV || siteItem.name === SITE_NAMES.EVOJAV) {
      const normalizedCode = normalizeCode(CODE);
      const titleTexts = [
        ((_d = doc.querySelector("title")) == null ? void 0 : _d.textContent) || "",
        ((_e = doc.querySelector("meta[property='og:title']")) == null ? void 0 : _e.getAttribute("content")) || "",
        ((_f = doc.querySelector("h1")) == null ? void 0 : _f.textContent) || "",
        ((_g = doc.querySelector("meta[name='description']")) == null ? void 0 : _g.getAttribute("content")) || ""
      ];
      const hasMatchedCode = titleTexts.some((text) => normalizeCode(text).includes(normalizedCode));
      const hasPlayer = !!doc.querySelector(HAYAV_PLAYER_SELECTOR);
      const lowerText = responseText.toLowerCase();
      const hasNotFoundText = lowerText.includes("404") || lowerText.includes("not found") || lowerText.includes("page not found");
      if (hasNotFoundText && !hasMatchedCode) {
        const result2 = {
          isSuccess: false,
          isCloudflare: false,
          isNotFound: true,
          resultLink: response.finalUrl || response.responseURL || "",
          hasContent: false,
          tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText })
        };
        logSiteSignals(siteItem, siteItem.name === SITE_NAMES.EVOJAV ? "evojavSignals" : "hayavSignals", {
          code: CODE,
          hasMatchedCode,
          hasPlayer,
          hasNotFoundText,
          result: result2
        });
        return result2;
      }
      videoNode = hasMatchedCode && hasPlayer && !hasNotFoundText ? true : null;
      logSiteSignals(siteItem, siteItem.name === SITE_NAMES.EVOJAV ? "evojavSignals" : "hayavSignals", {
        code: CODE,
        hasMatchedCode,
        hasPlayer,
        hasNotFoundText
      });
    } else if (siteItem.name === SITE_NAMES.MISSAV) {
      const normalizedCode = normalizeCode(CODE);
      const titleTexts = [
        ((_h = doc.querySelector("title")) == null ? void 0 : _h.textContent) || "",
        ((_i = doc.querySelector("meta[property='og:title']")) == null ? void 0 : _i.getAttribute("content")) || "",
        ((_j = doc.querySelector("meta[name='description']")) == null ? void 0 : _j.getAttribute("content")) || "",
        ((_k = doc.querySelector("h1")) == null ? void 0 : _k.textContent) || ""
      ];
      const hasMatchedCode = titleTexts.some((text) => normalizeCode(text).includes(normalizedCode));
      const hasPlayer = !!doc.querySelector(MISSAV_PLAYER_SELECTOR);
      const lowerText = responseText.toLowerCase();
      const hasNotFoundText = lowerText.includes("404") || lowerText.includes("not found") || lowerText.includes("page not found") || lowerText.includes("video not found");
      if (hasNotFoundText && !hasMatchedCode) {
        const result2 = {
          isSuccess: false,
          isCloudflare: false,
          isNotFound: true,
          resultLink: response.finalUrl || response.responseURL || "",
          hasContent: false,
          tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText })
        };
        logSiteSignals(siteItem, "missavSignals", {
          code: CODE,
          hasMatchedCode,
          hasPlayer,
          hasNotFoundText,
          result: result2
        });
        return result2;
      }
      videoNode = hasMatchedCode && hasPlayer && !hasNotFoundText ? true : null;
      logSiteSignals(siteItem, "missavSignals", {
        code: CODE,
        hasMatchedCode,
        hasPlayer,
        hasNotFoundText
      });
    } else if (siteItem.name === SITE_NAMES.JAVMENU) {
      const normalizedCode = normalizeCode(CODE);
      const titleTexts = [
        ((_l = doc.querySelector("title")) == null ? void 0 : _l.textContent) || "",
        ((_m = doc.querySelector("meta[property='og:title']")) == null ? void 0 : _m.getAttribute("content")) || "",
        ((_n = doc.querySelector("meta[name='description']")) == null ? void 0 : _n.getAttribute("content")) || "",
        ((_o = doc.querySelector("link[rel='canonical']")) == null ? void 0 : _o.getAttribute("href")) || "",
        ((_p = doc.querySelector("meta[property='og:url']")) == null ? void 0 : _p.getAttribute("content")) || "",
        ((_q = doc.querySelector(".code")) == null ? void 0 : _q.textContent) || "",
        ((_r = doc.querySelector(".display-5 strong")) == null ? void 0 : _r.textContent) || ""
      ];
      const hasMatchedCode = titleTexts.some((text) => normalizeCode(text).includes(normalizedCode));
      const hasPlayer = !!doc.querySelector("#primary-player video[src], #seo-main-video[src]") || !!doc.querySelector("#player-tab .nav-link[data-m3u8]") || !!doc.querySelector(".video-list-item-tag-wrapper .badge.bg-success");
      const lowerText = responseText.toLowerCase();
      const hasNotFoundText = (lowerText.includes("404") || lowerText.includes("not found") || lowerText.includes("page not found") || lowerText.includes("video not found")) && !hasMatchedCode;
      if (hasNotFoundText) {
        const result2 = {
          isSuccess: false,
          isCloudflare: false,
          isNotFound: true,
          resultLink: response.finalUrl || response.responseURL || "",
          hasContent: false,
          tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText })
        };
        logSiteSignals(siteItem, "javmenuSignals", {
          code: CODE,
          hasMatchedCode,
          hasPlayer,
          hasNotFoundText,
          result: result2
        });
        return result2;
      }
      videoNode = hasMatchedCode && hasPlayer ? true : null;
      logSiteSignals(siteItem, "javmenuSignals", {
        code: CODE,
        hasMatchedCode,
        hasPlayer,
        hasNotFoundText
      });
    } else {
      videoNode = (domQuery == null ? void 0 : domQuery.videoQuery) ? doc.querySelector(domQuery.videoQuery) : true;
    }
    const hasContent = !!videoNode || subNodeText.length > 0 || leakNodeText.length > 0;
    const isCloudflare = detectCloudflareFromText(siteItem, responseText, { hasContent });
    const result = {
      isSuccess: !!videoNode && !isCloudflare,
      isCloudflare,
      resultLink: response.finalUrl || response.responseURL || "",
      hasContent,
      tag: tagsQuery({ leakageText: leakNodeText, subtitleText: subNodeText })
    };
    logVideoPageDebug(siteItem, {
      code: CODE,
      hasContent,
      hasVideoNode: !!videoNode,
      isCloudflare,
      result
    });
    return result;
  }
  function searchPageParser(responseText, siteItem, CODE) {
    var _a;
    if (typeof siteItem.searchParser === "function") {
      return siteItem.searchParser(responseText, siteItem, CODE);
    }
    const { linkQuery, titleQuery } = siteItem.domQuery || {};
    const doc = new DOMParser().parseFromString(responseText, "text/html");
    const titleNodes = titleQuery ? doc.querySelectorAll(titleQuery) : {};
    const { isSuccess, titleNodeText, multipleRes, matchedIndex } = searchPageCodeCheck(
      Array.from(titleNodes || []),
      siteItem,
      CODE
    );
    const linkNodes = linkQuery ? doc.querySelectorAll(linkQuery) : {};
    const linkNode = Array.from(linkNodes || [])[matchedIndex ?? ((_a = siteItem.domQuery) == null ? void 0 : _a.listIndex) ?? 0];
    const structure = analyzeSearchPageStructure(doc, responseText, titleNodes, linkNodes, siteItem);
    const isCloudflare = structure.hasNormalPageStructure ? false : detectCloudflareFromText(siteItem, responseText, { hasContent: structure.hasContent });
    if (isCloudflare) {
      const result2 = { isSuccess: false, isCloudflare: true, hasContent: !!structure.hasContent };
      logSearchPageDebug(siteItem, { code: CODE, reason: "cloudflare", ...structure });
      return result2;
    }
    if (!isSuccess) {
      const result2 = { isSuccess: false, isCloudflare: false, hasContent: !!structure.hasContent };
      logSearchPageDebug(siteItem, {
        code: CODE,
        reason: "no_match",
        titleNodeText: titleNodeText.slice(0, 200),
        ...structure
      });
      return result2;
    }
    if (!linkNode) {
      const result2 = { isSuccess: false, isCloudflare: false, hasContent: !!structure.hasContent };
      logSearchPageDebug(siteItem, { code: CODE, reason: "matched_but_no_link", ...structure });
      return result2;
    }
    const resultLinkText = linkNode.href.replace(linkNode.hostname, siteItem.hostname);
    const result = {
      isSuccess: true,
      isCloudflare: false,
      hasContent: !!structure.hasContent,
      resultLink: resultLinkText,
      multipleRes,
      tag: tagsQuery({ leakageText: titleNodeText, subtitleText: titleNodeText })
    };
    logSearchPageDebug(siteItem, { code: CODE, reason: "matched", resultLink: resultLinkText, ...structure });
    return result;
  }
  async function baseFetcher({
    siteItem,
    targetLink,
    CODE
  }) {
    if (siteItem.fetchType === "direct") {
      if (getCloudflarePolicy(siteItem).forceStatus) {
        return { isSuccess: false, resultLink: targetLink, isCloudflare: true };
      }
      return { isSuccess: true, resultLink: targetLink, isCloudflare: false };
    }
    try {
      const requestConfig = getRequestConfig(siteItem, targetLink, CODE);
      if (siteItem.name === SITE_NAMES.JABLE && !requestConfig.headers) {
        requestConfig.headers = JABLE_REQUEST_HEADERS;
      }
      logSiteRequest(siteItem, { code: CODE, targetLink, requestConfig });
      const response = await gmRequest(requestConfig);
      logSiteResponse(siteItem, { code: CODE, targetLink, response });
      if (siteItem.name === SITE_NAMES.JABLE && siteItem.fetchType === "get") {
        if (isJableNotFoundResponse(response, targetLink)) {
          return { isSuccess: false, isCloudflare: false, resultLink: targetLink };
        }
        if (!isCloudflareChallenge(response.responseText)) {
          const parseResult2 = videoPageParser(
            response.responseText || "",
            siteItem.domQuery,
            siteItem,
            CODE,
            response
          );
          return { ...parseResult2, resultLink: targetLink };
        }
      }
      if (siteItem.fetchType === "get") {
        const parseResult2 = videoPageParser(
          response.responseText || "",
          siteItem.domQuery,
          siteItem,
          CODE,
          response
        );
        if (parseResult2.isNotFound) {
          const result2 = { ...parseResult2, resultLink: targetLink };
          logSiteResult(siteItem, { code: CODE, targetLink, reason: "explicit_not_found", result: result2 });
          return result2;
        }
        if (!parseResult2.isSuccess && detectCloudflareFromResponse(siteItem, response, { hasContent: !!parseResult2.hasContent })) {
          logSiteResult(siteItem, {
            code: CODE,
            targetLink,
            reason: "blocked_response",
            result: { isSuccess: false, isCloudflare: true }
          });
          return { isSuccess: false, isCloudflare: true, resultLink: targetLink };
        }
        if (response.status === 404) {
          throw new Error(String(response.status));
        }
        const result = { ...parseResult2, resultLink: targetLink };
        logSiteResult(siteItem, { code: CODE, targetLink, reason: "get_parse", result });
        return result;
      }
      const parseResult = searchPageParser(response.responseText || "", siteItem, CODE);
      if (parseResult.isSuccess) {
        logSiteResult(siteItem, {
          code: CODE,
          targetLink,
          reason: "search_parse_success",
          result: parseResult
        });
        return { resultLink: targetLink, ...parseResult };
      }
      if (detectCloudflareFromResponse(siteItem, response, { hasContent: !!parseResult.hasContent })) {
        logSiteResult(siteItem, {
          code: CODE,
          targetLink,
          reason: "search_blocked_response",
          result: { isSuccess: false, isCloudflare: true }
        });
        return { isSuccess: false, isCloudflare: true, resultLink: targetLink };
      }
      if (response.status === 404) {
        throw new Error(String(response.status));
      }
      logSiteResult(siteItem, {
        code: CODE,
        targetLink,
        reason: "search_parse_fail",
        result: parseResult
      });
      return { resultLink: targetLink, ...parseResult };
    } catch (error) {
      const errorText = error instanceof Error ? error.message : String(error || "");
      const shouldMarkCloudflare = detectCloudflareFromError(siteItem, error);
      logSiteError(siteItem, {
        code: CODE,
        targetLink,
        errorText,
        isCloudflare: shouldMarkCloudflare
      });
      return {
        isSuccess: false,
        isCloudflare: shouldMarkCloudflare,
        resultLink: targetLink
      };
    }
  }
  function Tooltip({
    content,
    children
  }) {
    const [isVisible, setIsVisible] = h(false);
    return /* @__PURE__ */ u$1(
      "div",
      {
        className: "jop-tooltip-container",
        onMouseEnter: () => setIsVisible(true),
        onMouseLeave: () => setIsVisible(false),
        children: [
          children,
          isVisible && content ? /* @__PURE__ */ u$1("div", { className: "jop-tooltip", children: content }) : null
        ]
      }
    );
  }
  function Checkbox({
    label,
    value,
    tip,
    onChange
  }) {
    return /* @__PURE__ */ u$1("label", { className: "jop-checkbox", children: [
      /* @__PURE__ */ u$1(
        "input",
        {
          type: "checkbox",
          className: "jop-checkbox-input",
          checked: value,
          onChange: (event) => onChange(event.currentTarget.checked)
        }
      ),
      /* @__PURE__ */ u$1("span", { className: "jop-checkbox-custom" }),
      /* @__PURE__ */ u$1(Tooltip, { content: tip, children: /* @__PURE__ */ u$1("span", { className: "jop-checkbox-label", children: label }) })
    ] });
  }
  function Group({
    title,
    children
  }) {
    return /* @__PURE__ */ u$1(preact.Fragment, { children: [
      /* @__PURE__ */ u$1("h4", { className: "jop-setting-title", children: title }),
      /* @__PURE__ */ u$1("div", { className: "jop-setting-list", children })
    ] });
  }
  function Setting({
    siteList,
    disables,
    setDisables,
    multipleNavi,
    setMultipleNavi,
    hiddenError,
    setHiddenError,
    debugLogs,
    setDebugLogs
  }) {
    const [showSetting, setShowSetting] = h(false);
    const handleListChange = (item, enabled) => {
      const next = enabled ? disables.filter((name) => name !== item.name) : [...disables, item.name];
      setDisables(next);
      gm.setValue("disable", next);
    };
    const updateBooleanSetting = (key, value, setter) => {
      setter(value);
      gm.setValue(key, value);
    };
    return /* @__PURE__ */ u$1(preact.Fragment, { children: [
      !showSetting ? /* @__PURE__ */ u$1(
        "button",
        {
          type: "button",
          className: "jop-button_def",
          "aria-expanded": showSetting,
          onClick: () => setShowSetting(true),
          children: "设置"
        }
      ) : null,
      showSetting ? /* @__PURE__ */ u$1(preact.Fragment, { children: [
        /* @__PURE__ */ u$1("div", { className: "jop-setting", children: [
          /* @__PURE__ */ u$1(Group, { title: "勾选默认展示", children: siteList.map((item) => {
            const isEnabled = !disables.includes(item.name);
            return /* @__PURE__ */ u$1(
              Checkbox,
              {
                label: item.name,
                value: isEnabled,
                onChange: (checked) => handleListChange(item, checked)
              },
              item.name
            );
          }) }),
          /* @__PURE__ */ u$1(Group, { title: "其他设置", children: [
            /* @__PURE__ */ u$1(
              Checkbox,
              {
                label: "展示多个搜索结果",
                value: multipleNavi,
                tip: "一个站点内出现多条匹配结果时，打开后跳转到搜索结果页",
                onChange: (checked) => updateBooleanSetting("multipleNavi", checked, setMultipleNavi)
              }
            ),
            /* @__PURE__ */ u$1(
              Checkbox,
              {
                label: "隐藏失败结果",
                value: hiddenError,
                onChange: (checked) => updateBooleanSetting("hiddenError", checked, setHiddenError)
              }
            ),
            /* @__PURE__ */ u$1(
              Checkbox,
              {
                label: "开发日志",
                value: debugLogs,
                tip: "在控制台输出请求状态、CF 判断、命中原因等调试信息",
                onChange: (checked) => {
                  setDebugLogs(checked);
                  setDebugLogsEnabled(checked);
                }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ u$1(
          "button",
          {
            type: "button",
            className: "jop-button_def",
            "aria-expanded": showSetting,
            onClick: () => setShowSetting(false),
            children: "收起设置"
          }
        )
      ] }) : null
    ] });
  }
  function SiteButton({
    siteItem,
    libItem,
    CODE,
    multipleNavi,
    hiddenError
  }) {
    const formatCode = siteItem.codeFormatter ? siteItem.codeFormatter(CODE) : CODE;
    const directLink = typeof siteItem.directLinkResolver === "function" ? siteItem.directLinkResolver({ libItem, CODE, formatCode }) : "";
    if (siteItem.hideWhenNoDirectLink && !directLink) {
      return null;
    }
    const originLink = directLink || siteItem.url.replace("{{code}}", formatCode);
    const browseLink = directLink || (siteItem.browseUrl || siteItem.url).replace("{{code}}", formatCode);
    const [loading, setLoading] = h(false);
    const [fetchRes, setFetchRes] = h();
    y(() => {
      if (directLink) {
        setFetchRes({
          isSuccess: true,
          isCloudflare: false,
          resultLink: directLink
        });
        setLoading(false);
        return;
      }
      let active = true;
      setLoading(true);
      baseFetcher({ siteItem, targetLink: originLink, CODE: formatCode }).then((res) => {
        if (!active) return;
        setFetchRes(res);
        setLoading(false);
      });
      return () => {
        active = false;
      };
    }, [siteItem, libItem, CODE, originLink, directLink, formatCode]);
    const multipleFlag = multipleNavi && (fetchRes == null ? void 0 : fetchRes.multipleRes);
    let tag = multipleFlag ? "多结果" : fetchRes == null ? void 0 : fetchRes.tag;
    if (fetchRes == null ? void 0 : fetchRes.isCloudflare) {
      tag = tag ? `${tag} CF` : "CF";
    }
    const resultLink = multipleFlag ? browseLink : fetchRes == null ? void 0 : fetchRes.resultLink;
    const colorClass = (fetchRes == null ? void 0 : fetchRes.isCloudflare) ? "jop-button_yellow" : (fetchRes == null ? void 0 : fetchRes.isSuccess) ? "jop-button_green" : "jop-button_red";
    if (hiddenError && !(fetchRes == null ? void 0 : fetchRes.isSuccess) && !(fetchRes == null ? void 0 : fetchRes.isCloudflare)) {
      return null;
    }
    return /* @__PURE__ */ u$1(
      "a",
      {
        className: `jop-button ${loading ? "" : colorClass}`,
        target: "_blank",
        rel: "noreferrer",
        href: !resultLink ? browseLink : resultLink,
        onClick: (event) => {
          if (typeof siteItem.inlinePlayerResolver !== "function") return;
          event.preventDefault();
          siteItem.inlinePlayerResolver({
            libItem,
            CODE,
            formatCode,
            directLink
          });
        },
        children: [
          tag ? /* @__PURE__ */ u$1("div", { className: "jop-button_label", children: tag }) : null,
          /* @__PURE__ */ u$1("span", { children: siteItem.name })
        ]
      }
    );
  }
  function App({
    libItem,
    CODE,
    siteList
  }) {
    const [disables, setDisables] = h(gm.getValue("disable", DEFAULT_DISABLED_SITES));
    const [multipleNavi, setMultipleNavi] = h(gm.getValue("multipleNavi", true));
    const [hiddenError, setHiddenError] = h(gm.getValue("hiddenError", false));
    const [debugLogs, setDebugLogs] = h(getDebugLogsEnabled());
    const list = siteList.filter(
      (siteItem) => !disables.includes(siteItem.name) && !siteItem.hostname.includes(libItem.name)
    );
    return /* @__PURE__ */ u$1(preact.Fragment, { children: [
      /* @__PURE__ */ u$1("div", { className: "jop-list", children: list.map((siteItem) => /* @__PURE__ */ u$1(
        SiteButton,
        {
          siteItem,
          libItem,
          CODE,
          multipleNavi,
          hiddenError
        },
        siteItem.name
      )) }),
      /* @__PURE__ */ u$1(
        Setting,
        {
          siteList,
          disables,
          setDisables,
          multipleNavi,
          setMultipleNavi,
          hiddenError,
          setHiddenError,
          debugLogs,
          setDebugLogs
        }
      )
    ] });
  }
  const App$1 = M(App);
  function resolveLibSite() {
    return libSites.find(
      (item) => typeof item.resolve === "function" ? item.resolve() : !!document.querySelector(item.identifier)
    );
  }
  function createMountNode(libItem, panel) {
    let app;
    if (typeof libItem.resolve === "function") {
      const container = document.createElement("div");
      container.classList.add("infobox", "jop-infobox");
      const label = document.createElement("b");
      label.textContent = "在线观看：";
      container.appendChild(label);
      app = document.createElement("div");
      app.classList.add("jop-app");
      container.appendChild(app);
      panel.appendChild(container);
    } else {
      app = document.createElement("div");
      app.classList.add("jop-app");
      panel.append(app);
    }
    return app;
  }
  function main() {
    const libItem = resolveLibSite();
    if (!libItem) {
      console.error("||jop 匹配站点失败");
      return;
    }
    libItem.method();
    const CODE = resolveCode(libItem);
    if (!CODE) {
      console.error("||jop 提取番号失败");
      return;
    }
    const panel = document.querySelector(libItem.queries.panelQueryStr);
    if (!panel) {
      console.error("||jop 插入界面失败", libItem.queries.panelQueryStr);
      return;
    }
    const app = createMountNode(libItem, panel);
    const siteList = createVideoSites(detectCloudflareFromText).map(normalizeVideoSiteConfig);
    preact.render(/* @__PURE__ */ u$1(App$1, { libItem, CODE, siteList }), app);
    console.log("||脚本挂载成功", CODE);
  }
  main();

})(preact);