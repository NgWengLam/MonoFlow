import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";

export const getResources = async () => {
  try {
    const snapshot = await getDocs(collection(db, "resources"));

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Failed to get resources:", error);
    return [];
  }
};

export const addResource = async (title: string, link: string) => {
  try {
    const user = auth.currentUser;

    if (!user) return;

    await addDoc(collection(db, "resources"), {
      title,
      link,
      userId: user.uid,
      createdAt: new Date()
    });
  } catch (error) {
    console.error("Failed to add resource:", error);
  }
};

