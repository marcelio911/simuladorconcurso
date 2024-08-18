import { combineReducers } from 'redux'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import toastReducer from '@/store/slices/toastSlice';
import loadingReducer from '@/store/slices/loadingSlice';
import concursosReducer from '@/store/slices/concursosSlice';
import estatisticasReducer from '@/store/slices/estatisticasSlice';
import simulacoesReducer from '@/store/slices/simulacoesSlice';
import temasEspecificosReducer from '@/store/slices/temaEspecificoSlice';

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
  estatisticas: estatisticasReducer,
  simulacoes: simulacoesReducer,
  temasEspecificos: temasEspecificosReducer,
})


export default { rootReducer, rootPersistConfig }
