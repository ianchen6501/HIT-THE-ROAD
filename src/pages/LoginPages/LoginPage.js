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
  UserButtonContainer,
  UserButtonBorder,
  UserButtonBackground,
  UserButtonText,
  ErrorMessage,
} from "../../components/UserForm";
import { FormWrapper } from "../../components/public";
import { FacebookOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { MEDIA_QUERY_MD, MEDIA_QUERY_EXSM } from "../../constants/break_point";

const ReminderContainer = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  ${MEDIA_QUERY_MD} {
    width: 360px;
  }

  ${MEDIA_QUERY_EXSM} {
    width: 225px;
  }
`;

const RegisterReminder = styled.div`
  display: flex;
  border-bottom: 1px solid
    ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: 800;
`;

const RegisterLink = styled.div`
  color: ${(props) => props.theme.primaryColors.primary};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: 800;
`;

const DemoAcountReminder = styled.div`
  position: relative;
  width: fit-content;
  margin-top: 20px;
  border: 1px solid ${(props) => props.theme.secondaryColors.secondaryDarker};
  border-radius: 10px;
  padding: 10px;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: 800;
  text-transform: none;
`;

const FacebookOutlinedStyle = {
  transform: "scale(1.2)",
  cursor: "pointer",
};

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
  const userData = useSelector((store) => store.users.userData);

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

  // if (userData) {
  //   history.push("/");
  // }

  return (
    <FormWrapper $solidPlate={true}>
      <FormContainer>
        <Title>please sign in</Title>
        <form
          onKeyPress={(event) =>
            event.key == "Enter" && handleUserButtonBorderOnClick()
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
          <UserButtonContainer>
            <UserButtonBorder onClick={handleUserButtonBorderOnClick}>
              <UserButtonText>next</UserButtonText>
              <UserButtonBackground />
            </UserButtonBorder>
            {loginErrorMessage && (
              <ErrorMessage>{loginErrorMessage}</ErrorMessage>
            )}
          </UserButtonContainer>
        </form>
        <FacebookOutlined
          onClick={handleFacebookOutlinedOnClick}
          style={FacebookOutlinedStyle}
        />
        <ReminderContainer>
          <RegisterReminder>
            還沒有帳戶嗎?
            <Link to="/register">
              <RegisterLink>註冊</RegisterLink>
            </Link>
          </RegisterReminder>
          <DemoAcountReminder>
            測試帳號
            <br />
            USERNAME: demo01
            <br />
            PASSWORD: demo01
            <br />
          </DemoAcountReminder>
        </ReminderContainer>
      </FormContainer>
    </FormWrapper>
  );
}
