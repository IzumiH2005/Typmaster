type WordTimingItemProps = {
  word: string;
  time: number;
};

export function WordTimingItem({ word, time }: WordTimingItemProps) {
  return (
    <div className="bg-gray-100 px-2 py-1 rounded text-xs flex items-center">
      <span className="font-medium mr-1">{word}:</span> {Math.round(time)} ms
    </div>
  );
}
