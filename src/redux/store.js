import { configureStore } from "@reduxjs/toolkit";
import schedulesReducer from "./reducers/schedulesReducer";
import usersReducer from "./reducers/usersReducer";
import postItsReducer from "./reducers/postItsReducer";
import mapMarksReducer from "./reducers/mapMarkReducer";
import postsReducer from "./reducers/postsReducer";

export default configureStore({
  reducer: {
    posts: postsReducer,
    schedules: schedulesReducer,
    users: usersReducer,
    postIts: postItsReducer,
    mapMarks: mapMarksReducer,
  },
});
