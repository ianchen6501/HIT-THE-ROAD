import { createSlice } from '@reduxjs/toolkit';

export const usersReducer = createSlice({
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
} = usersReducer.actions;

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
  //這邊要修正為真實串 API
  //1. 確認是否註冊
  //2. 註冊並回傳 response
  //3. 回前端處理 login
  const response = {
    ok: true,
    id: 1,
    username: registerData.username,
    password: registerData.password,
    nickname: registerData.nickname,
    email: registerData.email,
    FBName: null,
    FBId: null,
    FBEmail: null,
    token: "23456"
  }
  dispatch(setIsLoading(false))
  return response
  //缺錯誤處理
}

export const handleFBRegister =(FBregisterData) => (dispatch) => {
  if(!FBregisterData) {
    return
  }
  dispatch(setIsLoading(true))
  //這邊要修正為真實串 API
  //1. 確認是否註冊FB
  //2. 註冊並回傳 response
  //3. 回前端處理 login
  dispatch(setIsLoading(false))
  return new Promise (resolve => resolve({
    ok: true,
    id: 2,
    username: null,
    password: null,
    nickname: null,
    email: null,
    FBName: FBregisterData.name,
    FBId: FBregisterData.id,
    FBEmail: FBregisterData.email,
    token: "34567",
  }))
  //缺錯誤處理
}

export default usersReducer.reducer; 