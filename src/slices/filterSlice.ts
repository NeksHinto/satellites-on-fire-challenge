import { createSlice } from "@reduxjs/toolkit";
import { FilterState } from "../lib/state";
import dayjs from "dayjs";

const initialState: FilterState = {
  date: dayjs("01-01-2023").format(),
  satellite: "",
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
