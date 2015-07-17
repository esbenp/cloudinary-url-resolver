requirejs.config({
    baseUrl: '../bower_components',
    paths: {
        'dist': "../dist",
        'examples': '../examples',
    }
});

requirejs(['dist/amd/resolver'], function(resolver){
  resolver.settings.cloud_name = 'traede';
  resolver.settings.secure = false;

  console.log(resolver('webshop_landing/1/oqnth76j7pqg24nndluc', {
    height: 100,
    width: 100,
    crop: 'fill'
  }));
});
