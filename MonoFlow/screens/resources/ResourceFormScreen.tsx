import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { addResource } from "../../services/resourceService";
import { Card, InputWithLabel, AppButton } from "../../components/UI";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddResourceScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !link.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!link.startsWith("http")) {
      Alert.alert("Invalid Link", "Please enter a valid URL starting with https://");
      return;
    }

    try {
      setLoading(true);
      await addResource(title.trim(), link.trim());
      Alert.alert("Success", "Resource saved to your library", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to save resource");
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
            <MaterialCommunityIcons name="link-plus" size={40} color="#073257" />
          </View>

          <Text style={styles.headerTitle}>Add New Resource</Text>
          <Text style={styles.headerSubtitle}>Save helpful links to your study library</Text>
          
          <View style={styles.inputContainer}>
            <InputWithLabel
              label="TITLE"
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. React Native Docs"
            />

            <InputWithLabel
              label="LINK / URL"
              value={link}
              onChangeText={setLink}
              placeholder="https://example.com"
              keyboardType="url"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.buttonWrapper}>
            <AppButton
              title={loading ? "Saving..." : "Save Resource"}
              theme="primary"
              onPress={handleSubmit}
              disabled={loading}
              fullWidth
            />
          </View>
        </Card>
        
        <Text style={styles.helperText}>
          Links will be saved to your shared resource library.
        </Text>
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
  },
  helperText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 20,
    paddingHorizontal: 20,
  }
});