// src/redux/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loggedIn: false,
  premiumEnabled: false,
  // Location state
  userCity: null,
  userState: null,
  locationLoading: false,
  locationError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loggedIn = true;
    },
    clearUser(state) {
      state.user = null;
      state.loggedIn = false;
    },
    permiumPurchased(state, action) {
      state.premiumEnabled = true;
    },
    setLocationLoading(state) {
      state.locationLoading = true;
      state.locationError = null;
    },
    setUserLocation(state, action) {
      state.userCity = action.payload.city;
      state.userState = action.payload.state;
      state.locationLoading = false;
      state.locationError = null;
    },
    setLocationError(state, action) {
      state.locationError = action.payload;
      state.locationLoading = false;
    },
  },
});

export const {
  setUser,
  clearUser,
  permiumPurchased,
  setLocationLoading,
  setUserLocation,
  setLocationError,
} = userSlice.actions;
export default userSlice.reducer;
