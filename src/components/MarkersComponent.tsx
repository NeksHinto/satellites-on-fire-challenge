import React from "react";
import { Marker, Popup, CircleMarker } from "react-leaflet";
import { FireState } from "../lib/state";

export const MarkersComponent: React.FC<{ fires: FireState }> = ({ fires }) => {

  const getMarkerColor = (reliability: number) => {
    if (reliability >= 0.8) {
      return "darkred";
    } else if (reliability >= 0.5) {
      return "red";
    } else {
      return "yellow";
    }
  };

  const renderMarkers = (fires: FireState) => {
    return fires?.data?.map((fire) => (
      <Marker key={fire.id} position={[fire.latitude, fire.longitude]}>
        <Popup>Reliability: {fire.reliability}</Popup>
        <CircleMarker
          center={[fire.latitude, fire.longitude]}
          radius={5}
          color={getMarkerColor(+fire.reliability)}
        />
      </Marker>
    ));
  };

  return (
    <>
      {renderMarkers(fires)}
    </>
  );
};

export default MarkersComponent;
