import { Fire } from "../components/FullHeightMap";

export interface FireState {
  id: string;
  latitude: number;
  longitude: number;
  reliability: string | number;
}

export interface ErrorState {
  message: string | null;
}

export interface AppState {
  fires: Fire[];
  error: ErrorState;
}
