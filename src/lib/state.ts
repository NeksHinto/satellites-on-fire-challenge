import { FilterOptions, Fire } from "./types";

export interface FireState {
  data: Fire[];
  filters: FilterOptions[];
  loading: boolean;
  error: string | null;
}

export interface FilterState {
  date: string;
  satellite: string;
}

export interface ErrorState {
  message: string | null;
}

export interface AppState {
  fires: Fire[];
  error: ErrorState;
}
