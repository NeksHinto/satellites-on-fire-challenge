import {
  render,
  screen,
  fireEvent,
  waitFor,
  RenderOptions,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { loadFires } from "../slices/firesSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import FullHeightMap from "../components/FullHeightMap";
import firesReducer from "../slices/firesSlice";
import filtersReducer from "../slices/filterSlice";
import errorsReducer from "../slices/errorSlice";
import "@testing-library/jest-dom";
import { RootState, store } from "../state/store";
import { PropsWithChildren } from "react";
import { mockedApiService } from "./mocks/apiService.mock";
import { mockFires, mockFilters } from "./mocks/constants.mock";

const initialState = {
  fires: {
    data: mockFires,
    loading: true,
    error: null,
  },
  filters: mockFilters,
  errors: { message: "" },
};

const rootReducer = combineReducers({
  fires: firesReducer,
  filters: filtersReducer,
  errors: errorsReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof setupStore>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

const waitForFiresData = async () => {
  await waitFor(() => expect(store.getState().fires.loading).toBeFalsy());
};

jest.mock("../components/MarkersComponent", () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div data-testId="Markers">Mocked Markers</div>),
  };
});

describe("FullHeightMap component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedApiService.mockClear();
  });

  test("renders map container with initial zoom and position", async () => {
    await waitForFiresData();
    renderWithProviders(<FullHeightMap />, { preloadedState: initialState });

    const mapContainer = screen.getByTestId("MapContainer");
    expect(mapContainer).toBeInTheDocument();

    // const mockedMarkers = screen.getByLabelText("Markers");
    // expect(mockedMarkers).toBeInTheDocument();

    const tileLayer = screen.getByTestId("TileLayer");
    expect(tileLayer).toBeInTheDocument();
  });

  test("loads fires on component mount and filters change", async () => {
    await waitForFiresData();
    renderWithProviders(<FullHeightMap />, { preloadedState: initialState });

    setTimeout(() => {
      expect(loadFires).toHaveBeenCalledTimes(1);
      expect(loadFires).toHaveBeenCalledWith(mockFilters);
    }, 10000);

    const filters = { ...mockFilters, satellite: "NOAA-20" };
    const select = screen.getByRole<HTMLInputElement>("combobox", {
      hidden: true,
    });
    fireEvent.change(select, {
      target: { value: filters.satellite },
    });

    setTimeout(() => {
      expect(loadFires).toHaveBeenCalledTimes(2);
      expect(loadFires).toHaveBeenCalledWith(filters);
    }, 10000);
  });

  test("renders markers for loaded fires", async () => {
    await waitForFiresData();
    renderWithProviders(<FullHeightMap />, { preloadedState: initialState });

    const markers = screen.getByTestId("markers-list");
    expect(markers.textContent).toStrictEqual(
      "Number of Points: " + mockFires.length
    );
  });

  test("simulates user interaction with filters and updates map markers", async () => {
    await waitForFiresData();
    renderWithProviders(<FullHeightMap />, { preloadedState: initialState });

    const mapContainer = screen.getByTestId("MapContainer");

    const select = screen.getByRole<HTMLInputElement>("combobox", {
      hidden: true,
    });
    expect(select).toBeInTheDocument();
    fireEvent.change(select, {
      target: { value: "VIIRS NOAA-20" },
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(mapContainer).toBeInTheDocument();

    // const leafletMarkers = screen.getAllByRole("img", { name: /marker/i });
    // expect(leafletMarkers.length).toBeGreaterThan(0);
  });
});
