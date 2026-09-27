import { Volume2 } from "lucide-react";

type Props = {
  text: string;
};

export default function VoiceAdvisory({
  text,
}: Props) {
  const speak = () => {
    speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    speechSynthesis.speak(
      utterance
    );
  };

  return (
    <button
      onClick={speak}
      className="
      flex
      items-center
      gap-2
      text-cyan-400
      "
    >
      <Volume2 size={18} />
      Listen Advisory
    </button>
  );
}