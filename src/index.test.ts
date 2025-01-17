import * as vicinityhash from '../src/index'

const latitude = 48.858156
const longitude = 2.294776
const radius = 2000
const geofence = { latitude, longitude, radius }

beforeEach(() => {
  geofence.latitude = latitude
  geofence.longitude = longitude
  geofence.radius = radius
})

test('converts given latitude, longitude and radius', () => {
  const geohashes = vicinityhash.convert(geofence)

  expect(geohashes.length).toBe(886)
  expect(geohashes).toEqual(expect.arrayContaining([
    'u09tunr', 'u09tunq', 'u09tuq2', 'u09tunm', 'u09tuq3', 'u09tunk',
    'u09tuq6', 'u09tun7', 'u09tuq7', 'u09tun6', 'u09tuqk', 'u09tun3',
    'u09tuqm', 'u09tun2', 'u09tuqq', 'u09tgyr', 'u09tuqr', 'u09tgyq',
    'u09tuw2', 'u09tgym', 'u09tuw3', 'u09tgyk', 'u09tuw6', 'u09tgy7',
    'u09tuw7', 'u09tgy6', 'u09tuwk', 'u09tgy3', 'u09tuwm', 'u09tgy2',
    'u09tuwq', 'u09tgwr', 'u09tuwr', 'u09tgwq', 'u09tuy2', 'u09tgwm',
    'u09tuy3', 'u09tgwk', 'u09tuy6', 'u09tgw7', 'u09tuy7', 'u09tgw6',
    'u09tunx', 'u09tunp', 'u09tunw', 'u09tunn', 'u09tuq8', 'u09tuq0',
    'u09tunt', 'u09tunj', 'u09tuq9', 'u09tuq1', 'u09tuns', 'u09tunh',
    'u09tuqd', 'u09tuq4', 'u09tune', 'u09tun5', 'u09tuqe', 'u09tuq5',
    'u09tund', 'u09tun4', 'u09tuqs', 'u09tuqh', 'u09tun9', 'u09tun1',
    'u09tuqt', 'u09tuqj', 'u09tun8', 'u09tun0', 'u09tuqw', 'u09tuqn',
    'u09tgyx', 'u09tgyp', 'u09tuqx', 'u09tuqp', 'u09tgyw', 'u09tgyn',
    'u09tuw8', 'u09tuw0', 'u09tgyt', 'u09tgyj', 'u09tuw9', 'u09tuw1',
    'u09tgys', 'u09tgyh', 'u09tuwd', 'u09tuw4', 'u09tgye', 'u09tgy5',
    'u09tuwe', 'u09tuw5', 'u09tgyd', 'u09tgy4', 'u09tuws', 'u09tuwh',
    'u09tgy9', 'u09tgy1', 'u09tuwt', 'u09tuwj'
  ]))
})

test('converts with reduced precision', () => {
  const config = {
    precision: 6
  }

  const geohashes = vicinityhash.convert(geofence, config)

  expect(geohashes).toStrictEqual([
    'u09tuq', 'u09tun', 'u09tgy', 'u09tuw', 'u09tuy', 'u09tgw',
    'u09tur', 'u09tum', 'u09tup', 'u09tuj', 'u09tgz', 'u09tgv',
    'u09tux', 'u09tut', 'u09tuz', 'u09tuv', 'u09tgx', 'u09tgt',
    'u09wh2', 'u09tuk', 'u09wh0', 'u09tuh', 'u09w5b', 'u09tgu',
    'u09wh8', 'u09tus', 'u09wh3', 'u09tu7', 'u09wh1', 'u09tu5',
    'u09w5c', 'u09tgg', 'u09wh9', 'u09tue'
  ])
})

