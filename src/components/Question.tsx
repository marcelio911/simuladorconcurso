import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Question {
  id: number;
  questionText: string;
  options: string;
  correctAnswer: string;
}

const QuestionComponent: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    api.get<Question[]>('/questions').then((response) => {
      setQuestions(response.data);
    });
  }, []);

  const handleAnswerOptionClick = (option: string) => {
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div>
      {questions.length > 0 ? (
        <>
          <div>
            <h2>{questions[currentQuestionIndex].questionText}</h2>
            {questions[currentQuestionIndex].options.split(',').map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerOptionClick(option)}
                disabled={!!selectedOption}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedOption && (
            <div>
              <button onClick={handleNextQuestion}>Next Question</button>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QuestionComponent;
