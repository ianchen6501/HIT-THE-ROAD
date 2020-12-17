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

export default function ExplorePage() {
  const dispatch = useDispatch()
  const postsData = useSelector(store => store.posts.posts)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <Wrapper>
      <SearchContainer>
        <SearchInput placeholder={"關鍵字搜尋"}/>
        <SearchButton>search</SearchButton>
      </SearchContainer>
      {postsData && 
        postsData.map((post, index) => <Post postData={post} key={index}></Post>)
      }
    </Wrapper>
  )
}