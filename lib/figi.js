"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* figi
 * https://github.com/leny/figi
 *
 * Copyright (c) 2014 leny
 * Licensed under the MIT license.
 */

var fToRegExp = undefined,
    _fFigi = undefined,
    _oDefaultCatalog = {},
    _sDefaultClasses = "emote",
    _sDefaultPath = "./",
    _fDefaultReplacer = function _fDefaultReplacer(sValue, sKey) {
    return "<img src=\"" + (this.path || _sDefaultPath) + sValue + "\" alt=\"" + sKey + "\" class=\"" + (this.classes.join && this.classes.join(" ") || this.classes) + "\" />";
},
    _oDefaultOptions = {
    "catalog": _oDefaultCatalog,
    "classes": _sDefaultClasses,
    "path": _sDefaultPath,
    "replacer": _fDefaultReplacer
};

fToRegExp = function fToRegExp(sKey) {
    // inspired from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
    return new RegExp(sKey.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g");
};

_fFigi = function fFigi(sString) {
    var oOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var sTransformedString = sString,
        oMergedOptions = Object.assign({}, _oDefaultOptions, {
        "catalog": _fFigi.catalog,
        "classes": _fFigi.classes,
        "path": _fFigi.path,
        "replacer": _fFigi.replacer
    }, oOptions);

    var _loop = function _loop(sKey) {
        if (typeof sKey === "string") {
            (function () {
                var sValue = oMergedOptions.catalog[sKey];

                sTransformedString = sTransformedString.replace(fToRegExp(sKey), function () {
                    // eslint-disable-line no-loop-func, prefer-arrow-callback
                    return oMergedOptions.replacer(sValue, sKey);
                });
            })();
        }
    };

    for (var sKey in oMergedOptions.catalog) {
        _loop(sKey);
    }

    return sTransformedString;
};

_fFigi.catalog = _oDefaultCatalog;
_fFigi.classes = _sDefaultClasses;
_fFigi.path = _sDefaultPath;
_fFigi.replacer = _fDefaultReplacer;

exports.default = _fFigi;
