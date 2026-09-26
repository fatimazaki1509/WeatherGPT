from fastapi import APIRouter
import requests
import os

router = APIRouter()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

@router.get("/")
def get_disaster_alerts(lat: float, lon: float):

    try:
        weather_url = (
            f"https://api.openweathermap.org/data/3.0/onecall"
            f"?lat={lat}&lon={lon}"
            f"&exclude=minutely,hourly"
            f"&appid={OPENWEATHER_API_KEY}"
            f"&units=metric"
        )

        weather = requests.get(weather_url).json()

        alerts = weather.get("alerts", [])

        risk_score = 0

        current = weather.get("current", {})
        wind_speed = current.get("wind_speed", 0)

        if wind_speed > 15:
            risk_score += 25

        daily = weather.get("daily", [])

        if daily:
            rain = daily[0].get("rain", 0)

            if rain > 50:
                risk_score += 40
            elif rain > 20:
                risk_score += 20

        risk_level = (
            "High" if risk_score > 60
            else "Medium" if risk_score > 30
            else "Low"
        )

        return {
            "risk_level": risk_level,
            "risk_score": risk_score,
            "active_alerts": len(alerts),
            "alerts": alerts,
            "wind_speed": wind_speed,
            "rainfall": daily[0].get("rain", 0) if daily else 0,
            "temperature": current.get("temp", 0)
        }

    except Exception as e:
        return {
            "risk_level": "Unknown",
            "risk_score": 0,
            "active_alerts": 0,
            "alerts": [],
            "error": str(e)
        }