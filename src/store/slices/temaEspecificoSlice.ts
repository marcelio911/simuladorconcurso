import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@/store';
import { startLoading, stopLoading } from './loadingSlice';
import { createTemasEspecificos, fetchTemasEspecificosByConcursoId, fetchTemasEspecificosById } from '@/services/temasEpecificos';
import { TemaEspecificoDto } from '@/pages/TemasEspecificosList';

interface TemaEspecifico extends TemaEspecificoDto {
  _id: string;
}

interface TemasEspecificosState {
  temasEspecificos: TemaEspecifico[] | null;
  selectedConcursoId: string | null;
  selectedTemaEspecifico: TemaEspecifico | null;
  error: string | null;
}

const initialState: TemasEspecificosState = {
  temasEspecificos: null,
  selectedConcursoId: null,
  selectedTemaEspecifico: null,
  error: null,
};

const temasEspecificosSlice = createSlice({
  name: 'temasEspecificos',
  initialState,
  reducers: {
    setTemasEspecificos(state, action: PayloadAction<TemaEspecifico[]>) {
      state.temasEspecificos = action.payload;
      state.error = null;
    },
    setSelectedConcursoId(state, action: PayloadAction<string>) {
      state.selectedConcursoId = action.payload;
    },
    setSelectedTemaEspecifico(state, action: PayloadAction<TemaEspecifico>) {
      state.selectedTemaEspecifico = action.payload;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clean(state) {
      state.temasEspecificos = null;
      state.selectedConcursoId = null;
      state.selectedTemaEspecifico = null;
      state.error = null;
    }
  },
});

export const { clean, setTemasEspecificos, setSelectedTemaEspecifico, setError, setSelectedConcursoId } = temasEspecificosSlice.actions;

const handleTemasEspecificos = ({
  useCache = true,
  idConcurso,
  userId,
}: {
  useCache?: boolean;
  idConcurso: string;
  userId: string;
}): AppThunk => async (dispatch, getState) => {
  try {
    const { temasEspecificos } = getState();
    const { temasEspecificos: cacheTemasEspecificosByConcurso } = temasEspecificos;
    dispatch(setSelectedConcursoId(idConcurso));
    dispatch(startLoading());
    const data = useCache && !!cacheTemasEspecificosByConcurso ? cacheTemasEspecificosByConcurso : await fetchTemasEspecificosByConcursoId(idConcurso, userId);
    dispatch(setTemasEspecificos(data));
  } catch (err) {
    dispatch(setError('Falha na busca por Temas especificos deste concurso'));
  } finally {
    dispatch(stopLoading());
  }
};

const handleSelectedTemaEspecificoById = (temaEspecificoId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const data = await fetchTemasEspecificosById(temaEspecificoId);
    dispatch(setSelectedTemaEspecifico(data));
    return data;
  } catch (err) {
    dispatch(setError('Failed to fetch temaEspecifico'));
  } finally {
    dispatch(stopLoading());
  }
};

const handleInsertTemaEspecifico = ({
  userId,
  concursoId,
}: {
  userId: string;
  concursoId: string;
}): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    const temaEspecificoDto = { userId, concursoId };
    await createTemasEspecificos(temaEspecificoDto);
    dispatch(handleTemasEspecificos({ useCache: false, idConcurso: concursoId, userId }));
  } catch (err) {
    dispatch(setError('Failed to insert temaEspecifico'));
  } finally {
    dispatch(stopLoading());
  }
};

const handleClean = (): AppThunk => async (dispatch) => {
  dispatch(clean());
}

export default temasEspecificosSlice.reducer;
export {
  handleTemasEspecificos,
  handleSelectedTemaEspecificoById,
  handleInsertTemaEspecifico,
  handleClean,
};
