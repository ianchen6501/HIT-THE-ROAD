import styled from "styled-components";

export const FormContainer = styled.div`
  position: relative;
  width: 600px;
  border: 2px solid ${(props) => props.theme.secondaryColors.secondaryDarker};
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes.large};

  @media only screen and (max-width: 780px) {
    width: 400px;
  }
`;
export const UserInput = styled.input`
  width: 480px;
  height: 50px;
  margin-top: 30px;
  padding-left: 5px;
  border: 1px solid ${(props) => props.theme.secondaryColors.secondaryLight};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};

  &::-webkit-input-placeholder {
    color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  }

  @media only screen and (max-width: 780px) {
    width: 300px;
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
  font-size: ${(props) => props.theme.titles.h3};
  font-weight: bold;
`;

export const UserInputContainer = styled.div`
  height: 80px;
`;

export const UserButtonBorder = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 480px;
  height: 50px;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-right: 476px;
  border: 2px solid ${(props) => props.theme.secondaryColors.secondaryLight};
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

  @media only screen and (max-width: 780px) {
    width: 300px;
    padding-right: 296px;
  }
`;

export const UserButtonBackground = styled.div`
  width: 100%;
  height: 47px;
  margin-right: 0%;
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
`;

export const ErrorMessage = styled.div`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: gray;
`;
