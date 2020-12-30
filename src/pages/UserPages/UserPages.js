import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getAll } from "../../webAPI";
import { Wrapper, LoadingPage } from "../../components/public";
import { SERVER_URL } from "../../static/static";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

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
  handleDeleteSchedule,
  handleOnChangeChecked,
  handleOnClickPlanning,
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
        <Title onClick={() => handleOnClickPlanning(scheduleData.id)}>
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
            onChange={(event) => handleOnChangeChecked(event)}
          ></CheckBox>
          <CheckBoxLabel for={scheduleData.id}>完成</CheckBoxLabel>
        </RightUpContainer>
        <RightDownContainer>
          <Link to={`/edit/${scheduleData.id}`}>
            <EditOutlined style={editOutlinedStyle} />
          </Link>
          <DeleteOutlined
            onClick={() => handleDeleteSchedule(scheduleData.id)}
            style={deleteOutlinedStyle}
          />
        </RightDownContainer>
      </RightContainer>
    </ScheduleContainer>
  );
}

export default function UserPage() {
  const [schedules, setSchedules] = useState(null);
  const [isDeleteing, setIsDeleting] = useState(false);
  const userData = useSelector((store) => store.users.userData);
  const history = useHistory();

  function handleDeleteSchedule(id) {
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

  function GetUnfinishedSchedules() {
    getAll(`${SERVER_URL}/schedules/${userData.id}?isFinished=0`).then(
      (json) => {
        setSchedules(json);
      }
    );
  }

  function GetFinishedSchedules() {
    getAll(`${SERVER_URL}/schedules/${userData.id}?isFinished=1`).then(
      (json) => {
        setSchedules(json);
      }
    );
  }

  function handleOnChangeChecked(event) {
    const body = {
      UserId: userData.id,
    };
    const checkedStatus = event.target.checked ? 0 : 1;
    fetch(
      `${SERVER_URL}/schedules/${event.target.id}?isFinished=${checkedStatus}`,
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
        console.log(json);
      });
  }

  function handleOnClickPlanning(scheduleId) {
    const userId = userData.id;
    history.push("/Planning-page");
  }

  //拿 schedules
  useEffect(() => {
    if (userData) {
      getAll(`${SERVER_URL}/schedules/${userData.id}?isFinished=0`).then(
        (json) => {
          console.log(json);
          setSchedules(json);
        }
      );
    }
  }, [userData, isDeleteing]);

  if (!schedules) {
    return <LoadingPage />;
  }

  if (schedules) {
    return (
      <Wrapper>
        <button onClick={GetUnfinishedSchedules}>未完成</button>
        <button onClick={GetFinishedSchedules}>已完成</button>
        {schedules.map((scheduleData, index) => (
          <Schedule
            key={index}
            scheduleData={scheduleData}
            handleDeleteSchedule={handleDeleteSchedule}
            handleOnChangeChecked={handleOnChangeChecked}
            handleOnClickPlanning={handleOnClickPlanning}
          />
        ))}
      </Wrapper>
    );
  }
}
