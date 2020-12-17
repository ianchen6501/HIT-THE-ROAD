import React, { useContext, useEffect, useState } from 'react'
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
import { handleRegister } from '../../redux/reducers/usersReducer'
import { useDispatch } from 'react-redux'
import { setAuthTokenToLocalStorage } from '../../utils'
import { FacebookOutlined } from '@ant-design/icons'

export default function RegisterPage({FBstartApp, FBdeleteApp}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("")
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("")
  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const dispatch = useDispatch()

  const [authResponse, setAuthResponse] = useState(null)
  const [FBuserData, setFBuserData] = useState(null)

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
    if(!email) {
      setEmailErrorMessage(message)
    }
    if(!username || !password || !nickname || !email) {
      return
    } else {
      const res = dispatch(handleRegister({username, password, nickname, email}))
      console.log(res)
      if(res.ok === true) {
        setAuthTokenToLocalStorage(res.token)
      };
    }
  }
  
  function handleSetFBuserData() {
    FBstartApp().then(response => setFBuserData(response))
  }

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
    if(email) {
      setEmailErrorMessage('')
    }
  }, [username, password, nickname, email])

  return (
    <Wrapper $solidPlate={true}>
      <FormContainer>
        <Title>please sign in</Title>
        <FacebookOutlined onClick={handleSetFBuserData} style={{
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
        <UserInputContainer>
          <UserInput placeholder={'NICKNAME'} onChange={(event) => setNickname(event.target.value)} value={nickname}></UserInput>
          {nicknameErrorMessage && <ErrorMessage>{nicknameErrorMessage}</ErrorMessage>}
        </UserInputContainer>
        <UserInputContainer>
          <UserInput placeholder={'EMAIL'} onChange={(event) => setEmail(event.target.value)} value={email}></UserInput>
          {emailErrorMessage && <ErrorMessage>{emailErrorMessage}</ErrorMessage>}
        </UserInputContainer>
        <UserButtonBorder onClick={() => handleLogin()}>
          <UserButtonText>next</UserButtonText>
          <UserButtonBackground />
        </UserButtonBorder>
      </FormContainer>
    </Wrapper>
  )
}