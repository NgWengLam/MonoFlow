import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { getUser } from "../services/storageService";
import { ActivityIndicator, View } from "react-native";

export default function RootNavigator() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (loading){
        setLoading(false);
      }
    });

    return unsub;
  }, []);

  useEffect(() => {
    const checkStoredUser = async () => {
      const stored = await getUser();
      console.log("Stored user:", stored);
    };

    checkStoredUser();
  }, []);
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}