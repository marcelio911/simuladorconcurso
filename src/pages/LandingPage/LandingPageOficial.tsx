import React from 'react';
import Banner from './components/Banner';
import FeatureSection from './FeatureSection';
import { steps } from '../../data/steps.json';

const LandingPage: React.FC = () => {
  const goNext = () => {
    window.location.href = '#/steps';
  }

  return (
    <div>
      <Banner
        title="Este é seu (Assistente de Estudos)"
        subtitle="Prepare-se para o concurso de professor de Instituto Federal com um assistente completo e personalizado."
        imageUrl="/path-to-your-image.jpg"
      />
      <main className="container mx-auto mt-12 p-4">
        {steps.map((step) => (
          <FeatureSection
            initialTitle={step.title}
            initialDescription={step.description}
            initialHints={step.hints}
          />
        ))}
      </main>
      <div className="text-right mt-4 p-4 bg-gray-100 text-green-800 rounded-lg">
        <button className="mt-2 py-1 px-4 bg-blue-500 text-white rounded" onClick={goNext}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default LandingPage;