import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: string;
}

const GabaritoComponent: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions(); // Carregar as perguntas quando o componente montar
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    if (!selectedOption) {
      alert('Selecione uma opção correta antes de salvar!');
      return;
    }
    try {
      await api.put('/questions', questions[currentQuestionIndex]);
      setMessage('Pergunta salva com sucesso!');
      handleNextQuestion()
    } catch (error) {
      console.error('Erro ao salvar pergunta:', error);
      setMessage('Erro ao salvar pergunta. Verifique o console para mais detalhes.');
    } finally {
      setIsLoading(false);
    }
  };


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

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setMessage('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div>
      <h1>Gabarito e correção das Questões</h1>
      {message && (
        <div id="alert" style={{ borderRadius: 7, padding: 7, margin: 7, background: '#fff', color: 'green' }}>
          <span >{message}</span>
        </div>
      )}
      {questions.length > 0 ? (
        <>
          <div key={currentQuestionIndex}>
            <textarea
              style={{ height: 133, width: 826 }}
              value={questions[currentQuestionIndex].questionText}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[currentQuestionIndex].questionText = e.target.value;
                setQuestions(updatedQuestions);
              }}
            />
            {questions[currentQuestionIndex]?.options?.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  id={option}
                  name="correctAnswer"
                  value={option}
                  checked={option === questions[currentQuestionIndex].correctAnswer}
                  onChange={() => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[currentQuestionIndex].correctAnswer = option;
                    setQuestions(updatedQuestions);
                    setSelectedOption(option);
                  }}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
          <div> &nbsp; </div>

          {selectedOption && (
            <button id="next" onClick={handleNextQuestion}>Próx. Questão</button>
          )}
          &nbsp;
          <button onClick={handleSave} style={{ width: 300, background: '#aaaaaa', color: 'green' }}>Salvar</button> &nbsp;

        </>
      ) : (
        <>
          <p>{isLoading ? 'Loading...' : ''}</p>
          <div>
            <button onClick={loadQuestions}>Load Questions</button>
          </div>
        </>
      )}
    </div>
  );
};

export default GabaritoComponent;
