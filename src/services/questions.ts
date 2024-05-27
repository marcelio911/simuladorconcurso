/* eslint-disable @typescript-eslint/no-var-requires */
import FormData from 'form-data';
import api, { API_BASE_URL } from './api';
import { QuestionDto } from '../components/Question';

// Configuração da chave de API do OpenAI
export const explain = async () => {
  const opcaoSelecionada = document.querySelector('.option.selected.incorrect');
  if (opcaoSelecionada) {
    const questionText = document.querySelector('#questionText h3')?.textContent;
    const todasOpcoes = Array.from(document.querySelectorAll('.option'));

    if (questionText) {
      try {
        const prompt = `Como em simulador de perguntas e respostas explique de forma clara e objetiva:
        Em relação a questão \n${questionText}\n, por favor gostaria de orientações do por que a alternativa selecionada ${opcaoSelecionada.textContent} está incorreta.
        E como seria a solução correta para esta questão? Considerando as outras opções: ${todasOpcoes.map(opcao => opcao.textContent).join(', ')}.`;

        const response = await api.post('/questions/gpt-explain', { prompt });
        const explanation = response.data;
        console.log(explanation);

        // Você pode agora exibir a explicação no seu UI ou retorná-la de alguma forma.
        document.getElementById('explain')!.innerHTML = explanation;
      } catch (error) {
        document.getElementById('explain')!.innerHTML = `
          <h3 class="explainsResponse">
          Erro ao obter explicação da API do OpenAI ${error}</h3>
        `;

      }
    }
  }
};

// export const explain = async () => {
//   const opcaoSelecionada = document.querySelector('.option.selected.incorrect');
//   const todasOpcoes = Array.from(document.querySelectorAll('.option'));

//   if (opcaoSelecionada) {
//     const questionText = document.querySelector('#questionText h3')?.textContent;
//     if (questionText) {
//       try {
//         const prompt = `Como em simulador de perguntas e respostas explique de forma clara
//           e objetiva: Em relação a questão \n${questionText}\n.
//           Por favor gostaria de orientações do por que a alternativa selecionada
//           ${opcaoSelecionada.textContent} está incorreta?`;

//           // codigo para gerar explicação usando a API do OpenAi ...
//         // const model = 'models/chat-bison-001'; // ou outro modelo disponível

//         const genAI = new GoogleGenerativeAI('AIzaSyCJwowlwfqeV9VPUEizoXX1dwDX_dNtsuw');
//         const generativelanguageClient =
//           genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

//         console.log('Generated prompt:', prompt);
//         const result = await generativelanguageClient.generateContent(
//           prompt
//         );
//         const response = await result.response;
//         const text = response.text();
//         console.log(text);

//         const explanation = text;
//         document.getElementById('explain')!.innerHTML = `<h3 class="explainsResponse">${explanation}</h3>`;

//       } catch (error) {
//         console.error('Erro ao obter explicação da API Gemini:', error);
//         document.getElementById('explain')!.innerHTML = '<h3 class="explainsResponse">Erro ao obter explicação da API Gemini</h3>';
//       }
//     }
//   }
// };


export const getQuestions = async (simulacaoId: string) => {
  const response = await api.get<QuestionDto[]>(`/questions/simulacao/${simulacaoId}`);
  return {
    status: response.status,
    data: response.data
  }
}

export const updateQuestion = async (question: QuestionDto) => {
  const response = await api.put<QuestionDto[]>(`/questions/`, question);
  return {
    status: response.status,
    data: response.data
  }
}

export const updateQuestionCorrectAnswer = async (question: QuestionDto) => {
  const response = await api.put<QuestionDto[]>(`/questions/is-correct`, question);
  return {
    status: response.status,
    data: response.data
  }
}

export const updateStatisticsQuestionInCorrectAnswer = async (question: QuestionDto) => {
  const response = await api.put<QuestionDto[]>(`/estatisticas/${question.id}`, question);
  return {
    status: response.status,
    data: response.data
  }
}

export const uploadQuestionsFileBySimulacaoId = async (file: File, simulacaoId: string) => {

  const formData = new FormData();
  formData.append('file', file);
  formData.append('simulacaoId', simulacaoId);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/questions/import`,
    headers: {
      'Content-Type': 'multipart/form-data', // Set the Content-Type header directly
    },
    data: formData
  };

  const response = await api.request(config);
  return {
    status: response.status,
    data: response.data
  }
}


