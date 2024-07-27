import React, { useState } from 'react';
import Step from './Step';
import ProgressBar from './ProgressBar';
import { steps } from '../../data/steps.json';
import { HintData } from '@/pages/LandingPage/FeatureSection';

interface Step {
  id: number;
  title: string;
  description: string;
  hints: HintData[];
  completed: boolean;
}

const stepsData: Step[] = steps;

const StepList: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>(stepsData);

  const completeStep = (id: number) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === id ? { ...step, completed: true } : step
      )
    );
  };

  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const continuedBe = progressPercentage == 100;

  const goMyRoutine = () => {
    window.location.href = '#/my-routine';
  };


  return (
    <div>
      <ProgressBar progress={progressPercentage} />
      <div className="flex justify-between text-gray-600 mb-4">
        {steps.map((step) => (
          <span key={step.id}>{step.title}</span>
        ))}
      </div>
      {steps.map(step => (
        <Step
          key={step.id}
          title={step.title}
          description={step.description}
          hints={step.hints}
          completed={step.completed}
          onComplete={() => completeStep(step.id)}
        />
      ))}

      {continuedBe && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          <h2 className="text-lg font-semibold">Parabéns!</h2>
          <h3>Você completou todas as informações que precisamos, para montar o seu perfil de aprendizado personalizado.</h3>

          <button className="mt-2 py-1 px-4 bg-blue-500 text-white rounded" onClick={goMyRoutine}>
            Ver minha rotina
          </button>

        </div>
      )}
    </div>
  );
};

export default StepList;
