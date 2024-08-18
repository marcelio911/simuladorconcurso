import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import * as ActionsSimulado from '@/store/slices/simulacoesSlice';

const useSimulacoes = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { simulacoes, selectedSimulacao, selectedTemaEspecificoId, error: errorSimulados } = useSelector((state: RootState) => state.simulacoes);

  const _loadSimulacoesByTemaEspecificoId = async () => {
    if (selectedTemaEspecificoId && userId) {
      dispatch(ActionsSimulado.handleSimulacoes({ useCache: false, idTemaEspecifico: selectedTemaEspecificoId, userId }));
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
    _loadSimulacoesByTemaEspecificoId,
    getsimulacoesById,
    handleClean,
    userId, selectedSimulacao, simulacoes, selectedTemaEspecificoId, errorSimulados
  };
};

export default useSimulacoes;
