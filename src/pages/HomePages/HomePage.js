import React, { useEffect } from "react";
import styled from "styled-components";
import { Wrapper } from "../../components/public";
import { useLocation, Link } from "react-router-dom";
import Post from "../../components/Post";
import { getPosts } from "../../redux/reducers/postsReducer";
import { useDispatch, useSelector } from "react-redux";
import frontPageIcon01 from "../../static/frontpage_icon-01.jpg";
import frontPageIcon02 from "../../static/frontpage_icon-02.jpg";
import frontPageIcon03 from "../../static/frontpage_icon-03.jpg";
import {
  MEDIA_QUERY_LG,
  MEDIA_QUERY_SM,
  MEDIA_QUERY_MD,
} from "../../constants/break_point";

const Heading = styled.div`
  margin: 60px auto 30px;
  text-align: center;
  font-weight: bolder;
  font-size: ${(props) => props.theme.titles.h5};
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
`;

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`;

const IntroContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0.5px 0.5px 3px -1px;

  & + & {
    margin-left: 5px;
  }

  ${MEDIA_QUERY_LG} {
    width: 240px;
  }

  ${MEDIA_QUERY_MD} {
    width: 200px;
  }

  ${MEDIA_QUERY_SM} {
    & + & {
      margin-top: 10px;
    }
  }
`;

const IntroImage = styled.div`
  height: 260px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${(props) =>
    props.$01 &&
    `
    background-image: url(${frontPageIcon01});
  `}

  ${(props) =>
    props.$02 &&
    `
    background-image: url(${frontPageIcon02});
  `}

  ${(props) =>
    props.$03 &&
    `
    background-image: url(${frontPageIcon03});
  `}

  ${MEDIA_QUERY_LG} {
    height: 200px;
  }

  ${MEDIA_QUERY_MD} {
    height: 140px;
  }
`;

const IntroTitle = styled.div`
  width: 120px;
  margin: 10px auto 0px;
  border-bottom: 1px solid ${(props) => props.theme.primaryColors.primaryDarker};
  font-size: ${(props) => props.theme.titles.h6};
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.primaryColors.primaryDarker};

  ${MEDIA_QUERY_MD} {
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
`;

const IntroContent = styled.div`
  min-height: 120px;
  padding: 15px 20px;
  word-break: break-all;
  text-align: justify;
  font-weight: bold;
  color: ${(props) => props.theme.primaryColors.primaryDarker};

  ${MEDIA_QUERY_MD} {
    padding: 5px 20px;
    min-height: 100px;
    font-size: ${(props) => props.theme.fontSizes.small};
    line-height: ${(props) => props.theme.fontSizes.medium};
  }
`;

const MoreTag = styled(Link)`
  display: block;
  margin: 30px auto;
  padding: 2px 5px;
  width: 200px;
  border-radius: 5px;
  font-size: ${(props) => props.theme.fontSizes.small};
  border: 1px solid ${(props) => props.theme.secondaryColors.secondaryDarker};
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.5s ease, background 1s ease;

  &:hover {
    box-shadow: 0 1px 2px grey;
    color: ${(props) => props.theme.secondaryColors.secondaryLighter};
    background: ${(props) => props.theme.secondaryColors.secondaryDarker};
  }
`;

export default function HomePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const postsData = useSelector((store) => store.posts.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <Wrapper $atHomepage={location.pathname === "/"}>
        <Heading>網站簡介</Heading>
        <BannerContainer>
          <IntroContainer>
            <IntroImage $01={true}></IntroImage>
            <IntroTitle>planning</IntroTitle>
            <IntroContent>
              計畫你的每一次旅程，包含交通、時間、景點、預算，通通交給
              Hittheroad。
            </IntroContent>
          </IntroContainer>
          <IntroContainer>
            <IntroImage $02={true}></IntroImage>
            <IntroTitle>Post-it</IntroTitle>
            <IntroContent>
              輕鬆的用 Google Maps 工具來建立便利貼，快速規劃您的行程。
            </IntroContent>
          </IntroContainer>
          <IntroContainer>
            <IntroImage $03={true}></IntroImage>
            <IntroTitle>album</IntroTitle>
            <IntroContent>
              與朋友、家人及網路上的每一個人分享你精彩的旅程。
            </IntroContent>
          </IntroContainer>
        </BannerContainer>
        <Heading>探索別人的旅程</Heading>
        {postsData && (
          <PostsContainer>
            {postsData.slice(0, 5).map((post, index) => (
              <Post postData={post} key={index}></Post>
            ))}
          </PostsContainer>
        )}
        <MoreTag to={"/explore"}>more</MoreTag>
        <Heading>依地區搜尋</Heading>
      </Wrapper>
    </>
  );
}
