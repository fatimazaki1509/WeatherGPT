from fastapi import APIRouter
import requests

from app.config.settings import OPENWEATHER_API_KEY

router = APIRouter()


@router.get("/current/{city}")
async def get_current_weather(city: str):
    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
    )

    response = requests.get(url)

    return response.json()


@router.get("/forecast/{city}")
async def get_forecast(city: str):
    url = (
        f"https://api.openweathermap.org/data/2.5/forecast"
        f"?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
    )

    response = requests.get(url)

    return response.json()


@router.get("/air-quality/{city}")
async def get_air_quality(city: str):

    geo_url = (
        f"http://api.openweathermap.org/geo/1.0/direct"
        f"?q={city}&limit=1&appid={OPENWEATHER_API_KEY}"
    )

    geo_response = requests.get(geo_url)
    geo_data = geo_response.json()

    if not geo_data:
        return {"error": "City not found"}

    lat = geo_data[0]["lat"]
    lon = geo_data[0]["lon"]

    aqi_url = (
        f"http://api.openweathermap.org/data/2.5/air_pollution"
        f"?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}"
    )

    aqi_response = requests.get(aqi_url)

    return aqi_response.json()