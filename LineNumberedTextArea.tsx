import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

const LineNumberedTextArea: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    calculateVisibleLines(newText);
  };

  const calculateVisibleLines = (newText: string) => {
    if (textareaRef.current) {
      const computedStyle = getComputedStyle(textareaRef.current);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const { scrollTop, clientHeight } = textareaRef.current;
      const totalLines = newText.split('\n').length;
      const visibleCount = Math.floor(clientHeight / lineHeight);
      const firstVisibleLine = Math.max(1, Math.ceil(scrollTop / lineHeight) + 1);
      const lastVisibleLine = Math.min(totalLines, firstVisibleLine + visibleCount - 1);
      const visibleLinesArray: number[] = [];

      for (let i = firstVisibleLine; i <= lastVisibleLine; i++) {
        visibleLinesArray.push(i);
      }

      setVisibleLines(visibleLinesArray);
    }
  };

  useEffect(() => {
    calculateVisibleLines(text);
  }, []);

  return (
    <div className="border-2 border-gray-300 flex font-mono h-72 rounded text-sm">
      <div className="bg-gray-200 overflow-y-hidden pr-2 text-gray-500 text-right w-16">
        {visibleLines.map((lineNumber) => (
          <div key={lineNumber}>
            {lineNumber}
          </div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        className="outline-none overflow-y-auto pl-2 resize-none w-full"
        value={text}
        onChange={handleTextAreaChange}
        onScroll={() => calculateVisibleLines(text)}
      />
    </div>
  );
};

export default LineNumberedTextArea;
