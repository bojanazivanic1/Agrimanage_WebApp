import React, { useState } from "react";
import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { register } from "../../services/authService";
import { Ionicons } from "@expo/vector-icons";

const Register = ({ navigation }) => {
  const [data, setData] = useState({
    name: "",
    lastName: "",
    email: "",
    address: "",
    dateOfBirth: "",
    farmName: "",
    password: "",
    confirmPassword: "",
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
    const dateOfBirth = data.dateOfBirth.split('/');
    const day = parseInt(dateOfBirth[0]);
    const month = parseInt(dateOfBirth[1]) - 1; 
    const year = parseInt(dateOfBirth[2]);
    const dateOfBirthValue = new Date(year, month, day);
    data.dateOfBirth = dateOfBirthValue.toISOString();

    register(data).then(() => {
      navigation.navigate("ConfirmEmail", { email: data.email });
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(value) => changeHandler("name", value)}
      />
      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(value) => changeHandler("lastName", value)}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(value) => changeHandler("email", value)}
      />
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={(value) => changeHandler("address", value)}
      />
      <Text style={styles.label}>Date Of Birth:</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/YYYY"
        onChangeText={(value) => changeHandler("dateOfBirth", value)}
      />
      <Text style={styles.label}>Farm Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Farm Name"
        onChangeText={(value) => changeHandler("farmName", value)}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(value) => changeHandler("password", value)}
      />
      <Text style={styles.label}>Confirm Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={(value) => changeHandler("confirmPassword", value)}
      />
      <TouchableOpacity style={styles.button} onPress={pressHandler}>
        <Ionicons name="person-add-outline" size={24} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ccc",
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

export default Register;
