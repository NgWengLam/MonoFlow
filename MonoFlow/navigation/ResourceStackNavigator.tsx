import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ResourcesScreen from "../screens/resources/ResourceListScreen";
import AddResourceScreen from "../screens/resources/ResourceFormScreen";

const Stack = createStackNavigator();

export default function ResourceStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: "#073257" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center",
      }}>
      <Stack.Screen name="ResourceList" component={ResourcesScreen} />
      <Stack.Screen name="AddResource" component={AddResourceScreen} />
    </Stack.Navigator>
  );
}


