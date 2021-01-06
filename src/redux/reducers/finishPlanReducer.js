import { createSlice } from "@reduxjs/toolkit";

import { getFinishPlanAPI } from "../../webAPI";

export const finishPlanReducer = createSlice({
  name: "postIt",
  initialState: {
    dailyRoutines: null,
    location: null,
    scheduleName: null,
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setDailyRoutines: (state, action) => {
      state.dailyRoutines = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setScheduleName: (state, action) => {
      state.scheduleName = action.payload;
    },
  },
});

export const {
  setDailyRoutines,
  setLocation,
  setScheduleName,
  setIsLoading,
} = finishPlanReducer.actions;

export const getFinishPlan = (userId, scheduleId) => (dispatch) => {
  dispatch(setIsLoading(true));
  getFinishPlanAPI(userId, scheduleId).then((res) => {
    dispatch(setDailyRoutines(res.dailyRoutines));
    dispatch(setScheduleName(res.scheduleName));
    dispatch(setLocation(res.location));
    dispatch(setIsLoading(false));
  });
};

export default finishPlanReducer.reducer;
