import { createSlice } from '@reduxjs/toolkit';

interface ErrorState {
  message: string | null;
}

const initialState: ErrorState = {
  message: null,
};

const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setError: (state, { payload: message }) => {
      state.message = message;
    },
    clearError: (state) => {
      state.message = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
