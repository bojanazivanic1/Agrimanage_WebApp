import OperationList from "./OperationList";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      initialRouteName="Planned"
      screenOptions={{
        tabBarStyle: { backgroundColor: "#333" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Planned"
        options={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#333" },
        }}
      >
        {() => <OperationList status="0" />}
      </Tab.Screen>
      <Tab.Screen
        name="InProgress"
        options={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#333" },
        }}
      >
        {() => <OperationList status="1" />}
      </Tab.Screen>
      <Tab.Screen
        name="Completed"
        options={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#333" },
        }}
      >
        {() => <OperationList status="2" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};


export default Dashboard;
