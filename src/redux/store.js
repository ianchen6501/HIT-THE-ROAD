import { configureStore } from "@reduxjs/toolkit";
import schedulesReducer from "./reducers/schedulesReducer";
import userReducer from "./reducers/userReducer";
import postItsReducer from "./reducers/postItsReducer";
import mapMarksReducer from "./reducers/mapMarkReducer";

export default configureStore({
  reducer: {
    schedules: schedulesReducer,
    users: userReducer,
    postIts: postItsReducer,
    mapMarks: mapMarksReducer,
  },
});
