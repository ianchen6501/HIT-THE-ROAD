import { createSlice } from '@reduxjs/toolkit';
import { Result } from 'antd';

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
  const userData = {
    ok: true,
    id: 3,
    username: null,
    password: null,
    nickname: null,
    email: null,
    FBName: null,
    FBId: null,
    FBEmail: null,
    token: "34567"
  }
  //這邊要修正為真實串 API
  if(loginData.username === 'hittheroad' && loginData.password === 'hittheroad') {
    const response = {
      ok: true,
      id: 11
    }
    setAuthTokenResponse(response)
    dispatch(setIsLoading(false))
    dispatch(setUserData(userData))
    return new Promise(resolve => {
      resolve(response)
    })
  } else {
    const response = {
      ok: false,
      message: "wrong logindata"
    }
    setAuthTokenResponse(response)
    dispatch(setIsLoading(false))
    return new Promise(resolve => {
      resolve(response)
    })
  }
}

// export const handleRegister = (registerData) => (dispatch) => {
//   dispatch(setIsLoading(true))

//   //webAPI
//   const json = JSON.stringify(registerData)
//   fetch('http://localhost:5003/register', {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json'
//     },
//     body: json
//   })
//   .then(result => {return result.json()})
//   .then(json => {
//     console.log(json)
//     return json
//   })
// }

// export const handleFBRegister =(FBregisterData) => (dispatch) => {
//   console.log(FBregisterData)
//   const userData = {
//     ok: true,
//     id: 2,
//     username: null,
//     password: null,
//     nickname: null,
//     email: null,
//     FBName: FBregisterData.name,
//     FBId: FBregisterData.id,
//     FBEmail: FBregisterData.email,
//     token: "34567"
//   }
//   dispatch(setIsLoading(true))
//   //這邊要修正為真實串 API
//   //1. 確認是否註冊FB
//   //2. 註冊並回傳 response
//   //3. 回前端處理 login
//   dispatch(setIsLoading(false))
//   dispatch(setUserData(userData))
//   return new Promise(resolve => resolve(userData))
//   //缺錯誤處理
// }

export const handleFBLogin = (FBresponse) => (dispatch) => {
  console.log(FBresponse)
  const userData = {
    ok: true,
    id: 1,
    username: null,
    password: null,
    nickname: null,
    email: null,
    FBName: null,
    FBId: null,
    FBEmail: null,
    token: "34567"
  }
  dispatch(setIsLoading(true))
  // 拿資料庫資料，這邊先用假資料確認傳進來資料
  if(FBresponse.id === 3 && FBresponse.name === "ian" && FBresponse.email === "aaa") {
    const response = {
      ok: true,
      id: 12
    }
    dispatch(setUserData(userData))
    return new Promise(resolve => resolve(response))
  } else {
    const response = {
      ok: false
    }
    return new Promise(resolve => resolve(response))
  }


}

export const handleSetUserData = (id) => (dispatch) => {
  const userData = {
    ok: true,
    id: id,
    username: null,
    password: null,
    nickname: null,
    email: null,
    FBName: null,
    FBId: null,
    FBEmail: null,
    token: "34567"
  }
  // 去資料庫拿資料並存入 userData state，這邊先假存 id
  dispatch(setUserData(userData))
}

export default usersReducer.reducer; 