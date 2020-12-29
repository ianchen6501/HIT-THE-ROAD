import { createSlice } from "@reduxjs/toolkit";

let id = 1;

export const postItsReducer = createSlice({
  name: "postIt",
  initialState: {
    spots: {
      [`spot-${id}`]: {
        id: "spot-1",
        location: "台北101",
        category: "food",
        memo: "hohoho",
        isScheduled: false,
      },
    },
    columns: {
      postIt: {
        id: "postIt",
        spotsIds: ["spot-1"],
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
    deletePostIt: (state, action) => {
      state.columns.postIt.spotsIds.splice(action.payload.index, 1);
      delete state.spots[action.payload.id];
    },
    deletePostItByPlaceId: (state, action) => {
      const id = Object.keys(state.spots).find(
        (key) => state.spots[key].placeId === action.payload
      );
      state.columns.postIt.spotsIds = state.columns.postIt.spotsIds.filter(
        (spotId) => spotId !== id
      );
      delete state.spots[id];
    },
    addPostIt: (state, action) => {
      const { location, category, memo } = action.payload;
      id += 1;
      state.spots = {
        ...state.spots,
        [`spot-${id}`]: {
          id: `spot-${id}`,
          location,
          category,
          memo,
          isScheduled: false,
        },
      };
      state.columns.postIt.spotsIds.push(`spot-${id}`);
    },
    addPostItFromMark: (state, action) => {
      const { location, memo, placeId } = action.payload;
      id += 1;
      state.spots = {
        ...state.spots,
        [`spot-${id}`]: {
          id: `spot-${id}`,
          location,
          memo,
          placeId,
          isScheduled: false,
        },
      };
      state.columns.postIt.spotsIds.push(`spot-${id}`);
    },
    updatePostIt: (state, action) => {
      const { updateId, location, category, memo } = action.payload;
      state.spots[updateId] = {
        ...state.spots[updateId],
        location,
        category,
        memo,
      };
    },
  },
});

export const {
  setStartColumns,
  setFinishColumns,
  setIsScheduled,
  deletePostIt,
  addPostIt,
  addPostItFromMark,
  updatePostIt,
  deletePostItByPlaceId,
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
