import {
  resolver,
  buildParameters,
  buildUrl
} from '../src/resolver';

describe('Resolver', () => {
  resolver.settings.cloud_name = 'cloud_name';
  resolver.settings.secure = false;

  it('resolves a no options url', () => {
    var url = resolver('images/1/1234');

    expect(url).toBe('http://res.cloudinary.com/cloud_name/image/upload/images/1/1234');
  });

  it('resolves a url with options', () => {
    var url = resolver('images/1/1234', {
      height: 150,
      width: 100
    });

    expect(url).toBe('http://res.cloudinary.com/cloud_name/image/upload/h_150,w_100/images/1/1234');
  });

  it('resolves multiple options', () => {
    var url = resolver('images/1/1234', {
      flags: ['keep_iptc', 'relative'],
      width: 100
    });

    expect(url).toBe('http://res.cloudinary.com/cloud_name/image/upload/fl_keep_iptc.relative,w_100/images/1/1234');
  });

  it('throws expection when trying to resolve non-multiple parameter as multile', () => {
    var url = function() {
      return resolver('images/1/1234', {
        width: [100, 200]
      });
    };

    expect(url).toThrow();
  });

  it('resolves a secure url', () => {
    resolver.settings.secure = true;
    var url = resolver('images/1/1234', {
      height: 100,
      width: 100
    });
    resolver.settings.secure = false;

    expect(url).toBe('https://res.cloudinary.com/cloud_name/image/upload/h_100,w_100/images/1/1234');
  });

  it('resolves custom root', () => {
    var rootBackup = resolver.settings.root;
    var rootSecureBackup = resolver.settings.secure_root;

    resolver.settings.root = 'http://cdn.domain.com/';
    var url = resolver('images/1/1234');
    resolver.settings.root = rootBackup;

    resolver.settings.secure = true;
    resolver.settings.secure_root = 'https://cdn.domain.com/';
    var secureUrl = resolver('images/1/1234');
    resolver.settings.secure_root = rootSecureBackup;
    resolver.settings.secure = false;

    expect(url).toBe('http://cdn.domain.com/cloud_name/image/upload/images/1/1234');
    expect(secureUrl).toBe('https://cdn.domain.com/cloud_name/image/upload/images/1/1234');
  });

  it('resolves files', () => {
    var vanillaUrl = resolver('files/1/1234', {}, true);
    var optionsUrl = resolver('files/1/1234', {
      height: 100
    }, true);

    var expectation = 'http://res.cloudinary.com/cloud_name/raw/upload/files/1/1234';
    expect(vanillaUrl).toBe(expectation);
    expect(optionsUrl).toBe(expectation);
  });
});
