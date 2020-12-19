import { createSlice } from "@reduxjs/toolkit";

export const postItsReducer = createSlice({
  name: "postIt",
  initialState: {
    spots: {
      "spot-1": {
        id: "spot-1",
        location: "台北101",
        start: "0800",
        end: "1000",
        category: "food",
        memo: "hohoho",
        budget: 100,
        isScheduled: false,
      },
      "spot-2": {
        id: "spot-2",
        location: "微風南山山山山山",
        start: "1100",
        end: "1300",
        category: "food",
        memo: "hao he",
        budget: 300,
      },
      "spot-3": {
        id: "spot-3",
        location: "小樹屋",
        start: "1100",
        end: "1300",
        category: "food",
        memo: "hao he",
        budget: 300,
        isScheduled: false,
      },
      "spot-4": {
        id: "spot-4",
        location: "無處可去",
        start: "1100",
        end: "1300",
        category: "food",
        memo: "hao he",
        budget: 300,
        isScheduled: false,
      },
    },
    columns: {
      postIt: {
        id: "postIt",
        spotsIds: ["spot-1", "spot-2", "spot-3", "spot-4"],
      },
      dailyRoutine: {
        id: "dailyRoutine",
        spotsIds: [],
      },
    },
    columnsOrder: ["postIt", "dailyRoutine"],
  },
  reducers: {
    // (state, action) => new state
    setStartColumns: (state, action) => {
      state.columns[action.payload.sourceId].spotsIds =
        action.payload.newStart.spotsIds;
    },
    setFinishColumns: (state, action) => {
      state.columns[action.payload.destinationId].spotsIds =
        action.payload.newFinish.spotsIds;
    },
    setIsScheduled: (state, action) => {
      state.spots[action.payload].isScheduled = !state.spots[action.payload]
        .isScheduled;
    },
  },
});

export const {
  setStartColumns,
  setFinishColumns,
  setIsScheduled,
} = postItsReducer.actions;

// thunk async logic
export const setOriginalColumns = (sourceId, newStart) => (dispatch) => {
  dispatch(setStartColumns({ sourceId, newStart }));
};

export const setChangedColumns = (
  sourceId,
  destinationId,
  newStart,
  newFinish
) => (dispatch) => {
  dispatch(setStartColumns({ sourceId, newStart }));
  dispatch(setFinishColumns({ destinationId, newFinish }));
};

export const setDestinationColumn = (
  destinationId,
  newFinish,
  draggingSpot
) => (dispatch) => {
  dispatch(setFinishColumns({ destinationId, newFinish }));
  dispatch(setIsScheduled(draggingSpot.id));
};

export default postItsReducer.reducer;
