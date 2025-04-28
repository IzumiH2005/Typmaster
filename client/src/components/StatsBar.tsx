type StatsBarProps = {
  totalMessages: number;
  totalWords: number;
  averageSpeed: number;
  totalTypingTime: number;
};

export function StatsBar({ totalMessages, totalWords, averageSpeed, totalTypingTime }: StatsBarProps) {
  return (
    <div className="bg-primary-500 text-white p-2 px-4 shadow-sm">
      <div className="flex flex-wrap justify-around gap-2 max-w-6xl mx-auto text-sm md:text-base">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
          Messages: <span className="font-semibold ml-1">{totalMessages}</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
          Mots: <span className="font-semibold ml-1">{totalWords}</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          Vitesse moyenne: <span className="font-semibold ml-1">{averageSpeed.toFixed(2)}</span> mots/min
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Temps total: <span className="font-semibold ml-1">{totalTypingTime.toFixed(2)}</span> sec
        </div>
      </div>
    </div>
  );
}
