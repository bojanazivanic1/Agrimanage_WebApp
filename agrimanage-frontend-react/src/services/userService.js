import api from "../api/api";
import { handleError } from "../util/utils";

export const addParcel = async (data) => {
  try {
    await api.post("user/add-parcel", data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const deleteParcel = async (data) => {
  try {
    await api.delete("user/delete-parcel/" + data);
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const updateParcel = async (data) => {
  try {
    await api.put("user/update-parcel", data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const updateOperation = async (data) => {
  try {
    await api.put("user/update-operation", data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const addOperation = async (data) => {
  try {
    await api.post("user/add-operation", data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const deleteOperation = async (data) => {
  try {
    await api.delete("user/delete-operation/" + data);
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const changeStatus = async (data) => {
  try {
    await api.put("user/change-status", data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const getOperationsOwner = async () => {
  try {
    const res = await api.get("user/get-operations-owner");
    return res.data;
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const getParcel = async (data) => {
  try {
    const res = await api.get("user/get-parcel/" + data);
    return res.data;
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const getParcels = async () => {
  try {
    const res = await api.get("user/get-parcels");
    return res.data;
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const getParcelOperations = async (data) => {
  try {
    const res = await api.get("user/get-parcel-operations/" + data);
    return res.data;
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};

export const getOperation = async (data) => {
  try {
    const res = await api.get("user/get-operation/" + data);
    return res.data;
  } catch (e) {
    handleError(e);
    return Promise.reject(e);
  }
};
