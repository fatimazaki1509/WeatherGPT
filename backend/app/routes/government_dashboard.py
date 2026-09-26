from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/")
def get_government_dashboard():

    return {

        "total_alerts": random.randint(50, 150),

        "active_disasters": random.randint(5, 20),

        "resources_deployed": random.randint(100, 500),

        "districts": [

            {
                "district": "Nagpur",
                "population": "46 Lakh",
                "risk_score": 68,
                "risk_level": "Moderate"
            },

            {
                "district": "Pune",
                "population": "72 Lakh",
                "risk_score": 32,
                "risk_level": "Low"
            },

            {
                "district": "Mumbai",
                "population": "1.2 Cr",
                "risk_score": 82,
                "risk_level": "High"
            },

            {
                "district": "Nashik",
                "population": "22 Lakh",
                "risk_score": 51,
                "risk_level": "Moderate"
            }

        ],

        "regions": [

            {
                "state": "Maharashtra",
                "risk": 68
            },

            {
                "state": "Gujarat",
                "risk": 40
            },

            {
                "state": "Karnataka",
                "risk": 25
            },

            {
                "state": "Tamil Nadu",
                "risk": 55
            },

            {
                "state": "Rajasthan",
                "risk": 72
            }

        ],

        "disaster_distribution": [

            {
                "name": "Flood",
                "value": 35
            },

            {
                "name": "Drought",
                "value": 20
            },

            {
                "name": "Cyclone",
                "value": 15
            },

            {
                "name": "Heatwave",
                "value": 18
            },

            {
                "name": "Landslide",
                "value": 12
            }

        ],

        "resource_deployment": {

            "ndrf": 120,
            "medical": 85,
            "relief_camps": 42,
            "vehicles": 210

        },

        "insights": [

            "High flood exposure detected in coastal districts.",

            "Resource deployment required in western region.",

            "Moderate rainfall risk expected during next 48 hours.",

            "AI model predicts increased disaster vulnerability in urban clusters.",

            "Relief camp occupancy expected to rise by 12%."

        ]
    }