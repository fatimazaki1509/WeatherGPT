"use client";

import { motion } from "framer-motion";

import {
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
} from "lucide-react";

interface Props {
  data: {
    temperature: number;
    humidity: number;
    wind_speed: number;
    rainfall_probability: number;
  };
}

export default function ClimateOverview({
  data,
}: Props) {
  const cards = [
    {
      title: "Temperature",
      value: `${data.temperature}°C`,
      icon: Thermometer,
      gradient:
        "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-400",
      border: "border-orange-500/20",
    },

    {
      title: "Humidity",
      value: `${data.humidity}%`,
      icon: Droplets,
      gradient:
        "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-400",
      border: "border-cyan-500/20",
    },

    {
      title: "Wind Speed",
      value: `${data.wind_speed} km/h`,
      icon: Wind,
      gradient:
        "from-violet-500/20 to-purple-500/20",
      iconColor: "text-violet-400",
      border: "border-violet-500/20",
    },

    {
      title: "Rain Probability",
      value: `${data.rainfall_probability}%`,
      icon: CloudRain,
      gradient:
        "from-emerald-500/20 to-green-500/20",
      iconColor: "text-green-400",
      border: "border-green-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              y: -6,
              scale: 1.03,
            }}
            className={`
              relative
              overflow-hidden
              rounded-3xl
              border
              ${card.border}
              bg-gradient-to-br
              ${card.gradient}
              backdrop-blur-xl
              p-6
              shadow-lg
              hover:shadow-2xl
              transition-all
              duration-300
            `}
          >

            {/* Glow */}

            <div
              className="
              absolute
              inset-0
              opacity-0
              hover:opacity-100
              transition
              duration-500
              bg-white/5
              "
            />

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400 text-sm">
                  {card.title}
                </p>

                <h2 className="text-white text-3xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              <div
                className="
                w-14
                h-14
                rounded-2xl
                bg-white/5
                flex
                items-center
                justify-center
                "
              >
                <Icon
                  size={28}
                  className={card.iconColor}
                />
              </div>

            </div>

          </motion.div>
        );
      })}
    </div>
  );
}