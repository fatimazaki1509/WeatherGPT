"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  Sparkles,
  Send,
  Loader2,
  Mic,
  Volume2,
  VolumeX,
} from "lucide-react";

import ReactMarkdown from "react-markdown";

import { askGemini } from "@/services/gemini";

import {
  getCurrentWeather,
  getForecast,
  getAQI,
} from "@/services/weather";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface Props {
  city: string;
}

export default function AIAssistant({
  city,
}: Props) {
  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [isSpeaking, setIsSpeaking] =
    useState(false);

  const chatRef =
    useRef<HTMLDivElement>(null);

  // -----------------------
  // Auto Scroll
  // -----------------------

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // -----------------------
  // Voice Input
  // -----------------------

  const startVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any)
        .webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice Recognition not supported"
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.start();

    recognition.onresult = (
      event: any
    ) => {
      const text =
        event.results[0][0].transcript;

      setQuestion(text);

      askAI(text);
    };
  };

  // -----------------------
  // Voice Output
  // -----------------------

  const speakText = (
    text: string
  ) => {
    speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text.replace(/[#*`]/g, "")
      );

    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () =>
      setIsSpeaking(true);

    utterance.onend = () =>
      setIsSpeaking(false);

    speechSynthesis.speak(
      utterance
    );
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // -----------------------
  // Ask AI
  // -----------------------

  const askAI = async (
    customQuestion?: string
  ) => {
    const query =
      customQuestion || question;

    if (!query.trim()) return;

    try {
      setLoading(true);

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: query,
        },
      ]);

      setQuestion("");

      const current =
        await getCurrentWeather(city);

      const forecast =
        await getForecast(city);

      const aqi =
        await getAQI(city);

      const prompt = `
You are WeatherGPT.

Current City:
${city}

Current Weather:
${JSON.stringify(current)}

Forecast:
${JSON.stringify(
        forecast
      )}

AQI:
${JSON.stringify(aqi)}

User Question:
${query}

Rules:

- Reply ONLY in user's language.
- Keep answer under 100 words.
- Use weather data provided.
- Give practical advice.
- No long paragraphs.

Format:

🌦 Answer:
...

💡 Advice:
...

⚠ Safety:
...

If farming related:
🌾 Farmer Tip

If travel related:
🚗 Travel Advice
`;

      const response =
        await askGemini(prompt);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
        },
      ]);

      speakText(response);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Unable to fetch weather information.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      bg-[#081528]
      border border-blue-900/50
      rounded-3xl
      p-5
      text-white
      shadow-xl
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Sparkles
            className="text-cyan-400"
            size={22}
          />

          <div>

            <h2 className="font-bold text-2xl">
              AI Weather Assistant
            </h2>

            <p className="text-xs text-slate-400">
              Current City: {city}
            </p>

          </div>

        </div>

        {isSpeaking && (
          <button
            onClick={stopSpeaking}
            className="
            flex items-center
            gap-2
            text-red-400
            text-sm
            "
          >
            <VolumeX size={18} />
            Stop
          </button>
        )}

      </div>

      {/* Chat */}

      <div
        ref={chatRef}
        className="
        mt-5
        h-[420px]
        overflow-y-auto
        flex
        flex-col
        gap-3
        pr-2
        "
      >
        {messages.length === 0 && (
          <div
            className="
            text-slate-500
            text-sm
            mt-8
            text-center
            "
          >
            🌦 Ask weather questions in
            any language

            <br />

            English • हिन्दी •
            मराठी • தமிழ் • తెలుగు •
            বাংলা • ગુજરાતી •
            ਪੰਜਾਬੀ
          </div>
        )}

        {messages.map(
          (msg, index) => (
            <div
              key={index}
              className={`
              max-w-[85%]
              p-4
              rounded-2xl
              text-sm
              ${
                msg.role === "user"
                  ? "bg-blue-600 ml-auto"
                  : "bg-slate-800"
              }
              `}
            >
              <ReactMarkdown>
                {msg.content}
              </ReactMarkdown>

              {msg.role ===
                "assistant" && (
                <button
                  onClick={() =>
                    speakText(
                      msg.content
                    )
                  }
                  className="
                  mt-3
                  flex
                  items-center
                  gap-2
                  text-cyan-400
                  text-xs
                  "
                >
                  <Volume2
                    size={15}
                  />
                  Speak
                </button>
              )}
            </div>
          )
        )}

        {loading && (
          <div
            className="
            bg-slate-800
            p-4
            rounded-xl
            flex
            items-center
            gap-2
            "
          >
            <Loader2
              className="animate-spin"
              size={18}
            />
            Thinking...
          </div>
        )}
      </div>

      {/* Suggestions */}

      <div className="mt-4 flex flex-wrap gap-2">

        <Question
          text={`Will it rain tomorrow in ${city}?`}
          onClick={askAI}
        />

        <Question
          text={`Can I travel in ${city} tomorrow?`}
          onClick={askAI}
        />

        <Question
          text="Is it a good time to sow cotton?"
          onClick={askAI}
        />

        <Question
          text="Heatwave risk this week?"
          onClick={askAI}
        />

      </div>

      {/* Input */}

      <div
        className="
        mt-4
        flex
        items-center
        bg-slate-800
        rounded-xl
        overflow-hidden
        "
      >
        <input
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter")
              askAI();
          }}
          placeholder={`Ask about weather in ${city}...`}
          className="
          flex-1
          bg-transparent
          px-4
          py-3
          outline-none
          "
        />

        <button
          onClick={startVoiceInput}
          className="
          px-3
          text-green-400
          hover:text-green-300
          "
        >
          <Mic size={20} />
        </button>

        <button
          onClick={() => askAI()}
          className="
          px-4
          text-cyan-400
          hover:text-cyan-300
          "
        >
          <Send size={18} />
        </button>

      </div>
    </div>
  );
}

function Question({
  text,
  onClick,
}: {
  text: string;
  onClick: (
    text: string
  ) => void;
}) {
  return (
    <button
      onClick={() => onClick(text)}
      className="
      text-sm
      px-3
      py-2
      rounded-xl
      bg-slate-800
      hover:bg-slate-700
      transition
      "
    >
      {text}
    </button>
  );
}