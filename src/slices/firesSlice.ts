import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Fire } from "../lib/types";
import { ApiService } from "../services/apiService";
import { RootState } from "../state/store";
import dayjs from "dayjs";
import { FireState, FilterState } from "../lib/state";

const initialState: FireState = {
  data: [],
  filters: [],
  loading: false,
  error: null,
};

export const loadFires = createAsyncThunk<
  Fire[],
  FilterState,
  { state: RootState }
>("fires/loadFires", async (filters: FilterState, thunkAPI) => {
  try {
    const apiService = new ApiService();
    const date = dayjs(thunkAPI.getState().filters.date);
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
    return thunkAPI.rejectWithValue(error);
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
        state.error = null;
      })
      .addCase(loadFires.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadFires.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch fires";
      });
  },
});

export default firesSlice.reducer;
