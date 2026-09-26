from fastapi import APIRouter
import requests
from datetime import datetime

router = APIRouter()


@router.get("/climate-analytics")
def climate_analytics(
    lat: float,
    lon: float
):

    url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={lat}"
        f"&longitude={lon}"
        "&hourly=temperature_2m,relative_humidity_2m,precipitation_probability"
        "&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
        "&forecast_days=3"
        "&timezone=auto"
    )

    response = requests.get(url, timeout=10)

    data = response.json()

    current = data.get("current", {})
    hourly = data.get("hourly", {})

    temp = current.get("temperature_2m", 0)
    humidity = current.get("relative_humidity_2m", 0)
    wind = current.get("wind_speed_10m", 0)

    rain_values = hourly.get(
        "precipitation_probability",
        []
    )

    rainfall_probability = (
        max(rain_values[:24])
        if rain_values
        else 0
    )

    risk_score = 0

    if temp > 40:
        risk_score += 35

    elif temp > 35:
        risk_score += 20

    if rainfall_probability > 80:
        risk_score += 30

    elif rainfall_probability > 60:
        risk_score += 15

    if wind > 35:
        risk_score += 20

    elif wind > 20:
        risk_score += 10

    if humidity > 85:
        risk_score += 15

    if risk_score < 30:
        risk_level = "Low"

    elif risk_score < 60:
        risk_level = "Moderate"

    elif risk_score < 80:
        risk_level = "High"

    else:
        risk_level = "Critical"

    month = datetime.now().month

    if month in [6, 7, 8, 9]:
        season = "Monsoon"

    elif month in [10, 11]:
        season = "Post-Monsoon"

    elif month in [12, 1, 2]:
        season = "Winter"

    else:
        season = "Summer"

    insights = []

    if temp > 38:
        insights.append(
            "High temperature stress detected."
        )

    if rainfall_probability > 70:
        insights.append(
            "Heavy rainfall likely in next 24 hours."
        )

    if humidity > 80:
        insights.append(
            "Elevated fungal disease risk."
        )

    if wind > 30:
        insights.append(
            "Strong winds may affect crops."
        )

    if len(insights) == 0:
        insights.append(
            "Current climate conditions are stable."
        )

    trend = []

    hours = hourly.get(
        "temperature_2m",
        []
    )[:24]

    for i, value in enumerate(hours):

        trend.append({
            "hour": f"{i}:00",
            "value": value
        })

    return {

        "temperature": temp,

        "humidity": humidity,

        "rainfall_probability":
            rainfall_probability,

        "wind_speed": wind,

        "risk_score": risk_score,

        "risk_level": risk_level,

        "season": season,

        "insights": insights,

        "temperature_trend": trend
    }