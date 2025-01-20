import geohash from 'ngeohash'

const defaultPrecision: number = 7
const defaultCompress: boolean = false
const defaultCompressMin: number = 1
const defaultCompressMax: number = 12

export function convert(
  geofence: {
    latitude: number
    longitude: number
    radius: number
  },
  config?: {
    precision?: number
    compress?: boolean
    compressMin?: number
    compressMax?: number
  }
) {
  validateGeofence(geofence)
  if (config) validateConfig(config)

  const { latitude, longitude, radius } = geofence
  const precision = config?.precision || defaultPrecision
  const isCompressionEnabled = config?.compress || defaultCompress
  const minCompression = config?.compressMin || defaultCompressMin
  const maxCompression = config?.compressMax || defaultCompressMax

  const gridWidth: number[] = [
    5009400.0,
    1252300.0,
    156500.0,
    39100.0,
    4900.0,
    1200.0,
    152.9,
    38.2,
    4.8,
    1.2,
    0.149,
    0.0370
  ]
  const gridHeight: number[] = [
    4992600.0,
    624100.0,
    156000.0,
    19500.0,
    4900.0,
    609.4,
    152.4,
    19.0,
    4.8,
    0.595,
    0.149,
    0.0199
  ]

  const height: number = (gridHeight[precision - 1]) / 2
  const width: number = (gridWidth[precision - 1]) / 2

  const latitudeMoves: number = Math.ceil(radius / height)
  const longitudeMoves: number = Math.ceil(radius / width)

  const geohashSet = new Set<string>()

  for (let i = 0; i < latitudeMoves; i++) {
    const coordinateLatitude: number = height * i

    for (let j = 0; j < longitudeMoves; j++) {
      const coordinateLongitude: number = width * j

      if (isCoordinateInGeofence(coordinateLatitude, coordinateLongitude, radius)) {
        const center: [number, number] = getCenter(coordinateLatitude, coordinateLongitude, height, width)

        geohashSet.add(geohash.encode(...getCoordinate(center[1], center[0], latitude, longitude), precision))
        geohashSet.add(geohash.encode(...getCoordinate(-center[1], center[0], latitude, longitude), precision))
        geohashSet.add(geohash.encode(...getCoordinate(center[1], -center[0], latitude, longitude), precision))
        geohashSet.add(geohash.encode(...getCoordinate(-center[1], -center[0], latitude, longitude), precision))
      }
    }
  }

  if (isCompressionEnabled) {
    return compress(geohashSet, minCompression, maxCompression)
  }

  return [...geohashSet]
}

function validateGeofence(geofence: { latitude: number, longitude: number, radius: number }) {
  const { latitude, longitude, radius } = geofence

  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    throw new Error('Latitude must be a number between -90 and 90')
  }
  if (isNaN(longitude) || longitude < -180 || longitude > 180) {
    throw new Error('Longitude must be a number between -180 and 180')
  }
  if (!Number.isInteger(radius) || radius <= 0) {
    throw new Error('Radius must be a positive integer')
  }
}

function validateConfig(config: { precision?: number, compress?: boolean, compressMin?: number, compressMax?: number }) {
  const {
    precision = defaultPrecision,
    compress = defaultCompress,
    compressMin = defaultCompressMin,
    compressMax = defaultCompressMax
  } = config

  if (isNaN(precision) || !Number.isInteger(precision) || precision < 1 || precision > 12) {
    throw new Error('Precision level must be a number between 1 and 12')
  }
  if (compress && typeof compress !== 'boolean') {
    throw new Error('Compress must be true or false')
  }
  if (isNaN(compressMin) || !Number.isInteger(compressMin) || compressMin < 1 || compressMin > 12) {
    throw new Error('Compress minimum level must be a number between 1 and 12')
  }
  if (isNaN(compressMax) || !Number.isInteger(compressMax) || compressMax < 1 || compressMax > 12) {
    throw new Error('Compress maximum level must be a number between 1 and 12')
  }
  if (compressMin > compressMax) {
    throw new Error('Compress minimum level must be greater than maximum level')
  }
}

function isCoordinateInGeofence(latitude: number, longitude: number, radius: number): boolean {
  return Math.pow(longitude, 2) + Math.pow(latitude, 2) <= Math.pow(radius, 2)
}

function getCenter(latitude: number, longitude: number, height: number, width: number): [number, number] {
  const y: number = latitude + (height / 2)
  const x: number = longitude + (width / 2)
  return [ x, y ]
}

function getCoordinate(y: number, x: number, latitude: number, longitude: number): [number, number] {
  const pi: number = 3.14159265359
  const earthRadius: number = 6371000

  const latitudeDiff: number = (y / earthRadius) * (180 / pi)
  const longitudeDiff: number = (x / earthRadius) * (180 / pi) / Math.cos(latitude * pi / 180)

  const coordinateLatitude: number = latitude + latitudeDiff
  const coordinateLongitude: number = longitude + longitudeDiff

  return [ coordinateLatitude, coordinateLongitude ]
}

function compress(geohashes: Set<string>, minCompression: number, maxCompression: number): string[] {
  const deleteGeohashes: Set<string> = new Set()
  const finalGeohashes: Set<string> = new Set()
  let compressing: boolean = true
  let finalGeohashesSize: number = 0

  while (compressing) {
    finalGeohashes.clear()
    deleteGeohashes.clear()

    for (const geohash of geohashes) {
      if (geohash.length >= minCompression) {
        const part: string = geohash.slice(0, -1)

        if (!deleteGeohashes.has(part) && !deleteGeohashes.has(geohash)) {
          const geohashCombinations: Set<string> = new Set(getGeohashCombinations(part))

          if (isSubset(geohashCombinations, geohashes)) {
            finalGeohashes.add(part)
            deleteGeohashes.add(part)
          }
          else {
            finalGeohashes.add(geohash.length >= maxCompression ? geohash.slice(0, maxCompression) : geohash)
            deleteGeohashes.add(geohash)
          }

          compressing = !(finalGeohashesSize === finalGeohashes.size)
        }
      }
    }

    finalGeohashesSize = finalGeohashes.size
    geohashes.clear()
    geohashes = new Set([ ...geohashes, ...finalGeohashes ])
  }

  return [ ...geohashes ]
}

function getGeohashCombinations(string: string): string[] {
  const base32: string[] = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'j',
    'k',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ]
  return base32.reduce((acc: string[], present: string) => {
    acc.push('' + string + present)
    return acc
  }, [])
}

function isSubset(subset: Set<string>, set: Set<string>): boolean {
  if (subset.size > set.size) {
    return false
  }
  for (var elem of subset) {
    if (!set.has(elem)) {
      return false
    }
  }
  return true
}
