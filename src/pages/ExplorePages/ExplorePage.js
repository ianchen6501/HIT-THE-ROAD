import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Wrapper } from '../../components/public'
import Post from '../../components/Post'
import { getPosts } from '../../redux/reducers/postsReducer'

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

const FilterContainer = styled.div `
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`

const KeywordFilter = styled.div `
  border: solid 1px ${props => props.theme.primaryColors.primaryLight};
  margin-left: 20px;
  border-radius: 13px;
  padding: 4px 8px;
  color: ${props => props.theme.primaryColors.dark};
  font-size: ${props => props.theme.fontSizes.medium};
  transition: transform 0.1s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  &:visited {
    background: black;
  }
`

export default function ExplorePage() {
  const dispatch = useDispatch()
  const postsData = useSelector(store => store.posts.posts)
  //假的 filter 資料，之後從資料庫拿
  const keywords = ['東部', '西部', '北部', '南部', '中部']

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <Wrapper>
      <SearchContainer>
        <SearchInput placeholder={"關鍵字搜尋"}/>
        <SearchButton>search</SearchButton>
      </SearchContainer>
      <FilterContainer>
        {keywords.map(keyword => <KeywordFilter>{keyword}</KeywordFilter>)}
      </FilterContainer>
      {postsData && 
        postsData.map((post, index) => <Post postData={post} key={index}></Post>)
      }
    </Wrapper>
  )
}