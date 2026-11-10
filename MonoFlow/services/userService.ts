import { db, auth } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getUserProfile = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return snap.data();
    } else {
      // create default profile
      const defaultData = {
        email: user.email,
        name: "",
        major: "",
        year: ""
      };

      await setDoc(ref, defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
};

export const updateUserProfile = async (data: any) => {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    const ref = doc(db, "users", user.uid);

    await setDoc(ref, data, { merge: true });
    return true;
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    return false;
  }
};

