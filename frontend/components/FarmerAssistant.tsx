"use client";

import { useState } from "react";
import {
  Bot,
  Send,
  Languages,
  Mic,
} from "lucide-react";

interface FarmerAssistantProps {
  city: string;
}

export default function FarmerAssistant({
  city,
}: FarmerAssistantProps) {
  const [language, setLanguage] =
    useState("English");

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState(
      "Ask me anything about crops, irrigation, pests, weather, or government schemes."
    );

  const handleAsk = () => {
    if (!question.trim()) return;

    const q = question.toLowerCase();

    if (q.includes("cotton")) {
      setAnswer(
        "Cotton grows best in warm temperatures (21°C–30°C). Maintain proper irrigation and monitor pink bollworm attacks."
      );
    } else if (q.includes("soybean")) {
      setAnswer(
        "Soybean performs well under moderate rainfall. Ensure good drainage and avoid waterlogging."
      );
    } else if (q.includes("pest")) {
      setAnswer(
        "Regular field monitoring is recommended. Use IPM practices and avoid excessive pesticide spraying."
      );
    } else if (q.includes("scheme")) {
      setAnswer(
        "You may be eligible for PM-KISAN, PMFBY crop insurance, and Soil Health Card Scheme."
      );
    } else {
      setAnswer(
        `Based on current weather conditions in ${city}, continue monitoring crop health and irrigation schedules.`
      );
    }

    setQuestion("");
  };

  return (
    <div
      className="
      rounded-3xl
      bg-[#081528]
      border
      border-purple-500/20
      p-6
      text-white
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3 mb-5">
        <Bot
          className="text-purple-400"
          size={28}
        />

        <div>
          <h2 className="font-bold text-xl">
            Multilingual AI Assistant
          </h2>

          <p className="text-slate-400 text-sm">
            Smart farming guidance
          </p>
        </div>
      </div>

      {/* Language */}

      <div className="mb-4">
        <label className="text-sm text-slate-400 block mb-2">
          Language
        </label>

        <div className="relative">
          <Languages
            className="
            absolute
            left-3
            top-3
            text-slate-400
            "
            size={18}
          />

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
            className="
            w-full
            bg-slate-900
            border
            border-slate-700
            rounded-xl
            py-3
            pl-10
            pr-4
            outline-none
            "
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
            <option>Telugu</option>
            <option>Tamil</option>
            <option>Gujarati</option>
            <option>Punjabi</option>
          </select>
        </div>
      </div>

      {/* Question */}

      <div className="space-y-3">
        <textarea
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          placeholder="Ask your farming question..."
          rows={4}
          className="
          w-full
          bg-slate-900
          border
          border-slate-700
          rounded-xl
          p-4
          resize-none
          outline-none
          "
        />

        <div className="flex gap-3">
          <button
            onClick={handleAsk}
            className="
            flex-1
            bg-purple-600
            hover:bg-purple-700
            py-3
            rounded-xl
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            "
          >
            <Send size={18} />
            Ask AI
          </button>

          <button
            className="
            px-4
            bg-slate-800
            hover:bg-slate-700
            rounded-xl
            "
          >
            <Mic size={18} />
          </button>
        </div>
      </div>

      {/* AI Response */}

      <div
        className="
        mt-5
        rounded-2xl
        border
        border-purple-500/20
        bg-purple-500/5
        p-4
        "
      >
        <p className="text-purple-300 text-sm mb-2">
          AI Response
        </p>

        <p className="text-slate-200 leading-relaxed">
          {answer}
        </p>
      </div>

      {/* Quick Questions */}

      <div className="mt-5">
        <p className="text-slate-400 text-sm mb-3">
          Suggested Questions
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              setQuestion(
                "Best crop for current weather?"
              )
            }
            className="
            px-3
            py-2
            rounded-lg
            bg-slate-800
            text-sm
            "
          >
            Best Crop?
          </button>

          <button
            onClick={() =>
              setQuestion(
                "Any pest risk this week?"
              )
            }
            className="
            px-3
            py-2
            rounded-lg
            bg-slate-800
            text-sm
            "
          >
            Pest Risk
          </button>

          <button
            onClick={() =>
              setQuestion(
                "Government schemes available?"
              )
            }
            className="
            px-3
            py-2
            rounded-lg
            bg-slate-800
            text-sm
            "
          >
            Schemes
          </button>
        </div>
      </div>
    </div>
  );
}