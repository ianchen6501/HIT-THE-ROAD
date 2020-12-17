import { configureStore } from '@reduxjs/toolkit';
import  schedulesReducer from './reducers/schedulesReducer';
import usersReducer from './reducers/usersReducer';
import postsReducer from './reducers/postsReducer';

export default configureStore({
  reducer: {
    schedules: schedulesReducer,
    users: usersReducer,
    posts: postsReducer,
  },
});
