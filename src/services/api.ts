import axios from 'axios';

const protocol = 'https';
const webserver = 'backendsimulator.systentando.com';
// const webserver = 'localhost:3000';

export const API_BASE_URL = `${protocol}://${webserver}`; // ${ project } /${region}/${ endpoint }`;


const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;

export const getConcursos = async () => {
  const response = await axios.get(`${API_BASE_URL}/concursos`);
  return response.data;
};

export const fetchConcursoById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/concursos/${id}`);
  return response.data;
};

export const createConcurso = async (concurso: any) => {
  const response = await axios.post(`${API_BASE_URL}/concursos`, concurso);
  return response.data;
};

export const deleteConcurso = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/concursos/${id}`);
  return response.data;
};
export const updateConcurso = async (id: string, concurso: any) => {
  const response = await axios.put(`${API_BASE_URL}/concursos/${id}`, concurso);
  return response.data;
};


export const fetchContests = async () => {
  const response = await axios.get(`${API_BASE_URL}/contests`);
  return response.data;
};

export const fetchContestById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/contests/${id}`);
  return response.data;
};

export const createContest = async (contest: any) => {
  const response = await axios.post(`${API_BASE_URL}/contests`, contest);
  return response.data;
};

export const updateContest = async (id: string, contest: any) => {
  const response = await axios.put(`${API_BASE_URL}/contests/${id}`, contest);
  return response.data;
};
