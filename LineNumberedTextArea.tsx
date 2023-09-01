import React, { ChangeEvent, useState } from 'react';

const LineNumberedTextArea: React.FC = () => {
  const [text, setText] = useState<string>('');
  const maxVisibleRows = 25;

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const generateLineNumbers = () => {
    const totalRows = text.split('\n').length;
    
    const lineNumbers: number[] = [];

    for (let i = 1; i <= totalRows; i++) {
      lineNumbers.push(i);
    }

    return lineNumbers;
  };

  return (
    <div className="flex">
      <div className="w-16 h-96 overflow-y-auto bg-gray-200 text-right border-r border-gray-300">
        {generateLineNumbers().map((lineNumber) => (
          <div key={lineNumber} className="py-1 pl-2 pr-4 font-mono">
            {lineNumber}
          </div>
        ))}
      </div>
      <div className="flex-1">
        <textarea
          className="resize-none p-2 w-full h-96 border-l border-gray-300 outline-none overflow-y-auto font-mono"
          rows={maxVisibleRows}
          value={text}
          onChange={handleTextAreaChange}
        />
      </div>
    </div>
  );
};

export default LineNumberedTextArea;