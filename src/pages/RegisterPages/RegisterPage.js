import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { setAuthTokenToLocalStorage, FBstartApp, FBdeleteApp } from '../../utils'
import { handleRegister, handleFBRegister, setUserData } from '../../redux/reducers/usersReducer'
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
import { FacebookOutlined } from '@ant-design/icons'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("")
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("")
  const [emailErrorMessage, setEmailErrorMessage] = useState("")
  const [FBRegistErerrorMessage, setFBRegistErerrorMessage] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()

  const [FBuserData, setFBuserData] = useState(null)

  function handleOnClickRegister() {
    const errorMessage = 'this field can not be empty.'

    if(!username) {
      setUsernameErrorMessage(errorMessage)
    }
    if(!password) {
      setPasswordErrorMessage(errorMessage)
    }
    if(!nickname) {
      setNicknameErrorMessage(errorMessage)
    }
    if(!email) {
      setEmailErrorMessage(errorMessage)
    }
    if(!username || !password || !nickname || !email) {
      return
    } else {
      const res = dispatch(handleRegister({username, password, nickname, email}))
      console.log(res)
      if(res.ok === true) {
        setAuthTokenToLocalStorage(res.id)
      };
    }
  }
  
  function handleOnClickFBRegister() {
    const errorMessage = "there is something wrong with the FB system, please use the formal register method."
    FBstartApp().then(res => {
      if(!res.ok) {
        setFBRegistErerrorMessage(errorMessage)
        return 
      }
      dispatch(handleFBRegister(res.FBUserData))
      .then(data => {
        setAuthTokenToLocalStorage(data.id)
        console.log('register success!')
      })
    })
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
        <FacebookOutlined onClick={handleOnClickFBRegister} style={{
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
        <UserButtonBorder onClick={() => handleOnClickRegister()}>
          <UserButtonText>next</UserButtonText>
          <UserButtonBackground />
        </UserButtonBorder>
        {FBRegistErerrorMessage && <ErrorMessage>there is something wrong with the FB system, please use the formal register method.</ErrorMessage>}
      </FormContainer>
    </Wrapper>
  )
}