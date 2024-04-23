import axios from "axios";

interface FireData {
  cat: string;
  conf: number;
  date: string;
  id: string;
  sat: string;
  x: number;
  y: number;
}

interface FireDataResponse {
  data: {
    getPublicWildfireByDate: {
      nextToken: null;
      items: FireData[];
    };
  };
}

export class ApiService {
  private baseUrl = "//localhost:3000/api";

  async getFireDataByDate(date: Date | string): Promise<FireData[]> {
    const url = `${this.baseUrl}/${date}.json`;
    const response = await axios.get<FireDataResponse>(url);
    return response.data.data.getPublicWildfireByDate.items;
  }
}
