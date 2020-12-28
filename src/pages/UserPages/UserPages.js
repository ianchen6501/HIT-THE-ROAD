import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getAll } from '../../webAPI'
import { Wrapper } from '../../components/public'
import { SERVER_URL } from '../../static/static'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { getAuthToken } from '../../redux/reducers/usersReducer'
import { Link, useHistory, useLocation } from 'react-router-dom'


const ScheduleContainer = styled.div `
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
    background: ${props => props.theme.basicColors.white};
  }
`

const Divider = styled.div `
  height: 100%;
  width: 2px;
  background: ${props => props.theme.secondaryColors.secondaryDarker};
  margin-left: 20px;
  margin-right: 20px;
`

const Title = styled.div `
  font-size: ${props => props.theme.titles.h3};
  font-weight: 900;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.primaryColors.primary};
  }
`

const SubSitile = styled.div `
  font-size: ${props => props.theme.titles.h4};
  font-weight: 900;
`

const LeftContainer = styled.div `
  display: flex;
  height: 100%;
`

const RightContainer = styled.div `
  height: 100%;
  width: 50px; 
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const deleteOutlinedStyle = {
  transform: 'scale(2)',
  cursor: 'pointer',
}

const editOutlinedStyle = {
  transform: 'scale(2)',
  cursor: 'pointer',
}

function Schedule({scheduleData, handleDeleteSchedule}) {
  return (
    <ScheduleContainer>
      <LeftContainer>
        <Title>{scheduleData.scheduleName}</Title>
        <Divider />
        <div>
          <SubSitile>{scheduleData.dateRange.start}-{scheduleData.dateRange.end}</SubSitile>
          <SubSitile>{scheduleData.location}</SubSitile>
        </div>
      </LeftContainer>
      <RightContainer>
        <Link to={`/edit/${scheduleData.id}`}>
          <EditOutlined style={editOutlinedStyle}/>
        </ Link>
        <DeleteOutlined onClick={() => handleDeleteSchedule(scheduleData.id)} style={deleteOutlinedStyle}/>
      </RightContainer>
    </ScheduleContainer>
  )
}

export default function UserPage() {
  const dispatch = useDispatch()
  const [unfinishedSchedules, setUnfinishedSchedules] = useState(null)
  const [finishedSchedules, setFinishedSchedules] = useState(null)
  const [isDeleteing, setIsDeleting] = useState(false)
  const location = useLocation

  function handleDeleteSchedule(id) {
    setIsDeleting(true)
    fetch(`${SERVER_URL}/schedules/${id}`, {
      method: 'DELETE',
    })
    .then(result => {return result.json()})
    .then(json => {
      console.log(json)
      if(!json.ok) {
        setIsDeleting(false)
        console.log(json.message)
      } else {
        setIsDeleting(false)
        console.log(json.message)
      }
    })
    .catch(error => {
      console.log(error.toString())
    })
  }

  useEffect(() => {
    getAll(`${SERVER_URL}/schedules?isFinished=0`)
    .then(json => {
      console.log(json)
      setUnfinishedSchedules(json)
    })
  }, [isDeleteing])

  if(!unfinishedSchedules) {
    return (
      <div>loading!</div>
    )
  }

  if(unfinishedSchedules) {
    return (
      <Wrapper>
        {unfinishedSchedules.map((scheduleData, index) => (
          <Schedule key={index} scheduleData={scheduleData} handleDeleteSchedule={handleDeleteSchedule}/>
        ))}
      </Wrapper>
    )
  }
}