import { GOESCategory, VIIRSCategory } from "./types";

export const satellitesOptions = [
  { label: "VIIRS Suomi NPP", value: "viirs-suomi-npp" },
  { label: "VIIRS NOAA-20", value: "viirs-noaa-20" },
  { label: "MODIS Aqua", value: "modis-aqua" },
  { label: "MODIS Terra", value: "modis-terra" },
  { label: "noaa-goes16", value: "noaa-goes16" },
  { label: "noaa-goes17", value: "noaa-goes17" },
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
