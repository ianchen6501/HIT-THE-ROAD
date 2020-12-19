import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEditId, update } from "../../redux/reducers/schedulesReducer";

const ScheduleDetailForm = styled.form`
  display: block;
  position: absolute;
  left: 260px;
  top: 0;
  padding: 20px;
  background: black;
  color: white;
  font-size: ${(props) => props.theme.fontSizes.small};

  ${(props) =>
    !props.$isEdit &&
    `
    display: none;
  `}
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

export default function ScheduleUpdateForm(props) {
  const dispatch = useDispatch();
  const editId = useSelector((store) => store.schedules.editId);
  const { index, routine } = props;

  // 編輯 detail
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [memo, setMemo] = useState("");

  // TODO: 可以抽出去到 utils
  function clearScheduleFormState() {
    setLocation("");
    setStart("");
    setCategory("");
    setEnd("");
    setBudget("");
    setMemo("");
  }

  // 編輯
  function handleScheduleUpdateFormSubmit(e) {
    e.preventDefault();
    dispatch(update({ location, start, end, category, budget, memo }));
    dispatch(setEditId(null));
    clearScheduleFormState();
  }

  const canSubmit = Boolean(location) && Boolean(start);

  return (
    <ScheduleDetailForm
      $isEdit={editId === index}
      onSubmit={(e) => handleScheduleUpdateFormSubmit(e)}
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
        <input
          placeholder={routine.location}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        開始時間：
        <input
          placeholder={routine.start}
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </div>
      <div>
        結束時間：
        <input
          placeholder={routine.end}
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>
      <div>
        類別：
        <input
          placeholder={routine.end}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        預算：
        <input
          placeholder={routine.budget}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>
      <div>
        備註：
        <input
          placeholder={routine.memo}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>
      <Button disabled={!canSubmit}>確認</Button>
    </ScheduleDetailForm>
  );
}
