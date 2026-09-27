"use client";
import { useState, useEffect } from "react";
import { Send, Bot, User, X, Mic, Volume2, Languages } from "lucide-react";

interface Message {
  role: string;
  text: string;
  language?: string;
}

interface WeatherChatProps {
  locationData: any;
  onClose: () => void;
}

const languages = [
  { code: "en", name: "English", flag: "🇧" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  { code: "gu", name: "ગુજરાતી", flag: "🇮" },
  { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
];

export default function WeatherChat({ locationData, onClose }: WeatherChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: `Namaste! Main WeatherGPT hoon. ${locationData?.name || 'Location'} ka weather check kar rahe hain.`, language: "hi" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("hi");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Check browser support for Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
    }
  }, []);

  // Text-to-Speech function
  const speak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  // Voice Recognition
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in your browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang === "hi" ? "hi-IN" : selectedLang === "mr" ? "mr-IN" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognition.start();
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", text, language: selectedLang }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: text, 
          location_data: locationData,
          language: selectedLang 
        })
      });
      const data = await res.json();
      
      // Auto-speak the response
      speak(data.response, selectedLang);
      
      setMessages(prev => [...prev, { 
        role: "bot", 
        text: data.response,
        language: selectedLang 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-[#0f172a] border-2 border-blue-500/50 rounded-2xl w-full max-w-2xl h-[650px] flex flex-col shadow-2xl">
        {/* Header with Language Selector */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">WeatherGPT AI - Multi-Language</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <p className="text-xs text-green-400">Online • Voice Enabled</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2"
              >
                <Languages size={16} className="text-blue-400" />
                <span className="text-xs text-white">{languages.find(l => l.code === selectedLang)?.flag}</span>
              </button>
              
              {showLangMenu && (
                <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setShowLangMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm text-white">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition">
              <X size={20} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0e1a]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "user" ? "bg-blue-600" : "bg-gradient-to-br from-green-500 to-emerald-600"
              }`}>
                {msg.role === "user" ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
              </div>
              <div className={`max-w-[75%] p-3 rounded-xl ${
                msg.role === "user" 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-sm" 
                  : "bg-gray-800 text-gray-100 rounded-tl-sm border border-gray-700"
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                {msg.role === "bot" && (
                  <button 
                    onClick={() => speak(msg.text, msg.language || "hi")}
                    className="mt-2 flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                  >
                    <Volume2 size={12} />
                    Listen
                  </button>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-gray-800 p-3 rounded-xl rounded-tl-sm border border-gray-700">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area with Voice */}
        <div className="p-4 border-t border-gray-700 bg-[#0f172a] rounded-b-2xl">
          <div className="flex gap-2">
            {speechSupported && (
              <button
                onClick={startListening}
                disabled={isListening}
                className={`px-4 py-3 rounded-xl transition shadow-lg flex items-center justify-center ${
                  isListening 
                    ? "bg-red-600 hover:bg-red-700 animate-pulse" 
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <Mic size={18} className="text-white" />
              </button>
            )}
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={selectedLang === "hi" ? "अपना सवाल पूछें..." : "Ask your question..."}
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
            
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl transition shadow-lg"
            >
              <Send size={18} />
            </button>
          </div>
          
          <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
            {["कल बारिश होगी?", "Can I travel tomorrow?", "Pesticide spray karoon?"].map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt)}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-full text-xs text-gray-300 whitespace-nowrap transition"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}