import styled from 'styled-components'

const FooterContainer = styled.div `
  position: relative;
  bottom: ${props => props.theme.heights.footer};
  height: ${props => props.theme.heights.footer};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.primaryColors.primaryLighter};
  z-index: 2;
  color: ${props => props.theme.secondaryColors.secondaryDarker};
  font-size: 16px;
`

export default function Footer() {
  return (
    <FooterContainer>Made by ...</FooterContainer>
  )
}
