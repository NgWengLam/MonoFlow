import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { Card } from "../../components/UI";
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileScreen({ navigation }: any) {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const ref = doc(db, "users", user.uid);
        const unsub = onSnapshot(ref, async (snap) => {
            if (snap.exists()) {
                setProfile(snap.data());
            } else {
                const defaultData = {
                    email: user.email,
                    name: "",
                    major: "",
                    year: ""
                };
                await setDoc(ref, defaultData);
                setProfile(defaultData);
            }
        });

        return () => unsub();
    }, []);

    if (!profile) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#073257" />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* 1. Header Avatar Section */}
                <Card style={styles.headerCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {profile.name ? profile.name.charAt(0).toUpperCase() : profile.email.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <Text style={styles.userName}>{profile.name || "Student Name"}</Text>
                    <Text style={styles.userEmail}>{profile.email}</Text>
                </Card>

                {/* 2. Academic Info Section */}
                <Text style={styles.sectionLabel}>ACADEMIC PROFILE</Text>
                <Card style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="book-education-outline" size={24} color="#64748B" />
                        <View style={styles.textGroup}>
                            <Text style={styles.label}>MAJOR</Text>
                            <Text style={styles.value}>{profile.major || "Not set"}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="calendar-check-outline" size={24} color="#64748B" />
                        <View style={styles.textGroup}>
                            <Text style={styles.label}>ACADEMIC YEAR</Text>
                            <Text style={styles.value}>{profile.year || "Not set"}</Text>
                        </View>
                    </View>
                </Card>
            </ScrollView>

            {/* FAB*/}
            <FloatingAction
                actions={actions}
                color="#073257"
                distanceToEdge={{ vertical: 30, horizontal: 20 }}
                onPressItem={(name) => {
                    if (name === "edit") {
                        navigation.navigate("EditProfile", { profile });
                    } else if (name === "change_password") {
                        navigation.navigate("ChangePassword");
                    }
                }}
            />
        </View>
    );
}

const actions = [
    {
        text: "Edit Profile",
        name: "edit",
        icon: require("../../assets/icons/edit_icon.png"),
        color: "#073257",
        position: 1
    },
    {
        text: "Change Password",
        name: "change_password",
        icon: require("../../assets/icons/password_icon.png"),
        color: "#073257",
        position: 2
    }
];

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F8FAFC', 
    },
    scrollContent: {
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headerCard: {
        alignItems: 'center',
        padding: 30,
        borderRadius: 24,
        marginBottom: 20,
        elevation: 2,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#073257',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '800',
    },
    userName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1E293B',
    },
    userEmail: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 4,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 1,
        marginLeft: 4,
        marginBottom: 10,
    },
    infoCard: {
        padding: 20,
        borderRadius: 24,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    textGroup: {
        marginLeft: 15,
    },
    label: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
        letterSpacing: 0.5,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 10,
        marginLeft: 40,
    },
});