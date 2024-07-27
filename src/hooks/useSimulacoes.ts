import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import * as ActionsSimulado from '@/store/slices/simulacoesSlice';

const useSimulacoes = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { simulacoes, selectedSimulacao, selectedConcursoId, error: errorSimulados } = useSelector((state: RootState) => state.simulacoes);

  const _loadSimulacoesByConcursoId = async () => {
    if (selectedConcursoId && userId) {
      dispatch(ActionsSimulado.handleSimulacoes({ useCache: false, idConcurso: selectedConcursoId, userId }));
    }
  }

  const getsimulacoesById = async (simulacaoId: string) => {
    if (simulacaoId) {
      dispatch(ActionsSimulado.handleSelectedSimulacaoById(simulacaoId));
    }
  }

  const insertSimulacao = async ({ userId, concursoId }: any) => {
    dispatch(ActionsSimulado.handleInsertSimulacao({ userId, concursoId }));
  }
  const handleClean = () => {
    dispatch(ActionsSimulado.handleClean());
  }

  return {
    insertSimulacao,
    _loadSimulacoesByConcursoId,
    getsimulacoesById,
    handleClean,
    userId, selectedSimulacao, simulacoes, selectedConcursoId, errorSimulados
  };
};

export default useSimulacoes;
