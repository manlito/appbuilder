!function(t) {
    function e(t) {
        if (e[t] !== r) return e[t];
        var n;
        if ("bug-string-char-index" == t) n = "a" != "a"[0]; else if ("json" == t) n = e("json-stringify") && e("json-parse"); else {
            var i, s = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
            if ("json-stringify" == t) {
                var a = l.stringify, u = "function" == typeof a && c;
                if (u) {
                    (i = function() {
                        return 1;
                    }).toJSON = i;
                    try {
                        u = "0" === a(0) && "0" === a(new Number()) && '""' == a(new String()) && a(o) === r && a(r) === r && a() === r && "1" === a(i) && "[1]" == a([ i ]) && "[null]" == a([ r ]) && "null" == a(null) && "[null,null,null]" == a([ r, o, null ]) && a({
                            a: [ i, !0, !1, null, "\x00\b\n\f\r	" ]
                        }) == s && "1" === a(null, i) && "[\n 1,\n 2\n]" == a([ 1, 2 ], null, 1) && '"-271821-04-20T00:00:00.000Z"' == a(new Date(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == a(new Date(864e13)) && '"-000001-01-01T00:00:00.000Z"' == a(new Date(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == a(new Date(-1));
                    } catch (h) {
                        u = !1;
                    }
                }
                n = u;
            }
            if ("json-parse" == t) {
                var d = l.parse;
                if ("function" == typeof d) try {
                    if (0 === d("0") && !d(!1)) {
                        i = d(s);
                        var p = 5 == i.a.length && 1 === i.a[0];
                        if (p) {
                            try {
                                p = !d('"	"');
                            } catch (h) {}
                            if (p) try {
                                p = 1 !== d("01");
                            } catch (h) {}
                            if (p) try {
                                p = 1 !== d("1.");
                            } catch (h) {}
                        }
                    }
                } catch (h) {
                    p = !1;
                }
                n = p;
            }
        }
        return e[t] = !!n;
    }
    var n, i, r, o = {}.toString, s = "function" == typeof define && define.amd, a = "object" == typeof JSON && JSON, l = "object" == typeof exports && exports && !exports.nodeType && exports;
    l && a ? (l.stringify = a.stringify, l.parse = a.parse) : l = t.JSON = a || {};
    var c = new Date(-0xc782b5b800cec);
    try {
        c = -109252 == c.getUTCFullYear() && 0 === c.getUTCMonth() && 1 === c.getUTCDate() && 10 == c.getUTCHours() && 37 == c.getUTCMinutes() && 6 == c.getUTCSeconds() && 708 == c.getUTCMilliseconds();
    } catch (u) {}
    if (!e("json")) {
        var h = "[object Function]", d = "[object Date]", p = "[object Number]", f = "[object String]", g = "[object Array]", m = "[object Boolean]", v = e("bug-string-char-index");
        if (!c) var b = Math.floor, y = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ], w = function(t, e) {
            return y[e] + 365 * (t - 1970) + b((t - 1969 + (e = +(e > 1))) / 4) - b((t - 1901 + e) / 100) + b((t - 1601 + e) / 400);
        };
        (n = {}.hasOwnProperty) || (n = function(t) {
            var e, i = {};
            return (i.__proto__ = null, i.__proto__ = {
                toString: 1
            }, i).toString != o ? n = function(t) {
                var e = this.__proto__, n = t in (this.__proto__ = null, this);
                return this.__proto__ = e, n;
            } : (e = i.constructor, n = function(t) {
                var n = (this.constructor || e).prototype;
                return t in this && !(t in n && this[t] === n[t]);
            }), i = null, n.call(this, t);
        });
        var $ = {
            "boolean": 1,
            number: 1,
            string: 1,
            undefined: 1
        }, _ = function(t, e) {
            var n = typeof t[e];
            return "object" == n ? !!t[e] : !$[n];
        };
        if (i = function(t, e) {
            var r, s, a, l = 0;
            (r = function() {
                this.valueOf = 0;
            }).prototype.valueOf = 0, s = new r();
            for (a in s) n.call(s, a) && l++;
            return r = s = null, l ? i = 2 == l ? function(t, e) {
                var i, r = {}, s = o.call(t) == h;
                for (i in t) s && "prototype" == i || n.call(r, i) || !(r[i] = 1) || !n.call(t, i) || e(i);
            } : function(t, e) {
                var i, r, s = o.call(t) == h;
                for (i in t) s && "prototype" == i || !n.call(t, i) || (r = "constructor" === i) || e(i);
                (r || n.call(t, i = "constructor")) && e(i);
            } : (s = [ "valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor" ], 
            i = function(t, e) {
                var i, r, a = o.call(t) == h, l = !a && "function" != typeof t.constructor && _(t, "hasOwnProperty") ? t.hasOwnProperty : n;
                for (i in t) a && "prototype" == i || !l.call(t, i) || e(i);
                for (r = s.length; i = s[--r]; l.call(t, i) && e(i)) ;
            }), i(t, e);
        }, !e("json-stringify")) {
            var x = {
                92: "\\\\",
                34: '\\"',
                8: "\\b",
                12: "\\f",
                10: "\\n",
                13: "\\r",
                9: "\\t"
            }, k = "000000", C = function(t, e) {
                return (k + (e || 0)).slice(-t);
            }, T = "\\u00", S = function(t) {
                var e, n = '"', i = 0, r = t.length, o = r > 10 && v;
                for (o && (e = t.split("")); r > i; i++) {
                    var s = t.charCodeAt(i);
                    switch (s) {
                      case 8:
                      case 9:
                      case 10:
                      case 12:
                      case 13:
                      case 34:
                      case 92:
                        n += x[s];
                        break;

                      default:
                        if (32 > s) {
                            n += T + C(2, s.toString(16));
                            break;
                        }
                        n += o ? e[i] : v ? t.charAt(i) : t[i];
                    }
                }
                return n + '"';
            }, D = function(t, e, s, a, l, c, u) {
                var h, v, y, $, _, x, k, T, E, M, P, A, O, I, N, j;
                try {
                    h = e[t];
                } catch (F) {}
                if ("object" == typeof h && h) if (v = o.call(h), v != d || n.call(h, "toJSON")) "function" == typeof h.toJSON && (v != p && v != f && v != g || n.call(h, "toJSON")) && (h = h.toJSON(t)); else if (h > -1 / 0 && 1 / 0 > h) {
                    if (w) {
                        for (_ = b(h / 864e5), y = b(_ / 365.2425) + 1970 - 1; w(y + 1, 0) <= _; y++) ;
                        for ($ = b((_ - w(y, 0)) / 30.42); w(y, $ + 1) <= _; $++) ;
                        _ = 1 + _ - w(y, $), x = (h % 864e5 + 864e5) % 864e5, k = b(x / 36e5) % 24, T = b(x / 6e4) % 60, 
                        E = b(x / 1e3) % 60, M = x % 1e3;
                    } else y = h.getUTCFullYear(), $ = h.getUTCMonth(), _ = h.getUTCDate(), k = h.getUTCHours(), 
                    T = h.getUTCMinutes(), E = h.getUTCSeconds(), M = h.getUTCMilliseconds();
                    h = (0 >= y || y >= 1e4 ? (0 > y ? "-" : "+") + C(6, 0 > y ? -y : y) : C(4, y)) + "-" + C(2, $ + 1) + "-" + C(2, _) + "T" + C(2, k) + ":" + C(2, T) + ":" + C(2, E) + "." + C(3, M) + "Z";
                } else h = null;
                if (s && (h = s.call(e, t, h)), null === h) return "null";
                if (v = o.call(h), v == m) return "" + h;
                if (v == p) return h > -1 / 0 && 1 / 0 > h ? "" + h : "null";
                if (v == f) return S("" + h);
                if ("object" == typeof h) {
                    for (I = u.length; I--; ) if (u[I] === h) throw TypeError();
                    if (u.push(h), P = [], N = c, c += l, v == g) {
                        for (O = 0, I = h.length; I > O; O++) A = D(O, h, s, a, l, c, u), P.push(A === r ? "null" : A);
                        j = P.length ? l ? "[\n" + c + P.join(",\n" + c) + "\n" + N + "]" : "[" + P.join(",") + "]" : "[]";
                    } else i(a || h, function(t) {
                        var e = D(t, h, s, a, l, c, u);
                        e !== r && P.push(S(t) + ":" + (l ? " " : "") + e);
                    }), j = P.length ? l ? "{\n" + c + P.join(",\n" + c) + "\n" + N + "}" : "{" + P.join(",") + "}" : "{}";
                    return u.pop(), j;
                }
            };
            l.stringify = function(t, e, n) {
                var i, r, s, a;
                if ("function" == typeof e || "object" == typeof e && e) if ((a = o.call(e)) == h) r = e; else if (a == g) {
                    s = {};
                    for (var l, c = 0, u = e.length; u > c; l = e[c++], a = o.call(l), (a == f || a == p) && (s[l] = 1)) ;
                }
                if (n) if ((a = o.call(n)) == p) {
                    if ((n -= n % 1) > 0) for (i = "", n > 10 && (n = 10); i.length < n; i += " ") ;
                } else a == f && (i = n.length <= 10 ? n : n.slice(0, 10));
                return D("", (l = {}, l[""] = t, l), r, s, i, "", []);
            };
        }
        if (!e("json-parse")) {
            var E, M, P = String.fromCharCode, A = {
                92: "\\",
                34: '"',
                47: "/",
                98: "\b",
                116: "	",
                110: "\n",
                102: "\f",
                114: "\r"
            }, O = function() {
                throw E = M = null, SyntaxError();
            }, I = function() {
                for (var t, e, n, i, r, o = M, s = o.length; s > E; ) switch (r = o.charCodeAt(E)) {
                  case 9:
                  case 10:
                  case 13:
                  case 32:
                    E++;
                    break;

                  case 123:
                  case 125:
                  case 91:
                  case 93:
                  case 58:
                  case 44:
                    return t = v ? o.charAt(E) : o[E], E++, t;

                  case 34:
                    for (t = "@", E++; s > E; ) if (r = o.charCodeAt(E), 32 > r) O(); else if (92 == r) switch (r = o.charCodeAt(++E)) {
                      case 92:
                      case 34:
                      case 47:
                      case 98:
                      case 116:
                      case 110:
                      case 102:
                      case 114:
                        t += A[r], E++;
                        break;

                      case 117:
                        for (e = ++E, n = E + 4; n > E; E++) r = o.charCodeAt(E), r >= 48 && 57 >= r || r >= 97 && 102 >= r || r >= 65 && 70 >= r || O();
                        t += P("0x" + o.slice(e, E));
                        break;

                      default:
                        O();
                    } else {
                        if (34 == r) break;
                        for (r = o.charCodeAt(E), e = E; r >= 32 && 92 != r && 34 != r; ) r = o.charCodeAt(++E);
                        t += o.slice(e, E);
                    }
                    if (34 == o.charCodeAt(E)) return E++, t;
                    O();

                  default:
                    if (e = E, 45 == r && (i = !0, r = o.charCodeAt(++E)), r >= 48 && 57 >= r) {
                        for (48 == r && (r = o.charCodeAt(E + 1), r >= 48 && 57 >= r) && O(), i = !1; s > E && (r = o.charCodeAt(E), 
                        r >= 48 && 57 >= r); E++) ;
                        if (46 == o.charCodeAt(E)) {
                            for (n = ++E; s > n && (r = o.charCodeAt(n), r >= 48 && 57 >= r); n++) ;
                            n == E && O(), E = n;
                        }
                        if (r = o.charCodeAt(E), 101 == r || 69 == r) {
                            for (r = o.charCodeAt(++E), (43 == r || 45 == r) && E++, n = E; s > n && (r = o.charCodeAt(n), 
                            r >= 48 && 57 >= r); n++) ;
                            n == E && O(), E = n;
                        }
                        return +o.slice(e, E);
                    }
                    if (i && O(), "true" == o.slice(E, E + 4)) return E += 4, !0;
                    if ("false" == o.slice(E, E + 5)) return E += 5, !1;
                    if ("null" == o.slice(E, E + 4)) return E += 4, null;
                    O();
                }
                return "$";
            }, N = function(t) {
                var e, n;
                if ("$" == t && O(), "string" == typeof t) {
                    if ("@" == (v ? t.charAt(0) : t[0])) return t.slice(1);
                    if ("[" == t) {
                        for (e = []; t = I(), "]" != t; n || (n = !0)) n && ("," == t ? (t = I(), "]" == t && O()) : O()), 
                        "," == t && O(), e.push(N(t));
                        return e;
                    }
                    if ("{" == t) {
                        for (e = {}; t = I(), "}" != t; n || (n = !0)) n && ("," == t ? (t = I(), "}" == t && O()) : O()), 
                        ("," == t || "string" != typeof t || "@" != (v ? t.charAt(0) : t[0]) || ":" != I()) && O(), 
                        e[t.slice(1)] = N(I());
                        return e;
                    }
                    O();
                }
                return t;
            }, j = function(t, e, n) {
                var i = F(t, e, n);
                i === r ? delete t[e] : t[e] = i;
            }, F = function(t, e, n) {
                var r, s = t[e];
                if ("object" == typeof s && s) if (o.call(s) == g) for (r = s.length; r--; ) j(s, r, n); else i(s, function(t) {
                    j(s, t, n);
                });
                return n.call(t, e, s);
            };
            l.parse = function(t, e) {
                var n, i;
                return E = 0, M = "" + t, n = N(I()), "$" != I() && O(), E = M = null, e && o.call(e) == h ? F((i = {}, 
                i[""] = n, i), "", e) : n;
            };
        }
    }
    s && define(function() {
        return l;
    });
}(this);