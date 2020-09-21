import React from 'react';
import { Provider } from 'react-redux';
import EntryComponent from './src/components/entryComponent';

import { createStore } from 'redux'
import reducer from './src/redux/reducer';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/redux/configure-store';
import { AppLoading } from 'expo';
const { persistor, store } = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<AppLoading />} persistor={persistor}>
        <EntryComponent />
      </PersistGate>
    </Provider>

  );

}
