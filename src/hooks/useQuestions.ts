import { useDispatch, useSelector } from "react-redux";
import { QuestionDto } from "../components/Question";
import { explain, updateQuestionCorrectAnswer, updateStatisticsQuestionInCorrectAnswer } from "../services/questions";
import { startLoading, stopLoading } from "@/store/slices/loadingSlice";
import { RootState } from "@/store";

const useQuestions = () => {

  const dispatch = useDispatch();
  const { selectedSimulacao: simulacao } = useSelector((state: RootState) => state.simulacoes);


  const explainQuetions = async () => {
    try {
      dispatch(startLoading());
      await explain();
      dispatch(stopLoading());
    } catch (error) {
      console.error('error::: ', error);
      dispatch(stopLoading());
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
      if (simulacao) {
        updateQuestionCorrectAnswer(question,
          simulacao.userId,
          simulacao.temaEspecificoId,
          simulacao._id,
          simulacao.name!
        );
      }
    } catch (error) {
      console.error('error::: ', error);
    }
  }

  const updateInCorrectAnswer = (question: QuestionDto) => {
    try {
      playInCorrectAudio();
      if (simulacao) {
        updateStatisticsQuestionInCorrectAnswer(question,
          simulacao.userId,
          simulacao.temaEspecificoId,
          simulacao._id,
          simulacao.name!
        );
      }
    } catch (error) {
      console.error('error::: ', error);
    }
  }

  return { explainQuetions, updateCorrectAnswer, updateInCorrectAnswer };
}

export default useQuestions;
