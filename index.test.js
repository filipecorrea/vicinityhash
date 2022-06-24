const vicinityhash = require('./index')

const geofence = {
  latitude: 48.858156,
  longitude: 2.294776,
  radius: 2000
}

test('converts given latitude, longitude and radius', () => {
  const geohashes = vicinityhash.convert(geofence)

  expect(geohashes.length).toBe(2264)
  expect(geohashes).toEqual(expect.arrayContaining([
    'u09tunr', 'u09tunr', 'u09tunq', 'u09tunq', 'u09tuq2', 'u09tuq2',
    'u09tunm', 'u09tunm', 'u09tuq2', 'u09tuq2', 'u09tunm', 'u09tunm',
    'u09tuq3', 'u09tuq3', 'u09tunk', 'u09tunk', 'u09tuq6', 'u09tuq6',
    'u09tun7', 'u09tun7', 'u09tuq7', 'u09tuq7', 'u09tun6', 'u09tun6',
    'u09tuq7', 'u09tuq7', 'u09tun6', 'u09tun6', 'u09tuqk', 'u09tuqk',
    'u09tun3', 'u09tun3', 'u09tuqm', 'u09tuqm', 'u09tun2', 'u09tun2',
    'u09tuqq', 'u09tuqq', 'u09tgyr', 'u09tgyr', 'u09tuqq', 'u09tuqq',
    'u09tgyr', 'u09tgyr', 'u09tuqr', 'u09tuqr', 'u09tgyq', 'u09tgyq',
    'u09tuw2', 'u09tuw2', 'u09tgym', 'u09tgym', 'u09tuw3', 'u09tuw3',
    'u09tgyk', 'u09tgyk', 'u09tuw6', 'u09tuw6', 'u09tgy7', 'u09tgy7',
    'u09tuw6', 'u09tuw6', 'u09tgy7', 'u09tgy7', 'u09tuw7', 'u09tuw7',
    'u09tgy6', 'u09tgy6', 'u09tuwk', 'u09tuwk', 'u09tgy3', 'u09tgy3',
    'u09tuwm', 'u09tuwm', 'u09tgy2', 'u09tgy2', 'u09tuwm', 'u09tuwm',
    'u09tgy2', 'u09tgy2', 'u09tuwq', 'u09tuwq', 'u09tgwr', 'u09tgwr',
    'u09tuwr', 'u09tuwr', 'u09tgwq', 'u09tgwq', 'u09tuy2', 'u09tuy2',
    'u09tgwm', 'u09tgwm', 'u09tuy2', 'u09tuy2', 'u09tgwm', 'u09tgwm',
    'u09tuy3', 'u09tuy3', 'u09tgwk', 'u09tgwk'
  ]))
})

test('converts with reduced precision', () => {
  const config = {
    precision: 6
  }

  const geohashes = vicinityhash.convert(geofence, config)

  expect(geohashes).toStrictEqual([
    'u09tuq', 'u09tuq', 'u09tun', 'u09tun', 'u09tuq', 'u09tuq',
    'u09tgy', 'u09tgy', 'u09tuw', 'u09tuw', 'u09tgy', 'u09tgy',
    'u09tuy', 'u09tuy', 'u09tgw', 'u09tgw', 'u09tur', 'u09tum',
    'u09tup', 'u09tuj', 'u09tur', 'u09tum', 'u09tgz', 'u09tgv',
    'u09tux', 'u09tut', 'u09tgz', 'u09tgv', 'u09tuz', 'u09tuv',
    'u09tgx', 'u09tgt', 'u09tur', 'u09tum', 'u09tup', 'u09tuj',
    'u09tur', 'u09tum', 'u09tgz', 'u09tgv', 'u09tux', 'u09tut',
    'u09tgz', 'u09tgv', 'u09tuz', 'u09tuv', 'u09tgx', 'u09tgt',
    'u09wh2', 'u09tuk', 'u09wh0', 'u09tuh', 'u09wh2', 'u09tuk',
    'u09w5b', 'u09tgu', 'u09wh8', 'u09tus', 'u09w5b', 'u09tgu',
    'u09wh2', 'u09tuk', 'u09wh0', 'u09tuh', 'u09wh2', 'u09tuk',
    'u09w5b', 'u09tgu', 'u09wh8', 'u09tus', 'u09w5b', 'u09tgu',
    'u09wh3', 'u09tu7', 'u09wh1', 'u09tu5', 'u09wh3', 'u09tu7',
    'u09w5c', 'u09tgg', 'u09wh9', 'u09tue', 'u09w5c', 'u09tgg',
    'u09wh3', 'u09tu7', 'u09wh1', 'u09tu5', 'u09wh3', 'u09tu7',
    'u09w5c', 'u09tgg'
  ])
})

