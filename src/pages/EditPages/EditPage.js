import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Wrapper } from '../../components/public'
import { 
  FormContainer,
  UserInput,
  UserButtonBorder,
  UserButtonBackground,
  UserButtonText,
  ErrorMessage
} from '../../components/UserForm'
import DatePicker from '../../components/DayPicker'
import { SERVER_URL } from '../../static/static'
import { useHistory, useLocation } from 'react-router-dom'
import { updateSchedule } from '../../webAPI'

//styled-component
const Title = styled.div `
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.secondaryColors.secondaryDarker};
  font-size: ${props => props.theme.titles.h3};
  font-weight: 800;
  text-align: center;
`

const SubTitle = styled.div `
  position: relative;
  width: 100%;
  text-align: center;
  font-size: ${props => props.theme.titles.h5};
  font-weight: 800;
`

const DatePickerContainer = styled.div `
  width: 480px;
`

const Select = styled.select `
  width: 480px;
  height: 50px;
  border: 1px solid ${props => props.theme.secondaryColors.secondaryLight};
  font-size: ${props => props.theme.fontSizes.medium};
`

const SubContainer = styled.div `
`

//style
const userInputStyle = {
  marginTop:'0px',
}

const FormContainerStyle = {
  padding : '10px 60px',
}

//variables
const destinationSelects = [
  '台北', '新北', '桃園', '新竹', '苗栗', '台中', '彰化', '雲林', '嘉義', '台南', '高雄', '屏東', '台東', '花蓮', '宜蘭', '南投'
]



export default function CreatePage() {
  const history = useHistory()
  const location = useLocation()

  const currentDate = new Date().getDate()
  const currentMonth = new Date().getMonth()+1
  const currentYear = new Date().getFullYear()

  const [scheduleName, setScheduleName] = useState("")
  const [destination, setDestination] = useState('台北')
  const [startDate, setStartDate] = useState(new Date(currentYear, currentMonth, currentDate).getTime());
  const [endDate, setEndDate] = useState(new Date(currentYear, currentMonth, currentDate).getTime());
  const [errorMessage, setErrorMessage] = useState("")
  const [scheduleNameErrorMessage, setScheduleNameErrorMessage] = useState('')

  useEffect(() => {
    console.log(location)
  })

  function handleSubmitSchedule() {
    const message = 'this field can not be empty.'

    if(!scheduleName) {
      return setScheduleNameErrorMessage(message)
    }

    const json = JSON.stringify({ //FIXME:
      scheduleName, 
      location: destination,
      dateRange: {
        start: startDate,
        end: endDate
      }
    })
  

    updateSchedule(`${SERVER_URL}/${location.pathname}`)
    .then(json => {
      console.log(json)
      if(!json.ok) {
        return setErrorMessage(json.message)
      } else {
        return history.push('/') // FIXME: 改為回到 userPage
      }
    })
    .catch(error => {
      return setErrorMessage(error.toString())
    })
  }

  return (
    <Wrapper  $solidPlate={true}>
      <FormContainer style={FormContainerStyle}>
        <Title>這次想怎麼改呢!</Title>
        <SubContainer>
          <SubTitle>旅程名稱</SubTitle>
          <UserInput value={scheduleName} onChange={(event) => setScheduleName(event.target.value)} placeholder={'請輸入旅程名稱'} style={userInputStyle}></UserInput>
          {scheduleNameErrorMessage && <ErrorMessage>{scheduleNameErrorMessage}</ErrorMessage>}
        </SubContainer>
        <SubContainer>
          <SubTitle>目的地</SubTitle>
          <Select value={destination} onChange={(event) => setDestination(event.target.value)}>
            {destinationSelects.map(select => <option value={select} key={select}>{select}</option>)}
          </Select>
        </SubContainer>
        <SubContainer>
          <SubTitle>時間</SubTitle>
          <DatePickerContainer>
            <DatePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
          </DatePickerContainer>
        </SubContainer>
        <div onClick={handleSubmitSchedule}>
          <UserButtonBorder style={{zIndex: '0'}}>
            <UserButtonText>next</UserButtonText>
            <UserButtonBackground />
          </UserButtonBorder>
        </div>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormContainer>
    </Wrapper>
  )
}