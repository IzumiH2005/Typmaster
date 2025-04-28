import React, { useState, useRef, useEffect } from 'react';

const TypingSpeedChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [typingStartTime, setTypingStartTime] = useState(null);
  const [wordTimings, setWordTimings] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [totalTypingTime, setTotalTypingTime] = useState(0);
  const [challengeMode, setChallengeMode] = useState(false);
  const [timeLimit, setTimeLimit] = useState(60); // Temps en secondes
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const [challengeActive, setChallengeActive] = useState(false);
  const [stats, setStats] = useState({
    averageSpeed: 0,
    totalWords: 0,
    totalMessages: 0,
  });
  
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const challengeTimerRef = useRef(null);
  const lastWordCountRef = useRef(0);
  const lastWordTimeRef = useRef(null);
  
  // Fonction pour démarrer le chronomètre quand l'utilisateur commence à écrire
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Si c'est le premier caractère, démarrer le chronomètre
    if (!isTyping && newValue.length > 0) {
      setIsTyping(true);
      setTypingStartTime(Date.now());
    }
    
    // Calculer le temps pour chaque mot
    const words = newValue.trim().split(/\s+/);
    const currentWordCount = words.length;
    
    // Si un nouveau mot est commencé
    if (currentWordCount > lastWordCountRef.current) {
      const now = Date.now();
      if (lastWordTimeRef.current) {
        const wordTime = now - lastWordTimeRef.current;
        const lastWord = words[currentWordCount - 2]; // Le mot précédent
        
        setWordTimings(prev => ({
          ...prev,
          [lastWord]: (prev[lastWord] ? prev[lastWord] + wordTime : wordTime) / (prev[lastWord] ? 2 : 1)
        }));
      }
      
      lastWordCountRef.current = currentWordCount;
      lastWordTimeRef.current = now;
    }
  };
  
  // Fonction pour envoyer un message
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const endTime = Date.now();
    const typingTime = typingStartTime ? (endTime - typingStartTime) / 1000 : 0;
    const wordCount = inputValue.trim().split(/\s+/).length;
    const wordsPerMinute = wordCount / (typingTime / 60);
    
    const newMessage = {
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
      typingTime: typingTime.toFixed(2),
      wordCount,
      wordsPerMinute: wordsPerMinute.toFixed(2)
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsTyping(false);
    setTotalTypingTime(prev => prev + typingTime);
    
    // Mettre à jour les statistiques
    setStats(prev => {
      const totalWords = prev.totalWords + wordCount;
      const totalMessages = prev.totalMessages + 1;
      return {
        averageSpeed: (prev.averageSpeed * prev.totalMessages + wordsPerMinute) / totalMessages,
        totalWords,
        totalMessages
      };
    });
    
    // Réinitialiser les références
    lastWordCountRef.current = 0;
    lastWordTimeRef.current = null;
  };
  
  // Gérer la touche Entrée
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Démarrer un challenge
  const startChallenge = () => {
    setChallengeActive(true);
    setRemainingTime(timeLimit);
    setMessages([]);
    setStats({
      averageSpeed: 0,
      totalWords: 0,
      totalMessages: 0,
    });
    
    if (challengeTimerRef.current) {
      clearInterval(challengeTimerRef.current);
    }
    
    challengeTimerRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(challengeTimerRef.current);
          setChallengeActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    inputRef.current.focus();
  };
  
  // Formater le temps en minutes:secondes
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Nettoyage lors du démontage du composant
  useEffect(() => {
    return () => {
      if (challengeTimerRef.current) {
        clearInterval(challengeTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* En-tête */}
      <header className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Application de vitesse d'écriture</h1>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="challengeMode" 
                checked={challengeMode} 
                onChange={() => setChallengeMode(!challengeMode)} 
                className="mr-2"
                disabled={challengeActive}
              />
              <label htmlFor="challengeMode">Mode Challenge</label>
            </div>
            {challengeMode && !challengeActive && (
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  min="10" 
                  max="300" 
                  value={timeLimit} 
                  onChange={(e) => setTimeLimit(parseInt(e.target.value))} 
                  className="w-16 text-black px-2 py-1 rounded"
                />
                <button 
                  onClick={startChallenge} 
                  className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
                >
                  Démarrer
                </button>
              </div>
            )}
            {challengeActive && (
              <div className="font-bold">
                Temps restant: {formatTime(remainingTime)}
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Statistiques */}
      <div className="bg-indigo-600 text-white p-2 flex justify-around font-medium">
        <div>Messages: {stats.totalMessages}</div>
        <div>Mots: {stats.totalWords}</div>
        <div>Vitesse moyenne: {stats.averageSpeed.toFixed(2)} mots/min</div>
        <div>Temps total d'écriture: {totalTypingTime.toFixed(2)} sec</div>
      </div>
      
      {/* Zone de messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4 bg-white p-3 rounded shadow-sm">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>{msg.timestamp}</span>
              <span>
                {msg.typingTime} sec | {msg.wordCount} mots | {msg.wordsPerMinute} mots/min
              </span>
            </div>
            <div>{msg.text}</div>
          </div>
        ))}
      </div>
      
      {/* Zone de saisie */}
      <div className="border-t border-gray-300 p-4 bg-white">
        <div className="flex">
          <textarea 
            ref={inputRef}
            value={inputValue} 
            onChange={handleInputChange} 
            onKeyPress={handleKeyPress}
            placeholder="Écrivez votre message ici..."
            className="flex-1 p-2 border border-gray-300 rounded-l resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            disabled={challengeMode && !challengeActive}
          />
          <button 
            onClick={handleSendMessage} 
            className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 focus:outline-none"
            disabled={challengeMode && !challengeActive}
          >
            Envoyer
          </button>
        </div>
        
        {/* Affichage des temps par mot */}
        {Object.keys(wordTimings).length > 0 && (
          <div className="mt-3 text-sm">
            <details>
              <summary className="cursor-pointer font-semibold text-blue-600">
                Temps par mot (ms)
              </summary>
              <div className="mt-2 max-h-32 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(wordTimings).map(([word, time]) => (
                    <div key={word} className="bg-gray-100 px-2 py-1 rounded">
                      <span className="font-medium">{word}:</span> {Math.round(time)} ms
                    </div>
                  ))}
                </div>
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingSpeedChatApp;
