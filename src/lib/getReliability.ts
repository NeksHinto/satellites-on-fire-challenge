import { GOESCategories, VIIRSCategories } from "./constants";

export const getReliability = (sat: string, conf: number) => {
  switch (sat) {
    case "noaa-goes16":
    case "noaa-goes17":
      return GOESCategories[conf] || "Unknown";
    case "VIIRS Suomi NPP":
    case "VIIRS NOAA-20":
      return VIIRSCategories[conf] || "Unknown";
    case "MODIS Aqua":
    case "MODIS Terra":
      return conf / 100; // Assume conf is a probability from 0 to 100
    default:
      return "Unknown";
  }
};
