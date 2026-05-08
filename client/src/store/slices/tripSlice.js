import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trips: [],
  currentTrip: null,
  loading: false,
  error: null,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    tripRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    tripListSuccess: (state, action) => {
      state.loading = false;
      state.trips = action.payload;
    },
    tripDetailSuccess: (state, action) => {
      state.loading = false;
      state.currentTrip = action.payload;
    },
    tripFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearTripError: (state) => {
        state.error = null;
    }
  },
});

export const { tripRequest, tripListSuccess, tripDetailSuccess, tripFail, clearTripError } = tripSlice.actions;
export default tripSlice.reducer;
