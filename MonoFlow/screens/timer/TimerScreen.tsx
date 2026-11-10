import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, TextInput, Alert, Animated } from "react-native";
import { Card, AppButton } from "../../components/UI";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TimerScreen() {
  const [seconds, setSeconds] = useState(1500);
  const [initialSeconds, setInitialSeconds] = useState(1500);
  const [running, setRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("25");
  
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            Alert.alert("Session Complete", "Great job staying focused!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const applyTime = () => {
    const mins = Number(inputMinutes);
    if (!mins || mins <= 0) {
      Alert.alert("Invalid input", "Please enter a positive number.");
      return;
    }
    const newSeconds = mins * 60;
    setSeconds(newSeconds);
    setInitialSeconds(newSeconds);
    setShowModal(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.mainCard}>
        {/* Header Branding */}
        <View style={styles.header}>
            <MaterialCommunityIcons name="brain" size={24} color="#073257" />
            <Text style={styles.headerText}>DEEP WORK</Text>
        </View>

        {/* Minimalist Clock */}
        <Pressable 
            onPress={() => !running && setShowModal(true)}
            style={styles.clockContainer}
        >
            <Text style={styles.timeDisplay}>{formatTime()}</Text>
            <View style={[styles.statusBadge, { backgroundColor: running ? "#E0F2FE" : "#F1F5F9" }]}>
                <Text style={[styles.statusText, { color: running ? "#0369A1" : "#64748B" }]}>
                    {running ? "FOCUSING" : "TAP TO EDIT"}
                </Text>
            </View>
        </Pressable>

        {/* Action Controls */}
        <View style={styles.footer}>
            <AppButton
                title={running ? "PAUSE" : "START SESSION"}
                theme={running ? "warning" : "primary"}
                onPress={() => setRunning(!running)}
                fullWidth
            />
            
            <Pressable 
                style={styles.resetLink} 
                onPress={() => { setRunning(false); setSeconds(initialSeconds); }}
            >
                <Text style={styles.resetText}>Reset Timer</Text>
            </Pressable>
        </View>
      </Card>

      {/* Settings Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalTitle}>Timer Duration</Text>
            <TextInput
              value={inputMinutes}
              onChangeText={setInputMinutes}
              keyboardType="numeric"
              style={styles.modalInput}
              autoFocus
              maxLength={3}
            />
            <View style={styles.modalButtonRow}>
              <Pressable style={styles.cancelBtn} onPress={() => setShowModal(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.setBtn} onPress={applyTime}>
                <Text style={styles.setBtnText}>Set Time</Text>
              </Pressable>
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: "#F8FAFC", 
    padding: 24,
    justifyContent: "center"
  },
  mainCard: {
    padding: 32,
    borderRadius: 32, 
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    gap: 8
  },
  headerText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#073257",
    letterSpacing: 2
  },
  clockContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  timeDisplay: {
    fontSize: 72, 
    fontWeight: "800",
    color: "#1E293B",
    fontVariant: ['tabular-nums'], // Prevents jumping digits
  },
  statusBadge: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1
  },
  footer: {
    width: '100%',
    alignItems: 'center'
  },
  resetLink: {
    marginTop: 20,
    padding: 10
  },
  resetText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.5)", // Darker overlay for focus
    justifyContent: "center",
    padding: 24
  },
  modalCard: {
    padding: 24,
    borderRadius: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 20,
    textAlign: "center"
  },
  modalInput: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 16,
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: "#073257",
    marginBottom: 24
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  cancelBtn: {
    flex: 1,
    padding: 16,
    alignItems: "center"
  },
  cancelBtnText: {
    color: "#64748B",
    fontWeight: "600"
  },
  setBtn: {
    flex: 1,
    backgroundColor: "#073257",
    padding: 16,
    borderRadius: 12,
    alignItems: "center"
  },
  setBtnText: {
    color: "#FFF",
    fontWeight: "700"
  }
});