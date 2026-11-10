import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { saveUser, removeUser } from "./storageService";

export const registerUser = async (email: string, password: string) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('registerUser error:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await saveUser(result.user.uid);
    return result;
  } catch (error) {
    console.error('loginUser error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    await removeUser(); // clear local session
  } catch (error) {
    console.error('logoutUser error:', error);
    throw error;
  }
};