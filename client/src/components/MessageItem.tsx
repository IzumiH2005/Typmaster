import { TimingBadge } from "./TimingBadge";

type MessageProps = {
  message: {
    text: string;
    timestamp: string;
    typingTime: string;
    wordCount: number;
    wordsPerMinute: string;
  };
};

export function MessageItem({ message }: MessageProps) {
  return (
    <div className="mb-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>{message.timestamp}</span>
        <span className="flex items-center gap-2">
          <TimingBadge type="time" value={message.typingTime} />
          <TimingBadge type="words" value={message.wordCount} />
          <TimingBadge type="speed" value={message.wordsPerMinute} />
        </span>
      </div>
      <div className="text-gray-800">{message.text}</div>
    </div>
  );
}
