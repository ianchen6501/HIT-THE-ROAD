import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Wrapper } from '../../components/public'
import { 
  FormContainer,
  UserInput,
  UserButton,
  UserInputContainer,
  UserButtonBorder,
  UserButtonBackground,
  UserButtonText,
  ErrorMessage
} from '../../components/UserForm'
import DatePicker from '../../components/DayPicker'

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



export default function HomePage() {
  const [destination, setDestination] = useState('台北')
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [endDate, setEndDate] = useState(new Date().getTime());



  function handleOnChange(event) {
    setDestination(event.target.value)
  }

  useEffect(() => {
    console.log(startDate)
    console.log(endDate)
    console.log(destination)
  })

  return (
    <Wrapper  $solidPlate={true}>
      <FormContainer style={FormContainerStyle}>
        <Title>來趟新的旅行吧!</Title>
        <SubTitle>旅程名稱</SubTitle>
          <UserInput placeholder={'請輸入旅程名稱'} style={userInputStyle}></UserInput>
          {/* {usernameErrorMessage && <ErrorMessage>{usernameErrorMessage}</ErrorMessage>} */}
        <SubTitle>目的地</SubTitle>
          <Select value={destination} onChange={(event) => handleOnChange(event)}>
            {destinationSelects.map(select => <option value={select} key={select}>{select}</option>)}
          </Select>
        <SubTitle>時間</SubTitle>
        <DatePickerContainer>
          <DatePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
        </DatePickerContainer>
        <UserButtonBorder style={{zIndex: '0'}}>
          <UserButtonText>next</UserButtonText>
          <UserButtonBackground />
        </UserButtonBorder>
        {/* {FBRegistErerrorMessage && <ErrorMessage>there is something wrong with the FB system, please use the formal register method.</ErrorMessage>} */}
      </FormContainer>
    </Wrapper>
  )
}