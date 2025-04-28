type TimingBadgeProps = {
  type: "time" | "words" | "speed";
  value: string | number;
};

export function TimingBadge({ type, value }: TimingBadgeProps) {
  let bgColor = "";
  let textColor = "";
  let icon = null;
  let label = "";

  switch (type) {
    case "time":
      bgColor = "bg-primary-50";
      textColor = "text-primary-700";
      icon = (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      );
      label = `${value} sec`;
      break;
    case "words":
      bgColor = "bg-green-50";
      textColor = "text-green-700";
      icon = (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
        </svg>
      );
      label = `${value} mots`;
      break;
    case "speed":
      bgColor = "bg-blue-50";
      textColor = "text-blue-700";
      icon = (
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      );
      label = `${value} mots/min`;
      break;
    default:
      break;
  }

  return (
    <span className={`inline-flex items-center ${bgColor} ${textColor} rounded-full px-2 py-0.5 text-xs`}>
      {icon}
      {label}
    </span>
  );
}
