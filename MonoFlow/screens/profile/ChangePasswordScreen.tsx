import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { Card, InputWithLabel, AppButton } from "../../components/UI";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ChangePasswordScreen({ navigation }: any) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert("Security", "New password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            const user = auth.currentUser;
            if (!user || !user.email) throw new Error("User session not found");

            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);

            Alert.alert("Success", "Your security credentials have been updated", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error: any) {
            Alert.alert("Security Error", error.message || "Failed to update password");
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
                <Card style={styles.mainCard}>
                    {/* Icon  */}
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="shield-refresh" size={42} color="#073257" />
                    </View>

                    <Text style={styles.titleText}>Update Password</Text>
                    <Text style={styles.subtitleText}>Ensure your account stays secure with a strong password</Text>

                    <View style={styles.formSection}>
                        <InputWithLabel
                            label="Current Password"
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            secureTextEntry
                            placeholder="••••••••"
                        />

                        <InputWithLabel
                            label="New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                            placeholder="Min. 6 characters"
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <AppButton
                            title={loading ? "Securing Account..." : "Confirm Update"}
                            theme="primary"
                            onPress={handleChangePassword}
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
    mainCard: { 
        padding: 32, 
        borderRadius: 28, 
        backgroundColor: "#FFFFFF",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 15,
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 16
    },
    titleText: { 
        fontSize: 22, 
        fontWeight: "800", 
        color: "#1E293B", 
        textAlign: "center",
        marginBottom: 8
    },
    subtitleText: { 
        fontSize: 14, 
        color: "#64748B", 
        textAlign: "center", 
        lineHeight: 20,
        marginBottom: 32 
    },
    formSection: {
        width: '100%',
        marginBottom: 8
    },
    buttonContainer: { 
        marginTop: 12,
        width: '100%'
    }
});