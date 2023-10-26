import React, { forwardRef, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const centerPosition = [45.25472833688446, 19.83317432993583];

const Map = forwardRef(({ coordinates, polygon, onClick }, ref) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView(centerPosition, 15);
    L.tileLayer(import.meta.env.VITE_LINK_API).addTo(map);
    if (polygon) {
      L.polygon(coordinates, { color: "gray" }).addTo(map);
    }

    map.on("click", (e) => {
      onClick(e);
    });

    if (ref) {
      ref.current = map;
    }
  }, [coordinates, ref, polygon]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>;
});

export default Map;
