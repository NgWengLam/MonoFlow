import React, {useEffect, useState}from "react";
import { StyleSheet, View, Text, Alert, ScrollView, ActivityIndicator } from "react-native";
import { Card } from "../../components/UI";
import { FloatingAction } from "react-native-floating-action";
import { deleteTask } from "../../services/taskService";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";


export default function TaskViewScreen({ route, navigation }: any) {
    const routeTask = route.params?.task;
    const [task, setTask] = useState<any>(routeTask);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!routeTask?.id) return;

        const ref = doc(db, "tasks", routeTask.id);
        const unsub = onSnapshot(ref, (snap) => {
            if (snap.exists()) {
                setTask({ id: snap.id, ...snap.data() });
            } else {
                navigation.goBack();
            }
            setLoading(false);
        });

        return () => unsub(); // Cleanup listener on unmount
    }, [routeTask?.id]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading...</Text>
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Card style={styles.displayCard}>
                    {/* Status Header */}
                    <View style={styles.header}>
                        <View style={[
                            styles.statusPill, 
                            { backgroundColor: task.completed ? "#DCFCE7" : "#FFF7ED" }
                        ]}>
                            <View style={[
                                styles.statusDot, 
                                { backgroundColor: task.completed ? "#16A34A" : "#EA580C" }
                            ]} />
                            <Text style={[
                                styles.statusText, 
                                { color: task.completed ? "#16A34A" : "#EA580C" }
                            ]}>
                                {task.completed ? "Completed" : "Pending Action"}
                            </Text>
                        </View>
                    </View>

                    {/* Task Title */}
                    <Text style={styles.titleText}>{task.title}</Text>

                    {/* Detail Rows */}
                    <View style={styles.divider} />
                    
                    <View style={styles.infoSection}>
                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons name="calendar-clock" size={20} color="#64748B" />
                            <View style={styles.infoTextGroup}>
                                <Text style={styles.infoLabel}>DUE DATE</Text>
                                <Text style={styles.infoValue}>{task.date}</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons name="information-outline" size={20} color="#64748B" />
                            <View style={styles.infoTextGroup}>
                                <Text style={styles.infoLabel}>CURRENT STATUS</Text>
                                <Text style={styles.infoValue}>
                                    {task.completed ? "Task is finished" : "In progress"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Card>
            </ScrollView>

            {/*FAB */}
            <View style={styles.fabContainer}>
                <FloatingAction
                    actions={actions}
                    color="#073257" 
                    distanceToEdge={{ vertical: 30, horizontal: 20 }}
                    onPressItem={(name) => {
                        if (name === "edit") {
                            navigation.navigate("TaskForm", { task });
                        }
                        if (name === "delete") {
                            Alert.alert("Delete Task", "This action cannot be undone.", [
                                { text: "Cancel", style: "cancel" },
                                { 
                                    text: "Delete", 
                                    style: "destructive", 
                                    onPress: async () => {
                                        await deleteTask(task.id);
                                        navigation.goBack();
                                    }
                                }
                            ]);
                        }
                    }}
                />
            </View>
        </View>
    );
}

const actions = [
    { 
        text: "Edit Task", 
        name: "edit", 
        icon: require("../../assets/icons/edit_icon.png"), 
        color: "#2563EB", 
        position: 1 
    },
    { 
        text: "Delete", 
        name: "delete", 
        icon: require("../../assets/icons/delete_icon.jpg"), 
        color: "#EF4444", 
        position: 2 
    }
];

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#F8FAFC" 
    },
    scrollContent: { 
        padding: 16 
    },
    displayCard: { 
        padding: 24, 
        borderRadius: 24, 
        backgroundColor: "#FFFFFF",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 10,
    },
    header: { 
        flexDirection: 'row', 
        marginBottom: 16 
    },
    statusPill: { 
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12, 
        paddingVertical: 6, 
        borderRadius: 20, // Pill shape
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    statusText: { 
        fontSize: 12, 
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    titleText: { 
        fontSize: 26, 
        fontWeight: '800', 
        color: '#1E293B', 
        lineHeight: 34,
        marginBottom: 20 
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginBottom: 24,
    },
    infoSection: {
        gap: 20,
    },
    infoRow: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    infoTextGroup: {
        marginLeft: 14,
    },
    infoLabel: { 
        fontSize: 11, 
        fontWeight: '700',
        color: '#94A3B8', 
        letterSpacing: 1,
        marginBottom: 2
    },
    infoValue: { 
        fontSize: 16, 
        fontWeight: '600', 
        color: '#334155' 
    },
    fabContainer: { 
        position: "absolute", 
        bottom: 0, 
        right: 0 
    }
});