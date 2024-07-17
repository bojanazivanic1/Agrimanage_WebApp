import React, { useState } from "react";
import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { confirmEmail } from "../../services/authService";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ConfirmEmail = ({ navigation, route }) => {
  const { email } = route.params;

  const [data, setData] = useState({
    code: "",
  });

  const changeHandler = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const pressHandler = () => {
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

    confirmEmail({ code: data.code, email: email }).then(() => {
      navigation.navigate("Login");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Code"
        onChangeText={(value) => changeHandler("code", value)}
      />
      <TouchableOpacity style={styles.button} onPress={pressHandler}>
        <MaterialCommunityIcons name="email-check" size={24} color="black" />
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
});

export default ConfirmEmail;
