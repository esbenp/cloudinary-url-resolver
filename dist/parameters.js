(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.parameters = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  exports.__esModule = true;
  var mappings = {
    angle: 'a',
    background: 'b',
    background_rgb: 'b_rgb',
    border: 'bo',
    crop: 'c',
    default_image: 'd',
    density: 'dn',
    dpr: 'dpr',
    effect: 'e',
    fetch_format: 'f',
    flags: 'fl',
    gravity: 'g',
    height: 'h',
    opacity: 'o',
    overlay: 'l',
    page: 'pg',
    quality: 'q',
    radius: 'r',
    transformation: 't',
    underlay: 'u',
    width: 'w',
    x: 'x',
    y: 'y'
  };

  exports.mappings = mappings;
  var join_symbol_override = {
    background_rgb: ':'
  };

  exports.join_symbol_override = join_symbol_override;
  var multiple = {
    flags: true
  };
  exports.multiple = multiple;
});