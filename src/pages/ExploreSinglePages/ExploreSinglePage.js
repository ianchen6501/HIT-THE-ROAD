import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../redux/reducers/postsReducer";

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

const PlanNickname = styled.div`
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.secondaryColors.secondaryLighter};
`;

export default function ExploreSinglePage() {
  let { slug } = useParams();
  const dispatch = useDispatch();
  const scheduleInfo = useSelector((store) => store.posts.singlePost);
  const isLoading = useSelector((store) => store.posts.isLoading);
  const [dates, setDates] = useState([]);
  const [dailyRoutines, setDailyRoutines] = useState();
  const [scheduleName, setScheduleName] = useState();
  const [location, setLocation] = useState();
  const [nickname, setNickname] = useState();

  useEffect(() => {
    const scheduleId = slug;
    dispatch(getSinglePost(scheduleId));
  }, [dispatch, slug]);

  useEffect(() => {
    if (scheduleInfo) {
      setDailyRoutines(scheduleInfo.dailyRoutines);
      setScheduleName(scheduleInfo.scheduleName);
      setLocation(scheduleInfo.location);
      setNickname(scheduleInfo.user);
    }
  }, [scheduleInfo, dailyRoutines]);

  useEffect(() => {
    window.scroll(0, 0);
    const datesTest = [];
    if (dailyRoutines) {
      Object.keys(dailyRoutines).map((key) => datesTest.push(key));
    }
    setDates(datesTest);
  }, [dailyRoutines]);

  return (
    <Wrapper $solidPlate={true}>
      {!isLoading && scheduleName && dailyRoutines && location && nickname && (
        <div>
          <PlanHeader>
            <PlanLocation>{location}</PlanLocation>
            <PlanTitle>{scheduleName}</PlanTitle>
          </PlanHeader>
          <PlanNickname>
            {nickname.fbName ? nickname.fbName : nickname.nickname}
          </PlanNickname>
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
