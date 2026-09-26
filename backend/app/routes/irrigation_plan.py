from fastapi import APIRouter, Query
import requests

router = APIRouter()

OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"


@router.get("/irrigation-plan")
async def irrigation_plan(
    lat: float = Query(...),
    lon: float = Query(...)
):
    try:

        weather = requests.get(
            OPEN_METEO_URL,
            params={
                "latitude": lat,
                "longitude": lon,
                "daily": "precipitation_probability_max",
                "forecast_days": 1,
                "timezone": "auto"
            },
            timeout=10
        ).json()

        rain_prob = weather["daily"][
            "precipitation_probability_max"
        ][0]

        if rain_prob > 70:
            next_irrigation = "After 3 Days"
            water = 5
            soil = 82
            recommendation = (
                "Heavy rainfall expected. "
                "Avoid irrigation."
            )

        elif rain_prob > 40:
            next_irrigation = "Tomorrow"
            water = 10
            soil = 70
            recommendation = (
                "Moderate rainfall expected. "
                "Reduce irrigation."
            )

        else:
            next_irrigation = "Today"
            water = 18
            soil = 55
            recommendation = (
                "Low rainfall forecast. "
                "Irrigation recommended."
            )

        return {
            "next_irrigation": next_irrigation,
            "required_water_mm": water,
            "soil_moisture": soil,
            "rainfall_probability": rain_prob,
            "recommendation": recommendation
        }

    except Exception as e:
        return {
            "next_irrigation": "Tomorrow",
            "required_water_mm": 12,
            "soil_moisture": 68,
            "rainfall_probability": 35,
            "recommendation":
                "Unable to fetch live weather."
        }