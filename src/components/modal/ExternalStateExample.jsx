import { MapContainer, TileLayer } from "react-leaflet";
import { useMemo, useState } from "react";

import DisplayPosition from "./DisplayPosition";

const center = [51.505, -0.09];
const zoom = 13;
function ExternalStateExample({ setWidth, setLong,setShowModal }) {
  const [map, setMap] = useState(null);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    []
  );

  return (
    <div>
      {map ? (
        <DisplayPosition map={map} setWidth={setWidth} setLong={setLong} setShowModal={setShowModal} />
      ) : null}
      {displayMap}
    </div>
  );
}
export default ExternalStateExample;
