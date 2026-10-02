// Maps an Open-Meteo WMO weather code to [label, iconKey].
export const wmo = (c) =>
  c === 0 ? ['Clear', 'clear']
  : c <= 3 ? ['Partly cloudy', 'cloud']
  : c <= 48 ? ['Fog', 'cloud']
  : c <= 67 || (c >= 80 && c <= 82) ? ['Rain', 'rain']
  : c <= 77 || c === 85 || c === 86 ? ['Snow', 'cloud']
  : c >= 95 ? ['Thunderstorm', 'storm']
  : ['Cloudy', 'cloud'];

const aqiLabel = (e) =>
  e == null ? 'n/a' : e <= 20 ? 'Good' : e <= 40 ? 'Fair' : e <= 60 ? 'Moderate' : e <= 80 ? 'Poor' : e <= 100 ? 'Very poor' : 'Extreme';

/** Fetch live conditions from Open-Meteo (no API key needed). */
export async function fetchWeather(lat, lon) {
  const q = 'latitude=' + lat + '&longitude=' + lon;
  const [a, b] = await Promise.all([
    fetch(
      'https://api.open-meteo.com/v1/forecast?' + q +
        '&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,wind_direction_10m,weather_code,visibility&timezone=auto'
    ).then((r) => r.json()),
    fetch('https://air-quality-api.open-meteo.com/v1/air-quality?' + q + '&current=european_aqi')
      .then((r) => r.json())
      .catch(() => null),
  ]);
  const c = a.current;
  const w = wmo(c.weather_code);
  const e = b && b.current ? b.current.european_aqi : null;
  return {
    temp: Math.round(c.temperature_2m),
    cond: w[0],
    icon: w[1],
    humidity: Math.round(c.relative_humidity_2m),
    pressure: Math.round(c.surface_pressure),
    wind: Math.round(c.wind_speed_10m),
    dir: Math.round(c.wind_direction_10m),
    visibility: Math.round(c.visibility / 100) / 10,
    pollution: aqiLabel(e),
  };
}
