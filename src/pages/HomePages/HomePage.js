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
import { MEDIA_QUERY_LG } from "../../constants/break_point";

const Heading = styled.h1`
  display: inline-block;
  position: relative;
  margin-bottom: 0px;
  padding-top: 30px;
  padding-bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  font-weight: bolder;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
`;

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px;

  ${MEDIA_QUERY_LG} {
    flex-direction: column;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IntroContainer = styled.div`
  height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0.5px 0.5px 3px -1px;

  ${MEDIA_QUERY_LG} {
    margin: 10px 0px;
  }
`;

const IntroImage = styled.div`
  height: 200px;
  width: 100%;
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
`;

const IntroTitle = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.titles.h4};
  font-weight: bold;
`;

const IntroContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  font-weight: bold;
`;

const MoreTag = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: ${(props) => props.theme.fontSizes.medium};
  cursor: pointer;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
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
              輕鬆的用 Google map 工具來建立便利貼，快速規劃您的行程。
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
            <Link to={"/explore"}>
              <MoreTag>more</MoreTag>
            </Link>
          </PostsContainer>
        )}
      </Wrapper>
    </>
  );
}
