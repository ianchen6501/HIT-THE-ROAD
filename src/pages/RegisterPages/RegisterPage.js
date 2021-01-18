import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  registerUser,
  FbRegisterUser,
  setRegisterErrorMessage,
} from "../../redux/reducers/usersReducer";
import {
  FormContainer,
  UserInput,
  Title,
  UserInputContainer,
  UserButtonContainer,
  UserButtonBorder,
  UserButtonBackground,
  UserButtonText,
  ErrorMessage,
} from "../../components/UserForm";
import { FormWrapper } from "../../components/public";
import { FacebookOutlined } from "@ant-design/icons";

const FacebookOutlinedStyle = {
  transform: "scale(1.2)",
  cursor: "pointer",
};

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const registerErrorMessage = useSelector(
    (store) => store.users.registerErrorMessage
  );
  const userData = useSelector((store) => store.users.userData);

  function handleUserButtonOnClick() {
    const errorMessage = "this field can not be empty.";
    const emailFormErrorMessage = "please input correct email form.";
    //驗證 email 格式

    if (!username) {
      setUsernameErrorMessage(errorMessage);
    }
    if (!password) {
      setPasswordErrorMessage(errorMessage);
    }
    if (!nickname) {
      setNicknameErrorMessage(errorMessage);
    }
    if (!email) {
      setEmailErrorMessage(errorMessage);
    }
    if (!email.includes("@")) {
      return setEmailErrorMessage(emailFormErrorMessage);
    }
    if (!username || !password || !nickname || !email) {
      return;
    } else {
      dispatch(registerUser(username, password, nickname, email)).then(
        (response) => {
          if (response.ok) {
            history.push("/");
          }
        }
      );
    }
  }

  function handleFacebookOutlinedOnClick() {
    dispatch(FbRegisterUser()).then((response) => {
      if (response.ok) {
        history.push("/");
      }
    });
  }

  useEffect(() => {
    if (username) {
      setUsernameErrorMessage("");
    }
    if (password) {
      setPasswordErrorMessage("");
    }
    if (nickname) {
      setNicknameErrorMessage("");
    }
    if (email) {
      setEmailErrorMessage("");
    }
    //刪除 registerErrorMessage
    return () => {
      dispatch(setRegisterErrorMessage(null));
    };
  }, [dispatch, username, password, nickname, email]);

  if (userData) {
    history.push("/");
  }

  return (
    <FormWrapper $solidPlate={true}>
      <FormContainer>
        <Title>please sign up</Title>
        <form
          onKeyPress={(event) =>
            event.key == "Enter" && handleUserButtonOnClick()
          }
        >
          <UserInputContainer>
            <UserInput
              placeholder={"USERNAME"}
              onChange={(event) => setUsername(event.target.value)}
              value={username}
            ></UserInput>
            {usernameErrorMessage && (
              <ErrorMessage>{usernameErrorMessage}</ErrorMessage>
            )}
          </UserInputContainer>
          <UserInputContainer>
            <UserInput
              placeholder={"PASSWORD"}
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              type="password"
            ></UserInput>
            {passwordErrorMessage && (
              <ErrorMessage>{passwordErrorMessage}</ErrorMessage>
            )}
          </UserInputContainer>
          <UserInputContainer>
            <UserInput
              placeholder={"NICKNAME"}
              onChange={(event) => setNickname(event.target.value)}
              value={nickname}
            ></UserInput>
            {nicknameErrorMessage && (
              <ErrorMessage>{nicknameErrorMessage}</ErrorMessage>
            )}
          </UserInputContainer>
          <UserInputContainer>
            <UserInput
              placeholder={"EMAIL"}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            ></UserInput>
            {emailErrorMessage && (
              <ErrorMessage>{emailErrorMessage}</ErrorMessage>
            )}
          </UserInputContainer>
          <UserButtonContainer>
            <UserButtonBorder onClick={() => handleUserButtonOnClick()}>
              <UserButtonText>next</UserButtonText>
              <UserButtonBackground />
            </UserButtonBorder>
            {registerErrorMessage && (
              <ErrorMessage>{registerErrorMessage}</ErrorMessage>
            )}
          </UserButtonContainer>
        </form>
        <FacebookOutlined
          onClick={handleFacebookOutlinedOnClick}
          style={FacebookOutlinedStyle}
        />
      </FormContainer>
    </FormWrapper>
  );
}
