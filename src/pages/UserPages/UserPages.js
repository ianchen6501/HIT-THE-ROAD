import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Wrapper, LoadingPage } from "../../components/public";
import { SERVER_URL } from "../../static/static";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import {
  getUnfinishedSchedules,
  getFinishedSchedules,
} from "../../redux/reducers/usersReducer";

const ScheduleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 120px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0.5px 0.5px 3px -1px;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => props.theme.basicColors.white};
  }
`;

// const Divider = styled.div `
//   height: 100%;
//   width: 2px;
//   background: ${props => props.theme.secondaryColors.secondaryDarker};
//   margin-left: 20px;
//   margin-right: 20px;
// `

const Title = styled.div`
  border-bottom: solid 2px
    ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-size: ${(props) => props.theme.titles.h4};
  font-weight: 900;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.primaryColors.primary};
  }
`;

const SubSitile = styled.div`
  font-size: ${(props) => props.theme.titles.h6};
  font-weight: 900;

  &:nth-child(1) {
    margin-right: 20px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const LeftDownContainer = styled.div`
  display: flex;
`;

const RightContainer = styled.div`
  display: flex;
  width: 60px;
  flex-direction: column;
`;

const RightUpContainer = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
`;

const RightDownContainer = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
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

const deleteOutlinedStyle = {
  transform: "scale(2)",
  cursor: "pointer",
};

const editOutlinedStyle = {
  transform: "scale(2)",
  cursor: "pointer",
};

function Schedule({
  scheduleData,
  handleDeleteOutlinedOnClick,
  handleCheckboxOnChange,
  handleScheduleTitleOnClick,
}) {
  const start = scheduleData.dateRange.start;
  const end = scheduleData.dateRange.end;
  const startData = `
    ${new Date(start).getFullYear().toString()}, 
    ${(new Date(start).getMonth() + 1).toString()}, 
    ${new Date(start).getDate().toString()}
  `;
  const endData = `
    ${new Date(end).getFullYear().toString()}, 
    ${(new Date(end).getMonth() + 1).toString()}, 
    ${new Date(end).getDate().toString()}
  `;

  return (
    <ScheduleContainer>
      <LeftContainer>
        <Title onClick={() => handleScheduleTitleOnClick(scheduleData.id)}>
          {scheduleData.scheduleName}
        </Title>
        <LeftDownContainer>
          <SubSitile>{scheduleData.location}</SubSitile>
          <SubSitile>
            {startData}-{endData}
          </SubSitile>
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
          <CheckBoxLabel for={scheduleData.id}>完成</CheckBoxLabel>
        </RightUpContainer>
        <RightDownContainer>
          <Link to={`/edit/${scheduleData.id}`}>
            <EditOutlined style={editOutlinedStyle} />
          </Link>
          <DeleteOutlined
            onClick={() => handleDeleteOutlinedOnClick(scheduleData.id)}
            style={deleteOutlinedStyle}
          />
        </RightDownContainer>
      </RightContainer>
    </ScheduleContainer>
  );
}

export default function UserPage() {
  // const [schedules, setSchedules] = useState(null);
  const [isDeleteing, setIsDeleting] = useState(false);
  const [isChangingIsFinished, setIsChangingIsFinished] = useState(false);
  const userData = useSelector((store) => store.users.userData);
  const schedules = useSelector((store) => store.users.schedules);
  const history = useHistory();
  const dispatch = useDispatch();

  function handleDeleteOutlinedOnClick(id) {
    setIsDeleting(true);
    fetch(`${SERVER_URL}/schedules/${id}`, {
      method: "DELETE",
    })
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        console.log(json);
        if (!json.ok) {
          setIsDeleting(false);
          console.log(json.message);
        } else {
          setIsDeleting(false);
          console.log(json.message);
        }
      })
      .catch((error) => {
        console.log(error.toString());
      });
  }

  async function handleCheckboxOnChange(event) {
    const UserId = userData.id;
    const scheduleId = event.target.id;
    //更新 schedules isFinished state
    setIsChangingIsFinished(true);
    // const newSchedules = schedules.map(schedule => {
    //   if(schedule.id == scheduleId) {
    //     schedule.isFinished = !schedule.isFinished
    //   }
    //   return schedule
    // })
    // setSchedules(newSchedules)
    //更新 db isFinished state
    const body = {
      UserId,
    };
    const checkedStatus = event.target.checked ? 1 : 0;
    await fetch(
      `${SERVER_URL}/schedules/${scheduleId}?isFinished=${checkedStatus}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // FIXME:
        console.log(json);
      });
    setIsChangingIsFinished(false);
  }

  function handleScheduleTitleOnClick(scheduleId) {
    const userId = userData.id;
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("scheduleId", scheduleId);
    history.push("/Planning-page");
  }

  //拿 schedules
  useEffect(() => {
    if (userData) {
      dispatch(getUnfinishedSchedules(userData.id));
    }
  }, [dispatch, userData, isDeleteing, isChangingIsFinished]);

  if (!userData || !schedules || isDeleteing || isChangingIsFinished) {
    return <LoadingPage />;
  }

  if (schedules) {
    return (
      <Wrapper>
        <button onClick={() => dispatch(getUnfinishedSchedules(userData.id))}>
          未完成
        </button>
        <button onClick={() => dispatch(getFinishedSchedules(userData.id))}>
          已完成
        </button>
        {schedules.map((scheduleData, index) => (
          <Schedule
            key={index}
            scheduleData={scheduleData}
            handleDeleteOutlinedOnClick={handleDeleteOutlinedOnClick}
            handleCheckboxOnChange={handleCheckboxOnChange}
            handleScheduleTitleOnClick={handleScheduleTitleOnClick}
          />
        ))}
      </Wrapper>
    );
  }
}
