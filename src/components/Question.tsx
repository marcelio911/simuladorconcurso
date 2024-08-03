import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import ResultadosSimulado from './ResultadoSimulado';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestions } from '../services/questions';
import { Button } from 'antd';
import HeaderBar from './Header';
import useQuestions from '../hooks/useQuestions';
import useSimulacoes from '../hooks/useSimulacoes';
import DefaultLayout from '@/components/Templates/DefaultLayout';

export interface QuestionDto {
  _id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
  correctAnswerChecked: boolean;
  attempt: number;
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
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const { updateCorrectAnswer, updateInCorrectAnswer } = useQuestions()
  const { selectedSimulacao, getsimulacoesById } = useSimulacoes()
  const { explainQuetions } = useQuestions();


  useEffect(() => {
    cleanStates();
    loadApi();
    getsimulacoesById(simulacaoId as string);
  }, []);

  const cleanStates = () => {
    setQuestions([]);
    setIsLoading(false);
    setCurrentQuestionIndex(0);
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
      const response = await getQuestions(simulacaoId as string);
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
    setShowCorrectAnswer(option !== correctAnswer);

    if (option === correctAnswer) {
      setScore(score + 1);
      setCorrectAnswersHistory([...correctAnswersHistory, questions[currentQuestionIndex]]); // Adiciona a resposta correta ao histórico
      updateCorrectAnswer(questions[currentQuestionIndex]);
    } else {
      updateInCorrectAnswer(questions[currentQuestionIndex]);

    }

    setSelectedOption(option);

  };

  const cleanExplain = () => {
    document.getElementById('explain')!.innerHTML = '';
  }

  const handleBackQuestion = () => {
    if (currentQuestionIndex > 0) {
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
    cleanExplain();
  }
  const handleNextQuestion = () => {

    // Calcula o tempo que o usuário levou para responder
    const endTime = new Date();
    const responseTime = endTime.getTime() - startTime!.getTime(); // Tempo em milissegundos
    // Registra o tempo de resposta da pergunta atual (em segundos)
    // Aqui você pode armazenar em outro componente ou enviar para o servidor
    console.log(`Tempo de resposta para a pergunta ${currentQuestionIndex + 1}: ${responseTime / 1000} segundos`);
    setShowCorrectAnswer(false);
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    cleanExplain();

  };

  return (
    <DefaultLayout>
      <HeaderBar />
      <button type="submit" onClick={() => { explainQuetions() }} id="help">?</button>

      <section className="pr-2 pl-2 pt-4 bg-painel rounded-lg  ">


        {!!selectedSimulacao && (
          <h2>Simulado de Prova: {selectedSimulacao.name as unknown as string} | [{startTime?.toLocaleTimeString()}] - Questão [{currentQuestionIndex + 1}/{questions.length}] - Acertos [{score}] </h2>
        )}
        <div className={`activity-row w-96 pointer theme-color p-3 m-4 border-l-4 border-gray-300 `}>

          <ResultadosSimulado
            startTime={startTime}
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            correctAnswersHistory={correctAnswersHistory as any}
            score={score}
            handleNovoSimuladoClick={() => { backToHome() }}
          />
        </div>

        {questions.length > 0 ? (
          <div id="questionText">
            <div key={currentQuestionIndex}>
              <h3 >{questions[currentQuestionIndex]?.questionText}</h3>
              {questions[currentQuestionIndex]?.options?.map((option) => {
                const isSelected = selectedOption === option;
                const isCorrect = questions[currentQuestionIndex].correctAnswer === option;
                const optionClass = classnames({
                  'option': true,
                  'selected': isSelected,
                  'correct': showCorrectAnswer && isCorrect,
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
                    <Button id="back" type='dashed' onClick={handleBackQuestion}>Voltar</Button>
                  }
                </div>
                <div >
                  <Button id="next" type="primary" onClick={handleNextQuestion}>Próx. Questão</Button>
                </div>
              </div>
            )}
            <div id="explain"></div>
          </div>
        ) : (
          <>
            <br />
            <p>{isLoading ? 'Loading...' : ''}</p>
            <h2>Parabéns!!</h2>
            <h3>
              {questions.length === 0 && !isLoading ? `
               \n\nParece que você acertou todas as questões para esta simulação ${selectedSimulacao?.name as unknown as string} !
            ` : ''}
            </h3>
          </>
        )
        }
      </section>
    </DefaultLayout >
  );
};

export default QuestionComponent;
