import React, { useEffect, useState } from 'react'
import {
  FormContainer,
  UserInput,
  UserButton,
  Title,
  UserInputContainer,
  UserButtonBorder,
  UserButtonBackground,
  UserButtonText,
  ErrorMessage
 } from '../../components/UserForm'
 import { Wrapper } from '../../components/public'
 import { handleRegister } from '../../redux/reducers/userReducer'
 import { useDispatch } from 'react-redux'
 import { setAuthTokenToLocalStorage } from '../../utils'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("")
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("")
  const dispatch = useDispatch()

  const handleLogin = () => {
    const message = 'this field can not be empty.'

    if(!username) {
      setUsernameErrorMessage(message)
    }
    if(!password) {
      setPasswordErrorMessage(message)
    }
    if(!nickname) {
      setNicknameErrorMessage(message)
    }
    if(!username || !password || !nickname) {
      return
    } else {
      const res = dispatch(handleRegister({username, password, nickname}))
      console.log(res)
      if(res.ok === true) {
        setAuthTokenToLocalStorage(res.token)
      };
    }
  }
  
  // useEffect(() => {
  //   console.log(username)
  //   console.log(password)
  //   console.log(nickname)
  // })

  useEffect(() => {
    if(username) {
      setUsernameErrorMessage('')
    }
    if(password) {
      setPasswordErrorMessage('')
    }
    if(nickname) {
      setNicknameErrorMessage('')
    }
  }, [username, password, nickname, usernameErrorMessage, passwordErrorMessage, nicknameErrorMessage])

  return (
    <Wrapper $solidPlate={true}>
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
          <UserInputContainer>
            <UserInput placeholder={'NICKNAME'} onChange={(event) => setNickname(event.target.value)} value={nickname}></UserInput>
            {nicknameErrorMessage && <ErrorMessage>{nicknameErrorMessage}</ErrorMessage>}
          </UserInputContainer>
        <UserButtonBorder onClick={() => handleLogin()}>
          <UserButtonText>next</UserButtonText>
          <UserButtonBackground />
        </UserButtonBorder>
      </FormContainer>
    </Wrapper>
  )
}