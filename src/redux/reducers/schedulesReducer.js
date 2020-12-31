import { createSlice } from "@reduxjs/toolkit";
import {
  getScheduleContent,
  saveRoutesAPI,
  saveDailyRoutinesAPI,
  saveDailyRoutinesKeyAPI,
} from "../../webAPI";

// orderByStartRoutines 有動的話就要存到 dailyRoutines

export const schedulesReducer = createSlice({
  name: "schedules",
  initialState: {
    spotId: null, // TODO:
    dateRange: {
      // startDate: 1612195200000,
      // endDate: 1612454400000,
    },
    currentDate: null,
    // dailyRoutines 包含各個天數的行程
    dailyRoutines: {},
    // {
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
    // },
    editId: null,
    // 只有一天的
    orderByStartRoutines: [],
    routes: [],
  },
  reducers: {
    // setDates: (state, action) => {
    //   state.dates = action.payload;
    // },
    setSpotId: (state, action) => {
      state.spotId = action.payload;
    },
    setDailyRoutines: (state, action) => {
      state.dailyRoutines = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    // 和 setDailyRoutines 打架
    // setDailyRoutinesKey: (state, action) => {
    //   action.payload.map((date) => {
    //     return (state.dailyRoutines[date] = []);
    //   });
    // },
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
        id: (state.spotId += 1),
      });
      // state.spotId + 1;
    },
    addDailyRoutinesFromPostIt: (state, action) => {
      state.dailyRoutines[state.currentDate].push({
        ...action.payload,
        id: (state.spotId += 1),
      });
      // state.spotId += 1;
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
    setRoutes: (state, action) => {
      state.routes = action.payload;
    },
    setRoute: (state, action) => {
      const { originId, directionSteps } = action.payload;
      state.routes.push({ originId, directionSteps });
    },
    updateRoute: (state, action) => {
      const { originId, directionSteps } = action.payload;
      state.routes.map((route) => {
        if (route.originId === originId) {
          return (route.directionSteps = directionSteps);
        } else {
          return route.directionSteps;
        }
      });
    },
    deleteRouteByOriginId: (state, action) => {
      state.routes = state.routes.filter(
        (route) => route.originId !== action.payload
      );
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
  updateRoute,
  deleteRouteByOriginId,
  setDateRange,
  setRoutes,
  setDailyRoutines,
  setSpotId,
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

export const initSchedules = (userId, scheduleId) => (dispatch) => {
  getScheduleContent(userId, scheduleId).then((res) =>
    dispatch(setDateRange(res.dateRange))
  );
  getScheduleContent(userId, scheduleId).then((res) =>
    res.routes === null
      ? dispatch(setRoutes([]))
      : dispatch(setRoutes(res.routes))
  );
  // TODO: 邏輯有問題
  getScheduleContent(userId, scheduleId).then((res) =>
    // dispatch(setDailyRoutines(res.dailyRoutines))
    dispatch(setDailyRoutines(res.dailyRoutines))
  );
  getScheduleContent(userId, scheduleId).then((res) =>
    dispatch(setSpotId(res.spotId))
  );
};

// TODO:
export const initDailyRoutinesKey = (dates, userId, scheduleId) => (
  dispatch
) => {
  const dailyRoutines = {};
  dates.map((date) => (dailyRoutines[date] = []));
  saveDailyRoutinesKeyAPI(dailyRoutines, userId, scheduleId);
};

export const saveRoutes = (routes, userId, scheduleId) => (dispatch) => {
  saveRoutesAPI(routes, userId, scheduleId);
};

// TODO:
export const saveDailyRoutines = (
  dates,
  dailyRoutines,
  spotId,
  userId,
  scheduleId
) => (dispatch) => {
  const saveRoutines = {};
  for (let i = 0; i < dates.length; i++) {
    const orderRoutines = dailyRoutines[dates[i]].slice();
    orderRoutines.sort(function (a, b) {
      return a.start - b.start;
    });
    const date = dates[i];
    dispatch(saveAllDailyRoutines({ date, orderRoutines }));
    saveRoutines[date] = orderRoutines;
  }
  saveDailyRoutinesAPI(saveRoutines, spotId, userId, scheduleId);
};

export default schedulesReducer.reducer;