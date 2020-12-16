import React from 'react'
import styled from 'styled-components'

export const Container = styled.div `
  width: ${props => props.theme.Wrappers.maxWidth};
  height: ${props => props.$solidPlate? '100vh' : 'auto' };
  min-height: 100vh;
  margin: 0 auto;
  padding-top: ${props => props.theme.heights.header};
  padding-bottom: ${props => props.theme.heights.footer};
`
