window.Modernizr = function(window, document, undefined) {
    function setCss(str) {
        mStyle.cssText = str;
    }
    function setCssAll(str1, str2) {
        return setCss(prefixes.join(str1 + ";") + (str2 || ""));
    }
    function is(obj, type) {
        return typeof obj === type;
    }
    function contains(str, substr) {
        return !!~("" + str).indexOf(substr);
    }
    function testProps(props, prefixed) {
        for (var i in props) {
            var prop = props[i];
            if (!contains(prop, "-") && mStyle[prop] !== undefined) return "pfx" == prefixed ? prop : !0;
        }
        return !1;
    }
    function testDOMProps(props, obj, elem) {
        for (var i in props) {
            var item = obj[props[i]];
            if (item !== undefined) return elem === !1 ? props[i] : is(item, "function") ? item.bind(elem || obj) : item;
        }
        return !1;
    }
    function testPropsAll(prop, prefixed, elem) {
        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1), props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(" ");
        return is(prefixed, "string") || is(prefixed, "undefined") ? testProps(props, prefixed) : (props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" "), 
        testDOMProps(props, prefixed, elem));
    }
    function webforms() {
        Modernizr.input = function(props) {
            for (var i = 0, len = props.length; len > i; i++) attrs[props[i]] = !!(props[i] in inputElem);
            return attrs.list && (attrs.list = !(!document.createElement("datalist") || !window.HTMLDataListElement)), 
            attrs;
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), 
        Modernizr.inputtypes = function(props) {
            for (var bool, inputElemType, defaultView, i = 0, len = props.length; len > i; i++) inputElem.setAttribute("type", inputElemType = props[i]), 
            bool = "text" !== inputElem.type, bool && (inputElem.value = smile, inputElem.style.cssText = "position:absolute;visibility:hidden;", 
            /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ? (docElement.appendChild(inputElem), 
            defaultView = document.defaultView, bool = defaultView.getComputedStyle && "textfield" !== defaultView.getComputedStyle(inputElem, null).WebkitAppearance && 0 !== inputElem.offsetHeight, 
            docElement.removeChild(inputElem)) : /^(search|tel)$/.test(inputElemType) || (bool = /^(url|email)$/.test(inputElemType) ? inputElem.checkValidity && inputElem.checkValidity() === !1 : inputElem.value != smile)), 
            inputs[props[i]] = !!bool;
            return inputs;
        }("search tel url email datetime date month week time datetime-local number range color".split(" "));
    }
    var featureName, hasOwnProp, version = "2.7.1", Modernizr = {}, enableClasses = !0, docElement = document.documentElement, mod = "modernizr", modElem = document.createElement(mod), mStyle = modElem.style, inputElem = document.createElement("input"), smile = ":)", toString = {}.toString, prefixes = " -webkit- -moz- -o- -ms- ".split(" "), omPrefixes = "Webkit Moz O ms", cssomPrefixes = omPrefixes.split(" "), domPrefixes = omPrefixes.toLowerCase().split(" "), ns = {
        svg: "http://www.w3.org/2000/svg"
    }, tests = {}, inputs = {}, attrs = {}, classes = [], slice = classes.slice, injectElementWithStyles = function(rule, callback, nodes, testnames) {
        var style, ret, node, docOverflow, div = document.createElement("div"), body = document.body, fakeBody = body || document.createElement("body");
        if (parseInt(nodes, 10)) for (;nodes--; ) node = document.createElement("div"), 
        node.id = testnames ? testnames[nodes] : mod + (nodes + 1), div.appendChild(node);
        return style = [ "&#173;", '<style id="s', mod, '">', rule, "</style>" ].join(""), 
        div.id = mod, (body ? div : fakeBody).innerHTML += style, fakeBody.appendChild(div), 
        body || (fakeBody.style.background = "", fakeBody.style.overflow = "hidden", docOverflow = docElement.style.overflow, 
        docElement.style.overflow = "hidden", docElement.appendChild(fakeBody)), ret = callback(div, rule), 
        body ? div.parentNode.removeChild(div) : (fakeBody.parentNode.removeChild(fakeBody), 
        docElement.style.overflow = docOverflow), !!ret;
    }, testMediaQuery = function(mq) {
        var matchMedia = window.matchMedia || window.msMatchMedia;
        if (matchMedia) return matchMedia(mq).matches;
        var bool;
        return injectElementWithStyles("@media " + mq + " { #" + mod + " { position: absolute; } }", function(node) {
            bool = "absolute" == (window.getComputedStyle ? getComputedStyle(node, null) : node.currentStyle).position;
        }), bool;
    }, isEventSupported = function() {
        function isEventSupported(eventName, element) {
            element = element || document.createElement(TAGNAMES[eventName] || "div"), eventName = "on" + eventName;
            var isSupported = eventName in element;
            return isSupported || (element.setAttribute || (element = document.createElement("div")), 
            element.setAttribute && element.removeAttribute && (element.setAttribute(eventName, ""), 
            isSupported = is(element[eventName], "function"), is(element[eventName], "undefined") || (element[eventName] = undefined), 
            element.removeAttribute(eventName))), element = null, isSupported;
        }
        var TAGNAMES = {
            select: "input",
            change: "input",
            submit: "form",
            reset: "form",
            error: "img",
            load: "img",
            abort: "img"
        };
        return isEventSupported;
    }(), _hasOwnProperty = {}.hasOwnProperty;
    hasOwnProp = is(_hasOwnProperty, "undefined") || is(_hasOwnProperty.call, "undefined") ? function(object, property) {
        return property in object && is(object.constructor.prototype[property], "undefined");
    } : function(object, property) {
        return _hasOwnProperty.call(object, property);
    }, Function.prototype.bind || (Function.prototype.bind = function(that) {
        var target = this;
        if ("function" != typeof target) throw new TypeError();
        var args = slice.call(arguments, 1), bound = function() {
            if (this instanceof bound) {
                var F = function() {};
                F.prototype = target.prototype;
                var self = new F(), result = target.apply(self, args.concat(slice.call(arguments)));
                return Object(result) === result ? result : self;
            }
            return target.apply(that, args.concat(slice.call(arguments)));
        };
        return bound;
    }), tests.flexbox = function() {
        return testPropsAll("flexWrap");
    }, tests.flexboxlegacy = function() {
        return testPropsAll("boxDirection");
    }, tests.canvas = function() {
        var elem = document.createElement("canvas");
        return !(!elem.getContext || !elem.getContext("2d"));
    }, tests.canvastext = function() {
        return !(!Modernizr.canvas || !is(document.createElement("canvas").getContext("2d").fillText, "function"));
    }, tests.webgl = function() {
        return !!window.WebGLRenderingContext;
    }, tests.touch = function() {
        var bool;
        return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch ? bool = !0 : injectElementWithStyles([ "@media (", prefixes.join("touch-enabled),("), mod, ")", "{#modernizr{top:9px;position:absolute}}" ].join(""), function(node) {
            bool = 9 === node.offsetTop;
        }), bool;
    }, tests.geolocation = function() {
        return "geolocation" in navigator;
    }, tests.postmessage = function() {
        return !!window.postMessage;
    }, tests.websqldatabase = function() {
        return !!window.openDatabase;
    }, tests.indexedDB = function() {
        return !!testPropsAll("indexedDB", window);
    }, tests.hashchange = function() {
        return isEventSupported("hashchange", window) && (document.documentMode === undefined || document.documentMode > 7);
    }, tests.history = function() {
        return !(!window.history || !history.pushState);
    }, tests.draganddrop = function() {
        var div = document.createElement("div");
        return "draggable" in div || "ondragstart" in div && "ondrop" in div;
    }, tests.websockets = function() {
        return "WebSocket" in window || "MozWebSocket" in window;
    }, tests.rgba = function() {
        return setCss("background-color:rgba(150,255,150,.5)"), contains(mStyle.backgroundColor, "rgba");
    }, tests.hsla = function() {
        return setCss("background-color:hsla(120,40%,100%,.5)"), contains(mStyle.backgroundColor, "rgba") || contains(mStyle.backgroundColor, "hsla");
    }, tests.multiplebgs = function() {
        return setCss("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(mStyle.background);
    }, tests.backgroundsize = function() {
        return testPropsAll("backgroundSize");
    }, tests.borderimage = function() {
        return testPropsAll("borderImage");
    }, tests.borderradius = function() {
        return testPropsAll("borderRadius");
    }, tests.boxshadow = function() {
        return testPropsAll("boxShadow");
    }, tests.textshadow = function() {
        return "" === document.createElement("div").style.textShadow;
    }, tests.opacity = function() {
        return setCssAll("opacity:.55"), /^0.55$/.test(mStyle.opacity);
    }, tests.cssanimations = function() {
        return testPropsAll("animationName");
    }, tests.csscolumns = function() {
        return testPropsAll("columnCount");
    }, tests.cssgradients = function() {
        var str1 = "background-image:", str2 = "gradient(linear,left top,right bottom,from(#9f9),to(white));", str3 = "linear-gradient(left top,#9f9, white);";
        return setCss((str1 + "-webkit- ".split(" ").join(str2 + str1) + prefixes.join(str3 + str1)).slice(0, -str1.length)), 
        contains(mStyle.backgroundImage, "gradient");
    }, tests.cssreflections = function() {
        return testPropsAll("boxReflect");
    }, tests.csstransforms = function() {
        return !!testPropsAll("transform");
    }, tests.csstransforms3d = function() {
        var ret = !!testPropsAll("perspective");
        return ret && "webkitPerspective" in docElement.style && injectElementWithStyles("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(node) {
            ret = 9 === node.offsetLeft && 3 === node.offsetHeight;
        }), ret;
    }, tests.csstransitions = function() {
        return testPropsAll("transition");
    }, tests.fontface = function() {
        var bool;
        return injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function(node, rule) {
            var style = document.getElementById("smodernizr"), sheet = style.sheet || style.styleSheet, cssText = sheet ? sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || "" : "";
            bool = /src/i.test(cssText) && 0 === cssText.indexOf(rule.split(" ")[0]);
        }), bool;
    }, tests.generatedcontent = function() {
        var bool;
        return injectElementWithStyles([ "#", mod, "{font:0/0 a}#", mod, ':after{content:"', smile, '";visibility:hidden;font:3px/1 a}' ].join(""), function(node) {
            bool = node.offsetHeight >= 3;
        }), bool;
    }, tests.video = function() {
        var elem = document.createElement("video"), bool = !1;
        try {
            (bool = !!elem.canPlayType) && (bool = new Boolean(bool), bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), 
            bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), 
            bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""));
        } catch (e) {}
        return bool;
    }, tests.audio = function() {
        var elem = document.createElement("audio"), bool = !1;
        try {
            (bool = !!elem.canPlayType) && (bool = new Boolean(bool), bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), 
            bool.mp3 = elem.canPlayType("audio/mpeg;").replace(/^no$/, ""), bool.wav = elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), 
            bool.m4a = (elem.canPlayType("audio/x-m4a;") || elem.canPlayType("audio/aac;")).replace(/^no$/, ""));
        } catch (e) {}
        return bool;
    }, tests.localstorage = function() {
        try {
            return localStorage.setItem(mod, mod), localStorage.removeItem(mod), !0;
        } catch (e) {
            return !1;
        }
    }, tests.sessionstorage = function() {
        try {
            return sessionStorage.setItem(mod, mod), sessionStorage.removeItem(mod), !0;
        } catch (e) {
            return !1;
        }
    }, tests.webworkers = function() {
        return !!window.Worker;
    }, tests.applicationcache = function() {
        return !!window.applicationCache;
    }, tests.svg = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, "svg").createSVGRect;
    }, tests.inlinesvg = function() {
        var div = document.createElement("div");
        return div.innerHTML = "<svg/>", (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    }, tests.smil = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, "animate")));
    }, tests.svgclippaths = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, "clipPath")));
    };
    for (var feature in tests) hasOwnProp(tests, feature) && (featureName = feature.toLowerCase(), 
    Modernizr[featureName] = tests[feature](), classes.push((Modernizr[featureName] ? "" : "no-") + featureName));
    return Modernizr.input || webforms(), Modernizr.addTest = function(feature, test) {
        if ("object" == typeof feature) for (var key in feature) hasOwnProp(feature, key) && Modernizr.addTest(key, feature[key]); else {
            if (feature = feature.toLowerCase(), Modernizr[feature] !== undefined) return Modernizr;
            test = "function" == typeof test ? test() : test, "undefined" != typeof enableClasses && enableClasses && (docElement.className += " " + (test ? "" : "no-") + feature), 
            Modernizr[feature] = test;
        }
        return Modernizr;
    }, setCss(""), modElem = inputElem = null, function(window, document) {
        function addStyleSheet(ownerDocument, cssText) {
            var p = ownerDocument.createElement("p"), parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
            return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild);
        }
        function getElements() {
            var elements = html5.elements;
            return "string" == typeof elements ? elements.split(" ") : elements;
        }
        function getExpandoData(ownerDocument) {
            var data = expandoData[ownerDocument[expando]];
            return data || (data = {}, expanID++, ownerDocument[expando] = expanID, expandoData[expanID] = data), 
            data;
        }
        function createElement(nodeName, ownerDocument, data) {
            if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createElement(nodeName);
            data || (data = getExpandoData(ownerDocument));
            var node;
            return node = data.cache[nodeName] ? data.cache[nodeName].cloneNode() : saveClones.test(nodeName) ? (data.cache[nodeName] = data.createElem(nodeName)).cloneNode() : data.createElem(nodeName), 
            !node.canHaveChildren || reSkip.test(nodeName) || node.tagUrn ? node : data.frag.appendChild(node);
        }
        function createDocumentFragment(ownerDocument, data) {
            if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createDocumentFragment();
            data = data || getExpandoData(ownerDocument);
            for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; l > i; i++) clone.createElement(elems[i]);
            return clone;
        }
        function shivMethods(ownerDocument, data) {
            data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment, 
            data.frag = data.createFrag()), ownerDocument.createElement = function(nodeName) {
                return html5.shivMethods ? createElement(nodeName, ownerDocument, data) : data.createElem(nodeName);
            }, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + getElements().join().replace(/[\w\-]+/g, function(nodeName) {
                return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")';
            }) + ");return n}")(html5, data.frag);
        }
        function shivDocument(ownerDocument) {
            ownerDocument || (ownerDocument = document);
            var data = getExpandoData(ownerDocument);
            return !html5.shivCSS || supportsHtml5Styles || data.hasCSS || (data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), 
            supportsUnknownElements || shivMethods(ownerDocument, data), ownerDocument;
        }
        var supportsHtml5Styles, supportsUnknownElements, version = "3.7.0", options = window.html5 || {}, reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, expando = "_html5shiv", expanID = 0, expandoData = {};
        !function() {
            try {
                var a = document.createElement("a");
                a.innerHTML = "<xyz></xyz>", supportsHtml5Styles = "hidden" in a, supportsUnknownElements = 1 == a.childNodes.length || function() {
                    document.createElement("a");
                    var frag = document.createDocumentFragment();
                    return "undefined" == typeof frag.cloneNode || "undefined" == typeof frag.createDocumentFragment || "undefined" == typeof frag.createElement;
                }();
            } catch (e) {
                supportsHtml5Styles = !0, supportsUnknownElements = !0;
            }
        }();
        var html5 = {
            elements: options.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: version,
            shivCSS: options.shivCSS !== !1,
            supportsUnknownElements: supportsUnknownElements,
            shivMethods: options.shivMethods !== !1,
            type: "default",
            shivDocument: shivDocument,
            createElement: createElement,
            createDocumentFragment: createDocumentFragment
        };
        window.html5 = html5, shivDocument(document);
    }(this, document), Modernizr._version = version, Modernizr._prefixes = prefixes, 
    Modernizr._domPrefixes = domPrefixes, Modernizr._cssomPrefixes = cssomPrefixes, 
    Modernizr.mq = testMediaQuery, Modernizr.hasEvent = isEventSupported, Modernizr.testProp = function(prop) {
        return testProps([ prop ]);
    }, Modernizr.testAllProps = testPropsAll, Modernizr.testStyles = injectElementWithStyles, 
    Modernizr.prefixed = function(prop, obj, elem) {
        return obj ? testPropsAll(prop, obj, elem) : testPropsAll(prop, "pfx");
    }, docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (enableClasses ? " js " + classes.join(" ") : ""), 
    Modernizr;
}(this, this.document);