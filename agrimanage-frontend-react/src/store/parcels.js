import { createSlice } from "@reduxjs/toolkit";

const initialParcelsState = {
  parcels: [],
};

const parcelsSlice = createSlice({
  name: "parcels",
  initialState: initialParcelsState,
  reducers: {
    setParcels(state, action) {
      state.parcels = action.payload;
    },
    addParcel(state, action) {
      state.parcels.push(action.payload);
    },
    removeParcel(state, action) {
      state.parcels = state.parcels.filter((parcel) => parcel.id !== action.payload);
    },
  },
});

export default parcelsSlice;