test('converts with enhanced precision', () => {
  const config = {
    precision: 8
  }

  const geohashes = vicinityhash.convert(geofence, config)

  expect(geohashes.length).toBe(69880)
  expect(geohashes).toEqual(expect.arrayContaining([
    'u09tunr5', 'u09tunr5', 'u09tunqg', 'u09tunqg', 'u09tunr7',
    'u09tunr7', 'u09tunqe', 'u09tunqe', 'u09tunr7', 'u09tunr7',
    'u09tunqe', 'u09tunqe', 'u09tunre', 'u09tunre', 'u09tunq7',
    'u09tunq7', 'u09tunrg', 'u09tunrg', 'u09tunq5', 'u09tunq5',
    'u09tuq25', 'u09tuq25', 'u09tunmg', 'u09tunmg', 'u09tuq25',
    'u09tuq25', 'u09tunmg', 'u09tunmg', 'u09tuq27', 'u09tuq27',
    'u09tunme', 'u09tunme', 'u09tuq2e', 'u09tuq2e', 'u09tunm7',
    'u09tunm7', 'u09tuq2g', 'u09tuq2g', 'u09tunm5', 'u09tunm5',
    'u09tuq35', 'u09tuq35', 'u09tunm5', 'u09tunm5', 'u09tuq35',
    'u09tuq35', 'u09tunkg', 'u09tunkg', 'u09tuq37', 'u09tuq37',
    'u09tunke', 'u09tunke', 'u09tuq3e', 'u09tuq3e', 'u09tunk7',
    'u09tunk7', 'u09tuq3g', 'u09tuq3g', 'u09tunk5', 'u09tunk5',
    'u09tuq3g', 'u09tuq3g', 'u09tunk5', 'u09tunk5', 'u09tuq65',
    'u09tuq65', 'u09tun7g', 'u09tun7g', 'u09tuq67', 'u09tuq67',
    'u09tun7e', 'u09tun7e', 'u09tuq6e', 'u09tuq6e', 'u09tun77',
    'u09tun77', 'u09tuq6e', 'u09tuq6e', 'u09tun77', 'u09tun77',
    'u09tuq6g', 'u09tuq6g', 'u09tun75', 'u09tun75', 'u09tuq75',
    'u09tuq75', 'u09tun6g', 'u09tun6g', 'u09tuq77', 'u09tuq77',
    'u09tun6e', 'u09tun6e', 'u09tuq77', 'u09tuq77', 'u09tun6e',
    'u09tun6e', 'u09tuq7e', 'u09tuq7e', 'u09tun67', 'u09tun67'
  ]))
})

test('converts with compression', () => {
  const config = {
    compress: true
  }

  const geohashes = vicinityhash.convert(geofence, config)

  expect(geohashes).toEqual(expect.arrayContaining([
    'u09tun',  'u09tuq',  'u09tgy',  'u09tuw',  'u09tgwr', 'u09tgwq',
    'u09tuy2', 'u09tgwm', 'u09tuy3', 'u09tgwk', 'u09tuy6', 'u09tgw7',
    'u09tuy7', 'u09tgw6', 'u09tgwx', 'u09tgwp', 'u09tgww', 'u09tgwn',
    'u09tuy8', 'u09tuy0', 'u09tgwt', 'u09tgwj', 'u09tuy9', 'u09tuy1',
    'u09tgws', 'u09tgwh', 'u09tuyd', 'u09tuy4', 'u09tgwe', 'u09tgw5',
    'u09tuye', 'u09tuy5', 'u09tgwd', 'u09tgw4', 'u09tuj',  'u09tum',
    'u09tgv',  'u09tut',  'u09tgwz', 'u09tgtz', 'u09tgwy', 'u09tgty',
    'u09tuyb', 'u09tuvb', 'u09tgwv', 'u09tgtv', 'u09tuyc', 'u09tuvc',
    'u09tgwu', 'u09tgtu', 'u09tuyf', 'u09tuvf', 'u09tgwg', 'u09tgtg',
    'u09tup',  'u09tur',  'u09tgz',  'u09tux',  'u09tgxp', 'u09tgtx',
    'u09tgxn', 'u09tgtw', 'u09tuz0', 'u09tuv8', 'u09tgxj', 'u09tgtt',
    'u09tuz1', 'u09tuv9', 'u09tgxh', 'u09tgts', 'u09tuz4', 'u09tuvd',
    'u09tgx5', 'u09tgte', 'u09tgxr', 'u09tgtr', 'u09tgxq', 'u09tgtq',
    'u09tuz2', 'u09tuv2', 'u09tgxm', 'u09tgtm', 'u09tuz3', 'u09tuv3',
    'u09tgxk', 'u09tgtk', 'u09tuz6', 'u09tuv6', 'u09tgx7', 'u09tgt7',
    'u09tgxx', 'u09tgtp', 'u09tgxw', 'u09tgtn', 'u09tuz8', 'u09tuv0',
    'u09tgxt', 'u09tgtj', 'u09tuz9', 'u09tuv1'
  ]))
})

