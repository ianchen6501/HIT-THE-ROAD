import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPosts, getFilteredPosts } from "../../redux/reducers/postsReducer";
import { Wrapper } from "../../components/public";
import Post from "../../components/Post";
import Paginator from "../../components/Paginator";

const FilterContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const KeywordFilter = styled.div`
  display: inline-block;
  margin-bottom: 10px;
  margin-left: 20px;
  border: solid 1px ${(props) => props.theme.primaryColors.primaryLight};
  border-radius: 13px;
  padding: 4px 8px;
  color: ${(props) => props.theme.primaryColors.dark};
  font-size: ${(props) => props.theme.fontSizes.medium};
  transition: transform 0.1s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  &:visited {
    background: black;
  }

  ${(props) =>
    props.$active && `background: ${props.theme.primaryColors.primaryLighter};`}
`;

export default function ExplorePage() {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.posts.posts);
  const [filter, setFilter] = useState("全部");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  //假的 filter 資料，之後從資料庫拿
  const keywords = [
    "全部",
    "台北",
    "新北",
    "桃園",
    "新竹",
    "苗栗",
    "台中",
    "彰化",
    "雲林",
    "嘉義",
    "台南",
    "高雄",
    "屏東",
    "台東",
    "花蓮",
    "宜蘭",
    "南投",
    "離島",
  ];

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, limit]);

  function handleFilterOnClick(keyword) {
    setFilter(keyword);
    dispatch(getFilteredPosts(keyword));
  }

  return (
    <Wrapper>
      <FilterContainer>
        {keywords.map((keyword, index) => (
          <KeywordFilter
            $active={filter === keyword}
            onClick={() => handleFilterOnClick(keyword)}
            key={index}
          >
            {keyword}
          </KeywordFilter>
        ))}
      </FilterContainer>
      {posts &&
        posts
          .slice((currentPage - 1) * limit, currentPage * limit)
          .map((post, index) => <Post postData={post} key={index}></Post>)}
      <Paginator
        posts={posts}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        limit={limit}
      />
    </Wrapper>
  );
}
