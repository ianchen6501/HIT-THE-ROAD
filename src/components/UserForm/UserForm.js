import styled from "styled-components";
import { MEDIA_QUERY_EXSM, MEDIA_QUERY_MD } from "../../constants/break_point";

export const FormContainer = styled.div`
  position: relative;
  width: 600px;
  border: 2px solid ${(props) => props.theme.secondaryColors.secondaryDarker};
  border-radius: 15px;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.large};
  background: white;

  ${MEDIA_QUERY_MD} {
    width: 480px;
  }

  ${MEDIA_QUERY_EXSM} {
    width: 300px;
  }
`;
export const UserInput = styled.input`
  width: 480px;
  height: 50px;
  margin-top: 30px;
  padding-left: 25px;
  border: 1px solid ${(props) => props.theme.secondaryColors.secondaryLight};
  border-radius: 50px;
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};

  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  }

  ${MEDIA_QUERY_MD} {
    width: 360px;
  }

  ${MEDIA_QUERY_EXSM} {
    font-size: ${(props) => props.theme.fontSizes.small};
    width: 225px;
  }
`;

export const UserButton = styled.button`
  position: relative;
  margin-top: 30px;
  padding: 10px 15px;
  font-size: ${(props) => props.theme.fontSizes.medium};
  background: ${(props) => props.theme.primaryColors.primaryLighter};
`;

export const Title = styled.div`
  position: relative;
  font-size: ${(props) => props.theme.titles.h3};
  font-weight: bold;
  display: flex;
  align-items: center;
  j ${MEDIA_QUERY_MD} {
    font-size: ${(props) => props.theme.titles.h5};
  }

  ${MEDIA_QUERY_EXSM} {
    font-size: ${(props) => props.theme.titles.h6};
  }
`;

export const UserInputContainer = styled.div`
  height: 80px;
`;

export const UserButtonContainer = styled.div`
  height: 110px;
  padding-top: 30px;
`;

export const UserButtonBorder = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 480px;
  height: 50px;
  border: 2px solid ${(props) => props.theme.secondaryColors.secondaryLight};
  border-radius: 50px;
  padding-right: 476px;
  z-index: 1;
  transition: padding-right 0.2s;
  background: white;
  cursor: pointer;

  &:hover {
    padding-right: 0px;
  }

  &:hover > div {
    color: white;
  }

  ${MEDIA_QUERY_MD} {
    width: 360px;
    padding-right: 356px;
  }

  ${MEDIA_QUERY_EXSM} {
    width: 225px;
    padding-right: 221px;
  }
`;

export const UserButtonBackground = styled.div`
  width: 100%;
  height: 47px;
  margin-right: 0%;
  border-radius: 25px;
  z-index: 2;
  background: ${(props) => props.theme.secondaryColors.secondaryLight};
`;

export const UserButtonText = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 3;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  font-size: ${(props) => props.theme.fontSizes.medium};
  transition: color 0.2s;

  ${MEDIA_QUERY_EXSM} {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

export const ErrorMessage = styled.div`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: gray;

  ${MEDIA_QUERY_EXSM} {
    font-size: ${(props) => props.theme.fontSizes.extraSmall};
  }
`;
