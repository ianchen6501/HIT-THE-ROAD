import {
  ScheduleDetailForm,
  CloseButton,
  Button,
} from "../../components/ScheduleForm";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { setEditId, update } from "../../redux/reducers/schedulesReducer";

export default function ScheduleUpdateForm(props) {
  const dispatch = useDispatch();
  const editId = useSelector((store) => store.schedules.editId);
  const { editRoutine, editIndex } = props;
  const currentDate = useSelector((store) => store.schedules.currentDate);

  // 編輯 detail
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [memo, setMemo] = useState("");

  useEffect(() => {
    setStart(currentDate);
  }, [currentDate]);

  useEffect(() => {
    setEnd(start);
  }, [start]);

  useEffect(() => {
    setLocation(editRoutine.location);
    editRoutine.start === undefined
      ? setStart("")
      : setStart(editRoutine.start);
    editRoutine.end === undefined ? setEnd("") : setEnd(editRoutine.end);
    setCategory(editRoutine.category);
    editRoutine.budget === undefined
      ? setBudget("")
      : setBudget(editRoutine.budget);
    setMemo(editRoutine.memo);
  }, [editRoutine]);

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
    setStart(currentDate);
    setEnd(currentDate);
  }

  const canSubmit = Boolean(location) && Boolean(start);

  return (
    <ScheduleDetailForm
      $isEdit={editId === editIndex}
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
        <br />
        <input
          placeholder={location}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div>
        開始時間：
        <br />
        <DatePicker
          selected={start}
          onChange={(date) => setStart(date.getTime())}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      </div>
      <div>
        結束時間：
        <br />
        <DatePicker
          selected={end}
          onChange={(date) => setEnd(date.getTime())}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
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
        <input
          placeholder={budget}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </div>
      <div>
        備註：
        <br />
        <input
          placeholder={memo}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>
      <Button disabled={!canSubmit}>確認</Button>
    </ScheduleDetailForm>
  );
}
