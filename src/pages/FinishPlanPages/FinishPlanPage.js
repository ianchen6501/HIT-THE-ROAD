import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/break_point";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFinishPlan } from "../../redux/reducers/finishPlanReducer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCampground,
  faHotel,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  margin: 0px auto;
  padding-top: ${(props) => props.theme.heights.header};
  margin-bottom: ${(props) => props.theme.heights.footer};
  padding-bottom: ${(props) => props.theme.heights.footer};
  padding-left: 20px;
  padding-right: 20px;
  max-width: ${(props) => props.theme.Wrappers.largeWidth};
  min-height: 100vh;

  ${MEDIA_QUERY_SM} {
    width: ${(props) => props.theme.Wrappers.smallWidth};
  }
`;

const PlanHeader = styled.div`
  position: relative;
  margin: 60px auto 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  word-break: break-all;
`;

const PlanLocation = styled.div`
  margin-right: 5px;
  padding: 5px;
  width: 60px;
  border-radius: 5px;
  background: ${(props) => props.theme.secondaryColors.secondaryLighter};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
`;

const PlanTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
`;

const PlanWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`;

const PlanColumn = styled.div`
  width: 420px;
  margin: 10px;
  border: 1px solid ${(props) => props.theme.primaryColors.primaryLighter};
  border-radius: 5px;

  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`;

const RoutineTitle = styled.div`
  padding: 2px 10px;
  font-size: ${(props) => props.theme.fontSizes.mudium};
  font-style: italic;
  background: ${(props) => props.theme.primaryColors.primaryLighter};
  color: ${(props) => props.theme.primaryColors.primaryDarker};
  font-weight: bold;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RoutineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 420px;

  overflow: auto;
`;

const Spot = styled.div`
  width: 100%;
  & + & {
    margin-top: 5px;
  }
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
`;

const SpotInfo = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.secondaryColors.secondaryLighter};
  border-radius: 5px;
`;

const SpotName = styled.div`
  padding: 0 2px;
`;

const TimeWrapper = styled.div`
  width: 100px;
  border: 1px solid ${(props) => props.theme.secondaryColors.secondaryLighter};
  background: ${(props) => props.theme.secondaryColors.secondaryLighter};
  text-align: center;
`;

const SpotCategory = styled.div`
  margin-left: 5px;
  width: 32px;
`;

const SpotMemo = styled.div`
  padding: 5px 0;
  word-break: break-all;
`;

export default function FinishPlanPage() {
  const dispatch = useDispatch();
  const scheduleName = useSelector((store) => store.finishPlans.scheduleName);
  const dailyRoutines = useSelector((store) => store.finishPlans.dailyRoutines);
  const location = useSelector((store) => store.finishPlans.location);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const datesTest = [];
    if (dailyRoutines) {
      Object.keys(dailyRoutines).map((key) => datesTest.push(key));
    }
    setDates(datesTest);
  }, [dailyRoutines, dispatch]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const scheduleId = sessionStorage.getItem("scheduleId");
    dispatch(getFinishPlan(userId, scheduleId));
  }, [dispatch]);

  return (
    <Wrapper>
      {scheduleName && dailyRoutines && location && (
        <div>
          <PlanHeader>
            <PlanLocation>{location}</PlanLocation>
            <PlanTitle>{scheduleName}</PlanTitle>
          </PlanHeader>
          <PlanWrapper>
            {dates &&
              dates.map((date) => (
                <PlanColumn key={date}>
                  <RoutineTitle>
                    {new Date(Number(date)).toLocaleString([], {
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </RoutineTitle>
                  <RoutineWrapper>
                    {dailyRoutines[date] &&
                      dailyRoutines[date].map((routine) => (
                        <Spot key={routine.id}>
                          <SpotInfo>
                            <SpotCategory>
                              {routine.category === "hotel" && (
                                <FontAwesomeIcon icon={faHotel} />
                              )}
                              {routine.category === "shopping" && (
                                <FontAwesomeIcon icon={faShoppingBag} />
                              )}
                              {routine.category === "food" && (
                                <FontAwesomeIcon icon={faUtensils} />
                              )}
                              {routine.category === "attraction" && (
                                <FontAwesomeIcon icon={faCampground} />
                              )}
                            </SpotCategory>
                            <SpotName>{routine.location}</SpotName>
                            <TimeWrapper>
                              {" "}
                              {new Date(routine.start).toLocaleTimeString([], {
                                timeStyle: "short",
                                hour12: false,
                              })}{" "}
                              ~{" "}
                              {new Date(routine.end).toLocaleTimeString([], {
                                timeStyle: "short",
                                hour12: false,
                              })}
                            </TimeWrapper>
                          </SpotInfo>
                          <SpotMemo>{routine.memo}</SpotMemo>
                        </Spot>
                      ))}
                  </RoutineWrapper>
                </PlanColumn>
              ))}
          </PlanWrapper>
        </div>
      )}
    </Wrapper>
  );
}

// scheduleName
// location
// dailyRoutines.key 每天
// dailyRoutines.key 下面每天行程
// location
// category
// memo
