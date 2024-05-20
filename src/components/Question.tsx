import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import ResultadosSimulado from './ResultadoSimulado';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestions } from '../services/questions';

export interface QuestionDto {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}
const QuestionComponent: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [correctAnswersHistory, setCorrectAnswersHistory] = useState<QuestionDto[]>([]);
  const [startTime, setStartTime] = useState<Date | undefined>();
  const { simulacaoId } = useParams();

  useEffect(() => {
    cleanStates();
    loadApi(); // Carregar as perguntas quando o componente montar
  }, []);

  const cleanStates = () => {
    setQuestions([]);
    setIsLoading(false);
    setCurrentQuestionIndex(19);
    setSelectedOption(null);
    setScore(0);
    setCorrectAnswersHistory([]);
    setStartTime(new Date());
  }

  const navigation = useNavigate();

  const backToHome = () => {
    cleanStates();
    navigation(-1);
  }


  const loadApi = async () => {
    setIsLoading(true);
    try {
      const response = await getQuestions({ simulacaoId });
      console.log(`Simulação ${simulacaoId}`);
      setQuestions(response.data);
    } catch (error) {
      console.error('error::: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerOptionClick = (option: string, e: HTMLInputElement) => {
    e.setAttribute('checked', 'true');

    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    console.log('option', option, ' -- ', correctAnswer);
    if (option === correctAnswer) {
      setScore(score + 1);
      setCorrectAnswersHistory([...correctAnswersHistory, questions[currentQuestionIndex]]); // Adiciona a resposta correta ao histórico
      // Toca um som de resposta correta
      try {
        new Audio('assets/sounds/correct-answer-sound.mp3').play();
      } catch (error) {
        console.error('Erro ao carregar áudio:', error);
      }
    } else {
      try {
        // Toca um som de resposta errada
        new Audio('assets/sounds/wrong-answer-sound2.mp3').play();
      } catch (error) {
        console.error('Erro ao carregar áudio:', error);
      }
    }

    setSelectedOption(option);

  };

  const handleBackQuestion = () => {
    if (currentQuestionIndex > 0) {
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }
  const handleNextQuestion = () => {
    // Calcula o tempo que o usuário levou para responder
    const endTime = new Date();
    const responseTime = endTime.getTime() - startTime!.getTime(); // Tempo em milissegundos
    // Registra o tempo de resposta da pergunta atual (em segundos)
    // Aqui você pode armazenar em outro componente ou enviar para o servidor
    console.log(`Tempo de resposta para a pergunta ${currentQuestionIndex + 1}: ${responseTime / 1000} segundos`);

    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);

  };

  return (
    <div>
      <h1>Simulador de Questões [{startTime?.toLocaleTimeString()}] - Questão [{currentQuestionIndex}/{questions.length}] - Acertos [{score}] </h1>

      <ResultadosSimulado
        startTime={startTime}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        correctAnswersHistory={correctAnswersHistory as any}
        score={score}
        handleNovoSimuladoClick={() => { backToHome() }}
      />
      {questions.length > 0 ? (
        <div id="questionText">
          <div key={currentQuestionIndex}>
            <h2 >{questions[currentQuestionIndex]?.questionText}</h2>
            {questions[currentQuestionIndex]?.options?.map((option) => {
              const isSelected = selectedOption === option;
              const isCorrect = questions[currentQuestionIndex].correctAnswer === option;
              const optionClass = classnames({
                'option': true,
                'selected': isSelected,
                'correct': isSelected && isCorrect,
                'incorrect': isSelected && !isCorrect,
              });

              return (
                <div id="options" key={option} className={optionClass}>
                  <input
                    id={option}
                    type="checkbox"
                    onClick={(e) => handleAnswerOptionClick(option, e.currentTarget)}
                    disabled={!!selectedOption}
                    value={option.replace(' **', '')}
                  />
                  <span className="image-choice">{option.replace(' **', '')}</span>
                  <input type="hidden" id="correctAnswer" value={questions[currentQuestionIndex].correctAnswer} />
                </div>
              );
            })}
          </div>
          <div> &nbsp; </div>
          {selectedOption && (
            <div className="action-box">
              <div>
                {currentQuestionIndex > 0 &&
                  <button id="back" onClick={handleBackQuestion}>Voltar</button>
                }
              </div>
              <div >
                <button id="next" onClick={handleNextQuestion}>Próx. Questão</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <p>{isLoading ? 'Loading...' : ''}</p>
          <div>
            <button onClick={loadApi}>Carregar Questões</button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionComponent;
