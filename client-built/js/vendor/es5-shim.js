!function(t) {
    "function" == typeof define ? define(t) : "function" == typeof YUI ? YUI.add("es5", t) : t();
}(function() {
    function t() {}
    function e(t) {
        return t = +t, t !== t ? t = 0 : 0 !== t && t !== 1 / 0 && t !== -(1 / 0) && (t = (t > 0 || -1) * Math.floor(Math.abs(t))), 
        t;
    }
    function n(t) {
        var e = typeof t;
        return null === t || "undefined" === e || "boolean" === e || "number" === e || "string" === e;
    }
    function i(t) {
        var e, i, r;
        if (n(t)) return t;
        if (i = t.valueOf, "function" == typeof i && (e = i.call(t), n(e))) return e;
        if (r = t.toString, "function" == typeof r && (e = r.call(t), n(e))) return e;
        throw new TypeError();
    }
    Function.prototype.bind || (Function.prototype.bind = function(e) {
        var n = this;
        if ("function" != typeof n) throw new TypeError("Function.prototype.bind called on incompatible " + n);
        var i = d.call(arguments, 1), r = function() {
            if (this instanceof r) {
                var t = n.apply(this, i.concat(d.call(arguments)));
                return Object(t) === t ? t : this;
            }
            return n.apply(e, i.concat(d.call(arguments)));
        };
        return n.prototype && (t.prototype = n.prototype, r.prototype = new t(), t.prototype = null), 
        r;
    });
    var r, o, s, a, l, c = Function.prototype.call, u = Array.prototype, h = Object.prototype, d = u.slice, p = c.bind(h.toString), f = c.bind(h.hasOwnProperty);
    if ((l = f(h, "__defineGetter__")) && (r = c.bind(h.__defineGetter__), o = c.bind(h.__defineSetter__), 
    s = c.bind(h.__lookupGetter__), a = c.bind(h.__lookupSetter__)), 2 != [ 1, 2 ].splice(0).length) {
        var g = Array.prototype.splice;
        Array.prototype.splice = function() {
            function t(t) {
                for (var e = []; t--; ) e.unshift(t);
                return e;
            }
            var e, n = [];
            return n.splice.bind(n, 0, 0).apply(null, t(20)), n.splice.bind(n, 0, 0).apply(null, t(26)), 
            e = n.length, n.splice(5, 0, "XXX"), e + 1 == n.length ? !0 : void 0;
        }() ? function(t, e) {
            return arguments.length ? g.apply(this, [ void 0 === t ? 0 : t, void 0 === e ? this.length - t : e ].concat(d.call(arguments, 2))) : [];
        } : function(t, e) {
            var n, i = d.call(arguments, 2), r = i.length;
            if (!arguments.length) return [];
            if (void 0 === t && (t = 0), void 0 === e && (e = this.length - t), r > 0) {
                if (0 >= e) {
                    if (t == this.length) return this.push.apply(this, i), [];
                    if (0 == t) return this.unshift.apply(this, i), [];
                }
                return n = d.call(this, t, t + e), i.push.apply(i, d.call(this, t + e, this.length)), 
                i.unshift.apply(i, d.call(this, 0, t)), i.unshift(0, this.length), g.apply(this, i), 
                n;
            }
            return g.call(this, t, e);
        };
    }
    if (1 != [].unshift(0)) {
        var m = Array.prototype.unshift;
        Array.prototype.unshift = function() {
            return m.apply(this, arguments), this.length;
        };
    }
    Array.isArray || (Array.isArray = function(t) {
        return "[object Array]" == p(t);
    });
    var v = Object("a"), b = "a" != v[0] || !(0 in v);
    if (Array.prototype.forEach || (Array.prototype.forEach = function(t) {
        var e = A(this), n = b && "[object String]" == p(this) ? this.split("") : e, i = arguments[1], r = -1, o = n.length >>> 0;
        if ("[object Function]" != p(t)) throw new TypeError();
        for (;++r < o; ) r in n && t.call(i, n[r], r, e);
    }), Array.prototype.map || (Array.prototype.map = function(t) {
        var e = A(this), n = b && "[object String]" == p(this) ? this.split("") : e, i = n.length >>> 0, r = Array(i), o = arguments[1];
        if ("[object Function]" != p(t)) throw new TypeError(t + " is not a function");
        for (var s = 0; i > s; s++) s in n && (r[s] = t.call(o, n[s], s, e));
        return r;
    }), Array.prototype.filter || (Array.prototype.filter = function(t) {
        var e, n = A(this), i = b && "[object String]" == p(this) ? this.split("") : n, r = i.length >>> 0, o = [], s = arguments[1];
        if ("[object Function]" != p(t)) throw new TypeError(t + " is not a function");
        for (var a = 0; r > a; a++) a in i && (e = i[a], t.call(s, e, a, n) && o.push(e));
        return o;
    }), Array.prototype.every || (Array.prototype.every = function(t) {
        var e = A(this), n = b && "[object String]" == p(this) ? this.split("") : e, i = n.length >>> 0, r = arguments[1];
        if ("[object Function]" != p(t)) throw new TypeError(t + " is not a function");
        for (var o = 0; i > o; o++) if (o in n && !t.call(r, n[o], o, e)) return !1;
        return !0;
    }), Array.prototype.some || (Array.prototype.some = function(t) {
        var e = A(this), n = b && "[object String]" == p(this) ? this.split("") : e, i = n.length >>> 0, r = arguments[1];
        if ("[object Function]" != p(t)) throw new TypeError(t + " is not a function");
        for (var o = 0; i > o; o++) if (o in n && t.call(r, n[o], o, e)) return !0;
        return !1;
    }), Array.prototype.reduce || (Array.prototype.reduce = function(t) {
        var e = A(this), n = b && "[object String]" == p(this) ? this.split("") : e, i = n.length >>> 0;
        if ("[object Function]" != p(t)) throw new TypeError(t + " is not a function");
        if (!i && 1 == arguments.length) throw new TypeError("reduce of empty array with no initial value");
        var r, o = 0;
        if (arguments.length >= 2) r = arguments[1]; else for (;;) {
            if (o in n) {
                r = n[o++];
                break;
            }
            if (++o >= i) throw new TypeError("reduce of empty array with no initial value");
        }
        for (;i > o; o++) o in n && (r = t.call(void 0, r, n[o], o, e));
        return r;
    }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function(t) {
        var e = A(this), n = b && "[object String]" == p(this) ? this.split("") : e, i = n.length >>> 0;
        if ("[object Function]" != p(t)) throw new TypeError(t + " is not a function");
        if (!i && 1 == arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
        var r, o = i - 1;
        if (arguments.length >= 2) r = arguments[1]; else for (;;) {
            if (o in n) {
                r = n[o--];
                break;
            }
            if (--o < 0) throw new TypeError("reduceRight of empty array with no initial value");
        }
        if (0 > o) return r;
        do o in this && (r = t.call(void 0, r, n[o], o, e)); while (o--);
        return r;
    }), Array.prototype.indexOf && -1 == [ 0, 1 ].indexOf(1, 2) || (Array.prototype.indexOf = function(t) {
        var n = b && "[object String]" == p(this) ? this.split("") : A(this), i = n.length >>> 0;
        if (!i) return -1;
        var r = 0;
        for (arguments.length > 1 && (r = e(arguments[1])), r = r >= 0 ? r : Math.max(0, i + r); i > r; r++) if (r in n && n[r] === t) return r;
        return -1;
    }), Array.prototype.lastIndexOf && -1 == [ 0, 1 ].lastIndexOf(0, -3) || (Array.prototype.lastIndexOf = function(t) {
        var n = b && "[object String]" == p(this) ? this.split("") : A(this), i = n.length >>> 0;
        if (!i) return -1;
        var r = i - 1;
        for (arguments.length > 1 && (r = Math.min(r, e(arguments[1]))), r = r >= 0 ? r : i - Math.abs(r); r >= 0; r--) if (r in n && t === n[r]) return r;
        return -1;
    }), !Object.keys) {
        var y = !0, w = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], $ = w.length;
        for (var _ in {
            toString: null
        }) y = !1;
        Object.keys = function O(t) {
            if ("object" != typeof t && "function" != typeof t || null === t) throw new TypeError("Object.keys called on a non-object");
            var O = [];
            for (var e in t) f(t, e) && O.push(e);
            if (y) for (var n = 0, i = $; i > n; n++) {
                var r = w[n];
                f(t, r) && O.push(r);
            }
            return O;
        };
    }
    var x = -621987552e5, k = "-000001";
    Date.prototype.toISOString && -1 !== new Date(x).toISOString().indexOf(k) || (Date.prototype.toISOString = function() {
        var t, e, n, i, r;
        if (!isFinite(this)) throw new RangeError("Date.prototype.toISOString called on non-finite value.");
        for (i = this.getUTCFullYear(), r = this.getUTCMonth(), i += Math.floor(r / 12), 
        r = (r % 12 + 12) % 12, t = [ r + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds() ], 
        i = (0 > i ? "-" : i > 9999 ? "+" : "") + ("00000" + Math.abs(i)).slice(i >= 0 && 9999 >= i ? -4 : -6), 
        e = t.length; e--; ) n = t[e], 10 > n && (t[e] = "0" + n);
        return i + "-" + t.slice(0, 2).join("-") + "T" + t.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z";
    });
    var C = !1;
    try {
        C = Date.prototype.toJSON && null === new Date(0/0).toJSON() && -1 !== new Date(x).toJSON().indexOf(k) && Date.prototype.toJSON.call({
            toISOString: function() {
                return !0;
            }
        });
    } catch (T) {}
    C || (Date.prototype.toJSON = function() {
        var t, e = Object(this), n = i(e);
        if ("number" == typeof n && !isFinite(n)) return null;
        if (t = e.toISOString, "function" != typeof t) throw new TypeError("toISOString property is not callable");
        return t.call(e);
    }), Date = function(t) {
        function e(n, i, r, o, s, a, l) {
            var c = arguments.length;
            if (this instanceof t) {
                var u = 1 == c && String(n) === n ? new t(e.parse(n)) : c >= 7 ? new t(n, i, r, o, s, a, l) : c >= 6 ? new t(n, i, r, o, s, a) : c >= 5 ? new t(n, i, r, o, s) : c >= 4 ? new t(n, i, r, o) : c >= 3 ? new t(n, i, r) : c >= 2 ? new t(n, i) : c >= 1 ? new t(n) : new t();
                return u.constructor = e, u;
            }
            return t.apply(this, arguments);
        }
        function n(t, e) {
            var n = e > 1 ? 1 : 0;
            return r[e] + Math.floor((t - 1969 + n) / 4) - Math.floor((t - 1901 + n) / 100) + Math.floor((t - 1601 + n) / 400) + 365 * (t - 1970);
        }
        var i = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"), r = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365 ];
        for (var o in t) e[o] = t[o];
        return e.now = t.now, e.UTC = t.UTC, e.prototype = t.prototype, e.prototype.constructor = e, 
        e.parse = function(e) {
            var r = i.exec(e);
            if (r) {
                var o, s = Number(r[1]), a = Number(r[2] || 1) - 1, l = Number(r[3] || 1) - 1, c = Number(r[4] || 0), u = Number(r[5] || 0), h = Number(r[6] || 0), d = Math.floor(1e3 * Number(r[7] || 0)), p = !r[4] || r[8] ? 0 : Number(new t(1970, 0)), f = "-" === r[9] ? 1 : -1, g = Number(r[10] || 0), m = Number(r[11] || 0);
                return (u > 0 || h > 0 || d > 0 ? 24 : 25) > c && 60 > u && 60 > h && 1e3 > d && a > -1 && 12 > a && 24 > g && 60 > m && l > -1 && l < n(s, a + 1) - n(s, a) && (o = 60 * (24 * (n(s, a) + l) + c + g * f), 
                o = 1e3 * (60 * (o + u + m * f) + h) + d + p, o >= -864e13 && 864e13 >= o) ? o : 0/0;
            }
            return t.parse.apply(this, arguments);
        }, e;
    }(Date), Date.now || (Date.now = function() {
        return new Date().getTime();
    }), Number.prototype.toFixed && "0.000" === 8e-5.toFixed(3) && "0" !== .9.toFixed(0) && "1.25" === 1.255.toFixed(2) && "1000000000000000128" === 0xde0b6b3a7640080.toFixed(0) || !function() {
        function t(t, e) {
            for (var n = -1; ++n < s; ) e += t * a[n], a[n] = e % o, e = Math.floor(e / o);
        }
        function e(t) {
            for (var e = s, n = 0; --e >= 0; ) n += a[e], a[e] = Math.floor(n / t), n = n % t * o;
        }
        function n() {
            for (var t = s, e = ""; --t >= 0; ) if ("" !== e || 0 === t || 0 !== a[t]) {
                var n = String(a[t]);
                "" === e ? e = n : e += "0000000".slice(0, 7 - n.length) + n;
            }
            return e;
        }
        function i(t, e, n) {
            return 0 === e ? n : e % 2 === 1 ? i(t, e - 1, n * t) : i(t * t, e / 2, n);
        }
        function r(t) {
            for (var e = 0; t >= 4096; ) e += 12, t /= 4096;
            for (;t >= 2; ) e += 1, t /= 2;
            return e;
        }
        var o, s, a;
        o = 1e7, s = 6, a = [ 0, 0, 0, 0, 0, 0 ], Number.prototype.toFixed = function(o) {
            var s, a, l, c, u, h, d, p;
            if (s = Number(o), s = s !== s ? 0 : Math.floor(s), 0 > s || s > 20) throw new RangeError("Number.toFixed called with invalid number of decimals");
            if (a = Number(this), a !== a) return "NaN";
            if (-1e21 >= a || a >= 1e21) return String(a);
            if (l = "", 0 > a && (l = "-", a = -a), c = "0", a > 1e-21) if (u = r(a * i(2, 69, 1)) - 69, 
            h = 0 > u ? a * i(2, -u, 1) : a / i(2, u, 1), h *= 4503599627370496, u = 52 - u, 
            u > 0) {
                for (t(0, h), d = s; d >= 7; ) t(1e7, 0), d -= 7;
                for (t(i(10, d, 1), 0), d = u - 1; d >= 23; ) e(1 << 23), d -= 23;
                e(1 << d), t(1, 1), e(2), c = n();
            } else t(0, h), t(1 << -u, 0), c = n() + "0.00000000000000000000".slice(2, 2 + s);
            return s > 0 ? (p = c.length, c = s >= p ? l + "0.0000000000000000000".slice(0, s - p + 2) + c : l + c.slice(0, p - s) + "." + c.slice(p - s)) : c = l + c, 
            c;
        };
    }();
    var S = String.prototype.split;
    if (2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 0 === "".split(/.?/).length || ".".split(/()()/).length > 1 ? !function() {
        var t = void 0 === /()??/.exec("")[1];
        String.prototype.split = function(e, n) {
            var i = this;
            if (void 0 === e && 0 === n) return [];
            if ("[object RegExp]" !== Object.prototype.toString.call(e)) return S.apply(this, arguments);
            var r, o, s, a, l = [], c = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.extended ? "x" : "") + (e.sticky ? "y" : ""), u = 0, e = new RegExp(e.source, c + "g");
            for (i += "", t || (r = new RegExp("^" + e.source + "$(?!\\s)", c)), n = void 0 === n ? -1 >>> 0 : n >>> 0; (o = e.exec(i)) && (s = o.index + o[0].length, 
            !(s > u && (l.push(i.slice(u, o.index)), !t && o.length > 1 && o[0].replace(r, function() {
                for (var t = 1; t < arguments.length - 2; t++) void 0 === arguments[t] && (o[t] = void 0);
            }), o.length > 1 && o.index < i.length && Array.prototype.push.apply(l, o.slice(1)), 
            a = o[0].length, u = s, l.length >= n))); ) e.lastIndex === o.index && e.lastIndex++;
            return u === i.length ? (a || !e.test("")) && l.push("") : l.push(i.slice(u)), l.length > n ? l.slice(0, n) : l;
        };
    }() : "0".split(void 0, 0).length && (String.prototype.split = function(t, e) {
        return void 0 === t && 0 === e ? [] : S.apply(this, arguments);
    }), "".substr && "b" !== "0b".substr(-1)) {
        var D = String.prototype.substr;
        String.prototype.substr = function(t, e) {
            return D.call(this, 0 > t ? (t = this.length + t) < 0 ? 0 : t : t, e);
        };
    }
    var E = "	\n\f\r   ᠎             　\u2028\u2029﻿";
    if (!String.prototype.trim || E.trim()) {
        E = "[" + E + "]";
        var M = new RegExp("^" + E + E + "*"), P = new RegExp(E + E + "*$");
        String.prototype.trim = function() {
            if (void 0 === this || null === this) throw new TypeError("can't convert " + this + " to object");
            return String(this).replace(M, "").replace(P, "");
        };
    }
    var A = function(t) {
        if (null == t) throw new TypeError("can't convert " + t + " to object");
        return Object(t);
    };
});