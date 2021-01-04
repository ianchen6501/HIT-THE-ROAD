import styled from "styled-components";

const FooterContainer = styled.div`
  position: relative;
  bottom: ${(props) => props.theme.heights.footer};
  height: ${(props) => props.theme.heights.footer};
  line-height: ${(props) => props.theme.heights.footer};
  width: 100%;
  text-align: center;
  background: ${(props) => props.theme.primaryColors.primaryLighter};
  z-index: 2;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-size: 16px;
  font-weight: 800;
`;

export default function Footer() {
  return <FooterContainer>Made by HIT-THE-ROAD</FooterContainer>;
}
