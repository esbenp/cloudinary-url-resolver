import {
  mappings,
  multiple
} from './parameters';

var resolver = function(public_id, options, isFile) {
  var parameters = isFile ? [] : buildParameters(options);
  var url = buildUrl(public_id, parameters, isFile);

  return url;
};

var buildParameters = function(options) {
  var parameters = [];

  var joinParameter = function(type, value) {
    if (typeof mappings[type] === 'undefined') {
      throw new Error(type + ' is not a valid cloudinary parameter.');
    }

    return [mappings[type], value].join('_');
  }

  for(var i in options) {
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
}

var buildUrl = function(public_id, parameters, isFile)
{
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
}

resolver.settings = {
  root: 'http://res.cloudinary.com/',
  secure_root: 'https://res.cloudinary.com/',
  cloud_name: null,
  secure: true
};

export default resolver;
