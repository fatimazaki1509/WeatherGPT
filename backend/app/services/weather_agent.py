import os
from groq import Groq

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def ask_weather_agent(user_query):

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": """
                You are an AI Weather Assistant.

                Answer weather questions.
                Keep answers short.
                Use bullet points.
                Give practical advice.
                """
            },
            {
                "role": "user",
                "content": user_query
            }
        ],
        temperature=0.5
    )

    return completion.choices[0].message.content