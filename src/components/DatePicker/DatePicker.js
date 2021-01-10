import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import "./DatePicker.css";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const DatePickerContainer = styled.div`
  width: 100%;

  > div {
    width: 100%;
  }

  > div > div > input {
    width: 100%;
    font-size: 18px;
  }
`;

export default function Example({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  return (
    <Container>
      <DatePickerContainer className="DatePickerContainer">
        <DatePicker
          className="DatePicker"
          dateFormat="yyyy/MM/dd"
          selected={new Date(startDate)}
          onChange={(date) => setStartDate(date.getTime())}
          minDate={new Date()}
          selectsStart
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
        />
      </DatePickerContainer>
      <DatePickerContainer className="DatePickerContainer">
        <DatePicker
          className="DatePicker"
          dateFormat="yyyy/MM/dd"
          selected={new Date(endDate)}
          onChange={(date) => setEndDate(date.getTime())}
          selectsEnd
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          minDate={new Date(startDate)}
        />
      </DatePickerContainer>
    </Container>
  );
}
