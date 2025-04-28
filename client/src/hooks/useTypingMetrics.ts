import { useState, useRef } from 'react';

type WordTimings = Record<string, number>;

export function useTypingMetrics() {
  const [isTyping, setIsTyping] = useState(false);
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [wordTimings, setWordTimings] = useState<WordTimings>({});
  
  const lastWordCountRef = useRef(0);
  const lastWordTimeRef = useRef<number | null>(null);
  
  const startTyping = () => {
    setIsTyping(true);
    setTypingStartTime(Date.now());
  };
  
  const stopTyping = () => {
    setIsTyping(false);
    setTypingStartTime(null);
  };
  
  const updateWordTimings = (text: string) => {
    const words = text.trim().split(/\s+/);
    const currentWordCount = words.length;
    
    // If a new word is started
    if (currentWordCount > lastWordCountRef.current) {
      const now = Date.now();
      if (lastWordTimeRef.current) {
        const wordTime = now - lastWordTimeRef.current;
        const lastWord = words[currentWordCount - 2]; // The previous word
        
        setWordTimings(prev => ({
          ...prev,
          [lastWord]: (prev[lastWord] ? prev[lastWord] + wordTime : wordTime) / (prev[lastWord] ? 2 : 1)
        }));
      }
      
      lastWordCountRef.current = currentWordCount;
      lastWordTimeRef.current = now;
    }
  };
  
  const resetWordTimings = () => {
    lastWordCountRef.current = 0;
    lastWordTimeRef.current = null;
  };
  
  return {
    isTyping,
    typingStartTime,
    wordTimings,
    startTyping,
    stopTyping,
    updateWordTimings,
    resetWordTimings
  };
}
