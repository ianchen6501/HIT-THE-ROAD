import { createSlice } from "@reduxjs/toolkit";

export const mapMarksReducer = createSlice({
  name: "mapMark",
  initialState: {
    markLocations: [],
    isMarkDeleted: false,
  },
  reducers: {
    // (state, action) => new state
    setMapMarks: (state, action) => {
      const { name, formattedAddress, lat, lng, placeId } = action.payload;
      state.markLocations.push({ name, formattedAddress, lat, lng, placeId });
    },
    deleteMapMarkByLatLng: (state, action) => {
      const { lat, lng } = action.payload;
      state.markLocations = state.markLocations.filter(
        (location) => location.lat !== lat && location.lng !== lng
      );
    },
    deleteMapMarkByPlaceId: (state, action) => {
      state.markLocations = state.markLocations.filter(
        (location) => location.placeId !== action.payload
      );
    },
    setIsMarkDeleted: (state, action) => {
      state.isMarkDeleted = action.payload;
    },
  },
});

export const {
  setMapMarks,
  deleteMapMarkByLatLng,
  deleteMapMarkByPlaceId,
  setIsMarkDeleted,
} = mapMarksReducer.actions;

// thunk async logic
export const setOriginalColumns = () => (dispatch) => {};

export default mapMarksReducer.reducer;
