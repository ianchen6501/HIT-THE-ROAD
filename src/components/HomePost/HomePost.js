import styled from "styled-components";
import { Link } from "react-router-dom";

// TODO: test

const TestPosts = styled(Link)`
  position: relative;
  width: 600px;
  height: 100px;
  display: flex;
  margin: 10px auto;
  border-radius: 5px;
  border: 1px solid white;
  cursor: pointer;

  overflow: hidden;

  &:before {
    content: "SEE MORE";
    display: block;
    position: absolute;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    text-align: center;
    line-height: 100px;
    color: ${(props) => props.theme.secondaryColors.secondaryDarker};
    font-weight: bold;
    font-size: ${(props) => props.theme.fontSizes.large};
    transition: left 0.5s ease;
  }

  &:hover {
    &:before {
      left: 0;
    }
  }
`;

const TestPostsLeft = styled.div`
  width: 120px;
  margin-right: 10px;
  background: lightgray;
`;

const TestPostsRight = styled.div`
  padding: 5px;
  display: flex;
  flex: 1;
`;

const TestPostInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TestPostTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const TestPostTime = styled.div`
  color: lightgray;
`;

const TestTagsWrapper = styled.div`
  padding: 4px;
  width: 120px;
  overflow: hidden;
`;

const TestTag = styled.div`
  width: 100%;
  margin: 2px;
  padding: 2px 5px;
  height: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-radius: 5px;
  background: white;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
`;

export default function HomePost(props) {
  const post = props.postData;
  const setAreaHoverAt = props.setAreaHoverAt;
  const hashtags = post.dailyRoutines[post.dateRange.start];
  let hashtagsArr = [];
  hashtags
    .filter((hashtag) => hashtag.category !== "hotel")
    .map((filterHashtag) => hashtagsArr.push(filterHashtag.location));

  function changeMillisecondsToLocalDate(milliseconds) {
    const day = new Date(milliseconds).getDate();
    const month = new Date(milliseconds).getMonth();
    const year = new Date(milliseconds).getFullYear();
    return `${year}/ ${month + 1}/ ${day}`;
  }

  return (
    <TestPosts
      to={`/explore/${post.id}`}
      onMouseOver={() => setAreaHoverAt(post.location)}
      onMouseLeave={() => setAreaHoverAt()}
    >
      <TestPostsLeft></TestPostsLeft>
      <TestPostsRight>
        <TestPostInfo>
          <TestPostTitle>{post.scheduleName}</TestPostTitle>
          <TestPostTime>
            {changeMillisecondsToLocalDate(post.dateRange.start)} ~{" "}
            {changeMillisecondsToLocalDate(post.dateRange.end)}
          </TestPostTime>
          <TestPostTime>
            {post.User.fbName ? post.User.fbName : post.User.nickname}
          </TestPostTime>
        </TestPostInfo>
        <TestTagsWrapper>
          {hashtagsArr.length > 0 &&
            hashtagsArr.map((hashtag, index) => (
              <TestTag key={index}>{hashtag}</TestTag>
            ))}
        </TestTagsWrapper>
      </TestPostsRight>
    </TestPosts>
  );
}
