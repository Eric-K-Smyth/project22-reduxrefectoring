import React from "react";
import { Provider } from 'react-redux'; // Import Redux Provider
import store from '../store'; // Import your Redux store

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const useStoreContext = () => {
  // return the entire Redux store state and dispatch function.
  const [state, dispatch] = useDispatch(); // Import the useDispatch hook from react-redux
  return [state, dispatch];
};

export { StoreProvider, useStoreContext };

