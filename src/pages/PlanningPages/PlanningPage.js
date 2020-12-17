import styled from "styled-components";

import { useState, useEffect } from "react";

import { MEDIA_QUERY_SM } from "../../constants/break_point";

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

const DayList = styled.div`
  display: flex;
  flex-direction: column;
  background: black;
`;

const DayButton = styled.button`
  margin-left: 5px;
  background: wheat;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: none;
  border-bottom: 1px solid black;
  height: 36px;

  ${(props) =>
    props.$active &&
    `
    background: gray;
  `}
`;

const Schedule = styled.div`
  padding: 20px;
  min-width: 240px;
  background: gray;

  ${MEDIA_QUERY_SM} {
    width: 100%;
    border-bottom: 3px solid black;
  }
`;

const ScheduleTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.medium};
  text-align: center;
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
  background: wheat;
`;

const ScheduleItem = styled.li`
  margin-left: 5px;
  padding: 0 10px;
  width: 120px;
  height: 36px;
  line-height: 36px;
  font-size: ${(props) => props.theme.fontSizes.small};
  background: black;
  color: white;
  text-align: center;
  ${"" /* 設定超出寬度的字 */}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  transition: all 1s ease-out;

  & + & {
    margin-top: 10px;
  }

  &:hover {
    cursor: pointer;
    border: 1px solid wheat;
  }
`;

const ScheduleTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px;
  border: 1px solid black;
  border-left: none;
  height: 36px;
`;

const ScheduleTime = styled.div`
  width: 32px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
`;

const SchedulePlus = styled.button`
  display: block;
  margin: auto;
  width: 120px;
  border: none;
  background: none;
  font-size: ${(props) => props.theme.fontSizes.large};
`;

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

const ScheduleAddForm = styled.form`
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

const MapWrapper = styled.div`
  flex: 1;
`;

const PostItWrapper = styled.div`
  position: relative;
  background: pink;
  width: 120px;
  height: 100vh;
`;

const PostItItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: wheat;
  width: 60px;
  height: 60px;
`;

export default function PlannginPage() {
  const [routines, setRoutines] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [editId, setEditId] = useState(null);

  // 編輯 detail

  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [budget, setBudget] = useState("");
  const [memo, setMemo] = useState("");

  // 依 start 排列
  const [orderByStartRoutines, setOrderByStartRoutines] = useState([]);

  useEffect(() => {
    // 之後應該要是使用者選好天數會自動在 useState 時就把初始值設為拿到的第一天
    setCurrentDate("0523");
    // 先建假資料
    setRoutines({
      "0523": [
        {
          location: "台北101",
          start: "0800",
          end: "1000",
          category: "food",
          memo: "hohoho",
          budget: 100,
        },
        {
          location: "微風南山山山山山",
          start: "1100",
          end: "1300",
          category: "food",
          memo: "hao he",
          budget: 300,
        },
      ],
      "0524": [],
    });
  }, []);

  function clearScheduleFormState() {
    setLocation("");
    setStart("");
    setEnd("");
    setBudget("");
    setMemo("");
  }

  function handleScheduleItemClick(index) {
    editId === index ? setEditId(null) : setEditId(index);
    const editSchedule = orderByStartRoutines[index];
    setLocation(editSchedule.location);
    setStart(editSchedule.start);
    setEnd(editSchedule.end);
    setBudget(editSchedule.budget);
    setMemo(editSchedule.memo);
  }

  function handleScheduleDetailFormSubmit(e) {
    e.preventDefault();
    // TODO: 編輯
    setRoutines({
      ...routines,
      [currentDate]: [
        ...routines[currentDate],
        {
          ...routines[currentDate][0],
          location,
          start,
          end,
          budget,
          memo,
        },
      ],
    });
    setEditId(null);
    clearScheduleFormState();
  }

  useEffect(() => {
    setEditId(null);
  }, [currentDate]);

  function handleSchedulePlusClick() {
    // 要跳新增框（ScheduleAddForm）
    editId === "add" ? setEditId(null) : setEditId("add");
    clearScheduleFormState();
  }

  function handleAddScheduleSubmit(e) {
    e.preventDefault();
    setRoutines({
      ...routines,
      [currentDate]: [
        ...routines[currentDate],
        { location, start, end, budget, memo },
      ],
    });
    setEditId(null);
    clearScheduleFormState();
  }

  useEffect(() => {
    // 根據 start 排列
    if (currentDate) {
      const orderRoutines = routines[currentDate].slice();
      orderRoutines.sort(function (a, b) {
        return a.start - b.start;
      });
      setOrderByStartRoutines(orderRoutines);
    }
  }, [routines, currentDate]);

  const canSubmit = Boolean(location) && Boolean(start);

  return (
    <PlanWrapper>
      {!routines && <div>loading</div>}
      {routines && (
        <ScheduleWrapper>
          <DayList>
            {Object.keys(routines).map((date) => (
              <DayButton
                onClick={() => {
                  setCurrentDate(date);
                }}
                $active={currentDate === date}
                key={date}
              >
                {date}
              </DayButton>
            ))}
          </DayList>
          <Schedule>
            <ScheduleTitle>{currentDate}</ScheduleTitle>
            <ScheduleList>
              {orderByStartRoutines.map((routine, index) => (
                <ScheduleItemWrapper key={index}>
                  <ScheduleCategory />
                  <ScheduleItem
                    onClick={() => {
                      handleScheduleItemClick(index);
                    }}
                  >
                    {routine.location}
                  </ScheduleItem>
                  <ScheduleTimeWrapper>
                    <ScheduleTime>{routine.start}</ScheduleTime>
                    <ScheduleTime>{routine.end}</ScheduleTime>
                  </ScheduleTimeWrapper>

                  {/* 編輯景點 */}
                  <ScheduleDetailForm
                    $isEdit={editId === index}
                    onSubmit={(e) => handleScheduleDetailFormSubmit(e)}
                  >
                    <CloseButton
                      onClick={() => {
                        setEditId(null);
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
                </ScheduleItemWrapper>
              ))}

              {/* 新增 */}
              <ScheduleAddForm
                $isEdit={editId === "add"}
                onSubmit={(e) => handleAddScheduleSubmit(e)}
              >
                <CloseButton
                  onClick={() => {
                    setEditId(null);
                  }}
                >
                  ✖
                </CloseButton>
                <div>
                  景點：
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div>
                  開始時間：
                  <input
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>
                <div>
                  結束時間：
                  <input value={end} onChange={(e) => setEnd(e.target.value)} />
                </div>
                <div>
                  預算：
                  <input
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
                <div>
                  備註：
                  <input
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                  />
                </div>
                <Button disabled={!canSubmit}>確認</Button>
              </ScheduleAddForm>

              <SchedulePlus onClick={handleSchedulePlusClick}>+</SchedulePlus>
            </ScheduleList>
          </Schedule>
        </ScheduleWrapper>
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

      <PostItWrapper>
        <PostItItem></PostItItem>
      </PostItWrapper>
    </PlanWrapper>
  );
}
