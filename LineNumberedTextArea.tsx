import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

const LineNumberedTextArea: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const calculateVisibleLines = () => {
    if (textareaRef.current) {
      const computedStyle = getComputedStyle(textareaRef.current);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const { scrollTop, clientHeight } = textareaRef.current;
      const totalLines = text.split('\n').length;
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
    calculateVisibleLines();
  }, [text]);

  return (
    <div className="flex text-sm">
      <div className="w-16 h-96 overflow-y-hidden bg-gray-200 text-right border-r border-gray-300 text-gray-500">
        {visibleLines.map((lineNumber) => (
          <div key={lineNumber} className="pr-2 font-mono">
            {lineNumber}
          </div>
        ))}
      </div>
      <div className="flex-1">
        <textarea
          ref={textareaRef}
          className="resize-none mt-0 pt-0 p-2 w-full h-96 border-y-2 border-r-2 rounded-r border-gray-300 outline-none overflow-y-auto font-mono"
          value={text}
          onChange={handleTextAreaChange}
          onScroll={calculateVisibleLines}
        />
      </div>
    </div>
  );
};

export default LineNumberedTextArea;
