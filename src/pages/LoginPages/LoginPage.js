import React, { useState, useEffect } from 'react'
import { getAuthToken, handleFBLogin } from '../../redux/reducers/usersReducer'
import { useDispatch } from 'react-redux'
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
  const [FBLoginErrormessage, setFBLoingErrorMessage] = useState("")
  const dispatch = useDispatch()

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
      dispatch(getAuthToken({username, password}))
      .then(res => {
        console.log(res)
        if(res.ok === true) {
          setAuthTokenToLocalStorage(res.id)
        }
      })
    }
  }

  const handleOnClickFBLogin = () => {
    const errorMessage = "there is no FB acount yet. Please register a acound."
    FBstartApp().then(res => 
      dispatch(handleFBLogin(res.FBUserData))
      .then(result => {
        console.log(result)
        if(result.ok) {
          setAuthTokenToLocalStorage(result.id)
        } else {
          setFBLoingErrorMessage(errorMessage)
        }
      })
    )
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
      </FormContainer>
    </Wrapper>
  )
}