import styled from "styled-components";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { add, setEditId } from "../../redux/reducers/schedulesReducer";

const ScheduleDetailForm = styled.form`
  display: block;
  position: absolute;
  transform: translateX(-50%);
  top: 60px;
  left: 50%;
  padding: 32px;
  border: 1px solid black;
  border-radius: 5px;
  background: white;

  ${(props) =>
    !props.$isEdit &&
    `
    display: none;
  `}

  & div {
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  color: wheat;
  background: transparent;
  cursor: pointer;
`;

const Button = styled.button`
  margin-top: 20px;
  width: 100%;
  background: wheat;
  border: none;
  border-radius: 5px;

  transition: all 1s ease;

  &:disabled {
    opacity: 0;
    width: 50%;
  }
`;

export default function ScheduleAddForm() {
  const dispatch = useDispatch();
  const editId = useSelector((store) => store.schedules.editId);

  // 編輯 detail
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [memo, setMemo] = useState("");

  function handleAddScheduleSubmit(e) {
    e.preventDefault();
    dispatch(add({ location, start, end, category, budget, memo }));
    dispatch(setEditId(null));
    clearScheduleFormState();
  }

  const canSubmit = Boolean(location) && Boolean(start);

  // TODO: 可以抽出去到 utils
  function clearScheduleFormState() {
    setLocation("");
    setStart("");
    setCategory("");
    setEnd("");
    setBudget("");
    setMemo("");
  }

  return (
    <ScheduleDetailForm
      $isEdit={editId === "add"}
      onSubmit={(e) => handleAddScheduleSubmit(e)}
    >
      <CloseButton
        onClick={() => {
          dispatch(setEditId(null));
        }}
      >
        ✖
      </CloseButton>
      <div>
        景點：
        <input value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div>
        開始時間：
        <input value={start} onChange={(e) => setStart(e.target.value)} />
      </div>
      <div>
        結束時間：
        <input value={end} onChange={(e) => setEnd(e.target.value)} />
      </div>
      <div>
        類別：
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div>
        預算：
        <input value={budget} onChange={(e) => setBudget(e.target.value)} />
      </div>
      <div>
        備註：
        <input value={memo} onChange={(e) => setMemo(e.target.value)} />
      </div>
      <Button disabled={!canSubmit}>確認</Button>
    </ScheduleDetailForm>
  );
}
