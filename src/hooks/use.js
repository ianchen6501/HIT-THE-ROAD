import { useState } from 'react'
import { setAuthTokenToLocalStorage } from '../utils'
import { useHistory } from 'react-router-dom'
import { getAuthToken, getUserData } from '../redux/reducers/userReducer'
import { useDispatch } from 'react-redux'

export default function useHandleLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrormessage] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    setErrormessage(null) 
    event.preventDefault()
    if(!username || !password){
      return setErrormessage('請輸入相關資訊')
    }
    dispatch(getAuthToken({username, password}))
    .then(response => {
      if(response.ok !== 1) {
        setErrormessage(response.message)
      }
      setAuthTokenToLocalStorage(response.token)
      dispatch(getUserData(response.token))
      .then(result => {
        if(result){
          return setErrormessage(result.toString())
        }
        history.push('/')
      })
    })
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
    setErrormessage,
    handleLogin
  }
}