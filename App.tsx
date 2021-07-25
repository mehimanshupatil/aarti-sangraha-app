import React, { useReducer } from "react";
import EntryComponent from "./src/components/entryComponent";
import Context from "./src/store/context";
import initialState from "./src/store/initialState";
import reducer from "./src/store/reducer";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <EntryComponent />
    </Context.Provider>
  );
}
