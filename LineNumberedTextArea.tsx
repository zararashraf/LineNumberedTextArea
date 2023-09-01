import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

interface LineNumberedTextAreaProps {
  value: string;
  onChange?: (value: string) => void;
  height?: string;
}

const LineNumberedTextArea: React.FC<LineNumberedTextAreaProps> = ({ value, onChange }) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (onChange) {
      onChange(newText);
    }
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
    calculateVisibleLines(value);
  }, [value]);

  return (
    <div className="flex text-sm h-72 font-mono border-gray-300 rounded border-2">
      <div className="w-16 bg-gray-200 text-right text-gray-500 pr-2">
        {visibleLines.map((lineNumber) => (
          <div key={lineNumber}>
            {lineNumber}
          </div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        className="resize-none w-full pl-2 outline-none overflow-x-auto"
        style={{ overflowX: 'auto' }}
        value={value}
        onChange={handleTextAreaChange}
        onScroll={() => calculateVisibleLines(value)}
      />
    </div>
  );
};

export default LineNumberedTextArea;
