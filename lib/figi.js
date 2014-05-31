
/*
 * figi
 * https://github.com/Leny/figi
 *
 * Copyright (c) 2014 Leny
 * Licensed under the MIT license.
 */
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports === "object") {
    module.exports = factory();
  } else {
    root.figi = factory();
  }
})(this, function() {
  var figi, toRegExp, _defaultCatalog, _defaultClasses, _defaultPath, _defaultReplacer;
  toRegExp = function(key) {
    return new RegExp(key.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), "g");
  };
  figi = function(string, options) {
    var key, value, _ref, _ref1, _ref2, _ref3, _ref4;
    if (options == null) {
      options = {};
    }
    if (options.catalog == null) {
      options.catalog = (_ref = figi.catalog) != null ? _ref : _defaultCatalog;
    }
    if (options.classes == null) {
      options.classes = (_ref1 = figi.classes) != null ? _ref1 : _defaultClasses;
    }
    if (options.path == null) {
      options.path = (_ref2 = figi.path) != null ? _ref2 : _defaultPath;
    }
    if (options.replacer == null) {
      options.replacer = (_ref3 = figi.replacer) != null ? _ref3 : _defaultReplacer;
    }
    _ref4 = options.catalog;
    for (key in _ref4) {
      value = _ref4[key];
      if (typeof key === "string") {
        string = string.replace(toRegExp(key), (function() {
          return options.replacer.call(options, value, key);
        }));
      }
    }
    return string;
  };
  figi.catalog = (_defaultCatalog = {});
  figi.classes = (_defaultClasses = "emote");
  figi.path = (_defaultPath = "./");
  figi.replacer = _defaultReplacer = function(value, key) {
    var _base, _ref;
    return "<img src=\"" + ((_ref = this.path) != null ? _ref : _defaultPath) + value + "\" alt=\"" + key + "\" class=\"" + ((typeof (_base = this.classes).join === "function" ? _base.join(" ") : void 0) || this.classes) + "\" />";
  };
  return figi;
});
