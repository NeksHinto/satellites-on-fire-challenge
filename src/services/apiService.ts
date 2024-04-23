import axios from "axios";
import { Fire, FireDataResponse } from "../lib/types";
import { getReliability } from "../lib/getReliability";

export class ApiService {
  private baseUrl = "//localhost:3000/api";

  async getFireDataByDate(date: Date | string, time: string): Promise<Fire[]> {
    const url = `${this.baseUrl}/${date}/T${time}.json`;
    const fireData = await axios.get<FireDataResponse>(url);
    const processedFires = fireData.data.data.getPublicWildfireByDate.items.map((fire) => ({
      id: fire.id,
      latitude: fire.y,
      longitude: fire.x,
      reliability: getReliability(fire.sat, fire.conf),
      satellite: fire.sat,
    }));
    return processedFires;
  }
}
