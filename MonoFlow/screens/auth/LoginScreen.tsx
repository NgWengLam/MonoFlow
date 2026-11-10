import React, { useState } from "react";
import { View, Text, Alert, Image, ActivityIndicator } from "react-native";
import { loginUser } from "../../services/authService";
import { InputWithLabel, AppButton, Card } from "../../components/UI";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track login state

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await loginUser(email, password);
      // Firebase onAuthStateChanged in RootNavigator will handle the redirect
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      {/* Header Section */}
      <View style={{ 
        height: '35%', 
        backgroundColor: '#073257', 
        justifyContent: 'center', 
        borderBottomLeftRadius: 40, 
        borderBottomRightRadius: 40 
      }}>
        <Image 
          source={require("../../assets/logo.png")} 
          style={{ width: 120, height: 80, alignSelf: "center" }} 
        />
      </View>

      <View style={{ padding: 20, marginTop: -40 }}>
        <Card style={{ padding: 20, borderRadius: 24, elevation: 5 }}>
          <Text style={{ fontSize: 22, fontWeight: "800", color: "#1E293B", marginBottom: 20, textAlign: 'center' }}>
            Welcome Back
          </Text>
          
          <InputWithLabel 
            label="Email" 
            placeholder="you@example.com"
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <InputWithLabel 
            label="Password" 
            placeholder="••••••••"
            secureTextEntry 
            value={password} 
            onChangeText={setPassword} 
          />

          {loading ? (
            <ActivityIndicator size="large" color="#073257" style={{ marginVertical: 20 }} />
          ) : (
            <AppButton 
              title="Sign In" 
              theme="primary" 
              onPress={handleLogin} // calling the function
            />
          )}
        </Card>
        
        <Text 
          style={{ color: "#64748B", marginTop: 25, textAlign: "center", fontWeight: '600' }}
          onPress={() => navigation.navigate("Register")}
        >
          Don't have an account? <Text style={{ color: '#2563EB' }}>Register</Text>
        </Text>
      </View>
    </View>
  );
}