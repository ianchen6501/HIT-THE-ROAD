import React from 'react'
import styled from 'styled-components'
import { Container } from '../../components/public'
import img1 from '../../static/釜山.jpeg'
import Post from '../../components/Post'

const SearchContainer = styled.div `
  display: flex;
  margin: 30px 0px;
  box-shadow: 0.5px 0.5px 3px -1px;
`

const SearchInput = styled.input `
  position: relative;
  width: 80%;
  height: 50px;
  padding-left: 5px;
  border: none;
  font-size: ${props => props.theme.fontSizes.medium};
`

const SearchButton = styled.button `
  width: 20%;
  height: 50px;
  background: ${props => props.theme.primaryColors.primaryLighter};
  transition: background 0.2s;

  :hover {
    background: ${props => props.theme.primaryColors.primaryLight};
  }
`

export default function ExplorePage() {
  const postData=[{
    title : '首爾',
    content: '韓國的第二大城市釜山，是韓國人夏日重要的玩水度假聖地，擁有多座海水浴場、在地人情味的傳統市集、海鮮市場，還有深受電影人重視的釜山影展，近幾年崛起的釜山新建築美學，也是旅人朝聖的一大亮點！不同於首爾的快步調，初來乍到釜山的旅人，可以感受到這裡多了一份閑適與自在愜意，想來趟不一樣的韓國之旅，港都釜山絕對是首選',
    arthur: 'ian',
    date: '20200101-20210101'
    },
    {
      title : '首爾',
      content: '韓國的第二大城市釜山，是韓國人夏日重要的玩水度假聖地，擁有多座海水浴場、在地人情味的傳統市集、海鮮市場，還有深受電影人重視的釜山影展，近幾年崛起的釜山新建築美學，也是旅人朝聖的一大亮點！不同於首爾的快步調，初來乍到釜山的旅人，可以感受到這裡多了一份閑適與自在愜意，想來趟不一樣的韓國之旅，港都釜山絕對是首選',
      arthur: 'ian',
      date: '20200101-20210101'
    },
  ]

  return (
    <Container>
      <SearchContainer>
        <SearchInput placeholder={"關鍵字搜尋"}/>
        <SearchButton>search</SearchButton>
      </SearchContainer>
      {postData.map(post => <Post postData={post}></Post>)}
    </Container>
  )
}