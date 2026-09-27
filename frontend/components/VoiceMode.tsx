"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, X, Languages, MessageCircle, VolumeX } from "lucide-react";

interface VoiceModeProps {
  onClose: () => void;
  weatherData: any;
  locationName: string;
}

const languages = [
  { code: "hi-IN", name: "हिन्दी", flag: "🇮🇳" },
  { code: "en-US", name: "English", flag: "🇧" },
  { code: "mr-IN", name: "मराठी", flag: "🇮🇳" },
  { code: "ta-IN", name: "தமிழ்", flag: "🇮🇳" },
  { code: "te-IN", name: "తెలుగు", flag: "🇮" },
  { code: "bn-IN", name: "বাংলা", flag: "🇮🇳" },
  { code: "gu-IN", name: "ગુજરાતી", flag: "🇮🇳" },
  { code: "kn-IN", name: "ಕನ್ನಡ", flag: "🇮🇳" },
];

const quickPrompts = [
  { hi: "Kal barish hogi kya?", en: "Will it rain tomorrow?" },
  { hi: "Kya main travel kar sakta hoon?", en: "Can I travel today?" },
  { hi: "Pesticide spray karoon?", en: "Should I spray pesticides?" },
  { hi: "School khulega kya?", en: "Will schools open?" },
  { hi: "Heatwave hai kya?", en: "Is there a heatwave?" },
  { hi: "Aaj ka mausam kaisa hai?", en: "How is today's weather?" },
];

export default function VoiceMode({ onClose, weatherData, locationName }: VoiceModeProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [listeningTime, setListeningTime] = useState(0);
  const [error, setError] = useState("");
  const [speechSupported, setSpeechSupported] = useState(false);
  const [history, setHistory] = useState<Array<{ query: string; response: string }>>([]);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  // Check browser support
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = selectedLang.code;

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          finalTranscript += event.results[i][0].transcript;
        }
        setTranscript(finalTranscript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        clearInterval(timerRef.current);
        if (transcript.trim()) {
          processQuery(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        setError(`Error: ${event.error}`);
        setIsListening(false);
        clearInterval(timerRef.current);
      };
    } else {
      setError("Voice recognition not supported in this browser. Please use Chrome.");
    }

    return () => {
      clearInterval(timerRef.current);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [selectedLang]);

  // Update recognition language when changed
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = selectedLang.code;
    }
  }, [selectedLang]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setError("");
    setTranscript("");
    setResponse("");
    setIsListening(true);
    setListeningTime(0);

    try {
      recognitionRef.current.start();
      timerRef.current = setInterval(() => {
        setListeningTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Speech recognition error:", err);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    clearInterval(timerRef.current);
  };

  const processQuery = async (query: string) => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          location_data: {
            name: locationName,
            rainfall_prob_24h: weatherData.rainfall_prob_24h,
            lightning_risk: weatherData.lightning_risk,
            temp: weatherData.temp,
            wind_speed: weatherData.wind_speed,
            humidity: weatherData.humidity
          },
          language: selectedLang.code.split("-")[0]
        })
      });
      const data = await res.json();
      setResponse(data.response);
      setHistory(prev => [{ query, response: data.response }, ...prev].slice(0, 5));
      speakResponse(data.response);
    } catch (err) {
      setResponse("Sorry, I couldn't process your request. Please try again.");
    }
  };

  const speakResponse = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang.code;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleQuickPrompt = (prompt: { hi: string; en: string }) => {
    const query = selectedLang.code.startsWith("hi") || selectedLang.code.startsWith("mr") ? prompt.hi : prompt.en;
    setTranscript(query);
    processQuery(query);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 border border-purple-500/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 sticky top-0 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50"
            >
              <Mic className="text-white" size={24} />
            </motion.div>
            <div>
              <h3 className="font-bold text-white text-lg">Voice Assistant</h3>
              <p className="text-xs text-purple-300">Speak in your language • {locationName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="w-full flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-2">
                <Languages size={18} className="text-purple-400" />
                <span className="text-white font-medium">{selectedLang.flag} {selectedLang.name}</span>
              </div>
              <span className="text-xs text-purple-300">Change Language</span>
            </button>

            <AnimatePresence>
              {showLangMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full bg-slate-900/95 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto"
                >
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-purple-500/20 border-b border-white/5 last:border-0 flex items-center justify-between ${
                        selectedLang.code === lang.code ? 'bg-purple-500/20' : ''
                      }`}
                    >
                      <span className="text-white">{lang.flag} {lang.name}</span>
                      {selectedLang.code === lang.code && (
                        <span className="text-xs text-purple-400">✓ Selected</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Big Mic Button */}
          <div className="flex flex-col items-center py-8">
            <div className="relative">
              {/* Pulsing rings when listening */}
              {isListening && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-red-500 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1.6], opacity: [0.7, 0.4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    className="absolute inset-0 bg-red-500 rounded-full"
                  />
                </>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isListening ? stopListening : startListening}
                disabled={!speechSupported}
                className={`relative w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                  isListening
                    ? 'bg-gradient-to-br from-red-500 to-pink-600 shadow-red-500/50'
                    : 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-purple-500/50'
                }`}
              >
                {isListening ? (
                  <MicOff className="text-white" size={48} />
                ) : (
                  <Mic className="text-white" size={48} />
                )}
              </motion.button>
            </div>

            <div className="mt-6 text-center">
              {isListening ? (
                <div>
                  <div className="text-red-400 font-bold text-lg animate-pulse">🎙️ Listening...</div>
                  <div className="text-purple-300 text-sm mt-1">{formatTime(listeningTime)}</div>
                  <div className="text-blue-200 text-xs mt-2">Speak now in {selectedLang.name}</div>
                </div>
              ) : (
                <div>
                  <div className="text-white font-semibold">Tap to Speak</div>
                  <div className="text-blue-300 text-xs mt-1">
                    {speechSupported ? `Supported: ${selectedLang.name}` : 'Not supported in this browser'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm"
            >
              ️ {error}
            </motion.div>
          )}

          {/* Transcript */}
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
            >
              <div className="text-xs text-blue-300 mb-1 flex items-center gap-1">
                <MessageCircle size={12} /> You said:
              </div>
              <p className="text-white font-medium">{transcript}</p>
            </motion.div>
          )}

          {/* Response */}
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-purple-300 flex items-center gap-1">
                  <Volume2 size={12} /> WeatherGPT Response:
                </div>
                {isSpeaking ? (
                  <button
                    onClick={stopSpeaking}
                    className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                  >
                    <VolumeX size={12} /> Stop
                  </button>
                ) : (
                  <button
                    onClick={() => speakResponse(response)}
                    className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300"
                  >
                    <Volume2 size={12} /> Listen Again
                  </button>
                )}
              </div>
              <p className="text-white leading-relaxed whitespace-pre-line">{response}</p>
            </motion.div>
          )}

          {/* Quick Prompts */}
          <div>
            <div className="text-xs text-purple-300 mb-3 font-semibold"> Quick Questions:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickPrompts.map((prompt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-left p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-purple-500/20 hover:border-purple-500/30 transition text-sm text-white"
                >
                  {selectedLang.code.startsWith("hi") || selectedLang.code.startsWith("mr") ? prompt.hi : prompt.en}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Recent History */}
          {history.length > 0 && (
            <div>
              <div className="text-xs text-purple-300 mb-3 font-semibold">🕐 Recent Conversations:</div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {history.map((item, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-2 text-xs">
                    <div className="text-blue-300 truncate">Q: {item.query}</div>
                    <div className="text-purple-300 truncate mt-1">A: {item.response}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}