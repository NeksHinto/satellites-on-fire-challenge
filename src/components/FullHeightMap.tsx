import React, { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer } from "react-leaflet";
import { loadFires } from "../slices/firesSlice";
import { AppDispatch, RootState } from "../state/store";
import MarkersComponent from "./MarkersComponent";
import Filters from "./Filters";
import { FilterState } from "../lib/state";
import dayjs from "dayjs";

export const FullHeightMap: React.FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fires = useSelector((state: RootState) => state.fires);
  const filters = useSelector((state: RootState) => state.filters);
  const error = useSelector((state: RootState) => state.errors);
  const [serializableFilter, setSerializableFilter] = useState({
    date: dayjs(),
    satellite: "",
  });
  const position: LatLngTuple = [41.881832, -87.623177];
  const zoom = 2;

  useEffect(() => {
    handleFilterChange(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = (filters: FilterState) => {
    dispatch(loadFires(filters));
    setSerializableFilter({
      date: dayjs(filters.date),
      satellite: filters.satellite,
    });
  };

  if (error?.message) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="full-screen-map">
      <MapContainer center={position} zoom={zoom} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!fires.loading && <MarkersComponent fires={fires} />}
        <Filters
          onFilterChange={handleFilterChange}
          filters={serializableFilter}
        />
      </MapContainer>
    </div>
  );
};

export default FullHeightMap;
