import { configureStore } from "@reduxjs/toolkit";
import parcelsSlice from "./parcels";

const store = configureStore({
  reducer: { parcels: parcelsSlice.reducer }
});

export default store;
