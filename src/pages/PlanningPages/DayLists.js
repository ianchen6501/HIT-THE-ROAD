import styled from "styled-components";
import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setCurrentDate,
  setDailyRoutinesKey,
  saveAllDailyRoutines,
  saveDailyRoutines,
  saveRoutes,
  initDailyRoutinesKey,
} from "../../redux/reducers/schedulesReducer";

import { saveMarkers } from "../../redux/reducers/mapMarkReducer";

import { savePostIts } from "../../redux/reducers/postItsReducer";

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
  const startDate = useSelector((store) => store.schedules.dateRange.start);
  const endDate = useSelector((store) => store.schedules.dateRange.end);
  const currentDate = useSelector((store) => store.schedules.currentDate);
  // TODO: 為了要存
  const routes = useSelector((store) => store.schedules.routes);
  const spots = useSelector((store) => store.postIts.spots);
  const spotsId = useSelector((store) => store.postIts.columns.postIt.spotsIds);
  const markers = useSelector((store) => store.mapMarks.markLocations);
  const userData = useSelector((store) => store.users.userData);
  const spotId = useSelector((store) => store.schedules.spotId);
  const postItId = useSelector((store) => store.postIts.postItId);

  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (userData) {
      setUserId(userData.id);
    }
  }, [userData]);

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

  // TODO: 看是不是要搬到按下的時候(create page??)
  useEffect(() => {
    dispatch(setCurrentDate(startDate));
    const dates = calcDates();
    if (dailyRoutines === null) {
      dispatch(initDailyRoutinesKey(dates, 1, 1));
    }
  }, [dispatch, startDate, endDate, calcDates]);

  // TODO: 存 schdule、post-it、marker
  function handleSaveClick() {
    const dates = calcDates();
    dispatch(saveDailyRoutines(dates, dailyRoutines, spotId, userId, 1));
    dispatch(saveRoutes(routes, userId, 1));
    dispatch(saveMarkers(markers, userId, 1));
    dispatch(savePostIts(spots, spotsId, postItId, userId, 1));
  }

  return (
    <DayList>
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
