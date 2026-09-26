from fastapi import APIRouter
import requests
import os

router = APIRouter()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

@router.get("/disease-prediction")
async def disease_prediction(
    lat: float,
    lon: float
):
    try:
        weather_url = (
            f"https://api.openweathermap.org/data/2.5/weather"
            f"?lat={lat}&lon={lon}"
            f"&appid={OPENWEATHER_API_KEY}"
            f"&units=metric"
        )

        weather = requests.get(weather_url).json()

        temp = weather["main"]["temp"]
        humidity = weather["main"]["humidity"]

        rainfall = 0
        if "rain" in weather:
            rainfall = weather["rain"].get("1h", 0)

        threats = []
        score = 20

        # High humidity → fungal diseases
        if humidity > 80:
            threats.append("Leaf Spot")
            score += 25

        # Heavy rainfall → fungal outbreak
        if rainfall > 10:
            threats.append("Fungal Infection")
            score += 30

        # High temperature → pest activity
        if temp > 35:
            threats.append("Stem Borer")
            score += 20

        # Moderate humidity
        if 60 <= humidity <= 80:
            threats.append("Powdery Mildew")
            score += 10

        if score < 40:
            risk = "Low"
        elif score < 70:
            risk = "Medium"
        else:
            risk = "High"

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
            "risk": risk,
            "score": score,
            "threats": threats
        }

    except Exception as e:
        return {
            "error": str(e)
        }