import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Fire } from "../components/FullHeightMap";
import { FilterOptions } from "../lib/types";
import { getReliability } from "../lib/getReliability";
import { ApiService } from "../services/ApiService";

export interface FireState {
  data: Fire[];
  filters: FilterOptions[];
  loading: boolean;
  error: string | null;
}

const initialState: FireState = {
  data: [],
  filters: [],
  loading: false,
  error: null,
};

export const loadFires = createAsyncThunk(
  "fires/loadFires",
  async (filters: FilterOptions, thunkAPI) => {
    try {
      const apiService = new ApiService();
      const date = filters?.date || "2023-01-01/T00";
      const fireData = await apiService.getFireDataByDate(date);
      const processedFires = fireData.map((fire) => ({
        id: fire.id,
        latitude: fire.y,
        longitude: fire.x,
        reliability: getReliability(fire.sat, fire.conf),
      }));
      return processedFires;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

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
