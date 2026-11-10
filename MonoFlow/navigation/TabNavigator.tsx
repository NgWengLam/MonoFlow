import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TaskStackNavigator from "./TaskStackNavigator";
import ResourceStackNavigator from "./ResourceStackNavigator";
import TimerScreen from "../screens/timer/TimerScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const CustomTabButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.8}>
      <View style={styles.centerWrapper}>
        <View style={styles.centerButton}>
          {props.children}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Tasks"
        component={TaskStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={focused ? 35 : 22}
              color={focused ? "#58e5ef" : "#94A3B8"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Timer"
        component={TimerScreen}
        options={{
          headerShown: true,   
          headerTitle: "Focus Timer",
          headerStyle: { backgroundColor: "#073257" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerTitleAlign: "center",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="timer-outline"
              size={28}
              color="#FFFFFF"
            />
          ),
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Resources"
        component={ResourceStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="book-outline"
              size={focused ? 35 : 22}
              color={focused ? "#58e5ef" : "#94A3B8"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
 tabBar: {
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#073257",
    elevation: 10,
    borderTopWidth: 0, 
  },

  centerWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  centerButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: "#6f8ac4",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
    elevation: 6,
  },
});