import React from 'react';

interface HintProps {
  title: string;
  content: string[];
  _onClick?: () => void;
  onEdit?: () => void;
  concurso?: any;
  bg?: string;
}

const ListItem: React.FC<HintProps> = ({ title, _onClick, content, bg = 'bg-blue-100' }) => {
  return (
    <div onClick={_onClick} className={`activity-row w-96 pointer p-3 m-4 border-l-4 border-gray-300 ${bg}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul>{content.map(text => (<li className="mt-2">[+] {text}</li>))}</ul>
    </div>
  );
};

export default ListItem;
