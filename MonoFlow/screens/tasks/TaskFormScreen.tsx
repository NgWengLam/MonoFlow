import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { addTask, updateTask } from "../../services/taskService";
import { InputWithLabel, AppButton, DateTimePickerWithLabel, Card } from "../../components/UI";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TaskFormScreen({ navigation, route }: any) {
  const task = route.params?.task;
  const [title, setTitle] = useState(task ? task.title : "");
  const [date, setDate] = useState(task ? new Date(task.date) : new Date());
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a task title");
      return;
    }
    
    try {
      setLoading(true);
      const formattedDate = date.toISOString().split("T")[0];
      
      if (task) {
        await updateTask(task.id, title.trim(), formattedDate);
      } else {
        await addTask(title.trim(), formattedDate);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save task");
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
            <MaterialCommunityIcons 
              name={task ? "clipboard-edit-outline" : "clipboard-plus-outline"} 
              size={40} 
              color="#073257" 
            />
          </View>

          <Text style={styles.headerTitle}>{task ? "Edit Task" : "New Task"}</Text>
          <Text style={styles.headerSubtitle}>
            {task ? "Update your task details" : "Plan your next focus session"}
          </Text>

          <View style={styles.inputContainer}>
            <InputWithLabel
              label="WHAT NEEDS TO BE DONE?"
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Study for Finals"
            />

            <DateTimePickerWithLabel
              label="DUE DATE"
              value={date}
              onChange={(event: any, selectedDate: Date) => {
                if (selectedDate) setDate(selectedDate);
              }}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <AppButton
              title={loading ? "Saving..." : (task ? "Update Task" : "Create Task")}
              theme="primary"
              onPress={handleSubmit}
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