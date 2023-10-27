import { createSlice } from "@reduxjs/toolkit";

const initialParcelsState = {
  parcels: [],
};

const parcelsSlice = createSlice({
  name: "parcels",
  initialState: initialParcelsState,
  reducers: {
    setParcels(state, action) {
      state.parcels = action.payload.map((parcel) => ({
        ...parcel,
        coordinates: convertCoordinates(parcel.coordinates),
      }));
    },
    addParcel(state, action) {
      const newParcel = {
        ...action.payload,
        coordinates: convertCoordinates(action.payload.coordinates),
      };
      state.parcels.push(newParcel);
    },
    removeParcel(state, action) {
      state.parcels = state.parcels.filter((parcel) => parcel.id !== action.payload);
    },
    updateParcel(state, action) {
      const updatedParcel = {
        ...action.payload,
        coordinates: convertCoordinates(action.payload.coordinates),
      };
      const index = state.parcels.findIndex((parcel) => parcel.id === updatedParcel.id);
      if (index !== -1) {
        state.parcels[index] = updatedParcel;
      }
    },
  },
});

export default parcelsSlice;

function convertCoordinates(coordinates) {
  return [
    [coordinates[0].x, coordinates[0].y],
    [coordinates[1].x, coordinates[1].y],
    [coordinates[2].x, coordinates[2].y],
    [coordinates[3].x, coordinates[3].y],
  ];
}
