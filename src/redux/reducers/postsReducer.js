import { createSlice } from "@reduxjs/toolkit";
import {
  getSinglePostAPI,
  getFilteredPostsAPI,
  getPostsAPI,
} from "../../webAPI";

export const postsReducer = createSlice({
  name: "posts",
  initialState: {
    posts: null,
    post: null,
    singlePost: {},
    isLoading: false,
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
  dispatch(setIsLoading(true));
  getSinglePostAPI(scheduleId).then((res) => {
    dispatch(setSinglePost(res));
    dispatch(setIsLoading(false));
  });
};

export const getPosts = () => (dispatch) => {
  dispatch(setIsLoading(true));
  getPostsAPI()
    .then((posts) => {
      dispatch(setPosts(posts));
    })
    .catch((error) => console.log(error));

  dispatch(setIsLoading(false));
};

export const getFilteredPosts = (keyword) => (dispatch) => {
  dispatch(setIsLoading(true));
  if (keyword === "全部") {
    return dispatch(getPosts());
  }
  getFilteredPostsAPI(keyword)
    .then((json) => {
      dispatch(setPosts(json));
    })
    .catch((error) => console.log(error));

  dispatch(setIsLoading(false));
};

export default postsReducer.reducer;
