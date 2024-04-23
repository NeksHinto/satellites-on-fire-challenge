import { configureStore } from "@reduxjs/toolkit";
import firesReducer from "../slices/firesSlice";
import filtersReducer from "../slices/filterSlice";
import errorsReducer from "../slices/errorSlice";

export const store = configureStore({
  reducer: {
    fires: firesReducer,
    filters: filtersReducer,
    errors: errorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
