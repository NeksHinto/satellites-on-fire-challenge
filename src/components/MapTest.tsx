import React from "react";
import { LatLngTuple } from "leaflet";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";

export interface Fire {
  id: string;
  latitude: number;
  longitude: number;
  reliability: string | number;
}

export const MapTest: React.FC<{}> = () => {
  const position: LatLngTuple = [41.881832, -87.623177];
  const zoom = 2;

  return (
    <MapContainer center={position} zoom={zoom} style={{ height: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker key={1} position={position}>
        <Popup>Reliability: 0.8</Popup>
        <CircleMarker center={position} radius={5} color={"red"} />
      </Marker>
    </MapContainer>
  );
};

export default MapTest;
