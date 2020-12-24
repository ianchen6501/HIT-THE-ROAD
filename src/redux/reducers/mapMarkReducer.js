import { createSlice } from "@reduxjs/toolkit";

export const mapMarksReducer = createSlice({
  name: "mapMark",
  initialState: {
    markLocations: [],
  },
  reducers: {
    // (state, action) => new state
    setMapMarks: (state, action) => {
      const {
        name,
        formattedAddress,
        lat,
        lng,
        currentPlaceId: placeId,
      } = action.payload;
      state.markLocations.push({ name, formattedAddress, lat, lng, placeId });
    },
    deleteMapMark: (state, action) => {
      state.markLocations.filter(
        (location) => Number(location.placeId) !== Number(action.payload)
      );
    },
  },
});

export const { setMapMarks, deleteMapMark } = mapMarksReducer.actions;

// thunk async logic
export const setOriginalColumns = () => (dispatch) => {};

export default mapMarksReducer.reducer;
