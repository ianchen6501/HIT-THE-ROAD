import { createSlice } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../static/static";

export const usersReducer = createSlice({
  name: "usersSchedules",
  initialState: {
    schedules: null,
    isChangingSchedules: false,
  },
  reducers: {
    setIsChangingSchedules: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsChangingSchedules } = usersReducer.actions;

export const handleLoginByToken = (token) => (dispatch) => {
  const body = { token };

  fetch(`${SERVER_URL}/users`, {
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
};

export default usersReducer.reducer;
