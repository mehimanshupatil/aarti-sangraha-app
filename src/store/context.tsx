import React, { createContext, Dispatch, useReducer } from "react";
import { TAction } from "./actions";
import initialState, { IState } from "./initialState";
import reducer from "./reducer";
interface IContextProps {
  state: IState;
  dispatch: Dispatch<TAction>;
}

const Context = createContext<IContextProps>({
  dispatch: () => {
    // Dispatch initial value
  },
  state: initialState,
});
export default Context;

export const DataProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function useData() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("context must be used within a  Provider");
  }
  return context;
}
