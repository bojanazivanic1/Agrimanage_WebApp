import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.error("Error while saving token:", error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Error while getting token:", error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Error while removing token:", error);
  }
};

export const isAuthenticated = async () => {
  try {
    const token = await getToken("token");
    return !!token;
  } catch (error) {
    console.error("Error while checking authentication status:", error);
    return false;
  }
};
