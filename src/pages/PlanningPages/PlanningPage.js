import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { MEDIA_QUERY_SM } from "../../constants/break_point";
import PostItItem from "../../components/PostItItem";
import DayLists from "./DayLists";
import ScheduleAddForm from "./ScheduleAddForm";
import ScheduleUpdateForm from "./ScheduleUpdateForm";
import {
  setEditId,
  setOrderByStartRoutines,
  addFromPostIt,
  deleteSpot,
} from "../../redux/reducers/schedulesReducer";
import {
  setOriginalColumns,
  setDestinationColumn,
  setIsScheduled,
} from "../../redux/reducers/postItsReducer";

const PlanWrapper = styled.div`
  display: flex;
  height: 100vh;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`;

const ScheduleWrapper = styled.div`
  display: flex;
`;

const Schedule = styled.div`
  padding: 20px;
  min-width: 260px;
  background: ${(props) =>
    props.isDraggingOver
      ? props.theme.basicColors.white
      : props.theme.primaryColors.primaryLighter};
  box-shadow: 2px 0 2px gray;

  ${MEDIA_QUERY_SM} {
    width: 100%;
    border-bottom: 3px solid black;
  }
`;

const ScheduleTitle = styled.div`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.basicColors.white};
  text-shadow: 2px 1.2px ${(props) => props.theme.primaryColors.primary};
  font-style: italic;
  font-weight: bold;
`;

const ScheduleList = styled.ul``;

const ScheduleItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  & + & {
    margin-top: 10px;
  }
`;

const ScheduleCategory = styled.div`
  width: 20px;
  height: 36px;
  background: white;
`;

const ScheduleItem = styled.li`
  margin-left: 5px;
  padding: 0 10px;
  width: 120px;
  height: 36px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background: ${(props) => props.theme.primaryColors.primaryDark};
  text-align: center;
  line-height: 36px;
  font-size: ${(props) => props.theme.fontSizes.small};
  color: white;
  cursor: pointer;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  transition: all 0.5s ease-out;

  & + & {
    margin-top: 10px;
  }

  &:hover {
    background: ${(props) => props.theme.primaryColors.primaryDarker};
  }
`;

const ScheduleTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px;
  border: 1px solid ${(props) => props.theme.primaryColors.primaryDark};
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 36px;
  color: ${(props) => props.theme.primaryColors.primaryDark};
`;

const ScheduleTime = styled.div`
  width: 32px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
`;

const DeleteButton = styled.button`
  display: block;
  border: none;
  color: ${(props) => props.theme.primaryColors.primary};
  background: transparent;
`;

const SchedulePlus = styled.button`
  display: block;
  margin: auto;
  width: 120px;
  border: none;
  background: none;
  color: ${(props) => props.theme.primaryColors.primary};
  font-size: ${(props) => props.theme.fontSizes.large};
`;

const MapWrapper = styled.div`
  flex: 1;
  z-index: -1;
`;