test('converts with enhanced precision', () => {
  const config = {
    precision: 8
  }

  const geohashes = vicinityhash.convert(geofence, config)

  expect(geohashes.length).toBe(26562)
  expect(geohashes).toEqual(expect.arrayContaining([
    'u09tunr5', 'u09tunqg', 'u09tunr7', 'u09tunqe', 'u09tunre', 'u09tunq7',
    'u09tunrg', 'u09tunq5', 'u09tuq25', 'u09tunmg', 'u09tuq27', 'u09tunme',
    'u09tuq2e', 'u09tunm7', 'u09tuq2g', 'u09tunm5', 'u09tuq35', 'u09tunkg',
    'u09tuq37', 'u09tunke', 'u09tuq3e', 'u09tunk7', 'u09tuq3g', 'u09tunk5',
    'u09tuq65', 'u09tun7g', 'u09tuq67', 'u09tun7e', 'u09tuq6e', 'u09tun77',
    'u09tuq6g', 'u09tun75', 'u09tuq75', 'u09tun6g', 'u09tuq77', 'u09tun6e',
    'u09tuq7e', 'u09tun67', 'u09tuq7g', 'u09tun65', 'u09tuqk5', 'u09tun3g',
    'u09tuqk7', 'u09tun3e', 'u09tuqke', 'u09tun37', 'u09tuqkg', 'u09tun35',
    'u09tuqm5', 'u09tun2g', 'u09tuqm7', 'u09tun2e', 'u09tuqme', 'u09tun27',
    'u09tuqmg', 'u09tun25', 'u09tuqq5', 'u09tgyrg', 'u09tuqq7', 'u09tgyre',
    'u09tuqqe', 'u09tgyr7', 'u09tuqqg', 'u09tgyr5', 'u09tuqr5', 'u09tgyqg',
    'u09tuqr7', 'u09tgyqe', 'u09tuqre', 'u09tgyq7', 'u09tuqrg', 'u09tgyq5',
    'u09tuw25', 'u09tgymg', 'u09tuw27', 'u09tgyme', 'u09tuw2e', 'u09tgym7',
    'u09tuw2g', 'u09tgym5', 'u09tuw35', 'u09tgykg', 'u09tuw37', 'u09tgyke',
    'u09tuw3e', 'u09tgyk7', 'u09tuw3g', 'u09tgyk5', 'u09tuw65', 'u09tgy7g',
    'u09tuw67', 'u09tgy7e', 'u09tuw6e', 'u09tgy77', 'u09tuw6g', 'u09tgy75',
    'u09tuw75', 'u09tgy6g', 'u09tuw77', 'u09tgy6e'
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

test('ensures all geohashes are unique', () => {
  const config = {
    precision: 7,
    compress: false,
  };

  const geohashes = vicinityhash.convert(geofence, config);

  expect(new Set(geohashes).size).toBe(geohashes.length);
});

test('throws error if latitude is invalid', () => {
  geofence.latitude = 'foo' as unknown as number
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Latitude must be a number between -90 and 90')

  geofence.latitude = -91
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Latitude must be a number between -90 and 90')

  geofence.latitude = 91
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Latitude must be a number between -90 and 90')
})

test('throws error if longitude is invalid', () => {
  geofence.longitude = 'foo' as unknown as number
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Longitude must be a number between -180 and 180')

  geofence.longitude = -181
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Longitude must be a number between -180 and 180')

  geofence.longitude = 181
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Longitude must be a number between -180 and 180')
})

test('throws error if radius is invalid', () => {
  geofence.radius = 'foo' as unknown as number
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Radius must be a positive integer')

  geofence.radius = 0
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Radius must be a positive integer')

  geofence.radius = -1
  expect(() => { vicinityhash.convert(geofence) }).toThrow('Radius must be a positive integer')
})

test('throws error if precision is invalid', () => {
  let config = { precision: 'foo' as unknown as number }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Precision level must be a number between 1 and 12')

  config = { precision: 0 }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Precision level must be a number between 1 and 12')

  config = { precision: 13 }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Precision level must be a number between 1 and 12')
})

test('throws error if compress is invalid', () => {
  const config = { compress: 'foo' as unknown as boolean }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Compress must be true or false')
})

test('throws error if compress minimum level is invalid', () => {
  let config = { compress: true, compressMin: 'foo' as unknown as number }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Compress minimum level must be a number between 1 and 12')

  config = { compress: true, compressMin: 0 }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Compress minimum level must be a number between 1 and 12')

  config = { compress: true, compressMin: 13 }
  expect(() => { vicinityhash.convert(geofence, config) }).toThrow('Compress minimum level must be a number between 1 and 12')
})

test('throws error if compress maximum level is invalid', () => {
  let config = { compress: true, compressMax: 'foo' as unknown as number }
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
