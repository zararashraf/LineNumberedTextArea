import React, { ChangeEvent, useState } from 'react';

const LineNumberedTextArea: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const generateLineNumbers = () => {
    const totalRows = text.split('\n').length;

    const lineNumbers: number[] = [];

    for (let i = 26; i <= totalRows; i++) {
      lineNumbers.push(i);
    }

    return lineNumbers;
  };

  const hardcodedLineNumbers = () => {
    const lineNumbers: number[] = [];

    for (let i = 1; i <= 25; i++) {
      lineNumbers.push(i);
    }

    return lineNumbers;
  };

  return (
    <div className="flex text-sm">
      <div className="w-16 h-96 overflow-y-hidden bg-gray-200 text-right border-r border-gray-300 text-gray-500">
        {hardcodedLineNumbers().map((lineNumber) => (
          <div key={lineNumber} className="pr-2 font-mono">
            {lineNumber}
          </div>
        ))}
        {generateLineNumbers().map((lineNumber) => (
          <div key={lineNumber} className="pr-2 font-mono">
            {lineNumber}
          </div>
        ))}
      </div>
      <div className="flex-1">
        <textarea
          className="resize-none mt-0 pt-0 p-2 w-full h-96 border-y-2 border-r-2 rounded-r border-gray-300 outline-none overflow-y-auto font-mono"
          value={text}
          onChange={handleTextAreaChange}
        />
      </div>
    </div>
  );
};

export default LineNumberedTextArea;
