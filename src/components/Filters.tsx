import React, { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { satellitesOptions } from "../lib/constants";
import { FilterChangeFunction, FilterOptions } from "../lib/types";
import { Dayjs } from "dayjs";

const Filters: React.FC<{
  onFilterChange: FilterChangeFunction;
  filters: FilterOptions;
}> = ({ onFilterChange, filters }) => {
  const [selectedSatellite, setSelectedSatellite] = useState(filters.satellite);
  const [selectedDate, setSelectedDate] = useState(filters.date);

  const handleFiltersChange = () => {
    onFilterChange({ date: selectedDate, satellite: selectedSatellite });
  };

  const handleSatelliteChange = (event: SelectChangeEvent<string>) => {
    setSelectedSatellite(event.target.value);
  };

  const handleDateChange = (newDate: Dayjs) => {
    if (newDate) {
      setSelectedDate(newDate);
    }
  };

  return (
    <Box
      sx={{
        zIndex: 1000,
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "4px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Satellite</InputLabel>
        <Select
          label="Satellite"
          labelId="satellite-select"
          value={selectedSatellite}
          onChange={handleSatelliteChange}
          // native={true} // for testing
          inputProps={{ "data-testid": "satellite-select" }}
        >
          {satellitesOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            format="DD-MM-YYYY HH"
            label="Date and Time"
            ampm={false}
            views={["year", "month", "day", "hours"]}
            onChange={handleDateChange}
            value={selectedDate}
          />
        </LocalizationProvider>
      </FormControl>
      <Button
        variant="contained"
        onClick={() => handleFiltersChange()}
        color="primary"
        sx={{ width: "100%" }}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filters;
