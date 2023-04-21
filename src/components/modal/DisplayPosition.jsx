import { useCallback, useEffect, useState } from "react";

import { ArrowLeft } from "iconsax-react";

function DisplayPosition({ map, setLong, setWidth, setShowModal }) {
  const [position, setPosition] = useState(() => map.getCenter());

  const onClick = useCallback(() => {
    setLong(position.lng.toFixed(4));
    setWidth(position.lat.toFixed(4));
    setShowModal(false);
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return (
    <div className="btn-map-holder">
      <button className="btn-map btn-map-close" onClick={()=>setShowModal(false)}>
        بستن
      </button>
      <button className="btn-map" onClick={onClick}>
        ثبت موقعیت <ArrowLeft size="20" className="me-3" />
      </button>
    </div>
  );
}
export default DisplayPosition;
