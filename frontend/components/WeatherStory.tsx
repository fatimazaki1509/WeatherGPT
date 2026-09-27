"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Play, Pause, Volume2, Sun, CloudRain, Wind, Thermometer, TrendingUp, TrendingDown } from "lucide-react";

interface WeatherStoryProps {
  weatherData: any;
  locationName: string;
  onClose: () => void;
}

export default function WeatherStory({ weatherData, locationName, onClose }: WeatherStoryProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [story, setStory] = useState("");
  const [yesterdayData] = useState({ temp: weatherData.temp - 2, rain: Math.max(0, weatherData.rainfall_prob_24h - 15) }); // Mock yesterday

  useEffect(() => {
    generateStory();
  }, [weatherData]);

  const generateStory = () => {
    const temp = weatherData.temp;
    const rain = weatherData.rainfall_prob_24h;
    const wind = weatherData.wind_speed;
    const lightning = weatherData.lightning_risk;

    let morning = "";
    if (temp < 20) morning = "Aaj subah thodi thandak mehsoos hogi.";
    else if (temp < 30) morning = "Subah ka mausam bahut suhana hai.";
    else morning = "Subah se hi garmi ka ehsaas hoga.";

    let afternoon = "";
    if (rain > 60) afternoon = "Dopahar tak baadhal ghirenge aur halki baarish shuru ho sakti hai.";
    else if (rain > 30) afternoon = "Dopahar mein aasmaan thoda saaf rahega, par baadhal bane rehenge.";
    else afternoon = "Dopahar mein dhoop khili rahegi, garmi badh sakti hai.";

    let evening = "";
    if (lightning === 'High') evening = "Shaam ko bijli girne ka khatra hai, ghar ke andar rahein.";
    else if (rain > 50) evening = "Shaam tak baarish tez ho sakti hai, chhata zaroor rakhein.";
    else evening = "Shaam ka waqt bahar ghoomne ke liye accha hai.";

    let farmerTip = "";
    if (rain > 50) farmerTip = "Kisaano ke liye salah: Aaj khet mein kaam na karein, baarish se fasal ko nuksan ho sakta hai.";
    else if (wind > 20) farmerTip = "Kisaano ke liye salah: Hawa tez hai, pesticide spray na karein.";
    else farmerTip = "Kisaano ke liye salah: Mausam fasal ke liye accha hai, aap kheti ka kaam kar sakte hain.";

    const fullStory = `Namaste! Aaj ${locationName} mein mausam ka haal kuch is tarah hai. ${morning} ${afternoon} ${evening} ${farmerTip} Dhanyawaad!`;
    setStory(fullStory);
  };

  const speakStory = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(story);
        utterance.lang = 'hi-IN'; // Hindi voice
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
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
        className="bg-gradient-to-br from-amber-900/40 to-slate-900 border border-amber-500/30 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-amber-600/20 to-orange-600/20 sticky top-0 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50">
              <BookOpen className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Weather Story Mode</h3>
              <p className="text-xs text-amber-300">Mausam ki kahani, aapki bhasha mein</p>
            </div>
          </div>
          <button onClick={() => { window.speechSynthesis.cancel(); onClose(); }} className="p-2 hover:bg-white/10 rounded-lg transition">
            <span className="text-gray-400 text-xl">×</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Story Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sun className="text-amber-400" size={20} />
                <h4 className="text-amber-200 font-semibold">Aaj Ka Mausam</h4>
              </div>
              <p className="text-white text-lg leading-relaxed font-serif">
                {story}
              </p>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={speakStory}
              className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all shadow-lg ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white'
              }`}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? 'Stop Story' : 'Listen to Story'}
            </motion.button>
          </div>

          {/* Yesterday vs Today Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="text-xs text-blue-300 mb-2">Yesterday</div>
              <div className="flex items-center gap-2 mb-1">
                <Thermometer size={16} className="text-blue-400" />
                <span className="text-white font-bold">{yesterdayData.temp}°C</span>
              </div>
              <div className="flex items-center gap-2">
                <CloudRain size={16} className="text-blue-400" />
                <span className="text-white text-sm">{yesterdayData.rain}% Rain</span>
              </div>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="text-xs text-amber-300 mb-2">Today</div>
              <div className="flex items-center gap-2 mb-1">
                <Thermometer size={16} className="text-amber-400" />
                <span className="text-white font-bold">{weatherData.temp}°C</span>
                {weatherData.temp > yesterdayData.temp ? 
                  <TrendingUp size={14} className="text-red-400" /> : 
                  <TrendingDown size={14} className="text-green-400" />
                }
              </div>
              <div className="flex items-center gap-2">
                <CloudRain size={16} className="text-amber-400" />
                <span className="text-white text-sm">{weatherData.rainfall_prob_24h}% Rain</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-xs text-amber-300/60">
            💡 Yeh kahani AI dwara aapke local mausam ke data se banayi gayi hai.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}