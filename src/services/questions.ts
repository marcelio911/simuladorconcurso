import axios from 'axios';
import FormData from 'form-data';
import api, { API_BASE_URL } from './api';
import { QuestionDto } from '../components/Question';

export const getQuestions = async (simulacaoId: string) => {
  const response = await api.get<QuestionDto[]>(`/questions/simulacao/${simulacaoId}`);
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

  const response = await axios.request(config);
  return {
    status: response.status,
    data: response.data
  }
}

