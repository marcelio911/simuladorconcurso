import React from 'react';
import { QuestionDto } from './Question';

interface ResultadosSimuladoProps {
  startTime?: Date;
  questions: QuestionDto[];
  currentQuestionIndex: number;
  correctAnswersHistory: string[];
  score: number;
  handleNovoSimuladoClick: () => void;
}

const ResultadosSimulado: React.FC<ResultadosSimuladoProps> = ({
  startTime,
  questions,
  currentQuestionIndex,
  correctAnswersHistory,
  score,
  handleNovoSimuladoClick,
}) => {
  return (
    <div className='final-page'>
      {startTime && questions?.length > 0 && currentQuestionIndex >= questions?.length && (
        <>
          <h2>Parabéns! Você concluiu o simulado!</h2>
          <h3>Seu resultado final foi:</h3>
          <p>Acertos: {correctAnswersHistory?.length}</p>
          <p>Erros: {questions?.length - score}</p>
          <p>Tempo total: {Math.floor((new Date().getTime() - startTime.getTime()) / 1000)} segundos</p>
          {/* <p id="correctAnswers">Respostas corretas: {correctAnswersHistory?.map((as) => as)}</p> */}
          <button onClick={handleNovoSimuladoClick}>Novo Simulado</button>
        </>
      )}
    </div>
  );
};

export default ResultadosSimulado;
