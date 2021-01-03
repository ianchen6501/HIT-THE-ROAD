import { createSlice } from "@reduxjs/toolkit";

import { getPostAPI } from "../../webAPI";

export const postsReducer = createSlice({
  name: "schedules",
  initialState: {
    posts: null,
    post: {},
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPost: (state, action) => {
      const { User, scheduleName, location, dailyRoutines } = action.payload;
      state.post.user = User;
      state.post.scheduleName = scheduleName;
      state.post.location = location;
      state.post.dailyRoutines = dailyRoutines;
    },
  },
});

export const { setIsLoading, setPosts, setPost } = postsReducer.actions;

export const getPosts = () => (dispatch) => {
  console.log("getPosts");
  //這邊要修正為真實串 API
  dispatch(setIsLoading(true));
  const postsData = [
    {
      title: "釜山",
      content:
        "韓國的第二大城市釜山，是韓國人夏日重要的玩水度假聖地，擁有多座海水浴場、在地人情味的傳統市集、海鮮市場，還有深受電影人重視的釜山影展，近幾年崛起的釜山新建築美學，也是旅人朝聖的一大亮點！不同於首爾的快步調，初來乍到釜山的旅人，可以感受到這裡多了一份閑適與自在愜意，想來趟不一樣的韓國之旅，港都釜山絕對是首選",
      arthur: "ian",
      date: "20200101-20210101",
    },
    {
      title: "釜山",
      content:
        "韓國的第二大城市釜山，是韓國人夏日重要的玩水度假聖地，擁有多座海水浴場、在地人情味的傳統市集、海鮮市場，還有深受電影人重視的釜山影展，近幾年崛起的釜山新建築美學，也是旅人朝聖的一大亮點！不同於首爾的快步調，初來乍到釜山的旅人，可以感受到這裡多了一份閑適與自在愜意，想來趟不一樣的韓國之旅，港都釜山絕對是首選",
      arthur: "ian",
      date: "20200101-20210101",
    },
  ];
  const response = {
    ok: true,
  };
  dispatch(setPosts(postsData));
  dispatch(setIsLoading(false));
  return response;
};

export const getPost = (scheduleId) => (dispatch) => {
  getPostAPI(scheduleId).then((res) => dispatch(setPost(res)));
};

export default postsReducer.reducer;
