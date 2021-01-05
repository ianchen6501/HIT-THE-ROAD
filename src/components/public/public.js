import React from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/break_point";

export const Wrapper = styled.div`
  position: relative;
  width: 75vw;
  height: ${(props) => (props.$solidPlate ? "100vh" : "auto")};
  min-height: 100vh;
  margin: 0 auto;
  padding-top: ${(props) =>
    props.$atHomepage ? "0" : props.theme.heights.header};
  padding-bottom: ${(props) => props.theme.heights.footer};

  ${MEDIA_QUERY_SM} {
    width: 100vw;
  }
`;

const LoadingContainer = styled.div`
  position: relative;
  min-height: 100vh;
  top: -${(props) => props.theme.heights.header};
  padding-top: ${(props) => props.theme.heights.header};
  padding-bottom: ${(props) => props.theme.heights.footer};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.titles.h4};
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
`;

export function LoadingPage() {
  return (
    <Wrapper $solidPlate={true}>
      <LoadingContainer>loading!</LoadingContainer>
    </Wrapper>
  );
}
