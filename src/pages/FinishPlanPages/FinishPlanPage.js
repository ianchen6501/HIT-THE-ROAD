import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../../constants/break_point";

const Wrapper = styled.div`
  margin: 0px auto;
  padding-top: ${(props) => props.theme.heights.header};
  margin-bottom: ${(props) => props.theme.heights.footer};
  padding-bottom: ${(props) => props.theme.heights.footer};
  padding-left: 20px;
  padding-right: 20px;
  max-width: ${(props) => props.theme.Wrappers.largeWidth};
  min-height: 100vh;

  ${MEDIA_QUERY_SM} {
    width: ${(props) => props.theme.Wrappers.smallWidth};
  }
`;

const PlanHeader = styled.div`
  position: relative;
  margin: 60px auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  word-break: break-all;
`;

const PlanLocation = styled.div`
  margin-right: 5px;
  padding: 5px;
  width: 60px;
  border-radius: 5px;
  background: lightblue;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.extraSmall};
`;

const PlanTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.large};
`;

const PlanWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`;

const PlanColumn = styled.div`
  border: 1px solid wheat;
  width: 260px;
  margin-top: 10px;

  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`;

const RoutineTitle = styled.div`
  padding: 2px 5px;
  font-size: ${(props) => props.theme.fontSizes.mudium};
  font-style: italic;
  background: wheat;
`;

const RoutineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 420px;

  overflow: auto;
`;

const Spot = styled.div`
  width: 100%;
  & + & {
    margin-top: 5px;
  }
`;

const SpotInfo = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`;

const SpotName = styled.div``;

const TimeWrapper = styled.div`
  width: 100px;
  border: 1px solid lightgray;
  background: lightgray;
  text-align: center;
`;

const SpotCategory = styled.div``;

const SpotMemo = styled.div`
  word-break: break-all;
`;

export default function FinishPlanPage() {
  return (
    <Wrapper>
      <PlanHeader>
        <PlanLocation>台北</PlanLocation>
        <PlanTitle>plan title</PlanTitle>
      </PlanHeader>
      <PlanWrapper>
        <PlanColumn>
          <RoutineTitle>date</RoutineTitle>
          <RoutineWrapper></RoutineWrapper>
        </PlanColumn>
        <PlanColumn>
          <RoutineTitle>date</RoutineTitle>
          <RoutineWrapper>
            <Spot>
              <SpotInfo>
                <SpotName>台北 101</SpotName>
                <TimeWrapper> 0900 ~ 1200</TimeWrapper>
              </SpotInfo>
              <SpotCategory>hoho</SpotCategory>
              <SpotMemo>
                gooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooood
              </SpotMemo>
            </Spot>
            <Spot>
              <SpotInfo>
                <SpotName>微風南山</SpotName>
                <TimeWrapper> 1200 ~ 1800</TimeWrapper>
              </SpotInfo>
            </Spot>
            <Spot>
              <SpotInfo>
                <SpotName>台北 101</SpotName>
                <TimeWrapper> 0900 ~ 1200</TimeWrapper>
              </SpotInfo>
              <SpotCategory>hoho</SpotCategory>
              <SpotMemo>
                gooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooood
              </SpotMemo>
            </Spot>
            <Spot>
              <SpotInfo>
                <SpotName>台北 101</SpotName>
                <TimeWrapper> 0900 ~ 1200</TimeWrapper>
              </SpotInfo>
              <SpotCategory>hoho</SpotCategory>
              <SpotMemo>
                gooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooood
              </SpotMemo>
            </Spot>
            <Spot>
              <SpotInfo>
                <SpotName>台北 101</SpotName>
                <TimeWrapper> 0900 ~ 1200</TimeWrapper>
              </SpotInfo>
              <SpotCategory>hoho</SpotCategory>
              <SpotMemo>
                gooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooood
              </SpotMemo>
            </Spot>
            <Spot>
              <SpotInfo>
                <SpotName>台北 101</SpotName>
                <TimeWrapper> 0900 ~ 1200</TimeWrapper>
              </SpotInfo>
              <SpotCategory>hoho</SpotCategory>
              <SpotMemo>
                gooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooood
              </SpotMemo>
            </Spot>
            <Spot>
              <SpotInfo>
                <SpotName>台北 101</SpotName>
                <TimeWrapper> 0900 ~ 1200</TimeWrapper>
              </SpotInfo>
              <SpotCategory>hoho</SpotCategory>
              <SpotMemo>
                gooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooood
              </SpotMemo>
            </Spot>
            <Spot>
              <SpotInfo>
                <SpotName>台北 101</SpotName>
                <TimeWrapper> 0900 ~ 1200</TimeWrapper>
              </SpotInfo>
              <SpotCategory>hoho</SpotCategory>
              <SpotMemo>
                gooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooood
              </SpotMemo>
            </Spot>
          </RoutineWrapper>
        </PlanColumn>
        <PlanColumn>
          <RoutineTitle>date</RoutineTitle>
          <RoutineWrapper></RoutineWrapper>
        </PlanColumn>
        <PlanColumn>
          <RoutineTitle>date</RoutineTitle>
          <RoutineWrapper></RoutineWrapper>
        </PlanColumn>
      </PlanWrapper>
    </Wrapper>
  );
}

// scheduleName
// location
// dailyRoutines.key 每天
// dailyRoutines.key 下面每天行程
// location
// category
// memo
