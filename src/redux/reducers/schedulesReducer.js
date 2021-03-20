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
    isLoading: false,
    isRouteSaved: false,
    isRoutineSaved: false,
    spotId: null,
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
    scheduleLocations: [
      "全部",
      "台北",
      "新北",
      "桃園",
      "新竹",
      "苗栗",
      "台中",
      "彰化",
      "雲林",
      "嘉義",
      "台南",
      "高雄",
      "屏東",
      "台東",
      "花蓮",
      "宜蘭",
      "南投",
      "離島",
    ],
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsRouteSaved: (state, action) => {
      state.action = action.payload;
    },
    setIsRoutineSaved: (state, action) => {
      state.action = action.payload;
    },
    setSpotId: (state, action) => {
      state.spotId = action.payload;
    },
    setDailyRoutines: (state, action) => {
      state.dailyRoutines = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
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
              postItId: state.dailyRoutines[state.currentDate][index].postItId,
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
    },
    addDailyRoutinesFromPostIt: (state, action) => {
      state.dailyRoutines[state.currentDate].push({
        ...action.payload,
        id: (state.spotId += 1),
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
    setScheduleLocations: (state, action) => {
      state.scheduleLocations = action.payload;
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
  setIsRouteSaved,
  setIsRoutineSaved,
  setIsLoading,
  setScheduleLocations,
} = schedulesReducer.actions;

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
  dispatch(setIsLoading(true));
  getScheduleContent(userId, scheduleId)
    .then((res) => {
      dispatch(setDateRange(res.dateRange));
      dispatch(setRoutes(res.routes));
      dispatch(setSpotId(res.spotId));
    })
    .catch((error) => console.error(error));
  dispatch(setIsLoading(false));
};

// 進到 planning-page 時 call API 拿資料
export const initDailyRoutines = (userId, scheduleId) => (dispatch) => {
  dispatch(setIsLoading(true));
  getScheduleContent(userId, scheduleId)
    .then((res) => {
      dispatch(setDailyRoutines(res.dailyRoutines));
      dispatch(setCurrentDate(res.dateRange.start));
    })
    .catch((error) => console.error(error));
  dispatch(setIsLoading(false));
};

// 新增行程時使用
export const initDailyRoutinesKey = (dates, userId, scheduleId) => (
  dispatch
) => {
  const dailyRoutines = {};
  dates.map((date) => (dailyRoutines[date] = []));
  saveDailyRoutinesKeyAPI(dailyRoutines, userId, scheduleId)
    .then((res) => {
      if (res.ok === true) {
        dispatch(setIsRoutineSaved(true));
      } else {
        dispatch(setIsRoutineSaved(false));
      }
    })
    .catch((error) => console.error(error));
};

export const saveRoutes = (routes, userId, scheduleId) => (dispatch) => {
  saveRoutesAPI(routes, userId, scheduleId)
    .then((res) => {
      if (res.ok === true) {
        dispatch(setIsRouteSaved(true));
      } else {
        dispatch(setIsRouteSaved(false));
      }
    })
    .catch((error) => console.error(error));
};

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
  saveDailyRoutinesAPI(saveRoutines, spotId, userId, scheduleId)
    .then((res) => {
      if (res.ok === true) {
        dispatch(setIsRoutineSaved(true));
      } else {
        dispatch(setIsRoutineSaved(false));
      }
    })
    .catch((error) => console.error(error));
};

export default schedulesReducer.reducer;
