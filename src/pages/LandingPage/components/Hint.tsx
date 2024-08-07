import React from 'react';

interface HintProps {
  title: string;
  content: string[];
  onClick?: () => void;
  onEdit?: () => void;
  bg?: string;
}

const Hint: React.FC<HintProps> = ({ title, onClick, content, bg = 'bg-blue-100' }) => {
  return (
    <div onClick={() => onClick} className={`p-4 border-l-4 border-blue-500 mb-4 ${bg}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul>{content.map(text => (<li className="mt-2">[+] {text}</li>))}</ul>
    </div>
  );
};

export default Hint;
