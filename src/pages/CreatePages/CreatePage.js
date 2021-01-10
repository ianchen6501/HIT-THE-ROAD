import React, { useState } from "react";
import styled from "styled-components";
import { FormWrapper } from "../../components/public";
import {
  FormContainer,
  UserInput,
  UserButtonBorder,
  UserButtonBackground,
  UserButtonText,
  ErrorMessage,
  UserButtonContainer,
} from "../../components/UserForm";

import DatePicker from "../../components/DatePicker";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MEDIA_QUERY_EXSM, MEDIA_QUERY_MD } from "../../constants/break_point";
import { createSchedule } from "../../redux/reducers/usersReducer";

//styled-component
const Title = styled.div`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid
    ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-size: ${(props) => props.theme.titles.h3};
  font-weight: 800;
  text-align: center;

  ${MEDIA_QUERY_MD} {
    font-size: ${(props) => props.theme.titles.h4};
  }
`;

const SubTitle = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: ${(props) => props.theme.titles.h5};
  font-weight: 800;
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  max-height: 100px;
  border: 1px solid ${(props) => props.theme.secondaryColors.secondaryLight};
  border-radius: 50px;
  padding-left: 25px;
  font-size: ${(props) => props.theme.fontSizes.medium};
  overflow: scroll;

  &:focus {
    outline: none;
  }
`;

const SubContainer = styled.div`
  width: 480px;
  ${MEDIA_QUERY_MD} {
    width: 360px;
  }

  ${MEDIA_QUERY_EXSM} {
    width: 225px;
  }
`;

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
  const dispatch = useDispatch();

  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [scheduleName, setScheduleName] = useState("");
  const [location, setLocation] = useState("台北");
  const [startDate, setStartDate] = useState(
    new Date(currentYear, currentMonth, currentDate).getTime()
  );
  const [endDate, setEndDate] = useState(
    new Date(currentYear, currentMonth, currentDate).getTime()
  );
  const [scheduleNameErrorMessage, setScheduleNameErrorMessage] = useState("");
  const userData = useSelector((store) => store.users.userData);
  const createErrorMessage = useSelector(
    (store) => store.users.createErrorMessage
  );

  function handleSubmitSchedule() {
    const message = "this field can not be empty.";
    const UserId = userData.id;

    if (!scheduleName) {
      return setScheduleNameErrorMessage(message);
    }

    dispatch(
      createSchedule(startDate, endDate, scheduleName, location, UserId)
    ).then(() => history.push("/planning-page"));
  }

  if (!userData) {
    history.push("/");
    return <div></div>;
  }

  if (userData) {
    return (
      <FormWrapper $solidPlate={true}>
        <FormContainer style={FormContainerStyle}>
          <Title>來趟新的旅行吧!</Title>
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
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              name={"location"}
            >
              {destinationSelects.map((select) => (
                <option value={select} key={select}>
                  {select}
                </option>
              ))}
            </Select>
          </SubContainer>
          <SubContainer>
            <SubTitle>時間</SubTitle>
            <DatePicker
              style={{ zIndex: "4" }}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </SubContainer>
          <UserButtonContainer onClick={handleSubmitSchedule}>
            <UserButtonBorder style={{ zIndex: "0" }}>
              <UserButtonText>next</UserButtonText>
              <UserButtonBackground />
            </UserButtonBorder>
            {createErrorMessage && (
              <ErrorMessage>{createErrorMessage}</ErrorMessage>
            )}
          </UserButtonContainer>
        </FormContainer>
      </FormWrapper>
    );
  }
}
