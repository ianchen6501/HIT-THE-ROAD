import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  setCurrentDate,
  setDailyRoutinesKey,
  saveAllDailyRoutines,
} from "../../redux/reducers/schedulesReducer";
import { useEffect, useCallback } from "react";

const DayList = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.basicColors.black};
`;

const DayButton = styled.button`
  margin-left: 5px;
  background: ${(props) => props.theme.primaryColors.primaryLight};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: none;
  border-right: 0.5px solid black;
  border-bottom: 1px solid black;
  height: 36px;
  color: ${(props) => props.theme.primaryColors.primaryDarker};

  ${(props) =>
    props.$active &&
    `
    border-right: none;
    background: ${props.theme.primaryColors.primaryLighter};
  `}
`;

const SaveButton = styled(DayButton)`
  background: ${(props) => props.theme.secondaryColors.secondaryLighter};
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-weight: bold;
`;

export default function DayLists() {
  const dispatch = useDispatch();
  const dailyRoutines = useSelector((store) => store.schedules.dailyRoutines);
  const startDate = useSelector((store) => store.schedules.dateRange.startDate);
  const endDate = useSelector((store) => store.schedules.dateRange.endDate);
  const currentDate = useSelector((store) => store.schedules.currentDate);

  const calcDates = useCallback(() => {
    const dates = [];
    const range = new Date(endDate).getDate() - new Date(startDate).getDate();
    for (let i = 0; i <= range; i++) {
      dates.push(
        new Date(startDate).setDate(new Date(startDate).getDate() + i)
      );
    }
    return dates;
  }, [endDate, startDate]);

  useEffect(() => {
    dispatch(setCurrentDate(startDate));
    const dates = calcDates();
    dispatch(setDailyRoutinesKey(dates));
  }, [dispatch, startDate, endDate, calcDates]);

  function handleSaveClick() {
    const dates = calcDates();
    for (let i = 0; i < dates.length; i++) {
      const orderRoutines = dailyRoutines[dates[i]].slice();
      orderRoutines.sort(function (a, b) {
        return a.start - b.start;
      });
      const date = dates[i];
      dispatch(saveAllDailyRoutines({ date, orderRoutines }));
    }
  }

  return (
    <DayList>
      <SaveButton onClick={handleSaveClick}>SAVE</SaveButton>
      {Object.keys(dailyRoutines).map((date) => (
        <DayButton
          onClick={() => {
            dispatch(setCurrentDate(Number(date)));
          }}
          $active={currentDate.toString() === date}
          key={date}
        >
          {new Date(Number(date)).toLocaleString([], {
            month: "2-digit",
            day: "2-digit",
          })}
        </DayButton>
      ))}
    </DayList>
  );
}
