import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import "./DatePicker.css";

const Container = styled.div`
  width: 100%;
  display: flex;

  > div {
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

export default function Example({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  return (
    <Container>
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
    </Container>
  );
}
