import { useState, useEffect } from 'react';
import { getSimulacoes } from '../services/simulacoes';

const useSimulacoes = () => {
  const [simulacoes, setSimulacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSimulacoes = async () => {
      try {
        const data = await getSimulacoes();
        setSimulacoes(data);
      } catch (err) {
        setError('Failed to fetch simulacoes');
      } finally {
        setLoading(false);
      }
    };

    loadSimulacoes();
  }, []);

  return { simulacoes, loading, error };
};

export default useSimulacoes;
