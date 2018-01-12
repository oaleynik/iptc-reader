const sharp = require('sharp');
const parser = require('./');

it('Should parse IPTC directory', async () => {
  let metadata = await sharp('./fixture.jpg').metadata();
  let buffer = metadata.iptc;
  let iptc = parser(buffer);

  expect(iptc.caption).toBe('Stopped briefly at the Cardinals stadium hoping for some lightning behind it and got lucky!');
  expect(iptc.keywords).toEqual([
    '20170824',
    'arizona',
    'arizona cardinals',
    'canon 11-24mm f4',
    'canon 5DSR',
    'glendale',
    'lightning',
    'monsoon',
    'parking lot',
    'rain',
    'stadium',
    'storm chasing',
    'thunderstorm',
  ]);
});