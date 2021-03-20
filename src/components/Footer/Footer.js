import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { MEDIA_QUERY_SM } from "../../constants/break_point";

const FooterContainer = styled.div`
  position: relative;
  bottom: ${(props) => props.theme.heights.footer};
  z-index: 2;
  ${"" /* height: ${(props) => props.theme.heights.footer}; */}
  height: ${(props) =>
    props.$pathname === "/" ? "50px" : props.theme.heights.footer};
  width: 100%;
  background: ${(props) => props.theme.secondaryColors.secondaryLighter};
  text-align: center;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
  font-weight: bold;
  line-height: ${(props) => props.theme.heights.footer};
  box-shadow: 1px 1px 5px grey;

  ${MEDIA_QUERY_SM} {
    width: 100vw;
  }
`;

const Remarks = styled.div`
  height: 20px;
  line-height: 16px;
  text-transform: lowercase;
`;

export default function Footer() {
  const location = useLocation();

  return (
    <FooterContainer $pathname={location.pathname}>
      Made by HIT-THE-ROAD
      {location.pathname === "/" && (
        <Remarks>
          以上城市介紹文字多擷取自
          <a href="https://www.taiwan.net.tw/">交通部觀光局</a>
        </Remarks>
      )}
    </FooterContainer>
  );
}
