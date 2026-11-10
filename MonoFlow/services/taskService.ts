import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";

const TASK_COLLECTION = "tasks";

// CREATE
export const addTask = async (title: string, date: string) => {
  try {
    const user = auth.currentUser;

    if (!user) return;

    await addDoc(collection(db, TASK_COLLECTION), {
      title,
      date,
      completed: false,
      userId: user.uid,
      createdAt: new Date()
    });
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};

// READ (ONLY current user's tasks)
export const getTasks = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(
      collection(db, TASK_COLLECTION),
      where("userId", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Failed to get tasks:", error);
    return [];
  }
};

// DELETE
export const deleteTask = async (id: string) => {
  try {
    await deleteDoc(doc(db, TASK_COLLECTION, id));
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
};

// UPDATE (toggle complete)
export const toggleTask = async (id: string, current: boolean) => {
  try {
    await updateDoc(doc(db, TASK_COLLECTION, id), {
      completed: !current
    });
  } catch (error) {
    console.error("Failed to toggle task:", error);
  }
};

export const updateTask = async (id: string, title: string, date: string) => {
  try {
    await updateDoc(doc(db, TASK_COLLECTION, id), {
      title,
      date,
    });
  } catch (error) {
    console.error("Failed to update task:", error);
  }
};

