import React from 'react'
import styled from 'styled-components'

export const Wrapper = styled.div `
  height: ${props => props.$solidPlate? '100vh' : 'auto' };
  min-height: 100vh;
  margin: 0 auto;
  padding-top: ${props => props.$atHomepage? '0' : props.theme.heights.header};
  padding-bottom: ${props => props.theme.heights.footer};

  @media only screen and (max-width: 480px) {
    width: ${props => props.theme.Wrappers.extraSmallWidth};
  }

  @media only screen and (min-width: 600px) {
    width: ${props => props.theme.Wrappers.smallWidth};
  }

  
  @media only screen and (min-width: 769px) {
    width: ${props => props.theme.Wrappers.mediumWidth};
  }

  @media only screen and (min-width: 1040px) {
    width: ${props => props.theme.Wrappers.largeWidth};
  }

  @media only screen and (min-width: 1200px) {
    width: ${props => props.theme.Wrappers.extraLargeWidth};
  }
`

const LoadingContainer = styled.div `
  text-align: center;
  line-height: 648px;
  font-size: ${props => props.theme.titles.h3};
  color: ${props => props.theme.secondaryColors.secondaryDarker};
`

export function LoadingPage() {
  return (
    <Wrapper>
      <LoadingContainer>
        loading!
      </LoadingContainer>
    </Wrapper>
  )
}
