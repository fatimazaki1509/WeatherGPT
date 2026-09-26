from fastapi import APIRouter
import requests
import os

router = APIRouter()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

@router.get("/crop-recommendation")
async def crop_recommendation(
    lat: float,
    lon: float
):
    try:
        weather_url = (
            f"https://api.openweathermap.org/data/2.5/weather"
            f"?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
        )

        weather = requests.get(weather_url).json()

        temp = weather["main"]["temp"]
        humidity = weather["main"]["humidity"]

        rainfall = 0

        if "rain" in weather:
            rainfall = weather["rain"].get("1h", 0)

        if rainfall > 80:
            crop = "Rice"
            confidence = 92
            alternatives = ["Sugarcane", "Maize", "Soybean"]

        elif rainfall > 50:
            crop = "Soybean"
            confidence = 87
            alternatives = ["Cotton", "Tur", "Maize"]

        elif temp > 32:
            crop = "Cotton"
            confidence = 84
            alternatives = ["Bajra", "Jowar", "Groundnut"]

        else:
            crop = "Wheat"
            confidence = 80
            alternatives = ["Gram", "Mustard", "Barley"]

        return {
            "location": {
                "lat": lat,
                "lon": lon
            },
            "weather": {
                "temp": temp,
                "humidity": humidity,
                "rainfall": rainfall
            },
            "recommended_crop": crop,
            "confidence": confidence,
            "alternatives": alternatives
        }

    except Exception as e:
        return {
            "error": str(e)
        }