requirejs.config({
    baseUrl: '../bower_components',
    paths: {
        'dist': "../dist",
        'examples': '../examples',
    }
});

requirejs(['dist/amd/resolver'], function(resolver){
  resolver.settings.cloud_name = 'awesomecloud';
  resolver.settings.secure = false;

  console.log(resolver('images/1/1312319103', {
    height: 100,
    width: 100,
    crop: 'fill',
    flags: ['keep_iptc', 'attachment']
  }));
});
