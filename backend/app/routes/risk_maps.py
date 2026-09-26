from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/")
async def get_risk_map():

    data = {
        "overall_risk": 68,
        "risk_level": "Moderate",

        "highest_threat": {
            "type": "Flood",
            "value": 72
        },

        "distribution": {
            "Flood": 72,
            "Heatwave": 38,
            "Cyclone": 15,
            "Lightning": 44,
            "Drought": 21
        },

        "insights": [
            "Heavy rainfall expected in next 48 hrs.",
            "River overflow risk increasing.",
            "Low cyclone probability."
        ],

        "recommendations": [
            "Clear drainage channels.",
            "Avoid fertilizer spraying.",
            "Monitor nearby rivers.",
            "Keep emergency kit ready."
        ],

        "updated_at": datetime.now().strftime("%d %b %Y %I:%M %p")
    }

    return data