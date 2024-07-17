import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getOperation, updateOperation } from "../../services/userService";

const UpdateOperation = (props) => {
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    getOperation(props.id).then((res) => {
      setData(res);
    });
  }, []);

  const updateHandler = () => {
    updateOperation({ ...data, id: props.id }).then((res) => {
      props.onChange();
      props.hideUpdate();
    });
  };

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Operation</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={data.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={data.description}
        onChangeText={(text) => handleChange("description", text)}
      />
      <TouchableOpacity style={styles.button} onPress={updateHandler}>
        <Text style={styles.buttonText}>Update</Text>
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

export default UpdateOperation;
