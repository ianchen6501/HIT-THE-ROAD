import { createSlice } from "@reduxjs/toolkit";

// TODO: orderByStartRoutines 有動的話就要存到 dailyRoutines

let spotId = 0;

export const schedulesReducer = createSlice({
  name: "schedules",
  initialState: {
    currentDate: "0523",
    // dailyRoutines 包含各個天數的行程
    dailyRoutines: {
      "0523": [
        {
          id: (spotId += 1),
          location: "台北10111111111111111",
          start: "0800",
          end: "1000",
          category: "food",
          memo: "hohoho",
          budget: 100,
        },
      ],
      "0524": [],
    },
    editId: null,
    // 只有一天的
    orderByStartRoutines: [],
  },
  reducers: {
    deleteDailyRoutines: (state, action) => {
      state.dailyRoutines[state.currentDate].splice(action.payload, 1);
    },
    // (state, action) => new state
    updateDailyRoutines: (state, action) => {
      const selectedId = state.orderByStartRoutines[state.editId].id;
      state.dailyRoutines[state.currentDate].map((routine, index) =>
        routine.id === selectedId
          ? (state.dailyRoutines[state.currentDate][index] = {
              ...action.payload,
              id: selectedId,
            })
          : routine
      );
    },
    addDailyRoutines: (state, action) => {
      state.dailyRoutines[state.currentDate].push({
        ...action.payload,
        id: (spotId += 1),
      });
    },
    addDailyRoutinesFromPostIt: (state, action) => {
      console.log("action: ", action.payload);
      state.dailyRoutines[state.currentDate].push({
        ...action.payload,
        id: (spotId += 1),
      });
    },
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setOrderByStartRoutines: (state, action) => {
      state.orderByStartRoutines = action.payload;
    },
  },
});

export const {
  updateDailyRoutines,
  addDailyRoutines,
  setEditId,
  setCurrentDate,
  setOrderByStartRoutines,
  addDailyRoutinesFromPostIt,
  deleteDailyRoutines,
} = schedulesReducer.actions;

// thunk async logic
export const update = ({ location, start, end, category, budget, memo }) => (
  dispatch
) => {
  dispatch(
    updateDailyRoutines({ location, start, end, category, budget, memo })
  );
};

export const add = ({ location, start, end, category, budget, memo }) => (
  dispatch
) => {
  dispatch(addDailyRoutines({ location, start, end, category, budget, memo }));
};

export const addFromPostIt = ({
  location,
  start,
  end,
  category,
  budget,
  memo,
  id: postItId,
}) => (dispatch) => {
  console.log("postItId: ", postItId);
  dispatch(
    addDailyRoutinesFromPostIt({
      location,
      start,
      end,
      category,
      budget,
      memo,
      postItId,
    })
  );
};

export const deleteSpot = (index) => (dispatch) => {
  dispatch(deleteDailyRoutines(index));
};

export default schedulesReducer.reducer;
