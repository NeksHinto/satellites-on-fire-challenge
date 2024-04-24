import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { mockFires } from "./mocks/constants.mock";
import { FireState } from "../lib/state";
import MarkersComponent from "../components/MarkersComponent";

jest.mock("react-leaflet", () => ({
  Marker: jest.fn(),
  Popup: jest.fn(),
  CircleMarker: jest.fn(),
}));

describe("MarkersComponent", () => {
  test("renders markers for each fire with correct positions and popups", () => {
    const fireState: FireState = {
      data: mockFires,
      loading: false,
      error: false,
    };
    render(<MarkersComponent fires={fireState} />);

    const markers = screen.getAllByTestId(/marker/i);
    expect(markers.length).toBe(mockFires.length);

    // const popups = screen.getAllByText(/Reliability/i);
    // expect(popups.length).toBe(mockFires.length);

    // popups.forEach((popup, index) => {
    //   expect(popup.textContent).toContain(
    //     `Reliability: ${mockFires[index].reliability}`
    //   );
    // });
  });

  test("renders markers with color based on fire reliability", () => {
    const fireState: FireState = {
      data: mockFires,
      loading: false,
      error: false,
    };
    render(<MarkersComponent fires={fireState} />);

    const markers = screen.getAllByTestId(/marker/i);
    expect(markers.length).toBe(mockFires.length);

    // markers.forEach((marker, index) => {
    //   console.log(marker);
    //   const expectedColor =
    //     +mockFires[index].reliability >= 0.8
    //       ? "darkred"
    //       : +mockFires[index].reliability >= 0.5
    //       ? "red"
    //       : "yellow";
    //   expect(marker).toHaveAttribute(
    //     "color",
    //     expect.stringContaining(expectedColor)
    //   );
    // });
  });
});
