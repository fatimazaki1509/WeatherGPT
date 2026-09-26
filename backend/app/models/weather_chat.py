from pydantic import BaseModel


class WeatherChatRequest(BaseModel):
    message: str
    latitude: float
    longitude: float
    language: str = "en"


class WeatherChatResponse(BaseModel):
    response: str
    language: str