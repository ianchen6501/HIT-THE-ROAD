import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { MEDIA_QUERY_MD } from "../../constants/break_point";

const Container = styled.div`
  width: calc(50% - 5px);
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border: none;
  border-radius: 20px;
  background: ${(props) => props.theme.primaryColors.primaryLighter};
  transition: all 0.5s ease;

  &:hover {
    background: ${(props) => props.theme.basicColors.white};
    box-shadow: 0px 2px 5px grey;
  }

  ${MEDIA_QUERY_MD} {
    width: 80%;
  }
`;

const PostContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 15px;
  justify-content: space-between;
`;

const Title = styled.div`
  padding: 5px 0;
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.primaryColors.primaryDarker};
`;

const ContentLeftContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ContentRightContainer = styled.div`
  position: relative;
  padding: 5px 0px 0px 0px;
`;

const Dates = styled.div`
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
  line-height: ${(props) => props.theme.fontSizes.extraSmall};
  font-weight: bold;
  color: ${(props) => props.theme.primaryColors.primary};
`;

const Location = styled.div`
  padding: 5px;
  border-radius: 10px;
  background: ${(props) => props.theme.primaryColors.primaryDarker};
  color: ${(props) => props.theme.primaryColors.primaryLighter};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: bold;
`;

const Arthur = styled.div`
  margin-top: 5px;
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
  font-weight: bold;
  color: ${(props) => props.theme.primaryColors.primary};
`;

const HashtagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 10px 10px;
  height: 60px;

  overflow: hidden;
`;

const Hashtag = styled.div`
  margin: 2.5px;
  padding: 2px;
  height: 24px;
  color: white;
  background: ${(props) => props.theme.primaryColors.primaryDark};
  border: none;
  border-radius: 5px;
`;

export default function Post({ postData }) {
  const history = useHistory();
  const hashtags = postData.dailyRoutines[postData.dateRange.start];
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

  function handleTitleOnClick(id) {
    history.push(`/explore/${id}`);
  }

  const title = postData.scheduleName;
  const location = postData.location;
  const arthur = postData.User.nickname
    ? postData.User.nickname
    : postData.User.fbName;
  const dateRange = postData.dateRange;
  const startDate = changeMillisecondsToLocalDate(dateRange.start);
  const endDate = changeMillisecondsToLocalDate(dateRange.end);
  const id = postData.id;
  const userId = postData.userId;

  return (
    <Container>
      <PostContainer>
        {/* <Image /> */}
        <ContentLeftContainer onClick={() => handleTitleOnClick(id, userId)}>
          <Title>{title}</Title>
          <Dates>
            {startDate} - {endDate}
          </Dates>
          <Arthur>{arthur}</Arthur>
        </ContentLeftContainer>
        <ContentRightContainer>
          {/* <HeadSticker /> */}
          <Location>{location}</Location>
        </ContentRightContainer>
      </PostContainer>
      <HashtagContainer>
        {hashtagsArr.length > 0 &&
          hashtagsArr.map((hashtag, index) => (
            <Hashtag key={index}>{hashtag}</Hashtag>
          ))}
      </HashtagContainer>
    </Container>
  );
}
