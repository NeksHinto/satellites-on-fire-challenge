import { render, fireEvent, screen } from "@testing-library/react";
import { FilterChangeFunction, FilterOptions } from "../lib/types";
import dayjs from "dayjs";
import Filters from "../components/Filters";
import "@testing-library/jest-dom";

jest.mock("../lib/constants", () => ({
  satellitesOptions: [
    { value: "NOAA-19", label: "NOAA-19" },
    { value: "NOAA-20", label: "NOAA-20" },
  ],
}));

describe("Filters component", () => {
  let mockOnFilterChange: FilterChangeFunction;

  beforeEach(() => {
    mockOnFilterChange = jest.fn();
  });

  test("renders filters with initial state and calls onFilterChange on button click", () => {
    const initialFilters: FilterOptions = {
      date: dayjs("2024-04-24"),
      satellite: "NOAA-19",
    };

    render(
      <Filters onFilterChange={mockOnFilterChange} filters={initialFilters} />
    );

    expect(screen.getByText(/NOAA-19/i)).toBeInTheDocument();

    const datePicker = screen.getByRole<HTMLInputElement>("textbox", {
      name: /Date and Time/i,
    });
    expect(datePicker.value).toBe(initialFilters.date.format("DD-MM-YYYY HH"));

    const applyButton = screen.getByRole("button", { name: /apply filters/i });
    fireEvent.click(applyButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      date: initialFilters.date,
      satellite: "NOAA-19",
    });
  });

  test("updates selected satellite on select change and calls onFilterChange", () => {
    render(
      <Filters
        onFilterChange={mockOnFilterChange}
        filters={{ date: dayjs(), satellite: "" }}
      />
    );

    const select = screen.getByRole<HTMLInputElement>("combobox", {
      hidden: true,
    });
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "NOAA-20" } });

    expect(screen.getByText(/NOAA-20/i)).toBeInTheDocument();

    const applyButton = screen.getByRole("button", { name: /apply filters/i });
    fireEvent.click(applyButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      date: expect.any(Date),
      satellite: "NOAA-20",
    });
  });

  test("updates selected date on date picker change and calls onFilterChange", () => {
    const newDate = dayjs();

    render(
      <Filters
        onFilterChange={mockOnFilterChange}
        filters={{ date: dayjs(), satellite: "" }}
      />
    );

    const datePicker = screen.getByRole<HTMLInputElement>("textbox", {
      name: /Date and Time/i,
    });

    fireEvent.change(datePicker, {
      target: { value: newDate.format("DD-MM-YYYY HH") },
    });

    const applyButton = screen.getByRole("button", { name: /apply filters/i });
    fireEvent.click(applyButton);

    expect(datePicker.value).toBe(newDate.format("DD-MM-YYYY HH"));
    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      date: newDate,
      satellite: "",
    });
  });
});
