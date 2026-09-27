"use client";

import { Mic } from "lucide-react";

export default function WeatherVoiceInput({
  setMessage,
}: {
  setMessage: (text: string) => void;
}) {
  const startListening = () => {
    const SpeechRecognition =
      (window as any)
        .webkitSpeechRecognition;

    const recognition =
      new SpeechRecognition();

    recognition.lang = "hi-IN";

    recognition.start();

    recognition.onresult = (
      event: any
    ) => {
      setMessage(
        event.results[0][0].transcript
      );
    };
  };

  return (
    <button
      onClick={startListening}
      className="
      p-3
      rounded-xl
      bg-cyan-500"
    >
      <Mic />
    </button>
  );
}