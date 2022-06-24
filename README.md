# vicinityhash
Given a latitude, longitude and the radius, this library converts a circular [geofence](https://en.wikipedia.org/wiki/Geo-fence) area into a set of [geohashes](https://en.wikipedia.org/wiki/Geohash).

This code was developed based on [Ashwin Nair's proximityhash](https://github.com/ashwin711/proximityhash).

## Installation

Using npm:

```bash
npm install --save vicinityhash
```

Using yarn:

```bash
yarn add vicinityhash
```

## Usage

With JavaScript:

```javascript
const vicinityhash = require('vicinityhash')

const geofence = {
  latitude: 51.51,
  longitude: -0.07,
  radius: 10000 // in meters
}

const geohashes = vicinityhash.convert(geofence)
```

![Geohashes](./geohashes.png)

### Optional Configuration

Geohash precision:

```javascript
const vicinityhash = require('vicinityhash')

const geofence = {
  latitude: 51.51,
  longitude: -0.07,
  radius: 20000
}

const config = {
  precision: 8 // 7 by default, accepts 1 to 12
}

const geohashes = vicinityhash.convert(geofence, config)
```

Geohashes compression:

```javascript
const vicinityhash = require('vicinityhash')

const geofence = {
  latitude: 51.51,
  longitude: -0.07,
  radius: 20000
}

const config = {
  compress: true // false by default
}

const geohashes = vicinityhash.convert(geofence, config)
```

![Geohashes compressed](./compress.png)

Geohashes compression levels:

```javascript
const vicinityhash = require('vicinityhash')

const geofence = {
  latitude: 51.51,
  longitude: -0.07,
  radius: 20000
}

const config = {
  compress: true,
  compressMin: 3, // 1 by default, accepts 1 to 12
  compressMax: 6 // 12 by default, accepts 1 to 12de
}

const geohashes = vicinityhash.convert(geofence, config)
```

![Geohashes with customized compression levels](./custom_compress.png)
