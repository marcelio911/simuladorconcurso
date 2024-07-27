import { RootState } from '@/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ActionsEstatisticas from '@/store/slices/estatisticasSlice';

const useAprendizados = () => {
  const [loading,] = useState(true);
  const [error,] = useState<string | null>(null);
  const { concursoSelected } = useSelector((state: RootState) => state.concursos);
  const { selectedSimulacao } = useSelector((state: RootState) => state.simulacoes);
  const { estatisticas } = useSelector((state: RootState) => state.estatisticas);

  const dispatch = useDispatch();

  const _loadEstatisticasByConcursoId = async () => {
    if (concursoSelected) {
      dispatch(ActionsEstatisticas.handleEstatisticas({ useCache: false, idConcurso: concursoSelected, simulacaoId: selectedSimulacao?._id ?? undefined }));
    }
  }

  return {
    loading,
    error,
    _loadEstatisticasByConcursoId,
    estatisticas
  };
};

export default useAprendizados;
