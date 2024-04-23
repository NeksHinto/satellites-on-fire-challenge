import { GOESCategory, VIIRSCategory } from "./types";

export const satellites: string[] = [
  "VIIRS Suomi NPP",
  "VIIRS NOAA-20",
  "MODIS Aqua",
  "MODIS Terra",
  "noaa-goes16",
  "noaa-goes17",
];

//Categorías para el noaa-goes16 y noaa-goes17 (mismas categorías para ambos satélites):
export const GOESCategories: GOESCategory = {
  10: "Procesado",
  30: "Procesado",
  11: "Saturado",
  31: "Saturado",
  12: "Contaminado por nubes",
  32: "Contaminado por nubes",
  13: "Probabilidad alta",
  33: "Probabilidad alta",
  14: "Probabilidad media",
  34: "Probabilidad media",
  15: "Probabilidad baja",
  35: "Probabilidad baja",
};

// Categorías para el VIRRS Suomi NPP y VIIRS NOAA-20
export const VIIRSCategories: VIIRSCategory = {
  20: "Probabilidad baja",
  50: "Probabilidad media",
  90: "Probabilidad alta",
};
