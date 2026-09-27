"use client";

import { useEffect, useState } from "react";

import {
  Calendar,
  Loader2,
} from "lucide-react";

interface Props {
  lat: number;
  lon: number;
}

interface Task {
  day: string;
  task: string;
}

export default function FarmCalendar({
  lat,
  lon,
}: Props) {

  const [schedule, setSchedule] =
    useState<Task[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchCalendar();
  }, [lat, lon]);

  const fetchCalendar = async () => {
    try {

      setLoading(true);

      const res = await fetch(
        `http://localhost:8000/api/v1/farm-calendar?lat=${lat}&lon=${lon}`
      );

      const data = await res.json();

      setSchedule(data.schedule || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#081528] rounded-3xl p-6 flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#081528] rounded-3xl border border-purple-500/20 p-6 text-white">

      <div className="flex items-center gap-3 mb-5">

        <Calendar
          className="text-purple-400"
          size={28}
        />

        <div>
          <h2 className="text-2xl font-bold">
            7-Day Farm Calendar
          </h2>

          <p className="text-slate-400 text-sm">
            AI generated farm schedule
          </p>
        </div>

      </div>

      <div className="space-y-3">

        {schedule.map((item, idx) => (

          <div
            key={idx}
            className="bg-slate-800 border border-slate-700 rounded-xl p-4"
          >
            <p className="text-slate-400 text-sm">
              {item.day}
            </p>

            <h4 className="font-semibold text-lg">
              {item.task}
            </h4>

          </div>

        ))}

      </div>

      <div className="mt-5 bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-sm text-purple-300">
        AI generated this schedule based on
        weather, soil moisture and crop
        requirements.
      </div>

    </div>
  );
}