import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { setCurrentDate } from "../../redux/reducers/schedulesReducer";

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

export default function DayLists() {
  const dispatch = useDispatch();
  const dailyRoutines = useSelector((store) => store.schedules.dailyRoutines);
  const currentDate = useSelector((store) => store.schedules.currentDate);

  return (
    <DayList>
      {Object.keys(dailyRoutines).map((date) => (
        <DayButton
          onClick={() => {
            dispatch(setCurrentDate(date));
          }}
          $active={currentDate === date}
          key={date}
        >
          {date}
        </DayButton>
      ))}
    </DayList>
  );
}
