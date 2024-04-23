import { createSlice } from "@reduxjs/toolkit";

interface FilterOptions {
  date: Date | string;
  satellite: string;
}

const initialState: FilterOptions = {
  date: "2023-01-01/T00",
  // date: new Date().toISOString().slice(0, 10) + "/T" + new Date().getHours().toString().padStart(2, "0"),
  satellite: "NOAA-19",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setDate: (state, { payload: date }) => {
      state.date = date;
    },
    setSatellite: (state, { payload: satellite }) => {
      state.satellite = satellite;
    },
  },
});

export const { setDate, setSatellite } = filterSlice.actions;

export default filterSlice.reducer;
