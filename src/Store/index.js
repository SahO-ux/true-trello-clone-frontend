import BoardReducer from "./Reducers";
import { configureStore } from "@reduxjs/toolkit";
import throttle from "lodash/throttle";

const saveState = (state) => {
  const stringifiedState = JSON.stringify(state);
  localStorage.setItem("state", stringifiedState);
};

const loadState = () => {
  const stringifiedState = localStorage.getItem("state");
  if (stringifiedState === null) return undefined;
  return JSON.parse(stringifiedState);
};

const persistedState = loadState();

const store = configureStore({
  reducer: BoardReducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;
