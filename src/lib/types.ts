import { Dayjs } from "dayjs";

export interface Fire {
  id: string;
  date: string;
  latitude: number;
  longitude: number;
  reliability: string | number;
  satellite: string;
}

export interface FireData {
  cat: string;
  conf: number;
  date: string;
  id: string;
  sat: string;
  x: number;
  y: number;
}

export interface FireDataResponse {
  data: {
    getPublicWildfireByDate: {
      nextToken: null;
      items: FireData[];
    };
  };
}

export interface FilterChangeFunction {
  (filters: { satellite: string; date: string | Dayjs }): void;
}

export interface FilterOptions {
  date: Dayjs;
  satellite: string;
}

export interface GOESCategory {
  [key: number]: string;
}

export interface VIIRSCategory {
  [key: number]: string;
}

export interface FilterOptions {
  date: Dayjs;
  satellite: string;
}
