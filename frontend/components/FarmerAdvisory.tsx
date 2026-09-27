import { Leaf } from "lucide-react";
import Link from "next/link";

export default function FarmerAdvisory({ city }: { city: string }) {
  return (
    <div
      className="
      rounded-3xl
      border border-green-500/30
      bg-gradient-to-br
      from-green-950/80
      via-emerald-950/40
      to-slate-900
      p-5
      text-white
      h-full
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-green-500/10
          flex
          items-center
          justify-center
          "
        >
          <Leaf className="text-green-400" size={28} />
        </div>

        <div>
          <h3 className="font-bold text-xl">
            Farmer Advisor
          </h3>

          <p className="text-green-400 text-sm">
            Get crop-wise recommendations →
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-white/10 pt-6">
        <p className="text-gray-300 leading-relaxed">
          Weather conditions are favorable for
          soybean and cotton cultivation.
        </p>
      </div>

      
<Link href="/farmer-advisory">
  <button
    className="
    w-full
    py-4
    bg-green-500
    rounded-xl
    font-semibold
    hover:bg-green-600
    "
  >
    View Advisory →
  </button>
</Link>
    </div>
  );
}