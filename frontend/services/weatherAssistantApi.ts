export async function askWeatherAssistant(
  message: string,
  latitude: number,
  longitude: number
) {
  const response = await fetch(
    "http://127.0.0.1:8000/api/weather-assistant/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        latitude,
        longitude,
        language: "en",
      }),
    }
  );

  return response.json();
}