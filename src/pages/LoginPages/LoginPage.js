import React, { useState, useEffect } from 'react'
import { getAuthToken, handleFBLogin, setUserData } from '../../redux/reducers/usersReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setAuthTokenToLocalStorage, FBstartApp, FBdeleteApp  } from '../../utils'
import { 
  FormContainer,
  UserInput,
  Title,
  UserInputContainer,
  UserButtonBorder,
  UserButtonBackground,
  UserButtonText,
  ErrorMessage
 } from '../../components/UserForm'
import { Wrapper } from '../../components/public'
import { FacebookOutlined } from '@ant-design/icons'
import { Result } from 'antd'

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("")
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()
  const url = "http://3.140.179.67:5003"

  useEffect(() => {
    if(username) {
      setUsernameErrorMessage('')
    }
    if(password) {
      setPasswordErrorMessage('')
    }
  }, [username, password, usernameErrorMessage, passwordErrorMessage])

  const handleOnClickLogin = () => {
    const message = 'this field can not be empty.'

    if(!username) {
      setUsernameErrorMessage(message)
    }
    if(!password) {
      setPasswordErrorMessage(message)
    }
    if(!username || !password) {
      return
    } else {
      const body = {
        username,
        password
      }
      const json = JSON.stringify(body)
      fetch(`${url}/login/common`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: json
      }).then(response => {
        return response.json()
      }).then(json => {
        if(!json.ok) {
          setErrorMessage(json.message)
        } else {
          dispatch(setUserData(json.userData))
          history.push('/')
        }
      })
    }
  }

  const handleOnClickFBLogin = () => {
    FBstartApp().then(res => {
      const body = {
        fbId: res.id,
        fbName: res.name,
        fbEmail: res.email
      }
      const json = JSON.stringify(body)
      fetch(`${url}/login/fb`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: json
      }).then(response => {
        return response.json()
      }).then(json => {
        if(!json.ok) {
          setErrorMessage(json.message)
        } else {
          dispatch(setUserData(json.userData))
          history.push('/')
        }
      })
    })
  }

  return (
    <Wrapper $solidPlate={true}>
      <FormContainer>
        <Title>please sign in</Title>
        <FacebookOutlined onClick={handleOnClickFBLogin} style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          transform: 'scale(1.2)',
          cursor: 'pointer',
        }}/>
          <UserInputContainer>
            <UserInput placeholder={'USERNAME'} onChange={(event) => setUsername(event.target.value)} value={username}></UserInput>
            {usernameErrorMessage && <ErrorMessage>{usernameErrorMessage}</ErrorMessage>}
          </UserInputContainer>
          <UserInputContainer>
            <UserInput placeholder={'PASSWORD'} onChange={(event) => setPassword(event.target.value)} value={password}></UserInput>
            {passwordErrorMessage && <ErrorMessage>{passwordErrorMessage}</ErrorMessage>}
          </UserInputContainer>
        <UserButtonBorder onClick={handleOnClickLogin}>
          <UserButtonText>next</UserButtonText>
          <UserButtonBackground />
        </UserButtonBorder>
        { errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage> }
      </FormContainer>
    </Wrapper>
  )
}