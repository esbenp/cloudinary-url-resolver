# Cloudinary url resolver

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

Will return `http://res.cloudinary.com/awesomecloud/h_100,w_100,c_fill,fl_keep_iptc.attachment`
