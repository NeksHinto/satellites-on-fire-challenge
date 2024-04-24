interface MapContainerProps {
  children: React.ReactNode;
}

const MapContainer: React.FC<MapContainerProps> = ({ children }) => (
  <div data-testId="MapContainer">{children}</div>
);

const useMap = (): { fitBounds: () => void } => ({
  fitBounds: () => {},
});

const TileLayer = () => <div data-testId="TileLayer" />;

interface MarkerProps {
  children?: React.ReactNode;
}

const MarkersComponent: React.FC<MarkerProps> = () => (
  <div data-testId="Marker"></div>
);

const Popup = () => <div data-testId="Popup" />;

export { MapContainer, TileLayer, MarkersComponent, Popup, useMap };
