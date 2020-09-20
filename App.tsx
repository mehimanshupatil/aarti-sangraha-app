import React from 'react';
import { Provider } from 'react-redux';
import EntryComponent from './src/components/entryComponent';

import { createStore } from 'redux'
import reducer from './src/redux/reducer';

const store = createStore(reducer)

export default function App() {

  return (
    <Provider store={store}>
      <EntryComponent />
    </Provider>
  );

}
