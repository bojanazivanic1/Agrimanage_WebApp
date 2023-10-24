import { MapContainer, Polygon, TileLayer } from "react-leaflet";

const centerPosition = [45.25472833688446, 19.83317432993583];

const Map = ({coordinates}) => {

  return (   
      <MapContainer center={centerPosition} zoom={35} scrollWheelZoom={true} >
        <TileLayer url={import.meta.env.VITE_LINK_API} />
       <Polygon positions={coordinates} color="blue" />
      </MapContainer>   
  );
};

export default Map;
