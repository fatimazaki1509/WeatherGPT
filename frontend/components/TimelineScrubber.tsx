"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Sun, CloudRain, Cloud, Wind, Thermometer } from "lucide-react";

interface TimelineScrubberProps {
  weatherData: any;
  onTimeChange: (time: Date | null) => void;
}

export default function TimelineScrubber({ weatherData, onTimeChange }: TimelineScrubberProps) {
  // 0 = Yesterday (Mock), 1 = Today, 2 = Tomorrow, 3-7 = Next days
  const [activeIndex, setActiveIndex] = useState(1); // Default to Today

  const timeLabels = ["Yesterday", "Today", "Tomorrow", "+2 Days", "+3 Days", "+4 Days", "+5 Days", "+6 Days"];

  // Get weather data for the selected time index
  const getWeatherForIndex = (index: number) => {
    if (index === 0) return { temp_max: weatherData.temp - 2, rain_prob: 20, condition: 'Clear' };
    if (index === 1) return { temp_max: weatherData.temp, rain_prob: weatherData.rainfall_prob_24h, condition: weatherData.lightning_risk === 'High' ? 'Storm' : 'Cloudy' };
    
    const forecastIdx = index - 2;
    if (forecastIdx >= 0 && forecastIdx < weatherData.forecast.length) {
      return weatherData.forecast[forecastIdx];
    }
    return { temp_max: 30, rain_prob: 10, condition: 'Clear' };
  };

  const currentView = getWeatherForIndex(activeIndex);

  useEffect(() => {
    onTimeChange(new Date()); // Notify parent
  }, [activeIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl p-6 shadow-2xl mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="text-blue-400" size={20} />
          <h3 className="text-white font-bold text-lg">Time Travel Weather Scrubber</h3>
        </div>
        <div className="text-blue-300 text-sm font-mono bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          {timeLabels[activeIndex]} • {currentView.temp_max}°C
        </div>
      </div>

      {/* Holographic Display Area */}
      <div className="flex items-center justify-center mb-8 h-40 relative overflow-hidden rounded-xl bg-gradient-to-b from-blue-500/10 to-transparent border border-white/5">
         <motion.div
           key={activeIndex}
           initial={{ opacity: 0, scale: 0.8, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ type: "spring", stiffness: 200 }}
           className="flex flex-col items-center z-10"
         >
           {currentView.rain_prob > 50 ? <CloudRain size={72} className="text-blue-400 mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" /> :
            currentView.rain_prob > 20 ? <Cloud size={72} className="text-gray-400 mb-2" /> :
            <Sun size={72} className="text-yellow-400 mb-2 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />}
           
           <div className="text-5xl font-bold text-white tracking-tighter">{currentView.temp_max}°C</div>
           <div className="text-blue-300 text-sm mt-1 flex items-center gap-2">
             <Wind size={14} /> {currentView.rain_prob}% Rain Chance
           </div>
         </motion.div>
         
         {/* Sci-fi Grid Background Effect */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none"></div>
      </div>

      {/* Interactive Slider Track */}
      <div className="relative px-2">
        {/* Base Line */}
        <div className="h-1 bg-white/10 rounded-full w-full absolute top-3"></div>
        
        {/* Active Progress Line */}
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full absolute top-3 left-0 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          animate={{ width: `${(activeIndex / (timeLabels.length - 1)) * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Clickable Points */}
        <div className="relative flex justify-between w-full">
          {timeLabels.map((label, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className="flex flex-col items-center group -mt-1.5"
            >
              <motion.div
                animate={{
                  scale: activeIndex === idx ? 1.8 : 1,
                  backgroundColor: activeIndex === idx ? '#3b82f6' : 'rgba(255,255,255,0.2)',
                  boxShadow: activeIndex === idx ? '0 0 15px #3b82f6' : 'none'
                }}
                className="w-4 h-4 rounded-full border-2 border-white cursor-pointer z-10"
              />
              <span className={`text-[10px] mt-3 transition-all duration-300 ${
                activeIndex === idx ? 'text-white font-bold scale-110' : 'text-blue-300/40 group-hover:text-blue-300'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}