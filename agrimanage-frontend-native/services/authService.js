import api from "../api/api";
import { setToken } from "../util/storageUtils";
import { handleError } from "../util/handle-errors";

export const register = async (data) => {
  try {
    await api.post("auth/register", data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const confirmEmail = async (data) => {
  try {
    const res = await api.post("auth/confirm-email", data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const login = async (data) => {
  try {
    const res = await api.post("auth/login", data, {
      headers: { "Content-Type": "application/json" },
    });
    await setToken(res.data);
    return res.data;
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};
