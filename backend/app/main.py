from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.weather import router as weather_router
from app.routes.crop_recommendation import router as crop_router
from app.routes.disease_prediction import router as disease_router
from app.routes.crop_health import router as health_router
from app.routes.irrigation_plan import router as irrigation_router
from app.routes.farm_calendar import router as calendar_router
from app.routes.government_schemes import router as schemes_router
from app.routes.disaster_alerts import router as disaster_router
from app.routes.risk_maps import router as risk_maps_router
from app.routes.air_quality import router as air_quality_router
from app.routes.climate_analytics import router as climate_router
from app.routes.government_dashboard import router as government_dashboard_router
from app.routes.weather_now import router as weather_now_router
from app.routes.weather_assistantx import router as weather_assistant_router
from dotenv import load_dotenv

    



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    weather_router,
    prefix="/api/weather",
    tags=["Weather"]
)

app.include_router(
    crop_router,
    prefix="/api/v1",
    tags=["Crop Recommendation"]
)

app.include_router(
    disease_router,
    prefix="/api/v1",
    tags=["Disease Prediction"]
)

app.include_router(
    health_router,
    prefix="/api/v1",
    tags=["Crop Health"]
)
app.include_router(
    irrigation_router,
    prefix="/api/v1",
    tags=["Irrigation"]
)

app.include_router(
    calendar_router,
    prefix="/api/v1",
    tags=["Farm Calendar"]
)
app.include_router(
    schemes_router,
    prefix="/api/v1",
    tags=["Government Schemes"]
)

app.include_router(
    disaster_router,
    prefix="/api/disaster-alerts",
    tags=["Disaster Alerts"]
)
app.include_router(
    risk_maps_router,
    prefix="/api/risk-maps",
    tags=["Risk Maps"]
)

app.include_router(
    air_quality_router,
    prefix="/api/air-quality",
    tags=["Air Quality"]
)

app.include_router(
    climate_router,
    prefix="/api",
    tags=["Climate Analytics"]
)

app.include_router(
    government_dashboard_router,
    prefix="/api/government-dashboard",
    tags=["Government Dashboard"]
)


app.include_router(
    weather_now_router,
    prefix="/api/weather-now",
    tags=["Weather Now"]
)

app.include_router(
    weather_assistant_router,
    prefix="/api/weather-assistant",
    tags=["AI Weather Assistant"]
)