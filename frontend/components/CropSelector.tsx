"use client";

type Props = {
  crop: string;
  setCrop: (crop: string) => void;
};

export default function CropSelector({
  crop,
  setCrop,
}: Props) {
  return (
    <select
      value={crop}
      onChange={(e) =>
        setCrop(e.target.value)
      }
      className="
      w-full
      bg-slate-800
      border
      border-slate-700
      rounded-xl
      p-3
      text-white
      "
    >
      <option>Cotton</option>
      <option>Soybean</option>
      <option>Rice</option>
      <option>Wheat</option>
      <option>Maize</option>
      <option>Sugarcane</option>
      <option>Tur</option>
    </select>
  );
}