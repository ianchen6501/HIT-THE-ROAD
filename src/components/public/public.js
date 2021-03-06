import React from "react";
import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/break_point";

export const Wrapper = styled.div`
  position: relative;
  top: -${(props) => props.theme.heights.header};
  width: 75vw;
  height: ${(props) => (props.$solidPlate ? "100vh" : "auto")};
  min-height: 100vh;
  margin: 0 auto;
  padding-top: ${(props) => props.theme.heights.header};
  padding-bottom: ${(props) => props.theme.heights.footer};

  ${MEDIA_QUERY_SM} {
    width: 100vw;
  }
`;

export const FormWrapper = styled.div`
  position: relative;
  height: 100vh;
  min-height: 100vh;
  margin: 0 auto;
  padding-bottom: ${(props) => props.theme.heights.footer};
  background: ${(props) => props.theme.basicColors.grayLighter};

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
  background: transparent;
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