test('converts with compression levels', () => {
  const config = {
    compress: true,
    compressMin: 3,
    compressMax: 6
  }

  const geohashes = vicinityhash.convert(geofence, config)

  expect(geohashes).toStrictEqual([
    'u09tun', 'u09tuq', 'u09tgy', 'u09tuw',
    'u09tgw', 'u09tuy', 'u09tuj', 'u09tum',
    'u09tgv', 'u09tut', 'u09tgt', 'u09tuv',
    'u09tup', 'u09tur', 'u09tgz', 'u09tux',
    'u09tgx', 'u09tuz', 'u09tuh', 'u09tuk',
    'u09tgu', 'u09tus', 'u09tgs', 'u09tuu',
    'u09wh0', 'u09wh2', 'u09w5b', 'u09wh8',
    'u09w58', 'u09whb', 'u09tu5', 'u09tu7',
    'u09tgg', 'u09tue', 'u09wh1', 'u09wh3',
    'u09w5c', 'u09wh9'
  ])
})

test('converts with precision and minimum levels equals', () => {
  const config = {
    precision: 6,
    compress: true,
    compressMin: 6,
    compressMax: 7
  }

  const geohashes = vicinityhash.convert(geofence, config)

  expect(geohashes).toStrictEqual([
    'u09tuq', 'u09tun', 'u09tgy',
    'u09tuw', 'u09tuy', 'u09tgw',
    'u09tur', 'u09tum', 'u09tup',
    'u09tuj', 'u09tgz', 'u09tgv',
    'u09tux', 'u09tut', 'u09tuz',
    'u09tuv', 'u09tgx', 'u09tgt',
    'u09wh2', 'u09tuk', 'u09wh0',
    'u09tuh', 'u09w5b', 'u09tgu',
    'u09wh8', 'u09tus', 'u09wh3',
    'u09tu7', 'u09wh1', 'u09tu5',
    'u09w5c', 'u09tgg', 'u09wh9',
    'u09tue'
  ])
})

test('converts with minimum level lower than precision', () => {
  const config = {
    precision: 6,
    compress: true,
    compressMin: 4,
    compressMax: 6
  }

  const geohashes = vicinityhash.convert(geofence, config)

  expect(geohashes).toStrictEqual([
    'u09tuq', 'u09tun', 'u09tgy',
    'u09tuw', 'u09tuy', 'u09tgw',
    'u09tur', 'u09tum', 'u09tup',
    'u09tuj', 'u09tgz', 'u09tgv',
    'u09tux', 'u09tut', 'u09tuz',
    'u09tuv', 'u09tgx', 'u09tgt',
    'u09wh2', 'u09tuk', 'u09wh0',
    'u09tuh', 'u09w5b', 'u09tgu',
    'u09wh8', 'u09tus', 'u09wh3',
    'u09tu7', 'u09wh1', 'u09tu5',
    'u09w5c', 'u09tgg', 'u09wh9',
    'u09tue'
  ])
})

test('converts with maximum level lower than precision', () => {
  const config = {
    precision: 6,
    compress: true,
    compressMin: 4,
    compressMax: 5
  }

  const geohashes = vicinityhash.convert(geofence, config)

  expect(geohashes).toStrictEqual([ 'u09tu', 'u09tg', 'u09wh', 'u09w5' ])
})

test('throws error if latitude is invalid', () => {
  geofence.latitude = 'foo'
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Latitude must be a number between -90 and 90')

  geofence.latitude = -91
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Latitude must be a number between -90 and 90')

  geofence.latitude = 91
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Latitude must be a number between -90 and 90')

  geofence.latitude = 48.858156
})

test('throws error if longitude is invalid', () => {
  geofence.longitude = 'foo'
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Longitude must be a number between -180 and 180')

  geofence.longitude = -181
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Longitude must be a number between -180 and 180')

  geofence.longitude = 181
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Longitude must be a number between -180 and 180')

  geofence.longitude = 2.294776
})

test('throws error if radius is invalid', () => {
  geofence.radius = 'foo'
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Radius must be a positive integer')

  geofence.radius = 0
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Radius must be a positive integer')

  geofence.radius = -1
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Radius must be a positive integer')
  
  geofence.radius = 20000
})

test('throws error if precision is invalid', () => {
  let config = { precision: 'foo' }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Precision level must be a number between 1 and 12')

  config = { precision: 0 }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Precision level must be a number between 1 and 12')

  config = { precision: 13 }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Precision level must be a number between 1 and 12')
})

test('throws error if compress is invalid', () => {
  const config = { compress: 'foo' }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Compress must be true or false')
})

test('throws error if compress minimum level is invalid', () => {
  let config = { compress: true, compressMin: 'foo' }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Compress minimum level must be a number between 1 and 12')

  config = { compress: true, compressMin: 0 }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Compress minimum level must be a number between 1 and 12')

  config = { compress: true, compressMin: 13 }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Compress minimum level must be a number between 1 and 12')
})

test('throws error if compress maximum level is invalid', () => {
  let config = { compress: true, compressMax: 'foo' }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Compress maximum level must be a number between 1 and 12')

  config = { compress: true, compressMax: 0 }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Compress maximum level must be a number between 1 and 12')

  config = { compress: true, compressMax: 13 }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Compress maximum level must be a number between 1 and 12')
})

test('throws error if compress minimum level is greater than maximum level', () => {
  const config = {
    precision: 5,
    compress: true,
    compressMin: 5,
    compressMax: 4
  }

  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Compress minimum level must be greater than maximum level')
})
