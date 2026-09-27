"use client";

interface Props {
  lat: number;
  lon: number;
  layer: string;
}

export default function LiveMap({
  lat,
  lon,
  layer,
}: Props) {
  const overlay =
    layer === "temp"
      ? "temp"
      : layer === "wind"
      ? "wind"
      : layer === "clouds"
      ? "clouds"
      : "rain";

  const windyUrl = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=6&level=surface&overlay=${overlay}&product=ecmwf&menu=false&message=false&marker=true&calendar=now&pressure=true&type=map&location=coordinates`;

  return (
    <iframe
      title="Windy Weather Map"
      src={windyUrl}
      width="100%"
      height="520"
      className="rounded-2xl"
      style={{
        border: "none",
      }}
    />
  );
}