import { useState } from 'react';
import { createSimulacoes, fetchSimulacoesByConcursoId } from '../services/simulacoes';
import { SimulacaoDto } from '../../backend/microservicos/src/types/dtos/Simulacao.dto';
import { useParams } from 'react-router-dom';

const useSimulacoes = () => {
  const [simulacoes, setSimulacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams();

  const insertSimulacao = async ({ userId, concursoId }) => {
    try {
      const simulacaoDto: SimulacaoDto = {
        userId,
        concursoId,
      };
      await createSimulacoes(simulacaoDto);
    } catch (err) {
      setError('Failed to insert simulacao');
    } finally {
      setLoading(false);
    }
  }

  const loadSimulacoesByConcursoId = async (concursoId: string, userId: string) => {
    try {
      const data = await fetchSimulacoesByConcursoId(concursoId, userId);
      setSimulacoes(data);
    } catch (err) {
      setError('Failed to fetch simulacoes');
    } finally {
      setLoading(false);
    }
  };



  return { loadSimulacoesByConcursoId, insertSimulacao, userId, simulacoes, loading, error };
};

export default useSimulacoes;
