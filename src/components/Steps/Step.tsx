import FeatureSection, { HintData } from '@/pages/LandingPage/FeatureSection';
import React from 'react';

interface StepProps {
  title: string;
  description: string;
  hints: HintData[];
  onComplete: () => void;
  completed: boolean;
}

const Step: React.FC<StepProps> = ({ title, description, hints, onComplete, completed }) => {


  return (
    <div className={`p-4 mb-4 ${completed ? 'bg-green-100' : 'bg-gray-100'} rounded-lg shadow`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p>{description}</p>
      <div className="mt-8">
        <FeatureSection
          initialTitle={title}
          initialDescription={description}
          initialHints={hints}
          initialUserProfile={'admin'}
        />

        {/* {hints.map((hint, index) => (
          <div key={index}>
            <Hint title={hint.title} content={hint.content} bg='bg-gray-100' />
          </div>
        ))} */}
      </div>
      {!completed && (
        <button className="mt-2 py-1 px-4 bg-blue-500 text-white rounded" onClick={onComplete}>
          Marcar como Concluído
        </button>
      )}
    </div>
  );
};

export default Step;
