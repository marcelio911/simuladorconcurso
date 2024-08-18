import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@/store';
import { startLoading, stopLoading } from './loadingSlice';
import { deleteConcurso, getConcursos } from '@/services/api';
import { ConcursoDto } from '@/pages/ConcursoList';

interface Concurso extends ConcursoDto {
  _id: string;
}

interface ConcursosState {
  concursos: ConcursoDto[] | null;
  concursoSelected: string | null;
  error: string | null;
}

const initialState: ConcursosState = {
  concursos: null,
  concursoSelected: null,
  error: null,
};

const concursosSlice = createSlice({
  name: 'concursos',
  initialState,
  reducers: {
    setConcursos(state, action: PayloadAction<Concurso[]>) {
      state.concursos = action.payload;
      state.error = null;
    },
    selectConcursoId(state, action: PayloadAction<string>) {
      state.concursoSelected = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setConcursos, selectConcursoId, setError } = concursosSlice.actions;

const load = ({ useCache = false }): AppThunk => async (dispatch, getState) => {
  const { concursos } = getState();
  const { concursos: cachedConcursos } = concursos;

  try {
    dispatch(startLoading());
    const data = useCache && !!cachedConcursos ? cachedConcursos : await getConcursos();
    dispatch(setConcursos(data));
  } catch (err) {
    dispatch(setError('Failed to fetch concursos'));
  } finally {
    dispatch(stopLoading());
  }
};

const selectConcurso = (id: string): AppThunk => async (dispatch) => {
  dispatch(selectConcursoId(id));
}

const handleDelete = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(startLoading());
    await deleteConcurso(id);
    dispatch(load({ useCache: false }));
  } catch (err) {
    dispatch(setError('Failed to delete concurso'));
  } finally {
    dispatch(stopLoading());
  }
};

export default concursosSlice.reducer;
export { load, handleDelete, selectConcurso };