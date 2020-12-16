import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    authTokenResponse: null,
    userData: null,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setAuthTokenResponse: (state, action) => {
      state.authTokenResponse = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    }
  },
});

export const { 
  setIsLoading,
  setAuthTokenResponse,
  setUserData
} = userReducer.actions;

export const getAuthToken = (loginData) => (dispatch) => {
  dispatch(setIsLoading(true))
  //這邊要修正為真實串 API
  if(loginData.username === 'hittheroad' && loginData.password === 'hittheroad') {
    const response = {
      ok: true,
      token: "12345"
    }
    setAuthTokenResponse(response)
    dispatch(setIsLoading(false))
    return response
  } else {
    const response = {
      ok: false,
      message: "wrong logindata"
    }
    setAuthTokenResponse(response)
    dispatch(setIsLoading(false))
    return response
  }
}

export const handleRegister = (registerData) => (dispatch) => {
  dispatch(setIsLoading(true))
  //這邊要修正為真實串 API 確認是否註冊
  const response = {
    ok: true,
    username: registerData.username,
    password: registerData.password,
    nickname: registerData.nickname,
    token: "23456"
  }
  dispatch(setIsLoading(false))
  return response
  //缺錯誤處理
}

export default userReducer.reducer; 