import { FilterState } from "../../lib/state";
import { Fire } from "../../lib/types";

export const mockFires: Fire[] = [
  {
    id: "fire-1",
    date: "2024-04-20",
    latitude: 40.71,
    longitude: -74.0,
    reliability: 0.8,
    satellite: "NOAA-20",
  },
  {
    id: "fire-2",
    date: "2024-04-21",
    latitude: 34.05,
    longitude: -118.24,
    reliability: 0.5,
    satellite: "Terra",
  },
];

export const mockFilters: FilterState = {
  date: "2023-01-01 00",
  satellite: "",
};
