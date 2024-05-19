import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}
const QuestionComponent: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [correctAnswersHistory, setCorrectAnswersHistory] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<Date | undefined>();

  useEffect(() => {
    cleanStates();
    loadQuestions(); // Carregar as perguntas quando o componente montar
  }, []);

  const cleanStates = () => {
    setQuestions([]);
    setIsLoading(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setCorrectAnswersHistory([]);
    setStartTime(undefined);
  }


  const loadQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<Question[]>('/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error('error::: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerOptionClick = (option: string, e: HTMLInputElement) => {
    e.setAttribute('checked', 'true');
    if (!startTime) {
      setStartTime(new Date()); // Registra o tempo de início da resposta
    }
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    console.log('option', option, ' -- ', correctAnswer);
    if (option === correctAnswer) {
      setScore(score + 1);
      setCorrectAnswersHistory([...correctAnswersHistory, option]); // Adiciona a resposta correta ao histórico
      // Toca um som de resposta correta
      console.log('Tocando som de resposta correta');
      try {
        new Audio('assets/sounds/correct-answer-sound.mp3').play();
      } catch (error) {
        console.error('Erro ao carregar áudio:', error);
      }
    } else {
      console.log('Tocando som de resposta errada');
      try {
        // Toca um som de resposta errada
        new Audio('assets/sounds/wrong-answer-sound.mp3').play();
      } catch (error) {
        console.error('Erro ao carregar áudio:', error);
      }
    }

    setSelectedOption(option);

  };

  const handleNextQuestion = () => {
    // Calcula o tempo que o usuário levou para responder
    const endTime = new Date();
    const responseTime = endTime.getTime() - startTime!.getTime(); // Tempo em milissegundos
    // Registra o tempo de resposta da pergunta atual (em segundos)
    // Aqui você pode armazenar em outro componente ou enviar para o servidor
    console.log(`Tempo de resposta para a pergunta ${currentQuestionIndex + 1}: ${responseTime / 1000} segundos`);

    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex + 1 < questions.length) {
      setStartTime(undefined); // Reinicia o tempo de início para a próxima pergunta
    }
  };

  return (
    <div>
      <h1>Simulador de Questões [{startTime?.toLocaleTimeString()}] - Questão [{currentQuestionIndex}/{questions.length}] - Acertos [{score}] </h1>
      {
        startTime && questions.length > 0 && currentQuestionIndex >= questions.length && (
          <center className='final-page'>
            <h2>Parabéns! Você concluiu o simulado!</h2>
            <h3>Seu resultado final foi:</h3>
            <p>Acertos: {correctAnswersHistory.length}</p>
            <p>Erros: {questions.length - score}</p>
            <p>Tempo total: {Math.floor((new Date().getTime() - startTime.getTime()) / 1000)} segundos</p>
            <p id="correctAnswers">Respostas corretas:
              {
                correctAnswersHistory.join(', ')
              }

            </p>
          </center>
        )}
      {questions.length > 0 ? (
        <div id="questionText">
          <div key={currentQuestionIndex}>
            <h2 >{questions[currentQuestionIndex]?.questionText}</h2>
            {questions[currentQuestionIndex]?.options?.map((option) => (
              <div id="options" key={option}>
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
            ))}
          </div>
          <div> &nbsp; </div>
          {selectedOption && (
            <div>
              <button id="next" onClick={handleNextQuestion}>Próx. Questão</button>
            </div>
          )}
        </div>
      ) : (
        <>
          <p>{isLoading ? 'Loading...' : ''}</p>
          <div>
            <button onClick={loadQuestions}>Carregar Questões</button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionComponent;
