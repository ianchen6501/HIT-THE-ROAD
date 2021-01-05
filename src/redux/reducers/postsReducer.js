import { createSlice } from "@reduxjs/toolkit";
import { getSinglePostAPI } from "../../webAPI";
import { SERVER_URL } from "../../static/static";

export const postsReducer = createSlice({
  name: "schedules",
  initialState: {
    posts: null,
    post: null,
    singlePost: {},
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSinglePost: (state, action) => {
      const { User, scheduleName, location, dailyRoutines } = action.payload;
      state.singlePost.user = User;
      state.singlePost.scheduleName = scheduleName;
      state.singlePost.location = location;
      state.singlePost.dailyRoutines = dailyRoutines;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setPosts,
  setPost,
  setSinglePost,
} = postsReducer.actions;

export const getSinglePost = (scheduleId) => (dispatch) => {
  getSinglePostAPI(scheduleId).then((res) => dispatch(setSinglePost(res)));
};

export const getPosts = () => (dispatch) => {
  dispatch(setIsLoading(true));

  fetch(`${SERVER_URL}/posts`)
    .then((response) => {
      return response.json();
    })
    .then((json) => dispatch(setPosts(json)))
    .catch((error) => console.log(error));

  dispatch(setIsLoading(false));
};

export const getFilteredPosts = (keyword) => (dispatch) => {
  dispatch(setIsLoading(true));
  if (keyword === "全部") {
    return dispatch(getPosts());
  }

  fetch(`${SERVER_URL}/posts?filter=${keyword}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      dispatch(setPosts(json));
    })
    .catch((error) => console.log(error));

  dispatch(setIsLoading(false));
};

export default postsReducer.reducer;
