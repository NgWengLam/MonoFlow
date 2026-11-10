import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableNativeFeedback, Linking, StyleSheet } from "react-native";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ResourceListScreen({ navigation }: any) {
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "resources"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResources(data);
    });
    return () => unsub();
  }, []);

  return (
    <View style={styles.screen}>
      <FlatList
        data={resources}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="book-open-variant" size={60} color="#E2E8F0" />
            <Text style={styles.emptyText}>Your library is empty</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableNativeFeedback onPress={() => Linking.openURL(item.link)}>
            <View style={styles.itemRow}>
              {/* Icon  */}
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="bookmark-outline" size={22} color="#073257" />
              </View>

              <View style={styles.textGroup}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={styles.linkRow}>
                  <MaterialCommunityIcons name="link-variant" size={12} color="#94A3B8" />
                  <Text style={styles.itemLink} numberOfLines={1}>
                    {item.link.replace(/^https?:\/\//, '')}
                  </Text>
                </View>
              </View>

              <MaterialCommunityIcons name="arrow-right" size={18} color="#CBD5E1" />
            </View>
          </TouchableNativeFeedback>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <FloatingAction
        actions={actions}
        color="#073257"
        distanceToEdge={{ vertical: 30, horizontal: 20 }} 
        onPressItem={(name) => {
          if (name === "add") navigation.navigate("AddResource");
        }}
      />
    </View>
  );
}

const actions = [
  {
    text: "Add Resource",
    name: "add",
    icon: require("../../assets/icons/add_icon.png"),
    color: "#073257",
  }
];

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  listContainer: { 
    paddingBottom: 120 
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textGroup: { 
    flex: 1,
    marginRight: 10
  },
  itemTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1E293B', 
    marginBottom: 4 
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLink: { 
    fontSize: 13, 
    color: '#94A3B8',
    marginLeft: 4
  },
  separator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 24,
  },
  emptyState: { 
    marginTop: 100, 
    alignItems: 'center' 
  },
  emptyText: { 
    fontSize: 15, 
    color: '#94A3B8', 
    marginTop: 12,
    fontWeight: '500'
  },
});