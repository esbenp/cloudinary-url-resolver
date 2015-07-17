requirejs.config({
    baseUrl: '../bower_components',
    paths: {
        'dist': "../dist",
        'examples': '../examples',
    }
});

requirejs(['dist/amd/resolver'], function(resolver){
  resolver.settings.secure = false;

  console.log(resolver('images/1/asdasdada', {
    height: 100,
    width: 100,
    crop: 'fede',
    flags: ['asdas', 'sadas']
  }));
});
