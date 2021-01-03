import { createSlice } from "@reduxjs/toolkit";

import { getScheduleContent, saveMarkersAPI } from "../../webAPI";

export const mapMarksReducer = createSlice({
  name: "mapMark",
  initialState: {
    markLocations: [],
    isMarkDeleted: false,
    origin: "",
    destination: "",
    directionSteps: null,
    originId: null,
    isMarkerSaved: false,
  },
  reducers: {
    setIsMarkerSaved: (state, action) => {
      state.isMarkerSaved = action.payload;
    },
    setMarker: (state, action) => {
      state.markLocations = action.payload;
    },
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
  setMarker,
  setMarkLocations,
  deleteMapMarkByPlaceId,
  setIsMarkDeleted,
  setOrigin,
  setOriginId,
  setDestination,
  setDirectionSteps,
  deleteMarkLocation,
  setIsMarkerSaved,
} = mapMarksReducer.actions;

// thunk async logic
export const initMarkers = (userId, scheduleId) => (dispatch) => {
  getScheduleContent(userId, scheduleId).then((res) => {
    res.markers === null
      ? dispatch(setMarker([]))
      : dispatch(setMarker(res.markers));
  });
};

export const saveMarkers = (markers, userId, scheduleId) => (dispatch) => {
  saveMarkersAPI(markers, userId, scheduleId).then((res) => {
    if (res.ok === true) {
      dispatch(setIsMarkerSaved(true));
    } else {
      dispatch(setIsMarkerSaved(false));
    }
  });
};

export default mapMarksReducer.reducer;
