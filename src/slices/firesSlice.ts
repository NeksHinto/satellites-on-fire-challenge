import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Fire } from "../lib/types";
import { ApiService } from "../services/apiService";
import { RootState } from "../state/store";
import dayjs from "dayjs";
import { FireState, FilterState } from "../lib/state";
import { AxiosError } from "axios";
import { clearError, setError } from "./errorSlice";

const initialState: FireState = {
  data: [],
  filters: [],
  loading: false,
  error: false,
};

export const loadFires = createAsyncThunk<
  Fire[],
  FilterState,
  { state: RootState }
>("fires/loadFires", async (filters: FilterState, thunkAPI) => {
  thunkAPI.dispatch(clearError());
  try {
    const apiService = new ApiService();
    const date = dayjs(filters.date);
    const formattedDate = date.format("YYYY-MM-DD");
    const formattedTime = date.format("HH");
    const fireData: Fire[] = await apiService.getFireDataByDate(
      formattedDate,
      formattedTime
    );
    if (filters?.satellite) {
      return fireData.filter((fire) => fire.satellite === filters.satellite);
    }
    return fireData;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError.response?.status === 404
        ? "No fires found for selected date"
        : axiosError.message || "Failed to fetch fires";
    thunkAPI.dispatch(setError(errorMessage));
    return Promise.reject(error);
  }
});

const firesSlice = createSlice({
  name: "fires",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFires.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loadFires.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadFires.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default firesSlice.reducer;
