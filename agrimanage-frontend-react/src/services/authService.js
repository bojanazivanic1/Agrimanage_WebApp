import api from "../api/api";
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
    localStorage.setItem("token", res.data);
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const resetPassword = async (data) => {
  try {
    await api.post("auth/password-reset", data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const confirmPassword = async (data) => {
  try {
    await api.post("auth/password-confirm", data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
