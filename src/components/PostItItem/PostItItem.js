import styled from "styled-components";
import { CloseButton, Button } from "../ScheduleForm";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deletePostIt,
  addPostIt,
  updatePostIt,
} from "../../redux/reducers/postItsReducer";

// droppable
const PostItWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-shadow: -2px 0px 2px grey;
  padding: 20px;
  width: 120px;
  height: 100vh;
  background: ${(props) =>
    props.isDraggingOver
      ? props.theme.basicColors.white
      : props.theme.primaryColors.primaryLighter};
`;

// draggable
const PostIt = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 5px;
  padding: 5px;
  width: 80px;
  height: 80px;
  background: ${(props) =>
    props.isDragging
      ? props.theme.secondaryColors.secondaryLighter
      : props.theme.basicColors.white};
  opacity: ${(props) => (props.isScheduled ? ".3" : "1")};
  box-shadow: 0px 2px 2px grey;
  overflow: hidden;
  font-size: 12px;
`;

const PostItInfo = styled.div`
  flex: 1;
`;

const PostItButtons = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
`;

const DeleteButton = styled.button`
  display: block;
  border: none;
  background: transparent;

  &:hover {
    color: pink;
  }
`;

const UpdateButton = styled(DeleteButton)``;

const AddPostItWrapper = styled.button`
  display: block;
  padding: 5px;
  width: 80px;
  height: 80px;
  border: dashed 1px ${(props) => props.theme.primaryColors.primary};
  background: ${(props) => props.theme.primaryColors.primaryLight};
  opacity: 0.5;
  transition: all 0.5s ease;

  &:hover {
    border: dashed 1px ${(props) => props.theme.primaryColors.primaryDarker};
  }
`;

const AddPostIt = styled.div`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.primaryColors.primaryDark};
  font-size: 36px;
  text-align: center;
  opacity: 0;
  transition: all 0.5s ease;

  &:hover {
    opacity: 1;
  }
`;

const PostItForm = styled.form`
  display: block;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  padding: 20px;
  z-index: 2;
  background: ${(props) => props.theme.secondaryColors.secondaryDarker};
  box-shadow: 1px 3px 5px gray;
  border-radius: 5px;
  color: white;
  font-size: ${(props) => props.theme.fontSizes.small};

  & input {
    margin-bottom: 5px;
    padding: 2px;
    outline: none;
    border: none;

    &:focus {
      background: ${(props) => props.theme.primaryColors.primaryLighter};
    }
  }

  & select {
    outline: none;
  }
`;

export default function PostItItem() {
  const dispatch = useDispatch();
  const [isAddClick, setIsAddClick] = useState(false);
  const [isUpdateClick, setIsUpdateClick] = useState(false);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [memo, setMemo] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const spots = useSelector((store) => store.postIts.spots);
  const columns = useSelector((store) => store.postIts.columns);
  const column = columns["postIt"];
  const spotIds = column.spotsIds;

  console.log("category: ", category);

  function handleDeletePostItClick(id, index) {
    dispatch(deletePostIt({ id, index }));
  }

  function handleAddPostItClick() {
    setIsAddClick(!isAddClick);
    setIsUpdateClick(false);
    clearPostItState();
  }

  function clearPostItState() {
    setLocation("");
    setMemo("");
    setCategory("");
  }

  function handleUpdatePostItClick(id) {
    setIsUpdateClick(!isUpdateClick);
    setIsAddClick(false);
    setLocation(spots[id].location);
    setMemo(spots[id].memo);
    setCategory(spots[id].category);
    setUpdateId(id);
  }

  function handlePostItFormSubmit(e) {
    e.preventDefault();
    dispatch(addPostIt({ location, category, memo }));
    setIsAddClick(false);
  }

  function handleUpdatePostItFormSubmit(e) {
    e.preventDefault();
    dispatch(updatePostIt({ updateId, location, category, memo }));
    setIsUpdateClick(false);
  }

  const canSubmit = Boolean(location) && Boolean(category);

  return (
    <div>
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
                    <PostItInfo>
                      <div>{spots[id].location}</div>
                      <div>{spots[id].category}</div>
                      <div>{spots[id].memo}</div>
                    </PostItInfo>
                    <PostItButtons>
                      <DeleteButton
                        onClick={() => handleDeletePostItClick(id, index)}
                      >
                        ✖
                      </DeleteButton>
                      <UpdateButton
                        onClick={() => handleUpdatePostItClick(id, index)}
                      >
                        &#9998;
                      </UpdateButton>
                    </PostItButtons>
                  </PostIt>
                )}
              </Draggable>
            ))}
            <AddPostItWrapper onClick={handleAddPostItClick}>
              <AddPostIt>{isAddClick ? "-" : "+"}</AddPostIt>
            </AddPostItWrapper>
            {provided.placeholder}
          </PostItWrapper>
        )}
      </Droppable>
      {isUpdateClick && (
        <PostItForm onSubmit={(e) => handleUpdatePostItFormSubmit(e)}>
          <CloseButton onClick={() => setIsUpdateClick(false)}>✖</CloseButton>
          <div>
            地點
            <br />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            分類
            <br />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">--請選擇分類--</option>
              <option value="food">必吃</option>
              <option value="attraction">必去</option>
              <option value="shopping">必買</option>
              <option value="hotel">住宿</option>
            </select>
          </div>
          <div>
            備註
            <br />
            <textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
          </div>
          <Button disabled={!canSubmit}>送出</Button>
        </PostItForm>
      )}
      {isAddClick && (
        <PostItForm onSubmit={(e) => handlePostItFormSubmit(e)}>
          <CloseButton onClick={() => setIsAddClick(false)}>✖</CloseButton>
          <div>
            地點
            <br />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            分類
            <br />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">--請選擇分類--</option>
              <option value="food">必吃</option>
              <option value="attraction">必去</option>
              <option value="shopping">必買</option>
              <option value="hotel">住宿</option>
            </select>
          </div>
          <div>
            備註
            <br />
            <textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
          </div>
          <Button disabled={!canSubmit}>送出</Button>
        </PostItForm>
      )}
    </div>
  );
}
