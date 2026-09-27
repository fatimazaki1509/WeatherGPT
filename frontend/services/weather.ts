const API_BASE =
  "http://localhost:8000/api/weather";

export async function getCurrentWeather(
  city: string
) {
  const res = await fetch(
    `${API_BASE}/current/${city}`
  );

  if (!res.ok)
    throw new Error(
      "Current weather failed"
    );

  return await res.json();
}

export async function getForecast(
  city: string
) {
  const res = await fetch(
    `${API_BASE}/forecast/${city}`
  );

  if (!res.ok)
    throw new Error(
      "Forecast failed"
    );

  return await res.json();
}

export async function getAQI(
  city: string
) {
  const res = await fetch(
    `${API_BASE}/air-quality/${city}`
  );

  if (!res.ok)
    throw new Error("AQI failed");

  return await res.json();
}