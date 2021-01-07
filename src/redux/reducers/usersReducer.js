import { createSlice } from "@reduxjs/toolkit";
import {
  deleteScheculeAPI,
  getAllUnfinishedschedulesAPI,
  getAllFinishedschedulesAPI,
  getUserDataAPI,
  toggleScheduleIsfinishedAPI,
  createScheduleAPI,
  registerAPI,
  FbRegisterAPI,
  loginAPI,
  FbLoginAPI,
} from "../../webAPI";
import {
  getAuthTokenFromLocalStorage,
  setAuthTokenFromSessionStorage,
  deleteAuthTokenFromSessionStorage,
  setAuthTokenToLocalStorage,
  FBstartApp,
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
    registerErrorMessage: null,
    loginErrorMessage: null,
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
      state.scheduleData = action.payload;
    },
    setCreateErrorMessage: (state, action) => {
      state.createErrorMessage = action.payload;
    },
    setRegisterErrorMessage: (state, action) => {
      state.registerErrorMessage = action.payload;
    },
    setLoginErrorMessage: (state, action) => {
      state.loginErrorMessage = action.payload;
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
  setRegisterErrorMessage,
  setLoginErrorMessage,
} = usersReducer.actions;

export const registerUser = (username, password, nickname, email) => (
  dispatch
) => {
  const json = JSON.stringify({ username, password, nickname, email });
  return registerAPI(json)
    .then((json) => {
      if (!json.ok) {
        dispatch(setRegisterErrorMessage(json.message));
        return { ok: false };
      } else {
        setAuthTokenToLocalStorage(json.token);
        dispatch(setUserData(json.userData));
        return { ok: true };
      }
    })
    .catch((error) => {
      dispatch(setRegisterErrorMessage(error.toString()));
    });
};

export const FbRegisterUser = () => async (dispatch) => {
  const errorMessage = "請確認並根據指示登入fb";
  const fbResponse = [];
  await FBstartApp().then((res) => {
    fbResponse.push(res);
  });

  if (!fbResponse[0].ok) {
    return dispatch(setRegisterErrorMessage(errorMessage));
  } else {
    const { id, name, email } = fbResponse[0].FBUserData;
    const json = JSON.stringify({
      fbId: id,
      fbName: name,
      fbEmail: email,
    });
    return FbRegisterAPI(json)
      .then((json) => {
        if (!json.ok) {
          dispatch(setRegisterErrorMessage(json.message));
          return { ok: false };
        } else {
          setAuthTokenToLocalStorage(json.token);
          dispatch(setUserData(json.userData));
          return { ok: true };
        }
      })
      .catch((error) => {
        dispatch(setRegisterErrorMessage(error.toString()));
      });
  }
};

export const login = (username, password) => (dispatch) => {
  const body = {
    username,
    password,
  };
  const json = JSON.stringify(body);
  return loginAPI(json).then((json) => {
    if (!json.ok) {
      dispatch(setLoginErrorMessage(json.message));
      return { ok: false };
    } else {
      setAuthTokenToLocalStorage(json.token);
      dispatch(setUserData(json.userData));
      return { ok: true };
    }
  });
};

export const FbLogin = () => async (dispatch) => {
  const fbResponse = [];
  await FBstartApp().then((res) => {
    fbResponse.push(res);
  });
  if (!fbResponse[0].ok) {
    dispatch(setLoginErrorMessage(fbResponse[0].message));
    return new Promise((resolve) => {
      resolve({ ok: false });
    });
  }
  const body = {
    fbId: fbResponse[0].FBUserData.id,
    fbName: fbResponse[0].FBUserData.name,
    fbEmail: fbResponse[0].FBUserData.email,
  };
  const json = JSON.stringify(body);
  return FbLoginAPI(json).then((json) => {
    if (!json.ok) {
      dispatch(setLoginErrorMessage(json.message));
      return { ok: false };
    } else {
      setAuthTokenToLocalStorage(json.token);
      dispatch(setUserData(json.userData));
      return { ok: true };
    }
  });
};

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
