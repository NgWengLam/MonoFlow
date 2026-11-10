import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, Image, ScrollView } from "react-native";
import { registerUser } from "../../services/authService";
import { InputWithLabel, AppButton, Card } from "../../components/UI";

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    
    registerUser(email, password)
      .then(() => {
        Alert.alert("Success", "Account created successfully");
      })
      .catch((error) => {
        Alert.alert("Registration failed", error.message);
      });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image 
          source={require("../../assets/logo.png")} 
          style={styles.logo} 
        />
        <Text style={styles.headerSubtitle}>Join MonoFlow Today</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <Card style={styles.registerCard}>
          <Text style={styles.title}>Create Account</Text>
          
          <InputWithLabel
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="example@mail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <InputWithLabel
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="At least 6 characters"
            secureTextEntry
          />

          <InputWithLabel
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Re-enter password"
            secureTextEntry
          />

          <View style={{ marginTop: 10 }}>
            <AppButton
              title="Sign Up"
              theme="success"
              onPress={handleRegister}
              fullWidth
            />
          </View>
        </Card>

        <Text 
          style={styles.footerText}
          onPress={() => navigation.navigate("Login")}
        >
          Already have an account? <Text style={styles.linkText}>Login</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", 
  },
  header: {
    height: 280,
    backgroundColor: "#073257", 
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingBottom: 40,
  },
  logo: {
    width: 120,
    height: 80,
    resizeMode: "contain",
  },
  headerSubtitle: {
    color: "#94A3B8",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: -50, // Overlap effect
  },
  registerCard: {
    padding: 20,
    borderRadius: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 20,
  },
  footerText: {
    color: "#64748B",
    marginTop: 25,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 30,
  },
  linkText: {
    color: "#2563EB",
    fontWeight: "700",
  },
});