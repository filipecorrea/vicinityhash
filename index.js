'use strict'

const geohash = require('ngeohash')

const defaultPrecision = 7
const defaultCompress = false
const defaultCompressMin = 1
const defaultCompressMax = 12

exports.convert = (geofence, config) => {
  validateGeofence(geofence)
  if (config) validateConfig(config)

  const latitude = Number(geofence.latitude)
  const longitude = Number(geofence.longitude)
  const radius = parseInt(geofence.radius)
  const precision = parseInt(config?.precision) || defaultPrecision
  const isCompressionEnabled = config?.compress || defaultCompress
  const minimumCompression = parseInt(config?.compressMin) || defaultCompressMin
  const maxCompression = parseInt(config?.compressMax) || defaultCompressMax

  const gridWidth = [
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
  const gridHeight = [
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

  const height = (gridHeight[precision - 1]) / 2
  const width = (gridWidth[precision - 1]) / 2

  const latitudeMoves = parseInt(Math.ceil(radius / height))
  const longitudeMoves = parseInt(Math.ceil(radius / width))

  const coordinates = []

  for (let i = 0; i < latitudeMoves; i++) {
    const coordinateLatitude = height * i

    for (let j = 0; j < longitudeMoves; j++) {
      const coordinateLongitude = width * j

      if (isCoordinateInGeofence(coordinateLatitude, coordinateLongitude, radius)) {
        const center = getCenter(coordinateLatitude, coordinateLongitude, height, width)

        coordinates.push(getCoordinate(center[1], center[0], latitude, longitude))
        coordinates.push(getCoordinate(-center[1], center[0], latitude, longitude))
        coordinates.push(getCoordinate(center[1], -center[0], latitude, longitude))
        coordinates.push(getCoordinate(-center[1], -center[0], latitude, longitude))
      }
    }
  }

  const geohashes = coordinates.reduce((acc, present, index) => {
    acc.push(geohash.encode(present[0], present[1], precision))
    return acc
  }, [])

  if (isCompressionEnabled) {
    return compress(
      new Set(geohashes),
      minimumCompression,
      maxCompression
    )
  }

  return geohashes
}

function validateGeofence(geofence) {
  const { latitude, longitude, radius } = geofence

  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    throw new Error('Latitude must be a number between -90 and 90')
  }
  if (isNaN(longitude) || longitude < -180 || longitude > 180) {
    throw new Error('Longitude must be a number between -180 and 180')
  }
  if (isNaN(radius) || !Number.isInteger(radius) || radius <= 0) {
    throw new Error('Radius must be a positive integer')
  }
}

function validateConfig(config) {
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

function isCoordinateInGeofence(latitude, longitude, radius) {
  return Math.pow(longitude, 2) + Math.pow(latitude, 2) <= Math.pow(radius, 2)
}

function getCenter(latitude, longitude, height, width) {
  const y = latitude + (height / 2)
  const x = longitude + (width / 2)
  return [x, y]
}

function getCoordinate(y, x, latitude, longitude) {
  const pi = 3.14159265359
  const earthRadius = 6371000

  const latitudeDiff = (y / earthRadius) * (180 / pi)
  const longitudeDiff = (x / earthRadius) * (180 / pi) / Math.cos(latitude * pi / 180)

  const coordinateLatitude = latitude + latitudeDiff
  const coordinateLongitude = longitude + longitudeDiff

  return [coordinateLatitude, coordinateLongitude]
}

function compress(geohashes, minimum, maximum) {
  const deleteGeohashes = new Set()
  const finalGeohashes = new Set()
  let compressing = true
  let finalGeohashesSize = 0

  while (compressing) {
    finalGeohashes.clear()
    deleteGeohashes.clear()
    for (const geohash of geohashes) {
      if (geohash.length >= minimum) {
        const part = geohash.slice(0, -1)
        if (!deleteGeohashes.has(part) && !deleteGeohashes.has(geohash)) {
          const geohashCombinations = new Set(getGeohashCombinations(part))

          if (isSubset(geohashCombinations, geohashes)) {
            finalGeohashes.add(part)
            deleteGeohashes.add(part)
          }
          else {
            deleteGeohashes.add(geohash)

            if (geohash.length >= maximum) {
              finalGeohashes.add(geohash.slice(0, maximum))
            }
            else {
              finalGeohashes.add(geohash)
            }
          }

          compressing = !finalGeohashesSize === finalGeohashes.size
        }
      }
    }

    finalGeohashesSize = finalGeohashes.size
    geohashes.clear()
    geohashes = new Set([ ...geohashes, ...finalGeohashes ])
  }

  return [ ...geohashes ]
}

function getGeohashCombinations(string) {
  const base32 = [
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
  return base32.reduce((acc, present, index) => {
    acc.push('' + string + present)
    return acc
  }, [])
}

function isSubset(subset, set) {
  for (var elem of subset) {
    if (!set.has(elem)) return false
  }
  return true
}
