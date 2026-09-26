from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/crop-health")
async def crop_health(
    lat: float,
    lon: float
):

    regions = [
        {
            "name": "North Zone",
            "crop": "Soybean",
            "health_score": random.randint(70, 95)
        },
        {
            "name": "South Zone",
            "crop": "Cotton",
            "health_score": random.randint(40, 85)
        },
        {
            "name": "East Zone",
            "crop": "Rice",
            "health_score": random.randint(30, 90)
        },
        {
            "name": "West Zone",
            "crop": "Maize",
            "health_score": random.randint(50, 95)
        },
        {
            "name": "Central Zone",
            "crop": "Wheat",
            "health_score": random.randint(60, 100)
        }
    ]

    return {
        "location": {
            "lat": lat,
            "lon": lon
        },
        "zones": regions
    }