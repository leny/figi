
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
  var figi, _defaultCatalog, _defaultClasses, _defaultPath, _defaultReplacer;
  figi = function() {};
  _defaultCatalog = {};
  figi.catalog = _defaultCatalog;
  _defaultClasses = "emote";
  figi.classes = _defaultClasses;
  _defaultPath = "./";
  figi.path = _defaultPath;
  _defaultReplacer = function(value, key) {
    var _base;
    return "<img src=\"" + this.path + value + "\" alt=\"" + key + "\" class=\"" + ((typeof (_base = this.classes).join === "function" ? _base.join(" ") : void 0) || this.classes) + "\" />";
  };
  figi.replacer = _defaultReplacer;
  return figi;
});
