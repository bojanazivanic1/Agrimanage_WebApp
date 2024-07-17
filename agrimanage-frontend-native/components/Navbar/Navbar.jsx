import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Fontisto, Entypo } from "@expo/vector-icons";

import Login from "../Login/Login";
import Register from "../Register/Register";
import ConfirmEmail from "../Register/ConfirmEmail";
import Dashboard from "../Dashboard/Dashboard";
import ParcelList from "../Parcels/ParcelList";
import ParcelDetails from "../Parcels/ParcelDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddParcel from "../Parcels/AddParcel";
import { AuthContext } from "../../context/AuthContext";
import AddOperation from "../Parcels/AddOperation";
import UpdateParcel from "../Parcels/UpdateParcel";
import { Text, TouchableOpacity } from "react-native";
//import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const ParcelsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabGroup = () => {
  const { onLogout } = useContext(AuthContext);

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarStyle: { backgroundColor: "#333" },
        headerRight: () => (
          <TouchableOpacity onPress={onLogout}>
            <Text style={{ color: "white", marginRight: 15 }}>Logout</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerStyle: { backgroundColor: "#333" },
          tabBarIcon: () => (
            <Fontisto name="nav-icon-grid" size={24} color="gray" />
          ),
          title: "Operations",
        }}
      />
      <Tab.Screen
        name="Parcels"
        component={ParcelsGroup}
        options={{
          headerShown: false,
          tabBarIcon: () => <Fontisto name="nav-icon" size={24} color="gray" />,
        }}
      />
      <Tab.Screen
        name="Add Parcel"
        component={AddParcel}
        options={{
          headerStyle: { backgroundColor: "#333" },
          tabBarIcon: () => (
            <Entypo name="add-to-list" size={24} color="gray" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const ParcelsGroup = () => {
  return (
    <ParcelsStack.Navigator
      initialRouteName="ParcelList"
      screenOptions={{
        tabBarStyle: { backgroundColor: "#333" },
      }}
    >
      <ParcelsStack.Screen
        name="ParcelList"
        component={ParcelList}
        options={{
          headerStyle: { backgroundColor: "#333" },
        }}
      />
      <ParcelsStack.Screen
        options={{
          presentation: "modal",
          headerStyle: { backgroundColor: "#333" },
        }}
        name="ParcelDetails"
        component={ParcelDetails}
      />
      <ParcelsStack.Screen
        options={{
          presentation: "modal",
          headerStyle: { backgroundColor: "#333" },
        }}
        name="UpdateParcel"
        component={UpdateParcel}
      />
      <ParcelsStack.Screen
        options={{
          presentation: "modal",
          headerStyle: { backgroundColor: "#333" },
        }}
        name="AddOperation"
        component={AddOperation}
      />
    </ParcelsStack.Navigator>
  );
};

const AuthGroup = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
        unmountOnBlur={true}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: "#333" },
        }}
      />
      <Stack.Screen
        name="ConfirmEmail"
        component={ConfirmEmail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Navbar = () => {
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigation.navigate("Dashboard");
    }
  }, [token]);

  return <>{!!token ? <TabGroup /> : <AuthGroup />}</>;
};

export default Navbar;
