import styled from "styled-components";
import { Link } from "react-router-dom";
import one from "../../static/homepage/01.jpg";
import two from "../../static/homepage/02.jpg";
import three from "../../static/homepage/03.jpg";
import four from "../../static/homepage/04.jpg";

import {
  MEDIA_QUERY_SM,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_EXMD,
} from "../../constants/break_point";

const Posts = styled(Link)`
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  margin: 0px auto;
  border-radius: 5px;
  border: 1px solid white;
  background: ${(props) => props.theme.secondaryColors.secondaryLight};
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

  & + & {
    margin-top: 10px;
  }

  ${MEDIA_QUERY_SM} {
    height: 80px;
  }
`;

const PostsLeft = styled.img`
  display: block;
  width: 120px;
  margin-right: 10px;
  object-fit: cover;
  filter: grayscale(50%);

  ${MEDIA_QUERY_SM} {
    width: 80px;
  }
`;

const PostsRight = styled.div`
  padding: 5px;
  display: flex;
  flex: 1;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PostTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: bold;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${MEDIA_QUERY_SM} {
    width: 160px;
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

const PostTime = styled.div`
  color: white;
`;

const TagsWrapper = styled.div`
  padding: 4px;
  width: 120px;
  overflow: hidden;

  ${MEDIA_QUERY_SM} {
    display: none;
  }
`;

const Tag = styled.div`
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
  const { setAreaHoverAt, index } = props;
  const hashtags = post.dailyRoutines[post.dateRange.start];
  let hashtagsArr = [];
  if (hashtags) {
    hashtags
      .filter((hashtag) => hashtag.category !== "hotel")
      .map((filterHashtag) => hashtagsArr.push(filterHashtag.location));
  }

  function changeMillisecondsToLocalDate(milliseconds) {
    const day = new Date(milliseconds).getDate();
    const month = new Date(milliseconds).getMonth();
    const year = new Date(milliseconds).getFullYear();
    return `${year}/ ${month + 1}/ ${day}`;
  }

  return (
    <Posts
      to={`/explore/${post.id}`}
      onMouseOver={() => setAreaHoverAt(post.location)}
      onMouseLeave={() => setAreaHoverAt()}
    >
      <PostsLeft
        src={index === 1 ? one : index === 2 ? two : index === 3 ? three : four}
        alt="post cover"
      />
      <PostsRight>
        <PostInfo>
          <PostTitle>{post.scheduleName}</PostTitle>
          <PostTime>
            {/* 這邊待確認 json 儲存方式 */}
            {changeMillisecondsToLocalDate(post.dateRange.start)} ~{" "}
            {changeMillisecondsToLocalDate(post.dateRange.end)}
          </PostTime>
          <PostTime>
            {post.User.fbName ? post.User.fbName : post.User.nickname}
          </PostTime>
        </PostInfo>
        <TagsWrapper>
          {hashtagsArr.length > 0 &&
            hashtagsArr.map((hashtag, index) => (
              <Tag key={index}>{hashtag}</Tag>
            ))}
        </TagsWrapper>
      </PostsRight>
    </Posts>
  );
}
