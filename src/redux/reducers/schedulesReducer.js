import { createSlice } from "@reduxjs/toolkit";

// orderByStartRoutines 有動的話就要存到 dailyRoutines

let spotId = 0;

export const schedulesReducer = createSlice({
  name: "schedules",
  initialState: {
    dateRange: {
      startDate: 1612195200000,
      endDate: 1612454400000,
    },
    currentDate: null,
    // dailyRoutines 包含各個天數的行程
    dailyRoutines: {
      // "0523": [
      //   {
      //     id: (spotId += 1),
      //     location: "台北10111111111111111",
      //     start: "0800",
      //     end: "1000",
      //     category: "food",
      //     memo: "hohoho",
      //     budget: 100,
      //   },
      // ],
      // "0524": [],
    },
    editId: null,
    // 只有一天的
    orderByStartRoutines: [],
    routes: [],
  },
  reducers: {
    setDates: (state, action) => {
      state.dates = action.payload;
    },

    setDailyRoutinesKey: (state, action) => {
      action.payload.map((date) => {
        return (state.dailyRoutines[date] = []);
      });
    },

    deleteDailyRoutines: (state, action) => {
      state.dailyRoutines[state.currentDate].splice(action.payload, 1);
    },

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
    saveAllDailyRoutines: (state, action) => {
      state.dailyRoutines[action.payload.date] = action.payload.orderRoutines;
    },
    setRoute: (state, action) => {
      console.log("route action: ", action.payload);
      const { originId, directionSteps } = action.payload;
      state.routes.push({ originId, directionSteps });
    },
  },
});

export const {
  setDailyRoutinesKey,
  updateDailyRoutines,
  addDailyRoutines,
  setEditId,
  setCurrentDate,
  setOrderByStartRoutines,
  addDailyRoutinesFromPostIt,
  deleteDailyRoutines,
  saveAllDailyRoutines,
  setRoute,
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
  category,
  start,
  end,
  budget,
  memo,
  id: postItId,
}) => (dispatch) => {
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
