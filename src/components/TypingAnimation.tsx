import { useState, useEffect } from 'react';

interface Props {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
  className?: string;
}

export default function TypingAnimation({
  words,
  speed = 75,
  deleteSpeed = 35,
  pause = 2200,
  className = '',
}: Props) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const currentWord = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(
          () => setDisplayText(currentWord.slice(0, displayText.length + 1)),
          speed + Math.random() * 20
        );
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pause);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), deleteSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex(prev => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, wordIndex, isDeleting, words, speed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {displayText}
      <span className="typing-cursor" />
    </span>
  );
}
