export class GeolocationError extends Error {
  readonly code: 'PERMISSION_DENIED' | 'UNAVAILABLE' | 'TIMEOUT' | 'NOT_SUPPORTED'

  constructor(
    message: string,
    code: 'PERMISSION_DENIED' | 'UNAVAILABLE' | 'TIMEOUT' | 'NOT_SUPPORTED'
  ) {
    super(message)
    this.code = code
    this.name = 'GeolocationError'
  }
}

export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new GeolocationError('Geolocalización no disponible en este dispositivo', 'NOT_SUPPORTED'))
      return
    }
    navigator.geolocation.getCurrentPosition(resolve, (err) => {
      const codeMap: Record<number, 'PERMISSION_DENIED' | 'UNAVAILABLE' | 'TIMEOUT'> = {
        1: 'PERMISSION_DENIED',
        2: 'UNAVAILABLE',
        3: 'TIMEOUT',
      }
      reject(new GeolocationError(err.message, codeMap[err.code] ?? 'UNAVAILABLE'))
    }, {
      timeout: 8000,
      enableHighAccuracy: false,
      maximumAge: 60_000,
    })
  })
}

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const url = new URL('https://nominatim.openstreetmap.org/reverse')
  url.searchParams.set('lat', String(lat))
  url.searchParams.set('lon', String(lng))
  url.searchParams.set('format', 'json')

  const res = await fetch(url.toString(), { headers: { 'Accept-Language': 'es' } })
  if (!res.ok) throw new Error('Error al obtener la dirección')

  const data = await res.json() as { address?: Record<string, string>; display_name?: string }
  const a = data.address ?? {}
  return (
    a['suburb'] ?? a['city_district'] ?? a['quarter'] ?? a['neighbourhood'] ??
    a['city'] ?? a['town'] ?? a['village'] ?? a['county'] ??
    data.display_name ?? `${lat.toFixed(3)}, ${lng.toFixed(3)}`
  )
}
