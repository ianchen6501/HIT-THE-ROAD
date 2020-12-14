import { configureStore } from '@reduxjs/toolkit';
import  scheduleReducer from './reducers/scheduleReducer';
import userReducer from './reducers/userReducer';

export default configureStore({
  reducer: {
    schedules: scheduleReducer,
    users: userReducer,
  },
});
