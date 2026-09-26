from fastapi import APIRouter, Query
import requests

router = APIRouter()

OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"


@router.get("/farm-calendar")
async def farm_calendar(
    lat: float = Query(...),
    lon: float = Query(...)
):
    try:

        weather = requests.get(
            OPEN_METEO_URL,
            params={
                "latitude": lat,
                "longitude": lon,
                "current":
                    "temperature_2m,relative_humidity_2m",
                "timezone": "auto"
            },
            timeout=10
        ).json()

        temp = weather["current"]["temperature_2m"]
        humidity = weather["current"][
            "relative_humidity_2m"
        ]

        tasks = []

        tasks.append({
            "day": "Monday",
            "task": "Irrigation"
        })

        tasks.append({
            "day": "Tuesday",
            "task": "Fertilizer Application"
        })

        if humidity > 75:
            tasks.append({
                "day": "Wednesday",
                "task": "Disease Inspection"
            })
        else:
            tasks.append({
                "day": "Wednesday",
                "task": "Crop Monitoring"
            })

        if temp > 35:
            tasks.append({
                "day": "Thursday",
                "task": "Heat Stress Inspection"
            })
        else:
            tasks.append({
                "day": "Thursday",
                "task": "Crop Inspection"
            })

        tasks.append({
            "day": "Friday",
            "task": "Weed Removal"
        })

        tasks.append({
            "day": "Saturday",
            "task": "Soil Moisture Check"
        })

        tasks.append({
            "day": "Sunday",
            "task": "Farm Review"
        })

        return {
            "temperature": temp,
            "humidity": humidity,
            "schedule": tasks
        }

    except Exception:

        return {
            "temperature": 30,
            "humidity": 65,
            "schedule": [
                {
                    "day": "Monday",
                    "task": "Irrigation"
                },
                {
                    "day": "Tuesday",
                    "task": "Fertilizer Application"
                },
                {
                    "day": "Wednesday",
                    "task": "Crop Monitoring"
                },
                {
                    "day": "Thursday",
                    "task": "Crop Inspection"
                },
                {
                    "day": "Friday",
                    "task": "Weed Removal"
                },
                {
                    "day": "Saturday",
                    "task": "Soil Moisture Check"
                },
                {
                    "day": "Sunday",
                    "task": "Farm Review"
                }
            ]
        }