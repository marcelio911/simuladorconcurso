import { useState, useEffect } from 'react';
import { deleteConcurso, getConcursos } from '../services/api';
import { fetchSimulacoesByConcursoId } from '../services/simulacoes';

const useConcursos = () => {
  const [concursos, setConcursos] = useState<any[]>([]);
  const [simulacoes, setSimulacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // TODO: Get userId from context auth
  const userId = '6649ad6e3204147e329206bf';

  const handleSave = async (callback: () => void) => {

    await getConcursos();
    callback();
  };

  const handleSimulacoes = async (idConcurso: string) => {
    try {
      startLoading()
      const data = await fetchSimulacoesByConcursoId(idConcurso, userId);
      setSimulacoes(data);
    } catch (err) {
      setError('Failed to fetch simulacoes');
    } finally {
      stopLoading()
    }
  };

  const handleEdit = (concurso: any, callback: (concurso: any) => void) => {
    callback(concurso);
  };

  const handleCancel = (callback: () => void) => {
    callback();
  };

  const handleDelete = async (id: string, callback: () => void) => {
    try {
      startLoading()
      await deleteConcurso(id);
      getConcursos();
      callback();
    } catch (err) {
      setError('Failed to fetch deleteConcurso');
    } finally {
      stopLoading()
    }
  };

  const handleSelected = async (concurso: string, callback: (concurso) => void) => {
    await handleSimulacoes(concurso._id);
    callback(concurso);
  };

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(true);
  };


  useEffect(() => {
    const loadConcursos = async () => {
      try {
        startLoading()
        const data = await getConcursos();
        setConcursos(data);
      } catch (err) {
        setError('Failed to fetch concursos');
      } finally {
        stopLoading()
      }
    };

    loadConcursos();
  }, []);

  return {
    concursos,
    simulacoes,
    loading,
    error,
    userId,
    handleEdit,
    handleCancel,
    handleDelete,
    handleSelected,
    handleSave,
  };
};

export default useConcursos;
