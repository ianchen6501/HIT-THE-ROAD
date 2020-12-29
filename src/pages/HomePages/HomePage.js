import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Wrapper } from '../../components/public'
import { useLocation, Link } from 'react-router-dom'
import Post from '../../components/Post'
import { getPosts } from '../../redux/reducers/postsReducer'
import { useDispatch, useSelector } from 'react-redux'

const Heading = styled.h1 `
  display: inline-block;
  position: relative;
  margin-bottom: 0px;
  padding-top: 30px;
  padding-bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  font-weight: bolder;
  color: ${props => props.theme.secondaryColors.secondaryDarker};
`

const BannerContainer = styled.div `
  display: flex;
  justify-content: space-between;
  padding: 0px;
`

const PostsContainer = styled.div `

`

const IntroContainer = styled.div `
  height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0.5px 0.5px 3px -1px;
`

const IntroImage = styled.div `
  background: ${props => props.theme.basicColors.white};
  height: 200px;
  width: 100%;
`

const IntroTitle = styled.div `
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.theme.titles.h4};
  font-weight: bold;
`

const IntroContent = styled.div `
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  font-weight: bold;
`

const MoreTag = styled.div `
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: ${props => props.theme.fontSizes.medium};
  cursor: pointer;
  color: ${props => props.theme.secondaryColors.secondaryDarker};
`


export default function HomePage() {
  const location = useLocation()
  const dispatch = useDispatch()
  const postsData = useSelector(store => store.posts.posts)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <>
      <Wrapper $atHomepage={location.pathname === '/'}>
        <Heading>網站簡介</Heading>
        <BannerContainer>
          <IntroContainer>
            <IntroImage></IntroImage>
            <IntroTitle>planning</IntroTitle>
            <IntroContent>計畫你的每一次旅程，包含交通、時間、景點、預算，通通交給 Hittheroad。</IntroContent>
          </IntroContainer>
          <IntroContainer>
            <IntroImage></IntroImage>
            <IntroTitle>Post-it</IntroTitle>
            <IntroContent>可以與朋友、家人及網路上的每一個人分享你精彩的旅程。</IntroContent>
          </IntroContainer>
          <IntroContainer>
            <IntroImage></IntroImage>
            <IntroTitle>albumn</IntroTitle>
            <IntroContent>可以與朋友、家人及網路上的每一個人分享你精彩的旅程。</IntroContent>
          </IntroContainer>
        </BannerContainer>
        <Heading>探索別人的旅程</Heading>
        {postsData && (
          <PostsContainer>
            {postsData.map((post, index) => <Post postData={post} key={index}></Post>)}
            <Link to={'/explore'}><MoreTag>&#x02192; more &#x02190;</MoreTag></Link>
          </PostsContainer>
          )
        }
      </Wrapper>
    </>
  )
}