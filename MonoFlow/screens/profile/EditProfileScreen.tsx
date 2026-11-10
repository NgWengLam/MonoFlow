import React, { useState } from "react";
import { View, Text, Alert,  StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { updateUserProfile } from "../../services/userService";
import { Card, InputWithLabel, AppButton } from "../../components/UI";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EditProfileScreen({ route, navigation }: any) {
  const { profile } = route.params;

  const [name, setName] = useState(profile.name || "");
  const [major, setMajor] = useState(profile.major || "");
  const [year, setYear] = useState(profile.year || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !major.trim() || !year.trim()) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      setLoading(true);
      await updateUserProfile({
        name: name.trim(),
        major: major.trim(),
        year: year.trim(),
      });

      Alert.alert("Success", "Profile updated successfully", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.screen} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.formCard}>
          {/* Header Icon */}
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name="account-edit-outline" size={40} color="#073257" />
          </View>

          <Text style={styles.headerTitle}>Edit Profile</Text>
          <Text style={styles.headerSubtitle}>Update your academic details below</Text>

          <View style={styles.inputContainer}>
            <InputWithLabel
              label="FULL NAME"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />

            <InputWithLabel
              label="MAJOR / COURSE"
              value={major}
              onChangeText={setMajor}
              placeholder="e.g. Software Engineering"
            />

            <InputWithLabel
              label="ACADEMIC YEAR"
              value={year}
              onChangeText={setYear}
              placeholder="e.g. Year 3"
            />
          </View>

          <View style={styles.buttonWrapper}>
            <AppButton
              title={loading ? "Saving Changes..." : "Save Changes"}
              theme="primary"
              onPress={handleSave}
              disabled={loading}
              fullWidth
            />
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: "#F8FAFC" 
  },
  scrollContent: { 
    flexGrow: 1, 
    justifyContent: "center", 
    padding: 24 
  },
  formCard: { 
    padding: 32, 
    borderRadius: 28, 
    backgroundColor: "#FFFFFF",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 12
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: "800", 
    color: "#1E293B", 
    textAlign: "center" 
  },
  headerSubtitle: { 
    fontSize: 14, 
    color: "#64748B", 
    textAlign: "center", 
    marginTop: 4,
    marginBottom: 32 
  },
  inputContainer: {
    width: '100%',
  },
  buttonWrapper: { 
    marginTop: 12,
    width: '100%'
  }
});