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
