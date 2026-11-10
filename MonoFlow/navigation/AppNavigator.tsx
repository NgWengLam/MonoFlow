import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import TaskListScreen from "../screens/tasks/TaskListScreen";
import { NavigationContainer } from "@react-navigation/native";
import TaskFormScreen from "../screens/tasks/TaskFormScreen";
import TaskStackNavigator from "./TaskStackNavigator";
import DrawerNavigator from "./DrawerNavigator";

export default function AppNavigator() {
  return (
    <DrawerNavigator />
  );
}