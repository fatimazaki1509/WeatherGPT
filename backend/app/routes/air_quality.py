from fastapi import APIRouter
import requests
import os
from datetime import datetime

router = APIRouter()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")


@router.get("/")
def get_air_quality(lat: float, lon: float):

    url = (
        f"https://api.openweathermap.org/data/2.5/air_pollution"
        f"?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}"
    )

    response = requests.get(url)
    data = response.json()

    if "list" not in data:
        return {
            "aqi": None,
            "components": {},
            "timestamp": None,
            "error": "Unable to fetch AQI"
        }

    item = data["list"][0]

    return {
        "aqi": item["main"]["aqi"],
        "components": item["components"],
        "timestamp": datetime.utcfromtimestamp(
            item["dt"]
        ).strftime("%d %b %Y %I:%M %p UTC")
    }