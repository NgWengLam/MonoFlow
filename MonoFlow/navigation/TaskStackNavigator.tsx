import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TaskListScreen from "../screens/tasks/TaskListScreen";
import TaskFormScreen from "../screens/tasks/TaskFormScreen";
import TaskViewScreen from "../screens/tasks/TaskViewScreen";

const Stack = createStackNavigator();

export default function TaskStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: "#073257" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center",
      }}>
      <Stack.Screen name="TaskList" component={TaskListScreen} />
      <Stack.Screen name="TaskForm" component={TaskFormScreen} />
      <Stack.Screen name="TaskView" component={TaskViewScreen} />
    </Stack.Navigator>
  );
}
