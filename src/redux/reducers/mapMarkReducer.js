import { createSlice } from "@reduxjs/toolkit";

export const mapMarksReducer = createSlice({
  name: "mapMark",
  initialState: {
    markLocations: [],
    isMarkDeleted: false,
    origin: "",
    destination: "",
    directionSteps: null,
    originId: null,
  },
  reducers: {
    setMarkLocations: (state, action) => {
      const { name, formattedAddress, lat, lng, placeId } = action.payload;
      state.markLocations.push({
        name,
        formattedAddress,
        lat,
        lng,
        placeId,
      });
    },
    deleteMarkLocation: (state, action) => {
      state.markLocations = state.markLocations.filter(
        (location) => location.placeId !== action.payload
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
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setOriginId: (state, action) => {
      state.originId = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setDirectionSteps: (state, action) => {
      state.directionSteps = action.payload;
    },
  },
});

export const {
  setMarkLocations,
  deleteMapMarkByPlaceId,
  setIsMarkDeleted,
  setOrigin,
  setOriginId,
  setDestination,
  setDirectionSteps,
  deleteMarkLocation,
} = mapMarksReducer.actions;

// thunk async logic
export const setOriginalColumns = () => (dispatch) => {};

export default mapMarksReducer.reducer;
