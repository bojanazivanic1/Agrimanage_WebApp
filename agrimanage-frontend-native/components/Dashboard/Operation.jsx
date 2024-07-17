import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import UpdateOperation from "./UpdateOperation";
import { FontAwesome } from "@expo/vector-icons";
import { changeStatus, deleteOperation } from "../../services/userService";

const Operation = (props) => {
  const [showUpdate, setShowUpdate] = useState(false);

  const handleChecked = () => {
    changeStatus({
      operationId: props.id,
      parcelId: props.parcelId,
      status: +props.status + 1,
    }).then(() => {
      props.onChange();
    });
  };

  const handleDelete = () => {
    deleteOperation(props.id).then(() => {
      props.onChange();
    });
  };

  const handleUpdate = () => {
    setShowUpdate(true);
  };

  const hideUpdate = () => {
    setShowUpdate(false);
  };

  return (
    <View style={styles.card}>
      {showUpdate && (
        <Modal>
          <UpdateOperation
            id={props.id}
            hideUpdate={hideUpdate}
            onChange={props.onChange}
          />
        </Modal>
      )}
      <View style={styles.cardContent}>
        <TouchableOpacity style={styles.buttonCheck} onPress={handleChecked}>
          <FontAwesome name="check-square-o" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{props.parcelName}</Text>
        <Text style={styles.description}>{props.name}</Text>
        <Text style={styles.description}>{props.description}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    maxWidth: 350,
    borderRadius: 10,
    backgroundColor: "#ccc",
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 2,
  },
  cardContent: {
    padding: 20,
    alignItems: "center",
  },
  buttonCheck: {
    backgroundColor: "#333",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    width: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Operation;
