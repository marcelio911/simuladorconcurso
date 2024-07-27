import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@/store';
import { startLoading, stopLoading } from './loadingSlice';
import { createEstatisticas, fetchEstatisticasByConcursoId, fetchEstatisticasById } from '@/services/estatisticas';
import { EstatisticaDto } from '@/pages/MeuAprendizado';

interface Estatistica extends EstatisticaDto {
  _id: string;
}

interface EstatisticasState {
  estatisticas: Estatistica[] | null;
  selectedConcursoId: string | null;
  selectedEstatistica: Estatistica | null;
  error: string | null;
}

const initialState: EstatisticasState = {
  estatisticas: null,
  selectedConcursoId: null,
  selectedEstatistica: null,
  error: null,
};

const estatisticasSlice = createSlice({
  name: 'estatisticas',
  initialState,
  reducers: {
    setEstatisticas(state, action: PayloadAction<Estatistica[]>) {
      state.estatisticas = action.payload;
      state.error = null;
    },
    setSelectedConcursoId(state, action: PayloadAction<string>) {
      state.selectedConcursoId = action.payload;
    },
    setSelectedEstatistica(state, action: PayloadAction<Estatistica>) {
      state.selectedEstatistica = action.payload;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setEstatisticas, setSelectedEstatistica, setError, setSelectedConcursoId } = estatisticasSlice.actions;

const handleEstatisticas = ({
  useCache = true,
  idConcurso,
  simulacaoId,
}: {
  useCache?: boolean;
  idConcurso: string;
  simulacaoId: any;
}): AppThunk => async (dispatch, getState) => {
  try {
    const { estatisticas } = getState();
    const { estatisticas: cacheEstatisticasByConcurso } = estatisticas;
    dispatch(setSelectedConcursoId(idConcurso));
    dispatch(startLoading());
    const data = useCache && !!cacheEstatisticasByConcurso ? cacheEstatisticasByConcurso :
      await fetchEstatisticasByConcursoId(idConcurso, simulacaoId);
    dispatch(setEstatisticas(data));
  } catch (err) {
    dispatch(setError('Falha na busca por Simulados deste concurso'));
  } finally {
    dispatch(stopLoading());
  }
};

const handleSelectedEstatisticaById = (estatisticaId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const data = await fetchEstatisticasById(estatisticaId);
    dispatch(setSelectedEstatistica(data));
    return data;
  } catch (err) {
    dispatch(setError('Failed to fetch estatistica'));
  } finally {
    dispatch(stopLoading());
  }
};

const handleInsertEstatistica = ({
  userId,
  concursoId,
  simulacaoId,
}: {
  userId: string;
  concursoId: string;
  simulacaoId: string;
}): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const estatisticaDto = { userId, concursoId };
    await createEstatisticas(estatisticaDto);
    dispatch(handleEstatisticas({ useCache: false, idConcurso: concursoId, simulacaoId }));
  } catch (err) {
    dispatch(setError('Failed to insert estatistica'));
  } finally {
    dispatch(stopLoading());
  }
};

export default estatisticasSlice.reducer;
export { handleEstatisticas, handleSelectedEstatisticaById, handleInsertEstatistica };
