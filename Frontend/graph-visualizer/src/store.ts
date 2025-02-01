import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "./reducers/graphReducer";

const store = configureStore({
  reducer: {
    graph: graphReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
