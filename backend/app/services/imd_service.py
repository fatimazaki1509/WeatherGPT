import requests
import os

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")


def get_weather(lat: float, lon: float):

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?lat={lat}&lon={lon}"
        f"&appid={OPENWEATHER_API_KEY}"
        f"&units=metric"
    )

    response = requests.get(url)

    data = response.json()

    return {
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "pressure": data["main"]["pressure"],
        "condition": data["weather"][0]["description"],
        "wind_speed": data["wind"]["speed"],
        "city": data["name"],
    }