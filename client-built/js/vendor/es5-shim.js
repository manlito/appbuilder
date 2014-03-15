!function(definition) {
    "function" == typeof define ? define(definition) : "function" == typeof YUI ? YUI.add("es5", definition) : definition();
}(function() {
    function Empty() {}
    function toInteger(n) {
        return n = +n, n !== n ? n = 0 : 0 !== n && n !== 1 / 0 && n !== -(1 / 0) && (n = (n > 0 || -1) * Math.floor(Math.abs(n))), 
        n;
    }
    function isPrimitive(input) {
        var type = typeof input;
        return null === input || "undefined" === type || "boolean" === type || "number" === type || "string" === type;
    }
    function toPrimitive(input) {
        var val, valueOf, toString;
        if (isPrimitive(input)) return input;
        if (valueOf = input.valueOf, "function" == typeof valueOf && (val = valueOf.call(input), 
        isPrimitive(val))) return val;
        if (toString = input.toString, "function" == typeof toString && (val = toString.call(input), 
        isPrimitive(val))) return val;
        throw new TypeError();
    }
    Function.prototype.bind || (Function.prototype.bind = function(that) {
        var target = this;
        if ("function" != typeof target) throw new TypeError("Function.prototype.bind called on incompatible " + target);
        var args = _Array_slice_.call(arguments, 1), bound = function() {
            if (this instanceof bound) {
                var result = target.apply(this, args.concat(_Array_slice_.call(arguments)));
                return Object(result) === result ? result : this;
            }
            return target.apply(that, args.concat(_Array_slice_.call(arguments)));
        };
        return target.prototype && (Empty.prototype = target.prototype, bound.prototype = new Empty(), 
        Empty.prototype = null), bound;
    });
    var defineGetter, defineSetter, lookupGetter, lookupSetter, supportsAccessors, call = Function.prototype.call, prototypeOfArray = Array.prototype, prototypeOfObject = Object.prototype, _Array_slice_ = prototypeOfArray.slice, _toString = call.bind(prototypeOfObject.toString), owns = call.bind(prototypeOfObject.hasOwnProperty);
    if ((supportsAccessors = owns(prototypeOfObject, "__defineGetter__")) && (defineGetter = call.bind(prototypeOfObject.__defineGetter__), 
    defineSetter = call.bind(prototypeOfObject.__defineSetter__), lookupGetter = call.bind(prototypeOfObject.__lookupGetter__), 
    lookupSetter = call.bind(prototypeOfObject.__lookupSetter__)), 2 != [ 1, 2 ].splice(0).length) {
        var array_splice = Array.prototype.splice;
        Array.prototype.splice = function() {
            function makeArray(l) {
                for (var a = []; l--; ) a.unshift(l);
                return a;
            }
            var lengthBefore, array = [];
            return array.splice.bind(array, 0, 0).apply(null, makeArray(20)), array.splice.bind(array, 0, 0).apply(null, makeArray(26)), 
            lengthBefore = array.length, array.splice(5, 0, "XXX"), lengthBefore + 1 == array.length ? !0 : void 0;
        }() ? function(start, deleteCount) {
            return arguments.length ? array_splice.apply(this, [ void 0 === start ? 0 : start, void 0 === deleteCount ? this.length - start : deleteCount ].concat(_Array_slice_.call(arguments, 2))) : [];
        } : function(start, deleteCount) {
            var result, args = _Array_slice_.call(arguments, 2), addElementsCount = args.length;
            if (!arguments.length) return [];
            if (void 0 === start && (start = 0), void 0 === deleteCount && (deleteCount = this.length - start), 
            addElementsCount > 0) {
                if (0 >= deleteCount) {
                    if (start == this.length) return this.push.apply(this, args), [];
                    if (0 == start) return this.unshift.apply(this, args), [];
                }
                return result = _Array_slice_.call(this, start, start + deleteCount), args.push.apply(args, _Array_slice_.call(this, start + deleteCount, this.length)), 
                args.unshift.apply(args, _Array_slice_.call(this, 0, start)), args.unshift(0, this.length), 
                array_splice.apply(this, args), result;
            }
            return array_splice.call(this, start, deleteCount);
        };
    }
    if (1 != [].unshift(0)) {
        var array_unshift = Array.prototype.unshift;
        Array.prototype.unshift = function() {
            return array_unshift.apply(this, arguments), this.length;
        };
    }
    Array.isArray || (Array.isArray = function(obj) {
        return "[object Array]" == _toString(obj);
    });
    var boxedString = Object("a"), splitString = "a" != boxedString[0] || !(0 in boxedString);
    if (Array.prototype.forEach || (Array.prototype.forEach = function(fun) {
        var object = toObject(this), self = splitString && "[object String]" == _toString(this) ? this.split("") : object, thisp = arguments[1], i = -1, length = self.length >>> 0;
        if ("[object Function]" != _toString(fun)) throw new TypeError();
        for (;++i < length; ) i in self && fun.call(thisp, self[i], i, object);
    }), Array.prototype.map || (Array.prototype.map = function(fun) {
        var object = toObject(this), self = splitString && "[object String]" == _toString(this) ? this.split("") : object, length = self.length >>> 0, result = Array(length), thisp = arguments[1];
        if ("[object Function]" != _toString(fun)) throw new TypeError(fun + " is not a function");
        for (var i = 0; length > i; i++) i in self && (result[i] = fun.call(thisp, self[i], i, object));
        return result;
    }), Array.prototype.filter || (Array.prototype.filter = function(fun) {
        var value, object = toObject(this), self = splitString && "[object String]" == _toString(this) ? this.split("") : object, length = self.length >>> 0, result = [], thisp = arguments[1];
        if ("[object Function]" != _toString(fun)) throw new TypeError(fun + " is not a function");
        for (var i = 0; length > i; i++) i in self && (value = self[i], fun.call(thisp, value, i, object) && result.push(value));
        return result;
    }), Array.prototype.every || (Array.prototype.every = function(fun) {
        var object = toObject(this), self = splitString && "[object String]" == _toString(this) ? this.split("") : object, length = self.length >>> 0, thisp = arguments[1];
        if ("[object Function]" != _toString(fun)) throw new TypeError(fun + " is not a function");
        for (var i = 0; length > i; i++) if (i in self && !fun.call(thisp, self[i], i, object)) return !1;
        return !0;
    }), Array.prototype.some || (Array.prototype.some = function(fun) {
        var object = toObject(this), self = splitString && "[object String]" == _toString(this) ? this.split("") : object, length = self.length >>> 0, thisp = arguments[1];
        if ("[object Function]" != _toString(fun)) throw new TypeError(fun + " is not a function");
        for (var i = 0; length > i; i++) if (i in self && fun.call(thisp, self[i], i, object)) return !0;
        return !1;
    }), Array.prototype.reduce || (Array.prototype.reduce = function(fun) {
        var object = toObject(this), self = splitString && "[object String]" == _toString(this) ? this.split("") : object, length = self.length >>> 0;
        if ("[object Function]" != _toString(fun)) throw new TypeError(fun + " is not a function");
        if (!length && 1 == arguments.length) throw new TypeError("reduce of empty array with no initial value");
        var result, i = 0;
        if (arguments.length >= 2) result = arguments[1]; else for (;;) {
            if (i in self) {
                result = self[i++];
                break;
            }
            if (++i >= length) throw new TypeError("reduce of empty array with no initial value");
        }
        for (;length > i; i++) i in self && (result = fun.call(void 0, result, self[i], i, object));
        return result;
    }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function(fun) {
        var object = toObject(this), self = splitString && "[object String]" == _toString(this) ? this.split("") : object, length = self.length >>> 0;
        if ("[object Function]" != _toString(fun)) throw new TypeError(fun + " is not a function");
        if (!length && 1 == arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
        var result, i = length - 1;
        if (arguments.length >= 2) result = arguments[1]; else for (;;) {
            if (i in self) {
                result = self[i--];
                break;
            }
            if (--i < 0) throw new TypeError("reduceRight of empty array with no initial value");
        }
        if (0 > i) return result;
        do i in this && (result = fun.call(void 0, result, self[i], i, object)); while (i--);
        return result;
    }), Array.prototype.indexOf && -1 == [ 0, 1 ].indexOf(1, 2) || (Array.prototype.indexOf = function(sought) {
        var self = splitString && "[object String]" == _toString(this) ? this.split("") : toObject(this), length = self.length >>> 0;
        if (!length) return -1;
        var i = 0;
        for (arguments.length > 1 && (i = toInteger(arguments[1])), i = i >= 0 ? i : Math.max(0, length + i); length > i; i++) if (i in self && self[i] === sought) return i;
        return -1;
    }), Array.prototype.lastIndexOf && -1 == [ 0, 1 ].lastIndexOf(0, -3) || (Array.prototype.lastIndexOf = function(sought) {
        var self = splitString && "[object String]" == _toString(this) ? this.split("") : toObject(this), length = self.length >>> 0;
        if (!length) return -1;
        var i = length - 1;
        for (arguments.length > 1 && (i = Math.min(i, toInteger(arguments[1]))), i = i >= 0 ? i : length - Math.abs(i); i >= 0; i--) if (i in self && sought === self[i]) return i;
        return -1;
    }), !Object.keys) {
        var hasDontEnumBug = !0, dontEnums = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], dontEnumsLength = dontEnums.length;
        for (var key in {
            toString: null
        }) hasDontEnumBug = !1;
        Object.keys = function keys(object) {
            if ("object" != typeof object && "function" != typeof object || null === object) throw new TypeError("Object.keys called on a non-object");
            var keys = [];
            for (var name in object) owns(object, name) && keys.push(name);
            if (hasDontEnumBug) for (var i = 0, ii = dontEnumsLength; ii > i; i++) {
                var dontEnum = dontEnums[i];
                owns(object, dontEnum) && keys.push(dontEnum);
            }
            return keys;
        };
    }
    var negativeDate = -621987552e5, negativeYearString = "-000001";
    Date.prototype.toISOString && -1 !== new Date(negativeDate).toISOString().indexOf(negativeYearString) || (Date.prototype.toISOString = function() {
        var result, length, value, year, month;
        if (!isFinite(this)) throw new RangeError("Date.prototype.toISOString called on non-finite value.");
        for (year = this.getUTCFullYear(), month = this.getUTCMonth(), year += Math.floor(month / 12), 
        month = (month % 12 + 12) % 12, result = [ month + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds() ], 
        year = (0 > year ? "-" : year > 9999 ? "+" : "") + ("00000" + Math.abs(year)).slice(year >= 0 && 9999 >= year ? -4 : -6), 
        length = result.length; length--; ) value = result[length], 10 > value && (result[length] = "0" + value);
        return year + "-" + result.slice(0, 2).join("-") + "T" + result.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z";
    });
    var dateToJSONIsSupported = !1;
    try {
        dateToJSONIsSupported = Date.prototype.toJSON && null === new Date(0/0).toJSON() && -1 !== new Date(negativeDate).toJSON().indexOf(negativeYearString) && Date.prototype.toJSON.call({
            toISOString: function() {
                return !0;
            }
        });
    } catch (e) {}
    dateToJSONIsSupported || (Date.prototype.toJSON = function() {
        var toISO, o = Object(this), tv = toPrimitive(o);
        if ("number" == typeof tv && !isFinite(tv)) return null;
        if (toISO = o.toISOString, "function" != typeof toISO) throw new TypeError("toISOString property is not callable");
        return toISO.call(o);
    }), Date = function(NativeDate) {
        function Date(Y, M, D, h, m, s, ms) {
            var length = arguments.length;
            if (this instanceof NativeDate) {
                var date = 1 == length && String(Y) === Y ? new NativeDate(Date.parse(Y)) : length >= 7 ? new NativeDate(Y, M, D, h, m, s, ms) : length >= 6 ? new NativeDate(Y, M, D, h, m, s) : length >= 5 ? new NativeDate(Y, M, D, h, m) : length >= 4 ? new NativeDate(Y, M, D, h) : length >= 3 ? new NativeDate(Y, M, D) : length >= 2 ? new NativeDate(Y, M) : length >= 1 ? new NativeDate(Y) : new NativeDate();
                return date.constructor = Date, date;
            }
            return NativeDate.apply(this, arguments);
        }
        function dayFromMonth(year, month) {
            var t = month > 1 ? 1 : 0;
            return months[month] + Math.floor((year - 1969 + t) / 4) - Math.floor((year - 1901 + t) / 100) + Math.floor((year - 1601 + t) / 400) + 365 * (year - 1970);
        }
        var isoDateExpression = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"), months = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365 ];
        for (var key in NativeDate) Date[key] = NativeDate[key];
        return Date.now = NativeDate.now, Date.UTC = NativeDate.UTC, Date.prototype = NativeDate.prototype, 
        Date.prototype.constructor = Date, Date.parse = function(string) {
            var match = isoDateExpression.exec(string);
            if (match) {
                var result, year = Number(match[1]), month = Number(match[2] || 1) - 1, day = Number(match[3] || 1) - 1, hour = Number(match[4] || 0), minute = Number(match[5] || 0), second = Number(match[6] || 0), millisecond = Math.floor(1e3 * Number(match[7] || 0)), offset = !match[4] || match[8] ? 0 : Number(new NativeDate(1970, 0)), signOffset = "-" === match[9] ? 1 : -1, hourOffset = Number(match[10] || 0), minuteOffset = Number(match[11] || 0);
                return (minute > 0 || second > 0 || millisecond > 0 ? 24 : 25) > hour && 60 > minute && 60 > second && 1e3 > millisecond && month > -1 && 12 > month && 24 > hourOffset && 60 > minuteOffset && day > -1 && day < dayFromMonth(year, month + 1) - dayFromMonth(year, month) && (result = 60 * (24 * (dayFromMonth(year, month) + day) + hour + hourOffset * signOffset), 
                result = 1e3 * (60 * (result + minute + minuteOffset * signOffset) + second) + millisecond + offset, 
                result >= -864e13 && 864e13 >= result) ? result : 0/0;
            }
            return NativeDate.parse.apply(this, arguments);
        }, Date;
    }(Date), Date.now || (Date.now = function() {
        return new Date().getTime();
    }), Number.prototype.toFixed && "0.000" === 8e-5.toFixed(3) && "0" !== .9.toFixed(0) && "1.25" === 1.255.toFixed(2) && "1000000000000000128" === 0xde0b6b3a7640080.toFixed(0) || !function() {
        function multiply(n, c) {
            for (var i = -1; ++i < size; ) c += n * data[i], data[i] = c % base, c = Math.floor(c / base);
        }
        function divide(n) {
            for (var i = size, c = 0; --i >= 0; ) c += data[i], data[i] = Math.floor(c / n), 
            c = c % n * base;
        }
        function toString() {
            for (var i = size, s = ""; --i >= 0; ) if ("" !== s || 0 === i || 0 !== data[i]) {
                var t = String(data[i]);
                "" === s ? s = t : s += "0000000".slice(0, 7 - t.length) + t;
            }
            return s;
        }
        function pow(x, n, acc) {
            return 0 === n ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
        }
        function log(x) {
            for (var n = 0; x >= 4096; ) n += 12, x /= 4096;
            for (;x >= 2; ) n += 1, x /= 2;
            return n;
        }
        var base, size, data;
        base = 1e7, size = 6, data = [ 0, 0, 0, 0, 0, 0 ], Number.prototype.toFixed = function(fractionDigits) {
            var f, x, s, m, e, z, j, k;
            if (f = Number(fractionDigits), f = f !== f ? 0 : Math.floor(f), 0 > f || f > 20) throw new RangeError("Number.toFixed called with invalid number of decimals");
            if (x = Number(this), x !== x) return "NaN";
            if (-1e21 >= x || x >= 1e21) return String(x);
            if (s = "", 0 > x && (s = "-", x = -x), m = "0", x > 1e-21) if (e = log(x * pow(2, 69, 1)) - 69, 
            z = 0 > e ? x * pow(2, -e, 1) : x / pow(2, e, 1), z *= 4503599627370496, e = 52 - e, 
            e > 0) {
                for (multiply(0, z), j = f; j >= 7; ) multiply(1e7, 0), j -= 7;
                for (multiply(pow(10, j, 1), 0), j = e - 1; j >= 23; ) divide(1 << 23), j -= 23;
                divide(1 << j), multiply(1, 1), divide(2), m = toString();
            } else multiply(0, z), multiply(1 << -e, 0), m = toString() + "0.00000000000000000000".slice(2, 2 + f);
            return f > 0 ? (k = m.length, m = f >= k ? s + "0.0000000000000000000".slice(0, f - k + 2) + m : s + m.slice(0, k - f) + "." + m.slice(k - f)) : m = s + m, 
            m;
        };
    }();
    var string_split = String.prototype.split;
    if (2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 0 === "".split(/.?/).length || ".".split(/()()/).length > 1 ? !function() {
        var compliantExecNpcg = void 0 === /()??/.exec("")[1];
        String.prototype.split = function(separator, limit) {
            var string = this;
            if (void 0 === separator && 0 === limit) return [];
            if ("[object RegExp]" !== Object.prototype.toString.call(separator)) return string_split.apply(this, arguments);
            var separator2, match, lastIndex, lastLength, output = [], flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + (separator.sticky ? "y" : ""), lastLastIndex = 0, separator = new RegExp(separator.source, flags + "g");
            for (string += "", compliantExecNpcg || (separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags)), 
            limit = void 0 === limit ? -1 >>> 0 : limit >>> 0; (match = separator.exec(string)) && (lastIndex = match.index + match[0].length, 
            !(lastIndex > lastLastIndex && (output.push(string.slice(lastLastIndex, match.index)), 
            !compliantExecNpcg && match.length > 1 && match[0].replace(separator2, function() {
                for (var i = 1; i < arguments.length - 2; i++) void 0 === arguments[i] && (match[i] = void 0);
            }), match.length > 1 && match.index < string.length && Array.prototype.push.apply(output, match.slice(1)), 
            lastLength = match[0].length, lastLastIndex = lastIndex, output.length >= limit))); ) separator.lastIndex === match.index && separator.lastIndex++;
            return lastLastIndex === string.length ? (lastLength || !separator.test("")) && output.push("") : output.push(string.slice(lastLastIndex)), 
            output.length > limit ? output.slice(0, limit) : output;
        };
    }() : "0".split(void 0, 0).length && (String.prototype.split = function(separator, limit) {
        return void 0 === separator && 0 === limit ? [] : string_split.apply(this, arguments);
    }), "".substr && "b" !== "0b".substr(-1)) {
        var string_substr = String.prototype.substr;
        String.prototype.substr = function(start, length) {
            return string_substr.call(this, 0 > start ? (start = this.length + start) < 0 ? 0 : start : start, length);
        };
    }
    var ws = "	\n\f\r   ᠎             　\u2028\u2029﻿";
    if (!String.prototype.trim || ws.trim()) {
        ws = "[" + ws + "]";
        var trimBeginRegexp = new RegExp("^" + ws + ws + "*"), trimEndRegexp = new RegExp(ws + ws + "*$");
        String.prototype.trim = function() {
            if (void 0 === this || null === this) throw new TypeError("can't convert " + this + " to object");
            return String(this).replace(trimBeginRegexp, "").replace(trimEndRegexp, "");
        };
    }
    var toObject = function(o) {
        if (null == o) throw new TypeError("can't convert " + o + " to object");
        return Object(o);
    };
});