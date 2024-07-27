import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@/store';
import { startLoading, stopLoading } from './loadingSlice';
import { createSimulacoes, fetchSimulacoesByConcursoId, fetchSimulacoesById } from '@/services/simulacoes';
import { SimulacaoDto } from '@/pages/SimulacoesList';

interface Simulacao extends SimulacaoDto {
  _id: string;
}

interface SimulacoesState {
  simulacoes: Simulacao[] | null;
  selectedConcursoId: string | null;
  selectedSimulacao: Simulacao | null;
  error: string | null;
}

const initialState: SimulacoesState = {
  simulacoes: null,
  selectedConcursoId: null,
  selectedSimulacao: null,
  error: null,
};

const simulacoesSlice = createSlice({
  name: 'simulacoes',
  initialState,
  reducers: {
    setSimulacoes(state, action: PayloadAction<Simulacao[]>) {
      state.simulacoes = action.payload;
      state.error = null;
    },
    setSelectedConcursoId(state, action: PayloadAction<string>) {
      state.selectedConcursoId = action.payload;
    },
    setSelectedSimulacao(state, action: PayloadAction<Simulacao>) {
      state.selectedSimulacao = action.payload;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clean(state) {
      state.simulacoes = null;
      state.selectedConcursoId = null;
      state.selectedSimulacao = null;
      state.error = null;
    }
  },
});

export const { clean, setSimulacoes, setSelectedSimulacao, setError, setSelectedConcursoId } = simulacoesSlice.actions;

const handleSimulacoes = ({
  useCache = true,
  idConcurso,
  userId,
}: {
  useCache?: boolean;
  idConcurso: string;
  userId: string;
}): AppThunk => async (dispatch, getState) => {
  try {
    const { simulacoes } = getState();
    const { simulacoes: cacheSimulacoesByConcurso } = simulacoes;
    dispatch(setSelectedConcursoId(idConcurso));
    dispatch(startLoading());
    const data = useCache && !!cacheSimulacoesByConcurso ? cacheSimulacoesByConcurso : await fetchSimulacoesByConcursoId(idConcurso, userId);
    dispatch(setSimulacoes(data));
  } catch (err) {
    dispatch(setError('Falha na busca por Simulados deste concurso'));
  } finally {
    dispatch(stopLoading());
  }
};

const handleSelectedSimulacaoById = (simulacaoId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const data = await fetchSimulacoesById(simulacaoId);
    dispatch(setSelectedSimulacao(data));
    return data;
  } catch (err) {
    dispatch(setError('Failed to fetch simulacao'));
  } finally {
    dispatch(stopLoading());
  }
};

const handleInsertSimulacao = ({
  userId,
  concursoId,
}: {
  userId: string;
  concursoId: string;
}): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const simulacaoDto = { userId, concursoId };
    await createSimulacoes(simulacaoDto);
    dispatch(handleSimulacoes({ useCache: false, idConcurso: concursoId, userId }));
  } catch (err) {
    dispatch(setError('Failed to insert simulacao'));
  } finally {
    dispatch(stopLoading());
  }
};

const handleClean = (): AppThunk => async (dispatch) => {
  dispatch(clean());
}

export default simulacoesSlice.reducer;
export {
  handleSimulacoes,
  handleSelectedSimulacaoById,
  handleInsertSimulacao,
  handleClean,
};
