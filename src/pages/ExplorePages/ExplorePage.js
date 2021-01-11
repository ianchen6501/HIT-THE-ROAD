import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setPosts, getFilteredPosts } from "../../redux/reducers/postsReducer";
import { LoadingPage, Wrapper } from "../../components/public";
import Post from "../../components/Post";
import Paginator from "../../components/Paginator";
import { MEDIA_QUERY_MD } from "../../constants/break_point";
import { useHistory, useParams } from "react-router-dom";

const FilterContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const LocationFilter = styled.div`
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
          {posts &&
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
