import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableNativeFeedback, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { deleteTask, toggleTask } from "../../services/taskService";
import { FloatingAction } from "react-native-floating-action";

export default function TaskListScreen({ navigation }: any) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Listen to tasks for the current user
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(data);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#073257" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks found. Tap + to add one!</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            {/* Navigates to TaskView */}
            <TouchableNativeFeedback 
              onPress={() => navigation.navigate("TaskView", { task: item })}
            >
              <View style={styles.cardContent}>
                <View style={styles.textSection}>
                  <Text style={[
                    styles.taskTitle, 
                    item.completed && styles.completedText
                  ]}>
                    {item.title}
                  </Text>
                  <Text style={styles.taskDate}>{item.date}</Text>
                </View>

                {/* Status Pill Indicator*/}
                <View style={[
                  styles.statusPill, 
                  { backgroundColor: item.completed ? "#DCFCE7" : "#FEF3C7" }
                ]}>
                  <Text style={[
                    styles.statusText, 
                    { color: item.completed ? "#16A34A" : "#D97706" }
                  ]}>
                    {item.completed ? "Done" : "Pending"}
                  </Text>
                </View>
              </View>
            </TouchableNativeFeedback>

            {/*  Specific Actions */}
            <View style={styles.cardFooter}>
              <TouchableNativeFeedback 
                onPress={() => toggleTask(item.id, item.completed)}
              >
                <View style={[
                  styles.actionBtn, 
                  item.completed ? styles.undoBtn : styles.doneBtn
                ]}>
                  <Text style={styles.actionBtnText}>
                    {item.completed ? "Undo" : "Complete"}
                  </Text>
                </View>
              </TouchableNativeFeedback>
              
              <TouchableNativeFeedback 
                onPress={() => {
                  Alert.alert("Delete Task", "Are you sure?", [
                    { text: "Cancel", style: "cancel" },
                    { 
                      text: "Delete", 
                      style: "destructive", 
                      onPress: () => deleteTask(item.id) 
                    }
                  ]);
                }}
              >
                <View style={styles.deleteContainer}>
                  <Text style={styles.deleteLink}>Delete</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        )}
      />
      
      {/* FAB  */}
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          if (name === "bt_add") {
            navigation.navigate("TaskForm");
          }
        }}
        color="#073257" 
        distanceToEdge={{ vertical: 30, horizontal: 20 }}
      />
    </View>
  );
}

const actions = [
  {
    text: "Add New Task",
    icon: require("../../assets/icons/add_icon.png"),
    name: "bt_add",
    position: 1,
    color: "#073257"
  },
];

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: "#F8FAFC" 
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: { 
    padding: 16, 
    paddingBottom: 100 
  },
  taskCard: {
    backgroundColor: "#FFF",
    borderRadius: 20, 
    marginBottom: 16,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  cardContent: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "flex-start" 
  },
  textSection: { 
    flex: 1, 
    marginRight: 10 
  },
  taskTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#1E293B", 
    marginBottom: 4 
  },
  completedText: { 
    textDecorationLine: "line-through", 
    color: "#94A3B8" 
  },
  taskDate: { 
    fontSize: 14, 
    color: "#64748B" 
  },
  statusPill: { 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 12 
  },
  statusText: { 
    fontSize: 11, 
    fontWeight: "800", 
    textTransform: "uppercase" 
  },
  cardFooter: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: 15, 
    borderTopWidth: 1, 
    borderTopColor: "#F1F5F9", 
    paddingTop: 12 
  },
  actionBtn: { 
    paddingHorizontal: 18, 
    paddingVertical: 10, 
    borderRadius: 12 
  },
  doneBtn: { backgroundColor: "#2563EB" },
  undoBtn: { backgroundColor: "#64748B" },
  actionBtnText: { 
    color: "#FFF", 
    fontWeight: "700", 
    fontSize: 13 
  },
  deleteContainer: {
    padding: 8,
  },
  deleteLink: { 
    color: "#EF4444", 
    fontWeight: "700", 
    fontSize: 14 
  },
  emptyContainer: { 
    alignItems: "center", 
    marginTop: 60 
  },
  emptyText: { 
    color: "#94A3B8", 
    fontSize: 16,
    fontWeight: "500"
  }
});