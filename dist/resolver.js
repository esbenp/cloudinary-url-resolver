(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', './parameters'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('./parameters'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.parameters);
    global.resolver = mod.exports;
  }
})(this, function (exports, _parameters) {
  'use strict';

  exports.__esModule = true;

  var resolver = function resolver(public_id, options, isFile) {
    var parameters = isFile ? [] : buildParameters(options);
    var url = buildUrl(public_id, parameters, isFile);

    return url;
  };

  var buildParameters = function buildParameters(options) {
    var parameters = [];

    var joinParameter = function joinParameter(type, value) {
      if (typeof _parameters.mappings[type] === 'undefined') {
        throw new Error(type + ' is not a valid cloudinary parameter.');
      }

      return [_parameters.mappings[type], value].join('_');
    };

    for (var i in options) {
      if (options[i] instanceof Array) {
        if (!_parameters.multiple[i]) {
          throw new Error(i + ' is not a valid array parameter.');
        }

        parameters.push(joinParameter(i, options[i].join('.')));
      } else {
        parameters.push(joinParameter(i, options[i]));
      }
    }

    return parameters;
  };

  var buildUrl = function buildUrl(public_id, parameters, isFile) {
    var s = resolver.settings;

    if (typeof s.cloud_name !== 'string') {
      throw new Error(s.cloud_name + ' is not a valid cloud name.');
    }

    var url = s.secure === true ? s.secure_root : s.root;

    url += s.cloud_name + '/';

    url += isFile ? 'raw/upload/' : 'image/upload/';

    if (parameters.length > 0) {
      url += parameters.join(',') + '/';
    }

    url += public_id;

    return url;
  };

  resolver.settings = {
    root: 'http://res.cloudinary.com/',
    secure_root: 'https://res.cloudinary.com/',
    cloud_name: null,
    secure: true
  };

  exports['default'] = resolver;
  var buildUrl, buildParameters, resolver;
  exports.buildUrl = buildUrl;
  exports.buildParameters = buildParameters;
  exports.resolver = resolver;
});