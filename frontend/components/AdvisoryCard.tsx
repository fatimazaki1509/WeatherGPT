type Props = {
  advisory: string;
};

export default function AdvisoryCard({
  advisory,
}: Props) {
  return (
    <div
      className="
      bg-slate-800
      rounded-2xl
      p-5
      text-white
      whitespace-pre-wrap
      "
    >
      {advisory}
    </div>
  );
}