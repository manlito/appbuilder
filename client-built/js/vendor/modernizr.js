window.Modernizr = function(t, e, n) {
    function i(t) {
        y.cssText = t;
    }
    function r(t, e) {
        return i(x.join(t + ";") + (e || ""));
    }
    function o(t, e) {
        return typeof t === e;
    }
    function s(t, e) {
        return !!~("" + t).indexOf(e);
    }
    function a(t, e) {
        for (var i in t) {
            var r = t[i];
            if (!s(r, "-") && y[r] !== n) return "pfx" == e ? r : !0;
        }
        return !1;
    }
    function l(t, e, i) {
        for (var r in t) {
            var s = e[t[r]];
            if (s !== n) return i === !1 ? t[r] : o(s, "function") ? s.bind(i || e) : s;
        }
        return !1;
    }
    function c(t, e, n) {
        var i = t.charAt(0).toUpperCase() + t.slice(1), r = (t + " " + C.join(i + " ") + i).split(" ");
        return o(e, "string") || o(e, "undefined") ? a(r, e) : (r = (t + " " + T.join(i + " ") + i).split(" "), 
        l(r, e, n));
    }
    function u() {
        f.input = function(n) {
            for (var i = 0, r = n.length; r > i; i++) M[n[i]] = !!(n[i] in w);
            return M.list && (M.list = !(!e.createElement("datalist") || !t.HTMLDataListElement)), 
            M;
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), 
        f.inputtypes = function(t) {
            for (var i, r, o, s = 0, a = t.length; a > s; s++) w.setAttribute("type", r = t[s]), 
            i = "text" !== w.type, i && (w.value = $, w.style.cssText = "position:absolute;visibility:hidden;", 
            /^range$/.test(r) && w.style.WebkitAppearance !== n ? (m.appendChild(w), o = e.defaultView, 
            i = o.getComputedStyle && "textfield" !== o.getComputedStyle(w, null).WebkitAppearance && 0 !== w.offsetHeight, 
            m.removeChild(w)) : /^(search|tel)$/.test(r) || (i = /^(url|email)$/.test(r) ? w.checkValidity && w.checkValidity() === !1 : w.value != $)), 
            E[t[s]] = !!i;
            return E;
        }("search tel url email datetime date month week time datetime-local number range color".split(" "));
    }
    var h, d, p = "2.7.1", f = {}, g = !0, m = e.documentElement, v = "modernizr", b = e.createElement(v), y = b.style, w = e.createElement("input"), $ = ":)", _ = {}.toString, x = " -webkit- -moz- -o- -ms- ".split(" "), k = "Webkit Moz O ms", C = k.split(" "), T = k.toLowerCase().split(" "), S = {
        svg: "http://www.w3.org/2000/svg"
    }, D = {}, E = {}, M = {}, P = [], A = P.slice, O = function(t, n, i, r) {
        var o, s, a, l, c = e.createElement("div"), u = e.body, h = u || e.createElement("body");
        if (parseInt(i, 10)) for (;i--; ) a = e.createElement("div"), a.id = r ? r[i] : v + (i + 1), 
        c.appendChild(a);
        return o = [ "&#173;", '<style id="s', v, '">', t, "</style>" ].join(""), c.id = v, 
        (u ? c : h).innerHTML += o, h.appendChild(c), u || (h.style.background = "", h.style.overflow = "hidden", 
        l = m.style.overflow, m.style.overflow = "hidden", m.appendChild(h)), s = n(c, t), 
        u ? c.parentNode.removeChild(c) : (h.parentNode.removeChild(h), m.style.overflow = l), 
        !!s;
    }, I = function(e) {
        var n = t.matchMedia || t.msMatchMedia;
        if (n) return n(e).matches;
        var i;
        return O("@media " + e + " { #" + v + " { position: absolute; } }", function(e) {
            i = "absolute" == (t.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle).position;
        }), i;
    }, N = function() {
        function t(t, r) {
            r = r || e.createElement(i[t] || "div"), t = "on" + t;
            var s = t in r;
            return s || (r.setAttribute || (r = e.createElement("div")), r.setAttribute && r.removeAttribute && (r.setAttribute(t, ""), 
            s = o(r[t], "function"), o(r[t], "undefined") || (r[t] = n), r.removeAttribute(t))), 
            r = null, s;
        }
        var i = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        return t;
    }(), j = {}.hasOwnProperty;
    d = o(j, "undefined") || o(j.call, "undefined") ? function(t, e) {
        return e in t && o(t.constructor.prototype[e], "undefined");
    } : function(t, e) {
        return j.call(t, e);
    }, Function.prototype.bind || (Function.prototype.bind = function(t) {
        var e = this;
        if ("function" != typeof e) throw new TypeError();
        var n = A.call(arguments, 1), i = function() {
            if (this instanceof i) {
                var r = function() {};
                r.prototype = e.prototype;
                var o = new r(), s = e.apply(o, n.concat(A.call(arguments)));
                return Object(s) === s ? s : o;
            }
            return e.apply(t, n.concat(A.call(arguments)));
        };
        return i;
    }), D.flexbox = function() {
        return c("flexWrap");
    }, D.flexboxlegacy = function() {
        return c("boxDirection");
    }, D.canvas = function() {
        var t = e.createElement("canvas");
        return !(!t.getContext || !t.getContext("2d"));
    }, D.canvastext = function() {
        return !(!f.canvas || !o(e.createElement("canvas").getContext("2d").fillText, "function"));
    }, D.webgl = function() {
        return !!t.WebGLRenderingContext;
    }, D.touch = function() {
        var n;
        return "ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch ? n = !0 : O([ "@media (", x.join("touch-enabled),("), v, ")", "{#modernizr{top:9px;position:absolute}}" ].join(""), function(t) {
            n = 9 === t.offsetTop;
        }), n;
    }, D.geolocation = function() {
        return "geolocation" in navigator;
    }, D.postmessage = function() {
        return !!t.postMessage;
    }, D.websqldatabase = function() {
        return !!t.openDatabase;
    }, D.indexedDB = function() {
        return !!c("indexedDB", t);
    }, D.hashchange = function() {
        return N("hashchange", t) && (e.documentMode === n || e.documentMode > 7);
    }, D.history = function() {
        return !(!t.history || !history.pushState);
    }, D.draganddrop = function() {
        var t = e.createElement("div");
        return "draggable" in t || "ondragstart" in t && "ondrop" in t;
    }, D.websockets = function() {
        return "WebSocket" in t || "MozWebSocket" in t;
    }, D.rgba = function() {
        return i("background-color:rgba(150,255,150,.5)"), s(y.backgroundColor, "rgba");
    }, D.hsla = function() {
        return i("background-color:hsla(120,40%,100%,.5)"), s(y.backgroundColor, "rgba") || s(y.backgroundColor, "hsla");
    }, D.multiplebgs = function() {
        return i("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(y.background);
    }, D.backgroundsize = function() {
        return c("backgroundSize");
    }, D.borderimage = function() {
        return c("borderImage");
    }, D.borderradius = function() {
        return c("borderRadius");
    }, D.boxshadow = function() {
        return c("boxShadow");
    }, D.textshadow = function() {
        return "" === e.createElement("div").style.textShadow;
    }, D.opacity = function() {
        return r("opacity:.55"), /^0.55$/.test(y.opacity);
    }, D.cssanimations = function() {
        return c("animationName");
    }, D.csscolumns = function() {
        return c("columnCount");
    }, D.cssgradients = function() {
        var t = "background-image:", e = "gradient(linear,left top,right bottom,from(#9f9),to(white));", n = "linear-gradient(left top,#9f9, white);";
        return i((t + "-webkit- ".split(" ").join(e + t) + x.join(n + t)).slice(0, -t.length)), 
        s(y.backgroundImage, "gradient");
    }, D.cssreflections = function() {
        return c("boxReflect");
    }, D.csstransforms = function() {
        return !!c("transform");
    }, D.csstransforms3d = function() {
        var t = !!c("perspective");
        return t && "webkitPerspective" in m.style && O("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(e) {
            t = 9 === e.offsetLeft && 3 === e.offsetHeight;
        }), t;
    }, D.csstransitions = function() {
        return c("transition");
    }, D.fontface = function() {
        var t;
        return O('@font-face {font-family:"font";src:url("https://")}', function(n, i) {
            var r = e.getElementById("smodernizr"), o = r.sheet || r.styleSheet, s = o ? o.cssRules && o.cssRules[0] ? o.cssRules[0].cssText : o.cssText || "" : "";
            t = /src/i.test(s) && 0 === s.indexOf(i.split(" ")[0]);
        }), t;
    }, D.generatedcontent = function() {
        var t;
        return O([ "#", v, "{font:0/0 a}#", v, ':after{content:"', $, '";visibility:hidden;font:3px/1 a}' ].join(""), function(e) {
            t = e.offsetHeight >= 3;
        }), t;
    }, D.video = function() {
        var t = e.createElement("video"), n = !1;
        try {
            (n = !!t.canPlayType) && (n = new Boolean(n), n.ogg = t.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), 
            n.h264 = t.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = t.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""));
        } catch (i) {}
        return n;
    }, D.audio = function() {
        var t = e.createElement("audio"), n = !1;
        try {
            (n = !!t.canPlayType) && (n = new Boolean(n), n.ogg = t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), 
            n.mp3 = t.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = t.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), 
            n.m4a = (t.canPlayType("audio/x-m4a;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""));
        } catch (i) {}
        return n;
    }, D.localstorage = function() {
        try {
            return localStorage.setItem(v, v), localStorage.removeItem(v), !0;
        } catch (t) {
            return !1;
        }
    }, D.sessionstorage = function() {
        try {
            return sessionStorage.setItem(v, v), sessionStorage.removeItem(v), !0;
        } catch (t) {
            return !1;
        }
    }, D.webworkers = function() {
        return !!t.Worker;
    }, D.applicationcache = function() {
        return !!t.applicationCache;
    }, D.svg = function() {
        return !!e.createElementNS && !!e.createElementNS(S.svg, "svg").createSVGRect;
    }, D.inlinesvg = function() {
        var t = e.createElement("div");
        return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) == S.svg;
    }, D.smil = function() {
        return !!e.createElementNS && /SVGAnimate/.test(_.call(e.createElementNS(S.svg, "animate")));
    }, D.svgclippaths = function() {
        return !!e.createElementNS && /SVGClipPath/.test(_.call(e.createElementNS(S.svg, "clipPath")));
    };
    for (var F in D) d(D, F) && (h = F.toLowerCase(), f[h] = D[F](), P.push((f[h] ? "" : "no-") + h));
    return f.input || u(), f.addTest = function(t, e) {
        if ("object" == typeof t) for (var i in t) d(t, i) && f.addTest(i, t[i]); else {
            if (t = t.toLowerCase(), f[t] !== n) return f;
            e = "function" == typeof e ? e() : e, "undefined" != typeof g && g && (m.className += " " + (e ? "" : "no-") + t), 
            f[t] = e;
        }
        return f;
    }, i(""), b = w = null, function(t, e) {
        function n(t, e) {
            var n = t.createElement("p"), i = t.getElementsByTagName("head")[0] || t.documentElement;
            return n.innerHTML = "x<style>" + e + "</style>", i.insertBefore(n.lastChild, i.firstChild);
        }
        function i() {
            var t = b.elements;
            return "string" == typeof t ? t.split(" ") : t;
        }
        function r(t) {
            var e = v[t[g]];
            return e || (e = {}, m++, t[g] = m, v[m] = e), e;
        }
        function o(t, n, i) {
            if (n || (n = e), u) return n.createElement(t);
            i || (i = r(n));
            var o;
            return o = i.cache[t] ? i.cache[t].cloneNode() : f.test(t) ? (i.cache[t] = i.createElem(t)).cloneNode() : i.createElem(t), 
            !o.canHaveChildren || p.test(t) || o.tagUrn ? o : i.frag.appendChild(o);
        }
        function s(t, n) {
            if (t || (t = e), u) return t.createDocumentFragment();
            n = n || r(t);
            for (var o = n.frag.cloneNode(), s = 0, a = i(), l = a.length; l > s; s++) o.createElement(a[s]);
            return o;
        }
        function a(t, e) {
            e.cache || (e.cache = {}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, 
            e.frag = e.createFrag()), t.createElement = function(n) {
                return b.shivMethods ? o(n, t, e) : e.createElem(n);
            }, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/[\w\-]+/g, function(t) {
                return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")';
            }) + ");return n}")(b, e.frag);
        }
        function l(t) {
            t || (t = e);
            var i = r(t);
            return !b.shivCSS || c || i.hasCSS || (i.hasCSS = !!n(t, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), 
            u || a(t, i), t;
        }
        var c, u, h = "3.7.0", d = t.html5 || {}, p = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, g = "_html5shiv", m = 0, v = {};
        !function() {
            try {
                var t = e.createElement("a");
                t.innerHTML = "<xyz></xyz>", c = "hidden" in t, u = 1 == t.childNodes.length || function() {
                    e.createElement("a");
                    var t = e.createDocumentFragment();
                    return "undefined" == typeof t.cloneNode || "undefined" == typeof t.createDocumentFragment || "undefined" == typeof t.createElement;
                }();
            } catch (n) {
                c = !0, u = !0;
            }
        }();
        var b = {
            elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: h,
            shivCSS: d.shivCSS !== !1,
            supportsUnknownElements: u,
            shivMethods: d.shivMethods !== !1,
            type: "default",
            shivDocument: l,
            createElement: o,
            createDocumentFragment: s
        };
        t.html5 = b, l(e);
    }(this, e), f._version = p, f._prefixes = x, f._domPrefixes = T, f._cssomPrefixes = C, 
    f.mq = I, f.hasEvent = N, f.testProp = function(t) {
        return a([ t ]);
    }, f.testAllProps = c, f.testStyles = O, f.prefixed = function(t, e, n) {
        return e ? c(t, e, n) : c(t, "pfx");
    }, m.className = m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (g ? " js " + P.join(" ") : ""), 
    f;
}(this, this.document);