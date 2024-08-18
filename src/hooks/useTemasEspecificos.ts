import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
import * as Actions from '@/store/slices/temaEspecificoSlice';
import * as ActionsSimulacoes from '@/store/slices/simulacoesSlice';
import { TemaEspecificoDto } from '@/pages/TemasEspecificosList';

const useTemasEspecificos = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { temasEspecificos, selectedTemaEspecifico, selectedConcursoId, error: errorSimulados } = useSelector((state: RootState) => state.temasEspecificos);

  const _loadTemasEspecificosByConcursoId = async () => {
    if (selectedConcursoId && userId) {
      dispatch(Actions.handleTemasEspecificos({ useCache: false, idConcurso: selectedConcursoId, userId }));
    }
  }

  const handleSelected = async ({ temaEspecifico, userId }: any, callback: (temaEspecifico: TemaEspecificoDto) => void) => {
    dispatch(Actions.setSelectedTemaEspecifico(temaEspecifico._id));
    dispatch(ActionsSimulacoes.handleSimulacoes({ useCache: true, idTemaEspecifico: temaEspecifico._id, userId }));
    callback(temaEspecifico);
  };

  const gettemasEspecificosById = async (temaEspecificoId: string) => {
    if (temaEspecificoId) {
      dispatch(Actions.handleSelectedTemaEspecificoById(temaEspecificoId));
    }
  }

  const insertTemaEspecifico = async ({ userId, concursoId }: any) => {
    dispatch(Actions.handleInsertTemaEspecifico({ userId, concursoId }));
  }
  const handleClean = () => {
    dispatch(Actions.handleClean());
  }

  return {
    insertTemaEspecifico,
    _loadTemasEspecificosByConcursoId,
    gettemasEspecificosById,
    handleClean,
    handleSelected,
    userId, selectedTemaEspecifico, temasEspecificos, selectedConcursoId, errorSimulados
  };
};

export default useTemasEspecificos;
