import "./App.css";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import React from "react";
import { FullHeightMap } from "./components/FullHeightMap";
import L from "leaflet";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const App: React.FC = () => {
  return (
    <div>
      <FullHeightMap />
    </div>
  );
};

export default App;
