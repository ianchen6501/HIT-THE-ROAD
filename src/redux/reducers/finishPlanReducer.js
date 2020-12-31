import { createSlice } from "@reduxjs/toolkit";

import { getFinishPlanAPI } from "../../webAPI";

export const finishPlanReducer = createSlice({
  name: "postIt",
  initialState: {
    dailyRoutines: null,
    location: null,
    scheduleName: null,
  },
  reducers: {
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
} = finishPlanReducer.actions;

// thunk async logic
export const getFinishPlan = (userId, scheduleId) => (dispatch) => {
  getFinishPlanAPI(userId, scheduleId).then((res) =>
    // console.log("finishplan: ", res)
    // const {dailyRoutines, location, scheduleName} = res
    dispatch(setDailyRoutines(res.dailyRoutines))
  );
  getFinishPlanAPI(userId, scheduleId).then((res) =>
    dispatch(setScheduleName(res.scheduleName))
  );
  getFinishPlanAPI(userId, scheduleId).then((res) =>
    dispatch(setLocation(res.location))
  );
};

export default finishPlanReducer.reducer;
