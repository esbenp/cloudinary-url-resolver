import {
  mappings,
  multiple
} from './parameters';

/**
 * Resolve a public_id and options to an actual url
 * @param  {string}  public_id The public_id of the resource given by cloudinary
 * @param  {object}  options   The options to apply to the resource
 * @param  {Boolean} isFile    Is this resource a file or an image?
 * @return {string}            The final url
 */
var resolver = function(public_id, options, isFile) {
  var parameters = isFile ? [] : buildParameters(options);
  var url = buildUrl(public_id, parameters, isFile);

  return url;
};

/**
 * Build image manipulation parameters from options
 * @param  {object} options The options passed to the resolver
 * @return {array}          Array of parameters to add to the url
 */
var buildParameters = function(options) {
  var parameters = [];

  var joinParameter = function(type, value) {
    if (typeof mappings[type] === 'undefined') {
      throw new Error(type + ' is not a valid cloudinary parameter.');
    }

    return [mappings[type], value].join('_');
  }

  for(var i in options) {
    // Some options, for instance "flags" take multiple parameters
    // The different values are separated by a dot (.)
    // All parameter keys and values er joined by a underscore (_) like
    // w_150 (width = 150px)
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

/**
 * Build the final url of manipulation options and bucket name etc.
 * @param  {string}  public_id  The resource public_id
 * @param  {array}  parameters  Manipulation options
 * @param  {Boolean} isFile     Is this resource a file?
 * @return {string}             The final url
 */
var buildUrl = function(public_id, parameters, isFile)
{
  var s = resolver.settings;

  if (typeof s.cloud_name !== 'string') {
    throw new Error(s.cloud_name + ' is not a valid cloud name.');
  }

  // Should http or https be used?
  var url = s.secure === true ? s.secure_root : s.root;

  // The bucket name
  url += s.cloud_name + '/';

  // Image or file?
  url += isFile ? 'raw/upload/' : 'image/upload/';

  // Join manipulation options
  if (parameters.length > 0) {
    url += parameters.join(',') + '/';
  }

  // Add the resource id
  url += public_id;

  return url;
}

// Set the settings for the resolver
resolver.settings = {
  root: 'http://res.cloudinary.com/',
  secure_root: 'https://res.cloudinary.com/',
  cloud_name: null,
  secure: true
};

export default resolver;

export var buildUrl, buildParameters, resolver;
