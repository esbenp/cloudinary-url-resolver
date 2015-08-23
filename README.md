# Cloudinary url resolver

[![Latest Version](https://img.shields.io/github/release/esbenp/cloudinary-url-resolver.svg?style=flat-square)](https://github.com/esbenp/cloudinary-url-resolver/releases)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)
[![Build Status](https://img.shields.io/travis/esbenp/cloudinary-url-resolver/master.svg?style=flat-square)](https://travis-ci.org/esbenp/cloudinary-url-resolver)
[![Coverage Status](https://img.shields.io/coveralls/esbenp/cloudinary-url-resolver.svg?style=flat-square)](https://coveralls.io/github/esbenp/cloudinary-url-resolver)

## Installation

```bash
bower install --save cloudinary-url-resolver
```

## Usage

```javascript
resolver.settings.cloud_name = 'awesomecloud';
resolver.settings.secure = false;

console.log(resolver('images/1/1312319103', {
  height: 100,
  width: 100,
  crop: 'fill',
  flags: ['keep_iptc', 'attachment']
}));
```

Will return `http://res.cloudinary.com/awesomecloud/image/upload/h_100,w_100,c_fill,fl_keep_iptc.attachment/images/1/1312319103`

## Available settings

[Cloudinary Transformations Reference (go there to see descriptions and possible values)](http://cloudinary.com/documentation/image_transformations#reference)

```javascript
resolver.settings.root = 'http://res.cloudinary.com/';
resolver.settings.secure_root = 'https://res.cloudinary.com/';
resolver.settings.cloud_name = null;
resolver.settings.secure = true;
```

## Available transformations

```
angle
background
border
crop
default_image
density
effect
fetch_format
flags <-- can also be an array of multiple values
gravity
height
opacity
overlay
page
quality
radius
transformation
underlay
width
x
y
```

## Testing

``` bash
$ gulp test
```

## Contributing

Please see [CONTRIBUTING](https://github.com/esbenp/cloudinary-url-resolver/blob/master/CONTRIBUTING.md) for details.

## License

The MIT License (MIT). Please see [License File](https://github.com/esbenp/cloudinary-url-resolver/blob/master/LICENSE) for more information.
