import { combineReducers } from 'redux'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import toastReducer from '@/store/slices/toastSlice';
import loadingReducer from '@/store/slices/loadingSlice';
import concursosReducer from '@/store/slices/concursosSlice';
import simulacoesReducer from '@/store/slices/simulacoesSlice';

const rootPersistConfig = {
  timeout: 0,
  key: 'root',
  storage,
  autoMergeLevel2,
  whitelist: ['toast', 'loading', 'concursos'],
  // blacklist: [],
}

const rootReducer = combineReducers({
  toast: toastReducer,
  loading: loadingReducer,
  concursos: concursosReducer,
  simulacoes: simulacoesReducer,
})


export default { rootReducer, rootPersistConfig }
