import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-[28px] border border-blue-900">

      <Image
        src="/images/earth.png"
        alt="Earth"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#041325]/95 via-[#041325]/45 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8">

        <h1 className="text-5xl font-bold leading-tight">
          Smarter Weather.
          <br />
          Safer Lives.
        </h1>

        <p className="mt-4 text-xl text-gray-300 max-w-2xl">
          AI-powered insights for citizens,
          farmers and a resilient India.
        </p>

        {/* Stats Cards */}
        <div className="flex gap-3 mt-8">

          <div className="bg-[#0d2648]/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-blue-700 min-w-[140px]">
            <h3 className="text-3xl font-bold">700+</h3>
            <p className="text-sm text-gray-400">
              Districts Covered
            </p>
          </div>

          <div className="bg-[#0d2648]/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-blue-700 min-w-[150px]">
            <h3 className="text-3xl font-bold">
              Real-Time
            </h3>
            <p className="text-sm text-gray-400">
              IMD Data
            </p>
          </div>

          <div className="bg-[#0d2648]/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-blue-700 min-w-[165px]">
            <h3 className="text-3xl font-bold">
              AI Powered
            </h3>
            <p className="text-sm text-gray-400">
              Advisory
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}