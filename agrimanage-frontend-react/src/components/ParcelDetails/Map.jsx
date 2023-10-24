import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet';

const centerPosition = [45.25472833688446, 19.83317432993583];

const Map = ({ coordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView(centerPosition, 13);
    L.tileLayer(import.meta.env.VITE_LINK_API).addTo(map);
    L.polygon(coordinates, { color: 'blue' }).addTo(map);
  }, [coordinates]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default Map;
