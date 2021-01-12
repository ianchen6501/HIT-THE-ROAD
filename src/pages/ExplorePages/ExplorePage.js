import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setPosts, getFilteredPosts } from "../../redux/reducers/postsReducer";
import { LoadingPage, Wrapper } from "../../components/public";
import Post from "../../components/Post";
import Paginator from "../../components/Paginator";
import { MEDIA_QUERY_MD } from "../../constants/break_point";
import { useHistory, useParams } from "react-router-dom";

const Heading = styled.div`
  margin-top: 30px;
  text-align: center;
  font-weight: bolder;
  font-size: ${(props) => props.theme.titles.h5};
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};

  &::before {
    content: "";
    padding-left: 15px;
    border-left: solid 5px
      ${(props) => props.theme.secondaryColors.secondaryDarker};
  }

  ${MEDIA_QUERY_MD} {
    font-size: ${(props) => props.theme.titles.h6};
  }
`;

const FilterContainer = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  padding: 10px 30px 0px 30px;
  background: ${(props) => props.theme.secondaryColors.secondaryLighter};

  ${MEDIA_QUERY_MD} {
    width: 80%;
  }
`;

const LocationFilter = styled.div`
  display: relative;
  width: fit-content;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border: solid 1px ${(props) => props.theme.secondaryColors.secondary};
  border-radius: 13px;
  padding: 4px 8px;
  color: ${(props) => props.theme.primaryColors.dark};
  font-size: ${(props) => props.theme.fontSizes.small};
  box-shadow: 0.2px 0.2px 5px -3px;
  transition: transform 0.1s ease-out;
  background: white;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    font-weight: 700;
    border: solid 1.5px ${(props) => props.theme.secondaryColors.secondary};
  }

  &:visited {
    background: black;
  }

  ${(props) =>
    props.$active &&
    `
      background: ${props.theme.secondaryColors.secondary};
      color: white;
  `}

  ${MEDIA_QUERY_MD} {
    font-size: ${(props) => props.theme.fontSizes.extraSmall};
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 400px;

  ${MEDIA_QUERY_MD} {
    justify-content: center;
  }
`;

const Reminder = styled.div`
  position: absolute;
  display: inline-block;
  width: 200px;
  height: 50px;
  left: 50%;
  top: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme.basicColors.white};
  line-height: 50px;
  text-align: center;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-weight: bold;
`;

export default function ExplorePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { slug } = useParams();
  const [filter, setFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const posts = useSelector((store) => store.posts.posts);
  const locations = useSelector((store) => store.schedules.scheduleLocations);
  const limit = 4;

  useEffect(() => {
    setFilter(slug);
    dispatch(getFilteredPosts(slug));

    return () => {
      dispatch(setPosts(null));
    };
  }, [dispatch, limit, slug]);

  function handleFilterOnClick(location) {
    setFilter(location);
    history.push(`/explore/location/${location}`);
  }

  if (!filter || !posts) {
    return <LoadingPage />;
  } else {
    return (
      <Wrapper>
        <Heading>按地區搜尋</Heading>
        <FilterContainer>
          {locations.map((location, index) => (
            <LocationFilter
              $active={filter === location}
              onClick={() => handleFilterOnClick(location)}
              key={index}
            >
              {location}
            </LocationFilter>
          ))}
        </FilterContainer>
        <PostsContainer>
          {posts && posts.length === 0 && <Reminder>此地區尚無行程</Reminder>}
          {posts &&
            posts.length > 0 &&
            posts
              .slice((currentPage - 1) * limit, currentPage * limit)
              .map((post, index) => <Post postData={post} key={index}></Post>)}
        </PostsContainer>
        <Paginator
          posts={posts}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          limit={limit}
        />
      </Wrapper>
    );
  }
}
