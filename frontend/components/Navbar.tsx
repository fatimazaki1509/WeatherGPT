"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Bell,
} from "lucide-react";

interface NavbarProps {
  city: string;
  setCity: (city: string) => void;
  getCurrentLocation: () => void;
}

export default function Navbar({
  city,
  setCity,
  getCurrentLocation,
}: NavbarProps) {
  const [inputCity, setInputCity] =
    useState(city);

  useEffect(() => {
    setInputCity(city);
  }, [city]);

  const handleSearch = () => {
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div
          className="
          flex
          items-center
          w-[520px]
          h-[56px]
          px-5
          rounded-2xl
          border
          border-blue-900
          bg-[#08182f]
          "
        >
          <Search
            size={20}
            className="text-slate-400 cursor-pointer"
            onClick={handleSearch}
          />

          <input
            value={inputCity}
            onChange={(e) =>
              setInputCity(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search city, district or village..."
            className="
              flex-1
              ml-3
              bg-transparent
              outline-none
              text-white
              placeholder:text-slate-400
            "
          />
        </div>

        {/* Location Button */}
        <button
          className="
          flex
          items-center
          gap-2
          h-[56px]
          px-6
          rounded-2xl
          border
          border-blue-900
          bg-[#08182f]
          hover:bg-[#0c2345]
          transition
          onClick={getCurrentLocation}
          "
        >
          <MapPin size={18} />
          Use My Location
        </button>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        {/* Language */}
        <div
          className="
          h-[50px]
          px-4
          rounded-xl
          border
          border-blue-900
          bg-[#08182f]
          flex
          items-center
          "
        >
          EN
        </div>

        {/* Bell */}
        <div className="relative">

          <Bell
            size={22}
            className="text-white"
          />

          <div
            className="
            absolute
            -top-2
            -right-2
            w-4
            h-4
            rounded-full
            bg-red-500
            text-[10px]
            flex
            items-center
            justify-center
            "
          >
            1
          </div>

        </div>

        {/* User */}
        <div className="flex items-center gap-3">

          <div
            className="
            w-12
            h-12
            rounded-full
            bg-purple-600
            flex
            items-center
            justify-center
            font-bold
            "
          >
            F
          </div>

          <div>
            <p className="text-slate-400 text-sm">
              Hello,
            </p>

            <p className="font-semibold">
              Fatima
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}