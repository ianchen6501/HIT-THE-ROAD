import { createSlice } from "@reduxjs/toolkit";

import { getScheduleContent, savePostItsAPI } from "../../webAPI";

export const postItsReducer = createSlice({
  name: "postIt",
  initialState: {
    isLoading: true,
    postItId: null,
    spots: {
      // [`spot-${id}`]: {
      //   id: "spot-1",
      //   location: "台北101",
      //   category: "food",
      //   memo: "hohoho",
      //   isScheduled: false,
      // },
    },
    columns: {
      postIt: {
        id: "postIt",
        spotsIds: [],
      },
      dailyRoutine: {
        id: "dailyRoutine",
        spotsIds: [],
      },
    },
    columnsOrder: ["postIt", "dailyRoutine"],
    isPostItsSaved: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsPostItsSaved: (state, action) => {
      state.isPostItsSaved = action.payload;
    },
    setSpots: (state, action) => {
      state.spots = action.payload;
    },
    setPostItId: (state, action) => {
      state.postItId = action.payload;
    },
    setSpotsIds: (state, action) => {
      state.columns.postIt.spotsIds = action.payload;
    },
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
      state.postItId += 1;
      state.spots = {
        ...state.spots,
        [`spot-${state.postItId}`]: {
          id: `spot-${state.postItId}`,
          location,
          category,
          memo,
          isScheduled: false,
        },
      };
      state.columns.postIt.spotsIds.push(`spot-${state.postItId}`);
    },
    addPostItFromMark: (state, action) => {
      const { location, memo, placeId } = action.payload;
      state.postItId += 1;
      state.spots = {
        ...state.spots,
        [`spot-${state.postItId}`]: {
          id: `spot-${state.postItId}`,
          location,
          memo,
          placeId,
          isScheduled: false,
        },
      };
      state.columns.postIt.spotsIds.push(`spot-${state.postItId}`);
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
  setSpots,
  setSpotsIds,
  setPostItId,
  setIsPostItsSaved,
  setIsLoading,
} = postItsReducer.actions;

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

export const initPostIts = (userId, scheduleId) => (dispatch) => {
  dispatch(setIsLoading(true));
  getScheduleContent(userId, scheduleId)
    .then((res) => {
      res.spots === null
        ? dispatch(setSpots({}))
        : dispatch(setSpots(res.spots));
    })
    .catch((error) => console.error(error));
  getScheduleContent(userId, scheduleId)
    .then((res) => {
      res.spotsIds === null
        ? dispatch(setSpotsIds([]))
        : dispatch(setSpotsIds(res.spotsIds));
    })
    .catch((error) => console.error(error));
  getScheduleContent(userId, scheduleId)
    .then((res) => {
      dispatch(setPostItId(res.postItId));
    })
    .catch((error) => console.error(error));
  dispatch(setIsLoading(false));
};

export const savePostIts = (spots, spotsIds, postItId, userId, scheduleId) => (
  dispatch
) => {
  savePostItsAPI(spots, spotsIds, postItId, userId, scheduleId)
    .then((res) => {
      if (res.ok === true) {
        dispatch(setIsPostItsSaved(true));
      } else {
        dispatch(setIsPostItsSaved(true));
      }
    })
    .catch((error) => console.error(error));
};

export default postItsReducer.reducer;
