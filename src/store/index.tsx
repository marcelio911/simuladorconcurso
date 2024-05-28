import { Action, AnyAction, Dispatch, Middleware, Store, configureStore } from '@reduxjs/toolkit'
import loggerMiddleware from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'
import { ThunkAction, ThunkMiddleware } from 'redux-thunk';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';

export type RootState = ReturnType<typeof rootReducer.rootReducer>;
// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

// setup redux-persist
const persistedReducer = persistReducer(
  rootReducer.rootPersistConfig,
  rootReducer.rootReducer
)

// setup Sagas
const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [
  sagaMiddleware,
  loggerMiddleware as unknown as Middleware<any, any, Dispatch<any>>,
  thunk as unknown as ThunkMiddleware<RootState, AnyAction>
];

// middlewares.push(sagaMiddleware)
// middlewares.push(loggerMiddleware)
// middlewares.push(thunk as ThunkMiddleware<RootState, Action>);

const store: Store<RootState> = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [ // Ignora ações do redux-persist que possuem valores não serializáveis
        'persist/PERSIST',
        'persist/REHYDRATE',
        'persist/PAUSE',
        'persist/PURGE',
        'persist/FLUSH',
        'persist/REGISTER',
      ],
    },
  }).concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

// sagaMiddleware.run(rootSaga)

const persistor = persistStore(store);


export { store, persistor }