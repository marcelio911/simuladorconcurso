import React, { useState } from 'react';
import Hint from './components/Hint';
import { motion } from 'framer-motion';


export interface HintData {
  title: string;
  content: string[];
}

interface FeatureProps {
  initialTitle: string;
  initialDescription: string;
  initialUserProfile?: string;
  initialHints: HintData[];
}

const FeatureSection: React.FC<FeatureProps> = ({ initialTitle, initialDescription, initialHints, initialUserProfile }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [hints, setHints] = useState(initialHints);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile,] = useState(initialUserProfile);

  const handleHintChange = (index: number, field: string, value: string) => {
    const newHints = [...hints];
    newHints[index] = { ...newHints[index], [field]: value };
    setHints(newHints);
  };

  const handleHintContentChange = (index: number, contentIdx: number, value: string) => {
    const newHints = [...hints];
    newHints[index] = {
      ...newHints[index], content: [
        ...newHints[index].content.slice(0, contentIdx),
        value,
        ...newHints[index].content.slice(contentIdx + 1),
      ]
    };

    setHints(newHints);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="my-8 "
    >
      <div className="text-left">
        {isEditing && userProfile == 'admin' ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl font-bold border-b-2"
          />
        ) : (
          <h2 className="text-4xl font-bold">{title}</h2>
        )}
        {isEditing && userProfile == 'admin' ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-4 text-gray-600 border-b-2 w-full"
          />
        ) : (
          <p className="mt-4 text-gray-600">{description}</p>
        )}
      </div>
      <div className="mt-8">
        {hints.map((hint, index) => (
          <div key={index}>
            {isEditing && userProfile == 'admin' ? (
              <>
                <input
                  type="text"
                  value={hint.title}
                  onChange={(e) => handleHintChange(index, 'title', e.target.value)}
                  className="font-semibold border-b-2 w-full"
                />
                {hint.content.map((text, idx) => (
                  <textarea
                    key={text + idx}
                    value={text}
                    onChange={(e) => handleHintContentChange(index, idx, e.target.value)}
                    className="border-b-2 w-full"
                  />
                ))}
              </>
            ) : (
              <><Hint title={hint.title} content={hint.content} />
              </>
            )}
          </div>
        ))}
      </div>
      {userProfile == 'admin' && (
        <div className="text-right">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEditing && userProfile == 'admin' ? 'Salvar' : 'Editar'}
          </button>
        </div>
      )}
    </motion.section>
  );
};

export default FeatureSection;