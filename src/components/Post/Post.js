import React from 'react'
import styled from 'styled-components'
import img1 from '../../static/釜山.jpeg'
import { HeartOutlined } from '@ant-design/icons'

const PostContainer = styled.div `
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  height: 160px;
  margin-bottom: 20px;
  box-shadow: 0.5px 0.5px 3px -1px;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.theme.primaryColors.primaryLighter};
  }
  
`

const PostRightContainer = styled.div `
  display: flex;
  height: 100%;
  width: 100%;
  padding: 15px;
  justify-content: space-between;
`

const Image = styled.div `
  height: 100%;
  width: 25%;
  background: url(${img1});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const TitleContainer = styled.div `
  position: relative;
  display: flex;
  align-items: center;
`

const Title = styled.div `
  font-size: ${props => props.theme.titles.h3};
  font-weight: bold;
  cursor: pointer;
`

const ContentLeftContainer = styled.div `
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ContentRightContainer = styled.div `
  position: relative;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Content = styled.div `
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: ${props => props.theme.fontSizes.medium};
`

const HeadSticker = styled.div `
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background: black;
`

const Arthur = styled.div `
  font-size: ${props => props.theme.fontSizes.Small};
`

const Date = styled.div `
  font-size: ${props => props.theme.fontSizes.extraSmall};
`

export default function Post({postData}) {
  const title = postData.title
  const content = postData.content
  const arthur = postData.arthur
  const date = postData.date

  return (
      <PostContainer>
        <Image />
        <PostRightContainer>
          <ContentLeftContainer>
            <TitleContainer>
              <Title>{title}</Title>
              <HeartOutlined style={{
                  position: 'relative',
                  transform: 'Scale(1.5)',
                  margin: '0px 0px 0px 10px',
              }} fill={"#49c"}/>
            </TitleContainer>
            <Content>{content}</Content>
          </ContentLeftContainer>
          <ContentRightContainer>
            <HeadSticker />
            <Arthur>{arthur}</ Arthur>
            <Date>{date}</Date>
          </ContentRightContainer>
        </PostRightContainer>
      </PostContainer>
  )
}