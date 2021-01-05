import { createSlice } from "@reduxjs/toolkit";
import {
  deleteScheculeAPI,
  getAllUnfinishedschedulesAPI,
  getAllFinishedschedulesAPI,
  getUserDataAPI,
  ToggleScheduleIsfinishedAPI,
} from "../../webAPI";
import { getAuthTokenFromLocalStorage } from "../../utils";

export const usersReducer = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    authTokenResponse: null,
    userData: null,
    schedules: null,
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
  },
});

export const {
  setIsLoading,
  setAuthTokenResponse,
  setUserData,
  setSchedules,
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
  dispatch(setIsLoading(true));
  const json = JSON.stringify({
    UserId,
  });
  deleteScheculeAPI(id, json)
    .then((json) => {
      console.log(json);
      if (!json.ok) {
        console.log(json.message);
      } else {
        console.log(json.message);
      }
    })
    .catch((error) => {
      console.log(error.toString());
    });
  dispatch(setIsLoading(false));
};

export const ToggleCheckBoxChanged = (
  UserId,
  scheduleId,
  checkedStatus
) => async (dispatch) => {
  const body = {
    UserId,
  };
  await ToggleScheduleIsfinishedAPI(scheduleId, checkedStatus, body).then(
    (json) => {
      console.log(json);
    }
  );
};

export default usersReducer.reducer;
