import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/break_point";

const FooterContainer = styled.div`
  position: relative;
  bottom: ${(props) => props.theme.heights.footer};
  z-index: 2;
  height: ${(props) => props.theme.heights.footer};
  width: 100%;
  background: ${(props) => props.theme.secondaryColors.secondaryLighter};
  text-align: center;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
  line-height: ${(props) => props.theme.heights.footer};
  box-shadow: 1px 1px 5px grey;

  ${MEDIA_QUERY_SM} {
    width: 100vw;
  }
`;

export default function Footer() {
  return <FooterContainer>Made by ianchen & yunanpan</FooterContainer>;
}
