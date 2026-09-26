from fastapi import APIRouter

from app.models.weather_chat import (
    WeatherChatRequest,
    WeatherChatResponse
)

from app.services.weather_agent import (
    ask_weather_agent
)

router = APIRouter()

@router.post("/")
def weather_chat(
    request: WeatherChatRequest
):

    answer = ask_weather_agent(
        request.message
    )

    return WeatherChatResponse(
        response=answer,
        language=request.language
    )