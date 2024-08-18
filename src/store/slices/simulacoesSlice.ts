import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@/store';
import { startLoading, stopLoading } from './loadingSlice';
import { createSimulacoes, fetchSimulacoesByTemaEspecificoId, fetchSimulacoesById } from '@/services/simulacoes';
import { SimulacaoDto } from '@/pages/SimulacoesList';

interface Simulacao extends SimulacaoDto {
  _id: string;
}

interface SimulacoesState {
  simulacoes: Simulacao[] | null;
  selectedTemaEspecificoId: string | null;
  selectedSimulacao: Simulacao | null;
  error: string | null;
}

const initialState: SimulacoesState = {
  simulacoes: null,
  selectedTemaEspecificoId: null,
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
    setSelectedTemaEspecificoId(state, action: PayloadAction<string>) {
      state.selectedTemaEspecificoId = action.payload;
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
      state.selectedTemaEspecificoId = null;
      state.selectedSimulacao = null;
      state.error = null;
    }
  },
});

export const { clean, setSimulacoes, setSelectedSimulacao, setError, setSelectedTemaEspecificoId } = simulacoesSlice.actions;

const handleSimulacoes = ({
  useCache = false,
  idTemaEspecifico,
  userId,
}: {
  useCache?: boolean;
  idTemaEspecifico: string;
  userId: string;
}): AppThunk => async (dispatch, getState) => {
  try {
    const { simulacoes } = getState();
    const { simulacoes: cacheSimulacoesByTemaEspecifico } = simulacoes;
    dispatch(setSelectedTemaEspecificoId(idTemaEspecifico));
    dispatch(startLoading());
    const data = useCache && !!cacheSimulacoesByTemaEspecifico ? cacheSimulacoesByTemaEspecifico : await fetchSimulacoesByTemaEspecificoId(idTemaEspecifico, userId);
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
    dispatch(handleSimulacoes({ useCache: false, idTemaEspecifico: concursoId, userId }));
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
