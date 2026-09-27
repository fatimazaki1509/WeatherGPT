"use client";

import { useEffect, useState } from "react";
import {
  Landmark,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface Props {
  state: string;
}

interface Scheme {
  name: string;
  benefit: string;
  eligibility: string;
  link: string;
}

export default function GovernmentSchemes({
  state,
}: Props) {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchemes();
  }, [state]);

  const fetchSchemes = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8000/api/v1/government-schemes?state=${state}`
      );

      const data = await res.json();

      setSchemes(data.schemes || []);
    } catch (error) {
      console.error(error);
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#081528] rounded-3xl border border-yellow-500/20 p-6 text-white">

      <div className="flex items-center gap-3 mb-6">
        <Landmark
          className="text-yellow-400"
          size={28}
        />

        <div>
          <h2 className="text-2xl font-bold">
            Government Schemes
          </h2>

          <p className="text-slate-400 text-sm">
            Financial support & farmer welfare
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">

          {schemes.map((scheme, idx) => (
            <div
              key={idx}
              className="
              bg-slate-800/60
              border
              border-slate-700
              rounded-2xl
              p-5
              hover:border-yellow-500/30
              transition-all
              "
            >
              <h3 className="font-bold text-lg">
                {scheme.name}
              </h3>

              <p className="text-green-400 text-sm mt-2">
                {scheme.benefit}
              </p>

              <p className="text-slate-400 text-sm mt-2">
                {scheme.eligibility}
              </p>

              <a
                href={scheme.link}
                target="_blank"
                className="
                inline-flex
                items-center
                gap-2
                mt-4
                text-blue-400
                hover:text-blue-300
                "
              >
                Apply Now
                <ExternalLink size={14} />
              </a>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}