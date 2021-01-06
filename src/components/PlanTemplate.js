import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../constants/break_point";

export const Wrapper = styled.div`
  margin: 0px auto;
  padding-top: ${(props) => props.theme.heights.header};
  margin-bottom: ${(props) => props.theme.heights.footer};
  padding-bottom: ${(props) => props.theme.heights.footer};
  padding-left: 20px;
  padding-right: 20px;
  max-width: ${(props) => props.theme.Wrappers.largeWidth};
  min-height: 100vh;

  ${MEDIA_QUERY_SM} {
    width: 100vw;
  }
`;

export const PlanHeader = styled.div`
  position: relative;
  margin: 60px auto 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  word-break: break-all;
`;

export const PlanLocation = styled.div`
  margin-right: 5px;
  padding: 5px;
  width: 60px;
  border-radius: 5px;
  background: ${(props) => props.theme.secondaryColors.secondaryLighter};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
`;

export const PlanTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
`;

export const PlanWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    align-items: center;
  }
`;

export const PlanColumn = styled.div`
  width: 420px;
  margin: 10px;
  border: 1px solid ${(props) => props.theme.primaryColors.primaryLighter};
  border-radius: 5px;

  ${MEDIA_QUERY_SM} {
    width: 320px;
  }
`;

export const RoutineTitle = styled.div`
  padding: 2px 10px;
  font-size: ${(props) => props.theme.fontSizes.mudium};
  font-style: italic;
  background: ${(props) => props.theme.primaryColors.primaryLighter};
  color: ${(props) => props.theme.primaryColors.primaryDarker};
  font-weight: bold;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RoutineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 420px;

  overflow: auto;
`;

export const Spot = styled.div`
  width: 100%;
  & + & {
    margin-top: 5px;
  }
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
`;

export const SpotInfo = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.secondaryColors.secondaryLighter};
  border-radius: 5px;
`;

export const SpotName = styled.div`
  padding: 0 2px;
`;

export const TimeWrapper = styled.div`
  width: 100px;
  border: 1px solid ${(props) => props.theme.secondaryColors.secondaryLighter};
  background: ${(props) => props.theme.secondaryColors.secondaryLighter};
  text-align: center;
`;

export const SpotCategory = styled.div`
  margin-left: 5px;
  width: 32px;
`;

export const SpotMemo = styled.div`
  padding: 5px 0;
  word-break: break-all;
`;
