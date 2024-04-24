import { GOESCategories } from "./constants";

export const getReliability = (sat: string, conf: number) => {
  switch (sat) {
    case "noaa-goes16":
    case "noaa-goes17":
      const category = GOESCategories[conf];
      if (category === "Procesado" || category === "Saturado") {
        return 1;
      } else if (category === "Contaminado por nubes") {
        return 0.1;
      } else if (category === "Probabilidad alta") {
        return 0.7;
      } else if (category === "Probabilidad media") {
        return 0.4;
      } else if (category === "Probabilidad baja") {
        return 0.2;
      } else {
        return 0;
      }
    case "VIIRS Suomi NPP":
    case "VIIRS NOAA-20":
      return conf / 100;
    case "MODIS Aqua":
    case "MODIS Terra":
      return conf / 100;
    default:
      return 0;
  }
};
