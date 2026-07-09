import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

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
  const reduced = useReducedMotion();
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reduced || words.length === 0) return;
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
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length);
        }, deleteSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [reduced, displayText, wordIndex, isDeleting, words, speed, deleteSpeed, pause]);

  // Reduced motion: show the first role statically instead of typing
  if (reduced) {
    return <span className={className}>{words[0] ?? ''}</span>;
  }

  return (
    <span className={className}>
      {displayText}
      <span className="typing-cursor" />
    </span>
  );
}
