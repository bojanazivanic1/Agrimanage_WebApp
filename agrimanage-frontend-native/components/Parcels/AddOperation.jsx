import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { addOperation } from "../../services/userService";
import { useNavigation } from "@react-navigation/native";

const AddOperation = ({ navigation, route }) => {
  const { parcelId } = route.params;
  const nav = useNavigation();
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const changeHandler = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const addHandler = () => {
    for (let field in data) {
      if (data[field] === "") {
        ToastAndroid.showWithGravity(
          "All fields must be filled.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
        return;
      }
      data[field] = data[field].trim();
    }

    addOperation({ ...data, parcelId: parcelId }).then(nav.goBack());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Operation</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(value) => changeHandler("name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={(value) => changeHandler("description", value)}
      />
      <TouchableOpacity style={styles.button} onPress={addHandler}>
        <AntDesign name="addfile" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    width: 250,
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
  registerContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  registerText: {
    fontSize: 16,
    color: "#ccc",
  },
  registerLink: {
    color: "#d84312",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default AddOperation;
