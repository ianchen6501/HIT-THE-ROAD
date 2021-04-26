import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Wrapper, LoadingPage } from "../../components/public";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { MEDIA_QUERY_SM } from "../../constants/break_point";
import {
  deleteSchedule,
  ToggleCheckBoxChanged,
} from "../../redux/reducers/usersReducer";
import {
  getUnfinishedSchedules,
  getFinishedSchedules,
} from "../../redux/reducers/usersReducer";
import {
  setAuthTokenFromSessionStorage,
  deleteAuthTokenFromSessionStorage,
} from "../../utils";

const ScheduleWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScheduleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  width: 100%;
  height: 96px;
  background: ${(props) => props.theme.basicColors.white};
  border-radius: 10px;
  box-shadow: 0.5px 0.5px 3px -1px gray;
  transition: all 0.5s ease;

  &:hover {
    box-shadow: 0px 2px 6px gray;
  }

  ${MEDIA_QUERY_SM} {
    width: 90%;
    padding: 10px 20px;
  }
`;

const Title = styled.div`
  border-bottom: solid 2px
    ${(props) => props.theme.primaryColors.primaryLighter};
  font-size: ${(props) => props.theme.titles.h6};
  font-weight: 900;
  color: ${(props) => props.theme.primaryColors.primaryDark};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.primaryColors.primary};
  }

  ${MEDIA_QUERY_SM} {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

const SubTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: 900;
  color: ${(props) => props.theme.primaryColors.primaryDark};

  &:nth-child(1) {
    margin-right: 20px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: ${(props) => props.theme.fontSizes.extraSmall};
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  height: 100%;

  ${MEDIA_QUERY_SM} {
    width: 120px;
  }
`;

const LeftDownContainer = styled.div`
  display: flex;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 60px;
`;

const RightUpContainer = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.primaryColors.primaryDarker};

  ${MEDIA_QUERY_SM} {
    font-size: ${(props) => props.theme.fontSizes.small};
    line-height: ${(props) => props.theme.fontSizes.small};
  }
`;

const RightDownContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  color: ${(props) => props.theme.primaryColors.primaryDarker};
  font-size: ${(props) => props.theme.fontSizes.medium};
  line-height: ${(props) => props.theme.fontSizes.medium};

  ${MEDIA_QUERY_SM} {
    font-size: ${(props) => props.theme.fontSizes.small};
    line-height: ${(props) => props.theme.fontSizes.small};
  }
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 0;
  margin-right: 5px;
`;

const CheckBoxLabel = styled.label`
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: 900;
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;

  background: ${(props) => props.theme.primaryColors.primaryLighter};
`;

const SideList = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.basicColors.black};
`;

const SideButton = styled.button`
  margin-left: 5px;
  background: ${(props) => props.theme.primaryColors.primaryLight};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: none;
  border-right: 0.5px solid black;
  border-bottom: 1px solid black;
  height: 36px;
  min-width: 60px;
  color: ${(props) => props.theme.primaryColors.primaryDarker};

  ${(props) =>
    props.$active &&
    `
    border-right: none;
    background: ${props.theme.primaryColors.primaryLighter};
  `}
`;

const Reminder = styled.div`
  position: absolute;
  display: inline-block;
  width: 200px;
  height: 50px;
  left: 50%;
  top: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.basicColors.white};
  line-height: 50px;
  text-align: center;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-weight: bold;
`;

function Schedule({
  scheduleData,
  handleDeleteOutlinedOnClick,
  handleCheckboxOnChange,
  handleScheduleTitleOnClick,
}) {
  const start = scheduleData.dateRange.start;
  const end = scheduleData.dateRange.end;
  const startDate = `
    ${new Date(start).getFullYear().toString()}, 
    ${(new Date(start).getMonth() + 1).toString()}, 
    ${new Date(start).getDate().toString()}
  `;
  const endDate = `
    ${new Date(end).getFullYear().toString()}, 
    ${(new Date(end).getMonth() + 1).toString()}, 
    ${new Date(end).getDate().toString()}
  `;

  return (
    <ScheduleContainer>
      <LeftContainer>
        <Title onClick={() => handleScheduleTitleOnClick(scheduleData)}>
          {scheduleData.scheduleName}
        </Title>
        <LeftDownContainer>
          <SubTitle>{scheduleData.location}</SubTitle>
          <SubTitle>
            {startDate}-{endDate}
          </SubTitle>
        </LeftDownContainer>
      </LeftContainer>
      <RightContainer>
        <RightUpContainer>
          <CheckBox
            id={scheduleData.id}
            type="checkbox"
            value="完成"
            onChange={(event) => handleCheckboxOnChange(event)}
            checked={scheduleData.isFinished}
          ></CheckBox>
          <CheckBoxLabel htmlfor={scheduleData.id}>完成</CheckBoxLabel>
        </RightUpContainer>
        <RightDownContainer>
          <FontAwesomeIcon
            onClick={() => handleDeleteOutlinedOnClick(scheduleData.id)}
            icon={faTrashAlt}
            style={{ cursor: "pointer" }}
          />
        </RightDownContainer>
      </RightContainer>
    </ScheduleContainer>
  );
}

export default function UserPage() {
  const [isChangingIsFinished, setIsChangingIsFinished] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isLoading = useSelector((store) => store.schedules.isLoading);
  const userData = useSelector((store) => store.users.userData);
  const schedules = useSelector((store) => store.users.schedules);
  const history = useHistory();
  const dispatch = useDispatch();
  const [buttonActive, setButtonActive] = useState("unfinish");

  //刪除 schedule
  async function handleDeleteOutlinedOnClick(id) {
    setIsDeleting(true);
    const UserId = userData.id;
    dispatch(deleteSchedule(id, UserId)).then(() => {
      setIsDeleting(false);
    });
  }
  //變更 schedule 完成狀態
  async function handleCheckboxOnChange(event) {
    setIsChangingIsFinished(true);
    const UserId = userData.id;
    const scheduleId = event.target.id;
    const checkedStatus = event.target.checked ? 1 : 0;
    await dispatch(ToggleCheckBoxChanged(UserId, scheduleId, checkedStatus));
    setIsChangingIsFinished(false);
  }
  //進入編修或完成頁面
  async function handleScheduleTitleOnClick(scheduleData) {
    await deleteAuthTokenFromSessionStorage("userId");
    await deleteAuthTokenFromSessionStorage("scheduleId");
    await setAuthTokenFromSessionStorage("userId", userData.id);
    await setAuthTokenFromSessionStorage("scheduleId", scheduleData.id);

    if (scheduleData.isFinished) {
      history.push("/finish-plan-page");
    } else {
      history.push("/planning-page");
    }
  }

  //拿 schedules
  useEffect(() => {
    if (userData) {
      dispatch(getUnfinishedSchedules(userData.id));
      setButtonActive("unfinish");
    }
  }, [dispatch, userData, isChangingIsFinished, isDeleting, isLoading]);

  if (!userData) {
    history.push("/");
  }

  if (isChangingIsFinished) {
    return <LoadingPage />;
  }

  return (
    <Container>
      <SideList>
        <SideButton
          onClick={() => {
            setButtonActive("unfinish");
            dispatch(getUnfinishedSchedules(userData.id));
          }}
          $active={buttonActive === "unfinish"}
        >
          未完成
        </SideButton>
        <SideButton
          onClick={() => {
            setButtonActive("finish");
            dispatch(getFinishedSchedules(userData.id));
          }}
          $active={buttonActive === "finish"}
        >
          已完成
        </SideButton>
        <SideButton
          onClick={() => {
            setButtonActive("add");
            history.push("/create");
          }}
          $active={buttonActive === "add"}
        >
          新增
        </SideButton>
      </SideList>
      <ScheduleWrapper>
        {schedules.length ? (
          schedules.map((scheduleData, index) => (
            <Schedule
              key={index}
              scheduleData={scheduleData}
              handleDeleteOutlinedOnClick={handleDeleteOutlinedOnClick}
              handleCheckboxOnChange={handleCheckboxOnChange}
              handleScheduleTitleOnClick={handleScheduleTitleOnClick}
            />
          ))
        ) : (
          <Reminder>目前沒有行程喔!</Reminder>
        )}
      </ScheduleWrapper>
    </Container>
  );
}
