import type { PropsWithChildren } from 'react';
import { Provider, ProviderProps } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import ToastContainer from '@/components/ToastContainer';
import Loading from '@/components/Loading';

import { store, persistor } from '@/store';


const providerProps: ProviderProps = {
  store: store,
};

export default function RootProvider({ children }: PropsWithChildren) {

  return (
    <Provider {...providerProps}>
      <PersistGate loading={null} persistor={persistor}>
      <ToastContainer />
      <Loading />

      {children}
      </PersistGate>
    </Provider>
  );
}
