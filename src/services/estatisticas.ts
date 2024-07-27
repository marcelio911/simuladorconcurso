import axios from 'axios';

import { API_BASE_URL } from './api';

export const getEstatisticas = async () => {
  const response = await axios.get(`${API_BASE_URL}/estatisticas`);
  return response.data;
};

export const fetchEstatisticasByConcursoId = async (concursoId: string, simulacaoId: string) => {
  const url = simulacaoId ?
    `${API_BASE_URL}/estatisticas/concurso/${concursoId}/simulacao/${simulacaoId}` :
    `${API_BASE_URL}/estatisticas/concurso/${concursoId}`
  const response = await axios.get(url);
  return response.data;
};

export const fetchEstatisticasById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/estatisticas/${id}`);
  return response.data;
};

export const createEstatisticas = async (estatisticas: any) => {
  const response = await axios.post(`${API_BASE_URL}/estatisticas`, estatisticas);
  return response.data;
};

export const deleteEstatisticas = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/estatisticas/${id}`);
  return response.data;
};
export const updateEstatisticas = async (id: string, estatisticas: any) => {
  const response = await axios.put(`${API_BASE_URL}/estatisticas/${id}`, estatisticas);
  return response.data;
};