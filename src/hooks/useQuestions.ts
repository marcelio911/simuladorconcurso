import { QuestionDto } from "../components/Question";
import { explain, updateQuestionCorrectAnswer, updateStatisticsQuestionInCorrectAnswer } from "../services/questions";

const useQuestions = () => {
  const explainQuetions = () => {
    try {
      explain();
    } catch (error) {
      console.error('error::: ', error);
    }
  }

  const playCorrectAudio = () => {
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
  }

  const playInCorrectAudio = () => {
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

  const updateCorrectAnswer = (question: QuestionDto) => {
    try {
      playCorrectAudio();
      updateQuestionCorrectAnswer(question);
    } catch (error) {
      console.error('error::: ', error);
    }
  }

  const updateInCorrectAnswer = (question: QuestionDto) => {
    try {
      playInCorrectAudio();
      updateStatisticsQuestionInCorrectAnswer(question);
    } catch (error) {
      console.error('error::: ', error);
    }
  }

  return { explainQuetions, updateCorrectAnswer, updateInCorrectAnswer };
}

export default useQuestions;
