import React, { useState, useEffect } from "react";
import {
  login,
  FbLogin,
  setLoginErrorMessage,
} from "../../redux/reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  FormContainer,
  UserInput,
  Title,
  UserInputContainer,
  UserButtonBorder,
  UserButtonBackground,
  UserButtonText,
  ErrorMessage,
} from "../../components/UserForm";
import { Wrapper } from "../../components/public";
import { FacebookOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Reminder = styled.div`
  position: relative;
  width: fit-content;
  margin: 0px auto;
  padding: 6px 10px;
  border-radius: 5px;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 800;
  background: ${(props) => props.theme.primaryColors.primaryLighter};
`;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const loginErrorMessage = useSelector(
    (store) => store.users.loginErrorMessage
  );

  useEffect(() => {
    if (username) {
      setUsernameErrorMessage("");
    }
    if (password) {
      setPasswordErrorMessage("");
    }

    return () => {
      dispatch(setLoginErrorMessage(null));
    };
  }, [
    dispatch,
    username,
    password,
    usernameErrorMessage,
    passwordErrorMessage,
  ]);
  //login
  const handleUserButtonBorderOnClick = () => {
    const message = "this field can not be empty.";

    if (!username) {
      setUsernameErrorMessage(message);
    }
    if (!password) {
      setPasswordErrorMessage(message);
    }
    if (!username || !password) {
      return;
    } else {
      dispatch(login(username, password)).then((response) => {
        if (response.ok) {
          history.push("/");
        }
      });
    }
  };

  const handleFacebookOutlinedOnClick = () => {
    dispatch(FbLogin()).then((response) => {
      if (response.ok) {
        history.push("/");
      }
    });
  };

  return (
    <Wrapper $solidPlate={true}>
      <FormContainer>
        <Title>please sign in</Title>
        <FacebookOutlined
          onClick={handleFacebookOutlinedOnClick}
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            transform: "scale(1.2)",
            cursor: "pointer",
          }}
        />
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
        <UserButtonBorder onClick={handleUserButtonBorderOnClick}>
          <UserButtonText>next</UserButtonText>
          <UserButtonBackground />
        </UserButtonBorder>
        {loginErrorMessage && <ErrorMessage>{loginErrorMessage}</ErrorMessage>}
        <Link to="/register">
          <Reminder>如果尚未註冊請先註冊。</Reminder>
        </Link>
      </FormContainer>
    </Wrapper>
  );
}
