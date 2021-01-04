import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/break_point";

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

  ${MEDIA_QUERY_SM} {
    width: 100vw;
  }
`;

export default function Footer() {
  return <FooterContainer>Made by ...</FooterContainer>;
}
