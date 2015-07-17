System.register([], function (_export) {
  'use strict';

  var mappings, multiple;
  return {
    setters: [],
    execute: function () {
      mappings = {
        angle: 'a',
        background: 'b',
        border: 'bo',
        crop: 'c',
        default_image: 'd',
        density: 'dn',
        effect: 'e',
        fetch_format: 'f',
        flags: 'fl',
        gravity: 'g',
        height: 'h',
        opacity: 'o',
        overlay: 'l',
        page: 'pg',
        quality: 'q',
        radius: 'r',
        transformation: 't',
        underlay: 'u',
        width: 'w',
        x: 'x',
        y: 'y'
      };

      _export('mappings', mappings);

      multiple = {
        flags: true
      };

      _export('multiple', multiple);
    }
  };
});