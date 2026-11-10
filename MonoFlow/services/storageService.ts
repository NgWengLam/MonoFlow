import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "monoflow_user";

export const saveUser = async (uid: string) => {
  try {
    await AsyncStorage.setItem(USER_KEY, uid);
  } catch (error) {
    console.error('Failed to save user:', error);
  }
};

export const getUser = async () => {
  try {
    return await AsyncStorage.getItem(USER_KEY);
  } catch (error) {
    console.error('Failed to get user:', error);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Failed to remove user:', error);
  }
};

