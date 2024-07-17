import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Map from "./Map";
import { deleteParcel } from "../../services/userService";

const ParcelDetails = () => {
  const { params } = useRoute();
  const navigation = useNavigation();

  const updateHandle = () => {
    navigation.navigate("UpdateParcel", { parcelId: params.parcel.id, onChange: params.onChange });
  };

  const addOperationHandler = () => {
    navigation.navigate("AddOperation", { parcelId: params.parcel.id });
  };

  const deleteHandler = () => {
    deleteParcel(params.parcel.id).then(()=>{
      navigation.navigate("ParcelList");
      params.onChange();
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>{params.parcel.name}</Text>
        <Text style={styles.text}>Number: {params.parcel.parcelNumber}</Text>
        <Text style={styles.text}>Size: {params.parcel.size} ha</Text>

        <View style={styles.mapContainer}>
          {params.parcel.coordinates ? (
            <Map
              coordinates={params.parcel.coordinates}
              polygon={true}
              onClick={() => {}}
            />
          ) : (
            <Text style={styles.loadingText}>Loading coordinates...</Text>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={updateHandle}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={addOperationHandler}>
          <Text style={styles.buttonText}>Add Operation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteHandler}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
  },
  card: {
    maxWidth: 700,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ccc",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    color: "#ccc",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#d84312",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  mapContainer: {
    width: "100%",
    height: 400,
    marginVertical: 10,
  },
  loadingText: {
    fontSize: 16,
    color: "#ccc",
  },
});

export default ParcelDetails;
