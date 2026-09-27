"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { askWeatherAssistant } from "@/services/weatherAssistantApi";

export default function WeatherChatWindow() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] =
    useState<any[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setMessage("");

    try {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const result =
            await askWeatherAssistant(
              message,
              pos.coords.latitude,
              pos.coords.longitude
            );

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              text: result.response,
            },
          ]);
        }
      );
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="bg-slate-900/70 backdrop-blur rounded-3xl border border-cyan-500/20 p-6 h-[700px] flex flex-col">

      <div className="flex-1 overflow-y-auto space-y-4">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === "user"
                ? "ml-auto bg-cyan-600"
                : "bg-slate-800"
            }`}
          >
            {msg.text}
          </div>
        ))}

      </div>

      <div className="flex gap-3 mt-4">

        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Ask about weather..."
          className="
          flex-1
          bg-slate-800
          border
          border-cyan-500/20
          rounded-xl
          p-4
          text-white"
        />

        <button
          onClick={sendMessage}
          className="
          px-5
          rounded-xl
          bg-cyan-500
          hover:bg-cyan-400"
        >
          <Send />
        </button>

      </div>
    </div>
  );
}