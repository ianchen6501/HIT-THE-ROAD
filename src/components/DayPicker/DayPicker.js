import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const DatePickerContainer = styled.div`
  position: relative;
  width: 50%;

  & > div {
    width: 100%;
  }
`;

const CustomInputElement = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid ${(props) => props.theme.secondaryColors.secondaryLight};
  padding-left: 5px;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

const CustomInput = ({ value, onClick }) => {
  return <CustomInputElement onClick={onClick}>{value}</CustomInputElement>;
};

export default function Example({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  const DatePickerStyle = {
    border: `1px solid ${(props) =>
      props.theme.secondaryColors.secondaryLight}`,
    height: "80px",
  };

  return (
    <Container>
      <DatePickerContainer>
        <DatePicker
          className={DatePickerStyle}
          dateFormat="yyyy/MM/dd"
          selected={new Date(startDate)}
          onChange={(date) => setStartDate(date.getTime())}
          minDate={new Date()}
          selectsStart
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          customInput={<CustomInput />}
        />
      </DatePickerContainer>
      <DatePickerContainer>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={new Date(endDate)}
          onChange={(date) => setEndDate(date.getTime())}
          selectsEnd
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          minDate={new Date(startDate)}
          customInput={<CustomInput />}
        />
      </DatePickerContainer>
    </Container>
  );
}
