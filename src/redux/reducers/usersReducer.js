import { createSlice } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../static/static";
import { getAll } from "../../webAPI";
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
  getAll(`${SERVER_URL}/schedules/${id}?isFinished=0`).then((json) => {
    dispatch(setSchedules(json));
  });
};

export const getFinishedSchedules = (id) => (dispatch) => {
  getAll(`${SERVER_URL}/schedules/${id}?isFinished=1`).then((json) => {
    dispatch(setSchedules(json));
  });
};

export const checkIsLogin = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  const token = await getAuthTokenFromLocalStorage();
  if (token) {
    const body = { token };
    await fetch(`${SERVER_URL}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(setUserData(json.userData));
      });
  }
  dispatch(setIsLoading(false));
};

export default usersReducer.reducer;
