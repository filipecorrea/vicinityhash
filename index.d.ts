export function convert(
  geofence: {
    latitude: number,
    longitude: number,
    radius: number
  },
  config?: {
    precision?: number,
    compress?: boolean,
    compressMin?: number,
    compressMax?: number
  }
): string[]
