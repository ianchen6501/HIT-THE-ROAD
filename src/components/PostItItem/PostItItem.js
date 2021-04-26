import styled from "styled-components";
import { CloseButton, Button } from "../ScheduleForm";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCampground,
  faHotel,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

import {
  deletePostIt,
  addPostIt,
  updatePostIt,
} from "../../redux/reducers/postItsReducer";

import { deleteMapMarkByPlaceId } from "../../redux/reducers/mapMarkReducer";
import { MEDIA_QUERY_SM } from "../../constants/break_point";

const Wrapper = styled.div``;

// droppable
const PostItWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-shadow: -2px 0px 2px grey;
  padding: 20px;
  height: 100%;
  background: ${(props) =>
    props.isDraggingOver
      ? props.theme.basicColors.white
      : props.theme.primaryColors.primaryLighter};
  overflow: auto;

  ${MEDIA_QUERY_SM} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

// draggable
const PostIt = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 5px;
  padding: 5px;
  width: 90px;
  min-height: 90px;
  background: ${(props) =>
    props.isDragging
      ? props.theme.secondaryColors.secondaryLighter
      : props.theme.basicColors.white};
  opacity: ${(props) => (props.isScheduled ? ".3" : "1")};
  box-shadow: 0px 2px 2px grey;
  overflow: hidden;
  font-size: 12px;

  ${MEDIA_QUERY_SM} {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const PostItInfo = styled.div`
  flex: 1;
  font-size: ${(props) => props.theme.fontSizes.extraSmall};

  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostItButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2px;
`;

const DeleteButton = styled.button`
  display: block;
  padding: 0;
  border: none;
  background: transparent;

  &:hover {
    color: ${(props) => props.theme.primaryColors.primaryDark};
  }
`;

const UpdateButton = styled(DeleteButton)``;

const AddPostItWrapper = styled.button`
  display: block;
  padding: 5px;
  width: 90px;
  height: 90px;
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
  position: fixed;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  padding: 20px;
  z-index: 2;
  background: ${(props) => props.theme.secondaryColors.secondaryDarker};
  box-shadow: 1px 3px 5px gray;
  border-radius: 5px;
  color: ${(props) => props.theme.basicColors.white};
  font-size: ${(props) => props.theme.fontSizes.small};

  & input {
    margin-bottom: 5px;
    padding: 2px;
    outline: none;
    border: none;
    color: ${(props) => props.theme.secondaryColors.secondaryDark};

    &:focus {
      background: ${(props) => props.theme.primaryColors.primaryLighter};
    }
  }

  & select {
    width: 100%;
    outline: none;
    color: ${(props) => props.theme.secondaryColors.secondaryDark};
  }

  & textarea {
    color: ${(props) => props.theme.secondaryColors.secondaryDark};
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

  function handleDeletePostItClick(id, index) {
    const placeId = spots[id].placeId;
    dispatch(deletePostIt({ id, index }));
    // 要刪掉相對應的 marker
    dispatch(deleteMapMarkByPlaceId(placeId));
    // dispatch(setIsMarkDeleted(placeId));
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
    <Wrapper>
      <Droppable droppableId={"postIt"}>
        {(provided, snapshot) => (
          <PostItWrapper
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {spots &&
              spotIds &&
              spotIds.map((id, index) => (
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
                        <div>
                          {spots[id].category === "hotel" && (
                            <FontAwesomeIcon icon={faHotel} />
                          )}
                          {spots[id].category === "shopping" && (
                            <FontAwesomeIcon icon={faShoppingBag} />
                          )}
                          {spots[id].category === "food" && (
                            <FontAwesomeIcon icon={faUtensils} />
                          )}
                          {spots[id].category === "attraction" && (
                            <FontAwesomeIcon icon={faCampground} />
                          )}
                        </div>
                        <div>{spots[id].location}</div>
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
    </Wrapper>
  );
}