export default function PlanningPage() {
  const dispatch = useDispatch();
  const [editRoutine, setEditRoutine] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const dailyRoutines = useSelector((store) => store.schedules.dailyRoutines);
  const orderByStartRoutines = useSelector(
    (store) => store.schedules.orderByStartRoutines
  );
  const currentDate = useSelector((store) => store.schedules.currentDate);
  const editId = useSelector((store) => store.schedules.editId);

  const columns = useSelector((store) => store.postIts.columns);
  const spots = useSelector((store) => store.postIts.spots);

  useEffect(() => {
    dispatch(setEditId(null));
  }, [currentDate, dispatch]);

  useEffect(() => {
    // 根據 start 排列
    if (currentDate && dailyRoutines) {
      const orderRoutines = dailyRoutines[currentDate].slice();
      orderRoutines.sort(function (a, b) {
        return a.start - b.start;
      });
      dispatch(setOrderByStartRoutines(orderRoutines));
    }
  }, [dailyRoutines, currentDate, dispatch]);

  function handleScheduleItemClick(index, routine) {
    setEditRoutine(routine);
    setEditIndex(index);
    editId === index ? dispatch(setEditId(null)) : dispatch(setEditId(index));
  }

  function handleSchedulePlusClick() {
    // 要跳新增框（ScheduleAddForm）
    editId === "add" ? dispatch(setEditId(null)) : dispatch(setEditId("add"));
  }

  // 刪除
  function handleDeleteClick(id) {
    const index = dailyRoutines[currentDate].findIndex(
      (routine) => routine.id === id
    );
    dispatch(deleteSpot(index));
    if (dailyRoutines[currentDate][index].postItId) {
      const postItId = dailyRoutines[currentDate][index].postItId;
      dispatch(setIsScheduled(postItId));
    }
  }

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // 有不同的 column
    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];

    if (startColumn === finishColumn) {
      // 在原 column 裡移動
      const newSpotsIds = Array.from(startColumn.spotsIds); // 避免改變原 array
      newSpotsIds.splice(source.index, 1);
      newSpotsIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        spotsIds: newSpotsIds,
      };

      return dispatch(setOriginalColumns(source.droppableId, newColumn));
    }

    const finishSpotsIds = Array.from(finishColumn.spotsIds);
    finishSpotsIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishColumn,
      spotsIds: finishSpotsIds,
    };

    const spotId = startColumn.spotsIds[source.index]; // 拖曳的 spot id
    const draggingSpot = spots[spotId];
    const { location, category, memo, id } = draggingSpot;
    dispatch(
      addFromPostIt({
        location,
        category,
        memo,
        id,
      })
    );

    dispatch(
      setDestinationColumn(destination.droppableId, newFinish, draggingSpot)
    );
  }

  return (
    //  DropDragContext
    <DragDropContext onDragEnd={onDragEnd}>
      <PlanWrapper>
        {!dailyRoutines && <div>loading</div>}
        {dailyRoutines && (
          <ScheduleWrapper>
            <DayLists />

            <Droppable droppableId={"dailyRoutine"}>
              {(provided, snapshot) => (
                <Schedule
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <ScheduleTitle>{currentDate}</ScheduleTitle>

                  <ScheduleList>
                    {orderByStartRoutines.map((routine, index) => (
                      <ScheduleItemWrapper key={index}>
                        <ScheduleCategory>'test'</ScheduleCategory>
                        <ScheduleItem
                          onClick={() => {
                            handleScheduleItemClick(index, routine);
                          }}
                        >
                          {routine.location}
                        </ScheduleItem>
                        <ScheduleTimeWrapper>
                          <ScheduleTime>{routine.start}</ScheduleTime>
                          <ScheduleTime>{routine.end}</ScheduleTime>
                        </ScheduleTimeWrapper>

                        {/* 刪除 */}
                        <DeleteButton
                          onClick={() => handleDeleteClick(routine.id)}
                        >
                          ✖
                        </DeleteButton>
                      </ScheduleItemWrapper>
                    ))}

                    {/* 新增 */}
                    <ScheduleAddForm />
                    <SchedulePlus onClick={handleSchedulePlusClick}>
                      +
                    </SchedulePlus>
                  </ScheduleList>

                  {provided.placeholder}
                </Schedule>
              )}
            </Droppable>
          </ScheduleWrapper>
        )}

        {editRoutine && (
          <ScheduleUpdateForm editIndex={editIndex} editRoutine={editRoutine} />
        )}

        <MapWrapper>
          <iframe
            title="test"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22094.645005374365!2d121.52617071979361!3d25.063810304921578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a951fdd9f7f9%3A0x7a40c3880c03a171!2z6Ie65YyX5biC56uL576O6KGT6aSo!5e0!3m2!1szh-TW!2stw!4v1607933420613!5m2!1szh-TW!2stw"
            width="100%"
            height="100%"
            frameBorder="0"
            styled={{ border: 0 }}
          ></iframe>
        </MapWrapper>

        <PostItItem />
      </PlanWrapper>
    </DragDropContext>
  );
}
