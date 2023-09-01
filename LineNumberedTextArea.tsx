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
    <div className="flex text-sm font-mono">
      <div className="w-16 h-96 overflow-y-hidden bg-gray-200 text-right border-y-2 border-l-2 rounded-l border-gray-300 text-gray-500 inline-block align-bottom">
        {visibleLines.map((lineNumber) => (
          <div key={lineNumber} className="pr-2">
            {lineNumber}
          </div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        className="resize-none w-full h-96 pl-2 border-y-2 border-r-2 rounded-r border-gray-300 outline-none overflow-y-auto align-top font-mono"
        value={text}
        onChange={handleTextAreaChange}
        onScroll={() => calculateVisibleLines(text)}
      />
    </div>
  );
};

export default LineNumberedTextArea;
