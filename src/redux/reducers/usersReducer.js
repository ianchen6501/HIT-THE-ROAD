import { createSlice } from "@reduxjs/toolkit";
import {
  deleteScheculeAPI,
  getAllUnfinishedschedulesAPI,
  getAllFinishedschedulesAPI,
  getUserDataAPI,
  toggleScheduleIsfinishedAPI,
  createScheduleAPI,
} from "../../webAPI";
import {
  getAuthTokenFromLocalStorage,
  setAuthTokenFromSessionStorage,
  deleteAuthTokenFromSessionStorage,
} from "../../utils";

export const usersReducer = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    authTokenResponse: null,
    userData: null,
    schedules: null,
    scheduleData: null,
    createErrorMessage: null,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAuthTokenResponse: (state, action) => {
      state.authTokenResponse = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setSchedules: (state, action) => {
      state.schedules = action.payload;
    },
    setScheduleData: (state, action) => {
      state.schedules = action.payload;
    },
    setCreateErrorMessage: (state, action) => {
      state.schedules = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setAuthTokenResponse,
  setUserData,
  setSchedules,
  setScheduleData,
  setCreateErrorMessage,
} = usersReducer.actions;

export const getUnfinishedSchedules = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  getAllUnfinishedschedulesAPI(id).then((json) => {
    dispatch(setSchedules(json));
  });
  dispatch(setIsLoading(false));
};

export const getFinishedSchedules = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  getAllFinishedschedulesAPI(id).then((json) => {
    dispatch(setSchedules(json));
  });
  dispatch(setIsLoading(false));
};

export const checkIsLogin = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  const token = await getAuthTokenFromLocalStorage();
  if (token) {
    const json = JSON.stringify({ token });
    await getUserDataAPI(json).then((json) => {
      dispatch(setUserData(json.userData));
    });
  }
  dispatch(setIsLoading(false));
};

//UserPage 刪除行程
export const deleteSchedule = (id, UserId) => (dispatch) => {
  const json = JSON.stringify({
    UserId,
  });
  return deleteScheculeAPI(id, json);
};

export const ToggleCheckBoxChanged = (
  UserId,
  scheduleId,
  checkedStatus
) => async (dispatch) => {
  const body = {
    UserId,
  };
  await toggleScheduleIsfinishedAPI(scheduleId, checkedStatus, body);
};

export const createSchedule = (
  startDate,
  endDate,
  scheduleName,
  location,
  UserId
) => (dispatch) => {
  function calcDates() {
    const dates = {};
    const range = (endDate - startDate) / 86400000;
    for (let i = 0; i <= range; i++) {
      const date = new Date(startDate)
        .setDate(new Date(startDate).getDate() + i)
        .toString();
      dates[date] = [];
    }
    return dates;
  }

  const dates = calcDates();

  const json = JSON.stringify({
    scheduleName,
    location,
    dateRange: {
      start: startDate,
      end: endDate,
    },
    dailyRoutines: dates,
    UserId,
  });

  return createScheduleAPI(json)
    .then((json) => {
      if (!json.ok) {
        setCreateErrorMessage(json.message);
      } else {
        deleteAuthTokenFromSessionStorage("userId");
        deleteAuthTokenFromSessionStorage("scheduleId");
        setAuthTokenFromSessionStorage("userId", UserId);
        setAuthTokenFromSessionStorage("scheduleId", json.scheduleData.id);
      }
    })
    .catch((error) => {
      setCreateErrorMessage(error.toString());
    });
};

export default usersReducer.reducer;
