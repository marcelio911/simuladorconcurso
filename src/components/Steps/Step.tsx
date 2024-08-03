import FeatureSection, { HintData } from '@/pages/LandingPage/FeatureSection';
import React from 'react';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid'; // Ícone de check

interface StepProps {
  title: string;
  description: string;
  hints: HintData[];
  onComplete: () => void;
  completed: boolean;
  showed?: boolean;
}

const Step: React.FC<StepProps> = ({ title, description, hints, onComplete, completed, showed }) => {


  return (
    showed && (
      <div className={`p-4 mb-4 ${completed ? 'bg-green-100' : 'bg-gray-100'} rounded-lg shadow`}>
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
          <div className="items-end mt-4 p-4">
            <button className="mt-2 py-1 px-4 bg-blue-500 text-white rounded flex items-center " onClick={onComplete}>
              Avançar  <ArrowRightEndOnRectangleIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default Step;
