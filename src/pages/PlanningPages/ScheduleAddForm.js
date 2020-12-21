import {
  ScheduleDetailForm,
  CloseButton,
  Button,
} from "../../components/ScheduleForm";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { add, setEditId } from "../../redux/reducers/schedulesReducer";

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
        <br />
        <input value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div>
        開始時間：
        <br />
        <input value={start} onChange={(e) => setStart(e.target.value)} />
      </div>
      <div>
        結束時間：
        <br />
        <input value={end} onChange={(e) => setEnd(e.target.value)} />
      </div>
      <div>
        類別：
        <br />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">--請選擇分類--</option>
          <option value="food">必吃</option>
          <option value="attraction">必去</option>
          <option value="shopping">必買</option>
          <option value="hotel">住宿</option>
        </select>
      </div>
      <div>
        預算：
        <br />
        <input value={budget} onChange={(e) => setBudget(e.target.value)} />
      </div>
      <div>
        備註：
        <br />
        <input value={memo} onChange={(e) => setMemo(e.target.value)} />
      </div>
      <Button disabled={!canSubmit}>確認</Button>
    </ScheduleDetailForm>
  );
}
