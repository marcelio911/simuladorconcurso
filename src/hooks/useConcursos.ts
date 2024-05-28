import { useEffect } from 'react';
import { ConcursoDto } from '@/pages/ConcursoList';
import { useDispatch, useSelector } from 'react-redux';

import * as ActionsConcurso from '@/store/slices/concursosSlice';
import * as ActionsSimulado from '@/store/slices/simulacoesSlice';
import { RootState } from '@/store';

const useConcursos = () => {
  const dispatch = useDispatch();

  const { concursos, error: errorConcurso } = useSelector((state: RootState) => state.concursos);
  const { simulacoes, error: errorSimulados } = useSelector((state: RootState) => state.simulacoes);

  const handleSave = async (callback: () => void) => {
    dispatch(ActionsConcurso.load({ useCache: false }));
    callback();
  };


  const handleEdit = (concurso: any, callback: (concurso: any) => void) => {
    callback(concurso);
  };

  const handleCancel = (callback: () => void) => {
    callback();
  };

  const handleDelete = async (id: string, callback: () => void) => {
    dispatch(ActionsConcurso.handleDelete(id));
    callback();
  };

  const handleSelected = async ({ concurso, userId }: any, callback: (concurso: ConcursoDto) => void) => {
    dispatch(ActionsSimulado.handleSimulacoes({ useCache: true, idConcurso: concurso._id, userId }));
    callback(concurso);
  };


  useEffect(() => {
    dispatch(ActionsConcurso.load({ useCache: true }));
  }, []);

  return {
    concursos,
    simulacoes,
    errorConcurso,
    errorSimulados,
    handleEdit,
    handleCancel,
    handleDelete,
    handleSelected,
    handleSave,
  };
};

export default useConcursos;
