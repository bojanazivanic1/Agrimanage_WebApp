import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Map from "./Map";
import { getParcel, updateParcel } from "../../services/userService";

var temp = -1;

const UpdateParcel = ({ route, navigation }) => {
  const { parcelId } = route.params;
  const [data, setData] = useState({
    name: "",
    parcelNumber: "",
    coordinates: [
      { x: "", y: "" },
      { x: "", y: "" },
      { x: "", y: "" },
      { x: "", y: "" },
    ],
  });

  useEffect(() => {
    getParcel(parcelId).then((parcel) => {
        if (parcel) {
          setData({
            name: parcel.name,
            parcelNumber: parcel.parcelNumber,
            coordinates: parcel.coordinates,
          });
        }
      });
  }, []);

  const handleChange = (name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCoordinatesChange = (index, property, value) => {
    const newParcelData = { ...data };

    if (property === "x") {
      newParcelData.coordinates[index].x = value;
    } else if (property === "y") {
      newParcelData.coordinates[index].y = value;
    }

    setData(newParcelData);
  };

  const handleMapClick = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    setData((prevInputs) => {
        const updatedCoordinates = [...prevInputs.coordinates];
  
        if (temp < updatedCoordinates.length) {
          updatedCoordinates[temp] = { x: latitude, y: longitude };
        }
  
        let nextIndex = temp;
        while (
          nextIndex < updatedCoordinates.length &&
          updatedCoordinates[nextIndex].x !== ""
        ) {
          nextIndex++;
        }
  
        temp = nextIndex;
  
        return {
          ...prevInputs,
          coordinates: updatedCoordinates,
        };
      });    
  };

  const resetCoordinates = () => {
    setData((prevData) => ({
      ...prevData,
      coordinates: [
        { x: "", y: "" },
        { x: "", y: "" },
        { x: "", y: "" },
        { x: "", y: "" },
      ],
    }));

    temp = 0;
  };

  const updateHandler = () => {
    const coordinates = data.coordinates.map((coord) => ({
        x: parseFloat(coord.x),
        y: parseFloat(coord.y),
      }));
  
      const parcelData = {
        id: parcelId,
        name: data.name,
        parcelNumber: parseInt(data.parcelNumber, 10),
        coordinates,
      };
  
      updateParcel(parcelData).then(() => {
        navigation.navigate("ParcelDetails", {parcel: parcelData});
        params.onChange();
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={data.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <Text style={styles.label}>Parcel Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Parcel Number"
        value={data.parcelNumber.toString()}
        onChangeText={(text) => handleChange("parcelNumber", text)}
      />
      {data.coordinates.map((coordinate, index) => (
        <View key={index} style={styles.coordinateRow}>
          <View style={styles.coordinateInput}>
            <Text style={styles.label}>{`X ${index + 1}`}</Text>
            <TextInput
              style={styles.inputCoordinates}
              placeholder={`X ${index + 1}`}
              value={coordinate.x.toString()}
              onChangeText={(text) => handleCoordinatesChange(index, "x", text)}
            />
          </View>
          <View style={styles.coordinateInput}>
            <Text style={styles.label}>{`Y ${index + 1}`}</Text>
            <TextInput
              style={styles.inputCoordinates}
              placeholder={`Y ${index + 1}`}
              value={coordinate.y.toString()}
              onChangeText={(text) => handleCoordinatesChange(index, "y", text)}
            />
          </View>
        </View>
      ))}
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity style={styles.button} onPress={resetCoordinates}>
          <Text style={styles.buttonText}>RESET COORDINATES</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <Map
          coordinates={data.coordinates}
          //polygon={true}
          onClick={handleMapClick}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={updateHandler}>
        <Text style={styles.buttonText}>UPDATE PARCEL</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 12,
    marginBottom: 10,
    width: 250,
    height: 50,
    borderRadius: 5,
    backgroundColor: "white",
  },
  inputCoordinates: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 12,
    height: 40,
    borderRadius: 5,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#d84312",
    padding: 15,
    borderRadius: 5,
    width: 250,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  mapContainer: {
    width: "100%",
    height: 400,
    margin: 20,
  },
  coordinateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coordinateInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default UpdateParcel;
