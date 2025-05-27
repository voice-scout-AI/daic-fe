import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { slogan, expl } from '@constants/string';
import { LL_COLOR } from '@constants/ui';

const Entry = () => {
  const navigate = useNavigate();

  const TypingText = ({ lines, className }: { lines: string[]; className?: string }) => {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [doneLines, setDoneLines] = useState<string[]>([]);

    useEffect(() => {
      if (currentLineIndex < lines.length) {
        const timeout = setTimeout(() => {
          setDoneLines((prev) => [...prev, lines[currentLineIndex]]);
          setCurrentLineIndex((prev) => prev + 1);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }, [currentLineIndex, lines]);

    return (
      <div className="flex flex-col items-start">
        {doneLines.map((line, idx) => (
          <p key={idx} className={`${className}`}>
            {line}
          </p>
        ))}
        {currentLineIndex < lines.length && (
          <p className={`animate-typing overflow-hidden whitespace-nowrap border-r-2 border-pointGreen ${className}`}>
            {lines[currentLineIndex]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen flex-col items-center justify-between overflow-hidden px-4 text-center font-sans">
      <div>
        <TypingText lines={slogan} className="text-title font-bold text-pointGreen" />
        <TypingText lines={expl} className="mt-4 text-sm text-whiteGreen" />
      </div>

      <div className="flex h-[500px] items-center justify-center">
        <button onClick={() => navigate('/upload')}>
          <Icon icon="gridicons:play" width={100} color={LL_COLOR.pointGreen} />
        </button>
      </div>
    </div>
  );
};

export default Entry;
