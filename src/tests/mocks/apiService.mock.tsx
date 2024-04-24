import { ApiService } from "../../services/apiService";
import { mockFires } from "./constants.mock";

jest.mock("../../services/apiService", () => ({
  ApiService: jest.fn(() => ({
    getFireDataByDate: jest.fn(() => Promise.resolve(mockFires)),
  })),
}));

export const mockedApiService = jest.mocked(ApiService);
