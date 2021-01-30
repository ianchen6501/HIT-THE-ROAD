import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, Link, useHistory } from "react-router-dom";
import HomePost from "../../components/HomePost";
import { getPosts, setPosts } from "../../redux/reducers/postsReducer";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import frontPageIcon01 from "../../static/frontpage_icon-01.png";
import frontPageIcon02 from "../../static/frontpage_icon-02.png";
import frontPageIcon03 from "../../static/frontpage_icon-03.png";
import taiwanMap from "../../static/map/taiwan.png";
import newtaipei from "../../static/map/newtaipei.png";
import changhua from "../../static/map/changhua.png";
import chiayi from "../../static/map/chiayi.png";
import hsinchu from "../../static/map/hsinchu.png";
import kaohsiung from "../../static/map/kaohsiung.png";
import miaoli from "../../static/map/miaoli.png";
import pingtung from "../../static/map/pingtung.png";
import taichung from "../../static/map/taichung.png";
import tainan from "../../static/map/tainan.png";
import taitung from "../../static/map/taitung.png";
import taoyuan from "../../static/map/taoyuan.png";
import yilan from "../../static/map/yilan.png";
import nantou from "../../static/map/nantou.png";
import taipei from "../../static/map/taipei.png";
import yunlin from "../../static/map/yunlin.png";
import hualien from "../../static/map/hualien.png";

import {
  MEDIA_QUERY_LG,
  MEDIA_QUERY_SM,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_EXMD,
} from "../../constants/break_point";

const Wrapper = styled.div`
  position: relative;
  width: 75vw;
  margin: 0 auto;
  margin-top: 100px;
`;

const Heading = styled.div`
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 40px;
  margin-bottom: 20px;
  padding: 5px 20px;
  text-align: center;
  background: white;

  ${MEDIA_QUERY_SM} {
    display: block;
    text-align: center;
  }

  & h3 {
    font-weight: bolder;
    font-size: ${(props) => props.theme.titles.h5};
    color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  }
`;

const AreaHeading = styled(Heading)`
  position: relative;
  top: 0px;
  background: transparent;

  & h3 {
    color: white;
  }
`;

const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
  padding: 50px;
  border: 2px solid ${(props) => props.theme.secondaryColors.secondary};
  background: white;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${MEDIA_QUERY_MD} {
    justify-content: center;
  }
`;

const IntroContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;

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
  font-size: ${(props) => props.theme.titles.h6};
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.primaryColors.primaryDark};

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
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};

  ${MEDIA_QUERY_MD} {
    padding: 5px 20px;
    min-height: 100px;
    font-size: ${(props) => props.theme.fontSizes.small};
    line-height: ${(props) => props.theme.fontSizes.medium};
  }
`;

const ExploreArea = styled.div`
  position: relative;
  z-index: -1;
  padding: 20px 40px 60px;
  background: ${(props) => props.theme.secondaryColors.secondary};

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 120px;
    top: -120px;
    left: 0;
    background: ${(props) => props.theme.secondaryColors.secondary};
  }
`;

const MoreTag = styled(Link)`
  display: block;
  margin: 30px auto;
  padding: 2px 5px;
  width: 100%;
  border-radius: 5px;
  font-size: ${(props) => props.theme.fontSizes.small};
  border: 1px solid ${(props) => props.theme.secondaryColors.secondary};
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  text-align: center;
  font-weight: bold;
  background: ${(props) => props.theme.secondaryColors.secondaryLight};
  cursor: pointer;
  transition: color 0.5s ease, background 1s ease;

  &:hover {
    box-shadow: 0 1px 2px grey;
    color: ${(props) => props.theme.secondaryColors.secondaryLighter};
    background: ${(props) => props.theme.secondaryColors.secondaryDarker};
  }
`;

const MapImageWrapperTest = styled.div`
  min-width: 280px;
  height: 540px;
  position: relative;
  overflow: hidden;
`;

const TaiwanImage = styled.img`
  position: absolute;
  top: -5px;
  right: 0;
  margin-right: -5%;
  width: 320px;

  ${MEDIA_QUERY_SM} {
    width: 300px;
  }
`;

const GoTopButton = styled.button`
  position: fixed;
  z-index: 5;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: ${(props) => props.theme.primaryColors.primaryDark};
  box-shadow: 2px 2px 2px grey;
  color: ${(props) => props.theme.basicColors.white};
  font-size: ${(props) => props.theme.fontSizes.large};
  transition: all 0.5s ease;

  &:hover {
    bottom: 52px;
    box-shadow: 2px 2px 5px grey;
  }
`;

const ExploreSection = styled.div`
  position: relative;
  width: 75vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const TestArea = styled.div`
  margin-right: 20px;
  flex: 1;
`;

const MapInfo = styled.div`
  position: absolute;
  top: 0px;
  z-index: 3;
`;

const MapLocation = styled.div`
  border-left: 5px solid ${(props) => props.theme.primaryColors.primaryLighter};
  margin-bottom: 10px;
  padding-left: 5px;
  height: 24px;
  line-height: 24px;
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.primaryColors.primaryLighter};
  font-weight: bold;
`;

const MapDescription = styled.div`
  width: 160px;
  padding: 5px;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  background: #f8dfc299;
  text-align: justify;
