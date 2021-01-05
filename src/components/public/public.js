import React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  height: ${(props) => (props.$solidPlate ? "100vh" : "auto")};
  min-height: 100vh;
  margin: 0 auto;
  padding-top: ${(props) =>
    props.$atHomepage ? "0" : props.theme.heights.header};
  padding-bottom: ${(props) => props.theme.heights.footer};

  @media only screen and (max-width: 480px) {
    width: 100%;
  }

  @media only screen and (min-width: 600px) {
    width: ${(props) => props.theme.Wrappers.smallWidth};
  }

  @media only screen and (min-width: 780px) {
    width: ${(props) => props.theme.Wrappers.mediumWidth};
  }

  @media only screen and (min-width: 1040px) {
    width: ${(props) => props.theme.Wrappers.largeWidth};
  }

  @media only screen and (min-width: 1200px) {
    width: ${(props) => props.theme.Wrappers.extraLargeWidth};
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
