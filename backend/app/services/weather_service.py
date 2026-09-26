import requests
from app.config.settings import OPENWEATHER_API_KEY


def get_current_weather(city):
    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}"
        f"&appid={OPENWEATHER_API_KEY}"
        f"&units=metric"
    )

    response = requests.get(url)

    return response.json()