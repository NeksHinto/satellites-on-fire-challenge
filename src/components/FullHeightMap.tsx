import React, { useEffect } from "react";
import { LatLngTuple } from "leaflet";
import { useSelector, useDispatch } from "react-redux";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import { loadFires } from "../slices/firesSlice";
import { AppDispatch, RootState } from "../state/store";

export interface Fire {
  id: string;
  latitude: number;
  longitude: number;
  reliability: string | number;
}

export const FullHeightMap: React.FC<{}> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fires = useSelector((state: RootState) => state.fires);
  const filters = useSelector((state: RootState) => state.filters);
  const error = useSelector((state: RootState) => state.errors);
  const position: LatLngTuple = [41.881832, -87.623177];
  const zoom = 2;

  const getMarkerColor = (reliability: number) => {
    if (reliability >= 0.8) {
      return "darkred";
    } else if (reliability >= 0.5) {
      return "red";
    } else {
      return "yellow";
    }
  };

  useEffect(() => {
    dispatch(
      loadFires({
        date: "",
        satellite: "",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadFires(filters));
  }, [dispatch, filters]);

  if (error?.message) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {fires.loading ? (
        <p>Loading fires...</p>
      ) : error?.message ? (
        <p>Error: {error.message}</p>
      ) : (
        <MapContainer center={position} zoom={zoom} style={{ height: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {fires.data.map((fire) => (
            <Marker key={fire.id} position={[fire.latitude, fire.longitude]}>
              <Popup>Reliability: {fire.reliability}</Popup>
              <CircleMarker
                center={[fire.latitude, fire.longitude]}
                radius={5}
                color={getMarkerColor(+fire.reliability)}
              />
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default FullHeightMap;
