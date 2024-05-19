import axios from 'axios';

import { API_BASE_URL } from './api';


export const getSimulacoes = async () => {
  const response = await axios.get(`${API_BASE_URL}/simulacoes`);
  return response.data;
};

export const fetchSimulacoesByConcursoId = async (concursoId: string, userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/simulacoes/concurso/${concursoId}/user/${userId}`);
  return response.data;
};

export const fetchSimulacoesById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/simulacoes/${id}`);
  return response.data;
};

export const createSimulacoes = async (simulacoes: any) => {
  const response = await axios.post(`${API_BASE_URL}/simulacoes`, simulacoes);
  return response.data;
};

export const deleteSimulacoes = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/simulacoes/${id}`);
  return response.data;
};
export const updateSimulacoes = async (id: string, simulacoes: any) => {
  const response = await axios.put(`${API_BASE_URL}/simulacoes/${id}`, simulacoes);
  return response.data;
};