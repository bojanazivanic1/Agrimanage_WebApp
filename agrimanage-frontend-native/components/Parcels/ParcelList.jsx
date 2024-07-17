import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getParcels } from "../../services/userService";

const ParcelList = () => {
  const { navigate } = useNavigation();
  const [parcels, setParcels] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getParcels().then((res) => {
      setParcels(res);
    });
    setRefreshing(false);
  };

  const handleParcelClick = (parcel) => {
    navigate("ParcelDetails", { parcel: parcel, onChange: onRefresh });
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {parcels &&
        parcels.map((parcel) => (
          <Pressable
            style={styles.card}
            key={parcel.name}
            onPress={() => handleParcelClick(parcel)}
          >
            <View style={styles.parcelContainer}>
              <Text style={styles.parcelName}>{parcel.name}</Text>
              <Text style={styles.parcelDetails}>
                Parcel Number: {parcel.parcelNumber}
              </Text>
              <Text style={styles.parcelDetails}>Size: {parcel.size} ha</Text>
            </View>
          </Pressable>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#333",
  },
  card: {
    maxWidth: 700,
    padding: 10,
    margin: 10,
  },
  parcelContainer: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  parcelName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  parcelDetails: {
    fontSize: 14,
  },
});

export default ParcelList;
