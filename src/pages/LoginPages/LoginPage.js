import React, { useState, useEffect } from 'react'
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
import { Container } from '../../components/public'
import { getAuthToken, setAuthTokenResponse } from '../../redux/reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setAuthTokenToLocalStorage } from '../../utils'



export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("")
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
  const dispatch = useDispatch()

  const handleLogin = () => {
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
      const res = dispatch(getAuthToken({username, password}))
      console.log(res)
      if(res.ok === true) {
        setAuthTokenToLocalStorage(res.token)
      }
    }
  }
  
  useEffect(() => {
    if(username) {
      setUsernameErrorMessage('')
    }
    if(password) {
      setPasswordErrorMessage('')
    }
  }, [username, password, usernameErrorMessage, passwordErrorMessage])

  return (
    <Container $solidPlate={true}>
      <FormContainer>
        <Title>please sign in</Title>
          <UserInputContainer>
            <UserInput placeholder={'USERNAME'} onChange={(event) => setUsername(event.target.value)} value={username}></UserInput>
            {usernameErrorMessage && <ErrorMessage>{usernameErrorMessage}</ErrorMessage>}
          </UserInputContainer>
          <UserInputContainer>
            <UserInput placeholder={'PASSWORD'} onChange={(event) => setPassword(event.target.value)} value={password}></UserInput>
            {passwordErrorMessage && <ErrorMessage>{passwordErrorMessage}</ErrorMessage>}
          </UserInputContainer>
        <UserButtonBorder onClick={() => handleLogin()}>
          <UserButtonText>next</UserButtonText>
          <UserButtonBackground />
        </UserButtonBorder>
      </FormContainer>
    </Container>
  )
}