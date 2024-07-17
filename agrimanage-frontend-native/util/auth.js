import jwtDecode from "jwt-decode";
import { getToken } from "../api/storageUtils";

export const getUserId = async () => {
  try {
    const token = await getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    }
  } catch (error) {
    console.error("Error while decoding token.", error);
  }
  return null;
};

export const isAuthenticated = async () => {
  const token = await getToken();
  return !!token;
};

export const getFarmName = async () => {
  try {
    const token = await getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.FarmName;
    }
  } catch (error) {
    console.error("Error while decoding token.", error);
  }
  return null;
};
