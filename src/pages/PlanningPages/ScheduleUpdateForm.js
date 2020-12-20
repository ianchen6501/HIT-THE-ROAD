import {
  ScheduleDetailForm,
  CloseButton,
  Button,
} from "../../components/ScheduleForm";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEditId, update } from "../../redux/reducers/schedulesReducer";

export default function ScheduleUpdateForm(props) {
  const dispatch = useDispatch();
  const editId = useSelector((store) => store.schedules.editId);
  const { editRoutine, editIndex } = props;

  // 編輯 detail
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [memo, setMemo] = useState("");

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
        <input
          placeholder={start}
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </div>
      <div>
        結束時間：
        <br />
        <input
          placeholder={end}
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>
      <div>
        類別：
        <br />
        <input
          placeholder={category}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
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
