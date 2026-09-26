from fastapi import APIRouter
import requests

router = APIRouter()

@router.get("/")
def get_weather_now(
    lat: float = 21.1458,
    lon: float = 79.0882
):
    url = (
        f"https://api.open-meteo.com/v1/forecast"
        f"?latitude={lat}"
        f"&longitude={lon}"
        f"&current=temperature_2m,"
        f"relative_humidity_2m,"
        f"apparent_temperature,"
        f"wind_speed_10m,"
        f"pressure_msl"
        f"&daily=sunrise,sunset,uv_index_max"
        f"&timezone=auto"
    )

    response = requests.get(url, timeout=10)
    data = response.json()

    current = data["current"]

    temperature = current["temperature_2m"]
    humidity = current["relative_humidity_2m"]
    feels_like = current["apparent_temperature"]
    wind_speed = current["wind_speed_10m"]
    pressure = current["pressure_msl"]

    sunrise = data["daily"]["sunrise"][0]
    sunset = data["daily"]["sunset"][0]
    uv_index = data["daily"]["uv_index_max"][0]

    highlights = [
        f"Current temperature is {temperature}°C",
        f"Humidity level is {humidity}%",
        f"Wind speed recorded at {wind_speed} km/h",
    ]

    advisory = []

    if temperature > 35:
        advisory.append(
            "Avoid prolonged exposure to direct sunlight"
        )

    if humidity > 85:
        advisory.append(
            "High humidity may cause discomfort"
        )

    if wind_speed > 25:
        advisory.append(
            "Strong winds expected in some areas"
        )

    if not advisory:
        advisory = [
            "Weather conditions are safe",
            "Outdoor activities recommended",
            "Continue monitoring forecasts",
        ]

    return {
        "city": "Nagpur",

        "temperature": temperature,
        "feels_like": feels_like,

        "humidity": humidity,
        "wind_speed": wind_speed,

        "visibility": 10,

        "pressure": pressure,
        "uv_index": uv_index,

        "condition": "Partly Cloudy",

        "air_quality": "Good",

        "sunrise": sunrise,
        "sunset": sunset,

        "last_updated": "Live",

        "highlights": highlights,
        "safety_advisory": advisory,
    }