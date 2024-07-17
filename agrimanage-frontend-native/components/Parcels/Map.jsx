import React from "react";
import { Dimensions } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";

const centerPosition = {
  latitude: 45.25472833688446,
  longitude: 19.83317432993583,
};

const Map = ({ coordinates, polygon, onClick }) => {
   const coordinatesFixed = coordinates.map((coord) => ({
     latitude: parseFloat(coord.x),
     longitude: parseFloat(coord.y),
   }));

  //const screenHeight = Dimensions.get('window').height;

  return (
    <MapView
      style={{
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
      initialRegion={{
        ...centerPosition,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      }}
      onPress={onClick}
    >
      {polygon && (
        <Polygon
          coordinates={coordinatesFixed}
          strokeColor="gray"
          strokeWidth={2}
          fillColor="rgba(128, 128, 128, 0.5)"
        />
      )}
    </MapView>
  );
};

export default Map;
