System.register(['./parameters'], function (_export) {
  'use strict';

  var mappings, multiple, resolver, buildParameters, buildUrl;
  return {
    setters: [function (_parameters) {
      mappings = _parameters.mappings;
      multiple = _parameters.multiple;
    }],
    execute: function () {
      resolver = function resolver(public_id, options, isFile) {
        var parameters = isFile ? [] : buildParameters(options);
        var url = buildUrl(public_id, parameters);

        return url;
      };

      buildParameters = function buildParameters(options) {
        var parameters = [];

        var joinParameter = function joinParameter(type, value) {
          if (typeof mappings[type] === 'undefined') {
            throw new Error(type + ' is not a valid cloudinary parameter.');
          }

          return [mappings[type], value].join('_');
        };

        for (var i in options) {
          if (options[i] instanceof Array) {
            if (!multiple[i]) {
              throw new Error(i + ' is not a valid array parameter.');
            }

            parameters.push(joinParameter(i, options[i].join('.')));
          } else {
            parameters.push(joinParameter(i, options[i]));
          }
        }

        return parameters;
      };

      buildUrl = function buildUrl(public_id, parameters) {
        var s = resolver.settings;
        var url = s.secure === true ? s.secure_root : s.root;

        url += s.cloud_name + '/';

        url += parameters.join(',');

        return url;
      };

      resolver.settings = {
        root: 'http://res.cloudinary.com/',
        secure_root: 'https://res.cloudinary.com/',
        cloud_name: 'traede',
        secure: true
      };

      _export('default', resolver);
    }
  };
});