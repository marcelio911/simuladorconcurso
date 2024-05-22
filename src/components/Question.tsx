import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import ResultadosSimulado from './ResultadoSimulado';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestions } from '../services/questions';
import { Button, Layout } from 'antd';
import HeaderBar from './Header';
import { Content } from 'antd/es/layout/layout';
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

    if (option === correctAnswer) {
      setScore(score + 1);
      setCorrectAnswersHistory([...correctAnswersHistory, questions[currentQuestionIndex]]); // Adiciona a resposta correta ao histórico
      // Toca um som de resposta correta
      const correctAudioElement = new Audio('/assets/sounds/correct-answer-sound.mp3');
      correctAudioElement.addEventListener('canplaythrough', () => {
        // O áudio está pronto para ser reproduzido
        correctAudioElement.play();
      });
      // Lidar com erros de carregamento
      correctAudioElement.addEventListener('error', (event: any) => {
        console.error('Erro ao carregar o áudio:', event?.target?.error as string);
      });
    } else {
      // Toca um som de resposta errada
      const incorrectAudioElement = new Audio('/assets/sounds/wrong-answer-sound2.mp3');
      incorrectAudioElement.addEventListener('canplaythrough', () => {
        // O áudio está pronto para ser reproduzido
        incorrectAudioElement.play();
      });
      // Lidar com erros de carregamento
      incorrectAudioElement.addEventListener('error', (event: any) => {
        console.error('Erro ao carregar o áudio:', event?.target?.error as string);
      });
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
    <Layout>
      <HeaderBar />
      <Content style={{ padding: '0 50px' }}>
        <h2>Simulador de Questões [{startTime?.toLocaleTimeString()}] - Questão [{currentQuestionIndex + 1}/{questions.length}] - Acertos [{score}] </h2>

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
              <h3 >{questions[currentQuestionIndex]?.questionText}</h3>
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
                    <Button id="back" type='dashed' onClick={handleBackQuestion}>Voltar</Button>
                  }
                </div>
                <div >
                  <Button id="next" type="primary" onClick={handleNextQuestion}>Próx. Questão</Button>
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
        )
        }
      </Content >
    </Layout >
  );
};

export default QuestionComponent;
