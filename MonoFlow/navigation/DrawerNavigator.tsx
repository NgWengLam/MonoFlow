import React from "react";
import { Text, View, TouchableNativeFeedback, Alert, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import { logoutUser } from "../services/authService";
import { auth } from "../firebase/firebaseConfig";
import ProfileNavigator from "./ProfileNavigator";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const user = auth.currentUser;

  return (
    <View style={styles.drawerContainer}>
      {/*  Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </Text>
        </View>
        <Text style={styles.emailText}>
          {user?.email || "User"}
        </Text>
      </View>

      {/* Navigation Items */}
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        <DrawerItemList 
          {...props} 
          activeTintColor="#073257" 
          inactiveTintColor="#64748B"
          labelStyle={styles.drawerLabel}
        />
      </DrawerContentScrollView>

      {/* Logout */}
      <View style={styles.footer}>
        <TouchableNativeFeedback
          onPress={() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              { text: "Cancel", style: "cancel" },
              { text: "Logout", style: "destructive", onPress: logoutUser }
            ]);
          }}
        >
          <View style={styles.footerItem}>
            <MaterialCommunityIcons name="logout" size={20} color="#DC2626" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: { 
    flex: 1, 
    backgroundColor: "#FFFFFF"
  },
  header: {
    height: 200,
    backgroundColor: "#073257", 
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 24, 
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  avatarText: {
    color: "white",
    fontSize: 28,
    fontWeight: "800",
  },
  emailText: {
    color: "#E2E8F0",
    fontSize: 14,
    fontWeight: "600",
  },
  scrollContent: {
    paddingTop: 10,
  },
  drawerLabel: {
    fontWeight: "700",
    fontSize: 15,
    marginLeft: -10, 
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingBottom: 20,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginLeft: 10,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#DC2626",
    marginLeft: 15,
  },
});

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { 
            backgroundColor: "#FFFFFF", 
            elevation: 0, 
            shadowOpacity: 0 
        },
        headerTintColor: "#073257",
        headerTitleStyle: { fontWeight: "800", fontSize: 18 },        
        headerTitle: "MonoFlow", // Brand consistency
        drawerType: "slide",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen 
        name="Home" 
        component={TabNavigator} 
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-variant" size={22} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileNavigator} 
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" size={22} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}