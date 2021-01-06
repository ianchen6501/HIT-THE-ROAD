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

import {
  Wrapper,
  PlanHeader,
  PlanLocation,
  PlanTitle,
  PlanWrapper,
  PlanColumn,
  RoutineTitle,
  RoutineWrapper,
  Spot,
  SpotInfo,
  SpotName,
  TimeWrapper,
  SpotCategory,
  SpotMemo,
} from "../../components/PlanTemplate";

export default function FinishPlanPage() {
  const dispatch = useDispatch();
  const scheduleName = useSelector((store) => store.finishPlans.scheduleName);
  const dailyRoutines = useSelector((store) => store.finishPlans.dailyRoutines);
  const isLoading = useSelector((store) => store.finishPlans.isLoading);
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
      {!isLoading && scheduleName && dailyRoutines && location && (
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
