import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { useSelector } from "react-redux";

// TODO: droppable
const PostItWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 20px;
  width: 120px;
  height: 100vh;
  background: ${(props) => (props.isDraggingOver ? "white" : "wheat")};
`;

// draggable
const PostIt = styled.div`
  margin-bottom: 5px;
  padding: 5px;
  width: 80px;
  height: 80px;
  background: ${(props) =>
    props.isDragging ? "lightgreen" : props.isScheduled ? "gray" : "white"};
  box-shadow: 0px 2px 2px grey;
  overflow: hidden;
`;

export default function PostItItem() {
  const spots = useSelector((store) => store.postIts.spots);
  const columns = useSelector((store) => store.postIts.columns);
  const column = columns["postIt"];
  const spotIds = column.spotsIds; // ["spot-1", "spot-2", "spot-3", "spot-4" ]

  return (
    <Droppable droppableId={"postIt"}>
      {(provided, snapshot) => (
        <PostItWrapper
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {spotIds.map((id, index) => (
            <Draggable
              draggableId={id}
              index={index}
              key={id}
              isDragDisabled={spots[id].isScheduled}
            >
              {(provided, snapshot) => (
                <PostIt
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  isDragging={snapshot.isDragging}
                  isScheduled={spots[id].isScheduled}
                >
                  <div>景點：{spots[id].location}</div>
                  <div>
                    時間：{spots[id].start} ~ {spots[id].end}
                  </div>
                  <div>類別：{spots[id].category}</div>
                  <div>預算：{spots[id].budget}</div>
                  <div>備註：{spots[id].memo}</div>
                </PostIt>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </PostItWrapper>
      )}
    </Droppable>
  );
}