`;

export default function HomePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const postsData = useSelector((store) => store.posts.posts);
  const [areaHoverAt, setAreaHoverAt] = useState();
  const [goTopButtonShow, setGoTopButtonShow] = useState(false);

  const keywords = [
    [
      "台北",
      "taipei",
      taipei,
      "台灣的首都位於台北，這個充滿現代感的城市融合了日本殖民時期遺留的街巷、繁忙的購物商街及當代風格的建築。",
    ],
    [
      "新北",
      "newtaipei",
      newtaipei,
      "新北市是臺灣本島最北的城市，海岸線長達120餘公里，幅員遼闊，市內北海岸與東北角海岸擁有豐富的海景奇觀及海岸風光。",
    ],
    [
      "桃園",
      "taoyuan",
      taoyuan,
      "桃園市擁有多元的文化，加上北橫豐富的山水景觀、兩蔣文化園區的獨特歷史文化及「草花王國的故鄉」、「千塘之鄉」等美名。",
    ],
    [
      "新竹",
      "hsinchu",
      hsinchu,
      "每年持續以「山、湖、海」三大特色景點舉辦觀光季等系列活動，推廣新豐、竹北濱海遊憩區、峨眉湖景點及山地美人湯泉。",
    ],
    [
      "苗栗",
      "miaoli",
      miaoli,
      "是臺灣西部最適合旅遊及渡假的旅遊勝地。不僅氣候宜人、鮮少天災；交通也是相當便利，每年都吸引超過650萬人次的國內、外旅客來苗觀光旅遊。",
    ],
    [
      "台中",
      "taichung",
      taichung,
      "臺中市對古蹟的保存不遺餘力，完整保留了日治時期棋盤式街道、具有兩百年歷史的樂成宮、雕工華麗且香火鼎盛的城隍廟，在在都讓人發思古之幽情。",
    ],
    [
      "彰化",
      "changhua",
      changhua,
      "彰化的觀光資源豐富而多元，知名的八卦山脈現為休閒旅遊的新寵，無論是登山健行、單車運動或生態旅遊都十分有趣。",
    ],
    [
      "雲林",
      "yunlin",
      yunlin,
      "雲林倚山傍海的地理優勢孕育出各式農特產美食，且擁有的廟宇數量更是全臺之最。",
    ],
    [
      "嘉義",
      "chiayi",
      chiayi,
      "嘉義縣倚山面海，坐擁山色、平原、海景等不同的壯麗與遼闊。",
    ],
    [
      "台南",
      "tainan",
      tainan,
      "除了歷史文化特色之外，臺南更擁有如詩畫般的自然生態美景，及聞名遐邇的農漁產品特色美食。",
    ],
    [
      "高雄",
      "kaohsiung",
      kaohsiung,
      "體驗自然生態、品嘗珍饈佳饌、欣賞客家美濃紙傘等多元的民族文化，且擁有全臺最大的購物中心，及著名的觀光夜市。",
    ],
    [
      "屏東",
      "pingtung",
      pingtung,
      "依山傍海，東臨太平洋，西向臺灣海峽，南面巴士海峽，地處熱帶，四季如春，風光明媚，椰影婆娑，充滿南國風味，",
    ],
    [
      "台東",
      "taitung",
      taitung,
      "充滿多族群的人文特色，不同族群的節日慶典，不同人文風貌的經典呈現，在這寬暢的大地上可以享受悠閒的生活步調。",
    ],
    [
      "花蓮",
      "hualien",
      hualien,
      "東臨浩瀚太平洋，西倚雄偉的中央山脈，以巍峨的高山、蔚藍的天空、浩瀚的海洋、景色秀麗的縱谷、多樣性的人文風貌。",
    ],
    [
      "宜蘭",
      "yilan",
      yilan,
      "與臺北不到 50 分鐘，可細心品嚐自然環境的生態旅遊、豐沛的海洋遊憩資源，油綠的田園、悠閒漫活的生活。",
    ],
    [
      "南投",
      "nantou",
      nantou,
      "特有的農家風情和豐富的物產塑造了另一種休閒旅遊風，恬靜悠閒的農村旅遊，是闔家渡假的好去處。",
    ],
  ];

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  window.onscroll = function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setGoTopButtonShow(true);
    } else {
      setGoTopButtonShow(false);
    }
  };

  function handleTopButtonClick() {
    window.scrollTo({
      top: 10,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <Wrapper $atHomepage={location.pathname === "/"}>
        <Heading>
          <h3>網站簡介</h3>
          <div></div>
        </Heading>
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
      </Wrapper>
      <ExploreArea>
        <AreaHeading>
          <h3>探索別人的旅程</h3>
        </AreaHeading>
        <ExploreSection>
          <TestArea>
            {postsData && (
              <PostsContainer>
                {postsData.slice(0, 4).map((post, index) => (
                  <HomePost
                    postData={post}
                    index={index}
                    key={index}
                    setAreaHoverAt={setAreaHoverAt}
                  />
                ))}
              </PostsContainer>
            )}
            <MoreTag to={"/explore/location/全部"}>more</MoreTag>
          </TestArea>

          {/* TODO: */}
          <MapImageWrapperTest>
            {areaHoverAt && (
              <MapInfo>
                <MapLocation>{areaHoverAt}</MapLocation>
                <MapDescription>
                  {keywords.find((keyword) => keyword[0] === areaHoverAt)[3]}
                </MapDescription>
              </MapInfo>
            )}

            {keywords.map((keyword) => (
              <img
                key={keyword[1]}
                src={keyword[2]}
                alt={keyword[1]}
                width="100%"
                style={{
                  display: areaHoverAt === `${keyword[0]}` ? "block" : "none",
                  position: "absolute",
                  top: "-5px",
                  right: 0,
                  zIndex: "1",
                  marginRight: "-5%",
                  width: "320px",
                }}
              />
            ))}
            <TaiwanImage src={taiwanMap} alt="taiwan map" width="100%" />
          </MapImageWrapperTest>
        </ExploreSection>
      </ExploreArea>

      {goTopButtonShow && (
        <GoTopButton onClick={handleTopButtonClick}>
          <FontAwesomeIcon icon={faArrowUp} />
        </GoTopButton>
      )}
    </>
  );
}
