import React, { useState } from "react";
import styled from "styled-components";
import { Wrapper } from "../../components/public";
import {
  FormContainer,
  UserInput,
  UserButtonBorder,
  UserButtonBackground,
  UserButtonText,
  ErrorMessage,
} from "../../components/UserForm";

import { SERVER_URL } from "../../static/static";
import { useHistory } from "react-router-dom";

//styled-component
const Title = styled.div`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid
    ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-size: ${(props) => props.theme.titles.h3};
  font-weight: 800;
  text-align: center;
`;

const SubTitle = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: ${(props) => props.theme.titles.h5};
  font-weight: 800;
`;

const Select = styled.select`
  width: 480px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.secondaryColors.secondaryLight};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

const SubContainer = styled.div``;

//style
const userInputStyle = {
  marginTop: "0px",
};

const FormContainerStyle = {
  padding: "10px 60px",
};

//variables
const destinationSelects = [
  "台北",
  "新北",
  "桃園",
  "新竹",
  "苗栗",
  "台中",
  "彰化",
  "雲林",
  "嘉義",
  "台南",
  "高雄",
  "屏東",
  "台東",
  "花蓮",
  "宜蘭",
  "南投",
];

export default function CreatePage() {
  const history = useHistory();

  const [scheduleName, setScheduleName] = useState("");
  const [destination, setDestination] = useState("台北");
  const [errorMessage, setErrorMessage] = useState("");
  const [scheduleNameErrorMessage, setScheduleNameErrorMessage] = useState("");

  function handleSubmitSchedule() {
    const message = "this field can not be empty.";

    if (!scheduleName) {
      return setScheduleNameErrorMessage(message);
    }

    const body = {
      scheduleName,
      destination,
    };

    const json = JSON.stringify(body);

    fetch(`${SERVER_URL}/schedules`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: json,
    })
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        if (!json.ok) {
          return setErrorMessage(json.message);
        } else {
          return history.push("/user");
        }
      })
      .catch((error) => {
        return setErrorMessage(error.toString());
      });
  }

  return (
    <Wrapper $solidPlate={true}>
      <FormContainer style={FormContainerStyle}>
        <Title>這次想怎麼改呢!</Title>
        <SubContainer>
          <SubTitle>旅程名稱</SubTitle>
          <UserInput
            value={scheduleName}
            onChange={(event) => setScheduleName(event.target.value)}
            placeholder={"請輸入旅程名稱"}
            style={userInputStyle}
          ></UserInput>
          {scheduleNameErrorMessage && (
            <ErrorMessage>{scheduleNameErrorMessage}</ErrorMessage>
          )}
        </SubContainer>
        <SubContainer>
          <SubTitle>目的地</SubTitle>
          <Select
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          >
            {destinationSelects.map((select) => (
              <option value={select} key={select}>
                {select}
              </option>
            ))}
          </Select>
        </SubContainer>
        <div onClick={handleSubmitSchedule}>
          <UserButtonBorder style={{ zIndex: "0" }}>
            <UserButtonText>next</UserButtonText>
            <UserButtonBackground />
          </UserButtonBorder>
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormContainer>
    </Wrapper>
  );
}
