import styled from "styled-components";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setCurrentDate,
  saveDailyRoutines,
  saveRoutes,
} from "../../redux/reducers/schedulesReducer";

import {
  saveMarkers,
  setIsMarkerSaved,
} from "../../redux/reducers/mapMarkReducer";

import { savePostIts } from "../../redux/reducers/postItsReducer";

import { CloseButton } from "../../components/ScheduleForm";

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

const SaveMessage = styled.div`
  padding: 20px;
  position: absolute;
  top: calc(${(props) => props.theme.heights.header} + 50px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  width: 160px;
  height: 72px;
  border: 2px solid ${(props) => props.theme.primaryColors.primaryDark};
  border-radius: 10px;
  box-shadow: 1px 1px 5px gray;
  background: ${(props) => props.theme.primaryColors.primaryDark};
  text-align: center;
  color: ${(props) => props.theme.basicColors.white};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: bold;
`;

export default function DayLists() {
  const dispatch = useDispatch();
  const dailyRoutines = useSelector((store) => store.schedules.dailyRoutines);
  const startDate = useSelector((store) => store.schedules.dateRange.start);
  const endDate = useSelector((store) => store.schedules.dateRange.end);
  const currentDate = useSelector((store) => store.schedules.currentDate);
  // TODO: 為了要存
  const routes = useSelector((store) => store.schedules.routes);
  const spots = useSelector((store) => store.postIts.spots);
  const spotsId = useSelector((store) => store.postIts.columns.postIt.spotsIds);
  const markers = useSelector((store) => store.mapMarks.markLocations);
  const spotId = useSelector((store) => store.schedules.spotId);
  const postItId = useSelector((store) => store.postIts.postItId);

  const isSaved = useSelector((store) => store.mapMarks.isMarkerSaved);

  const calcDates = useCallback(() => {
    const dates = [];
    const range = (endDate - startDate) / 86400000;
    for (let i = 0; i <= range; i++) {
      dates.push(
        new Date(startDate).setDate(new Date(startDate).getDate() + i)
      );
    }
    return dates;
  }, [endDate, startDate]);

  function handleSaveClick() {
    const dates = calcDates();
    const userId = sessionStorage.getItem("userId");
    const scheduleId = sessionStorage.getItem("scheduleId");
    dispatch(
      saveDailyRoutines(dates, dailyRoutines, spotId, userId, scheduleId)
    );
    dispatch(saveRoutes(routes, userId, scheduleId));
    dispatch(saveMarkers(markers, userId, scheduleId));
    dispatch(savePostIts(spots, spotsId, postItId, userId, scheduleId));
  }

  return (
    <DayList>
      {isSaved && (
        <SaveMessage>
          儲存成功！
          <CloseButton onClick={() => dispatch(setIsMarkerSaved(false))}>
            ✖
          </CloseButton>
        </SaveMessage>
      )}
      <SaveButton onClick={handleSaveClick}>SAVE</SaveButton>
      {currentDate &&
        Object.keys(dailyRoutines).map((date) => (
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
