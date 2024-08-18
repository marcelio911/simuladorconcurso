import axios from 'axios';

import { API_BASE_URL } from './api';

export const getTemasEspecificos = async () => {
  const response = await axios.get(`${API_BASE_URL}/temas-especificos`);
  return response.data;
};

export const fetchTemasEspecificosByConcursoId = async (concursoId: string, userId: string) => {
  const response = await axios.get(`${API_BASE_URL}/temas-especificos/concurso/${concursoId}/user/${userId}`);
  return response.data;
};

export const fetchTemasEspecificosById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/temas-especificos/${id}`);
  return response.data;
};

export const createTemasEspecificos = async (temasEspecificos: any) => {
  const response = await axios.post(`${API_BASE_URL}/temas-especificos`, temasEspecificos);
  return response.data;
};

export const deleteTemasEspecificos = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/temas-especificos/${id}`);
  return response.data;
};
export const updateTemasEspecificos = async (id: string, temasEspecificos: any) => {
  const response = await axios.put(`${API_BASE_URL}/temas-especificos/${id}`, temasEspecificos);
  return response.data;
};