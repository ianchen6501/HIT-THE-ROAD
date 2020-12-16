import React from 'react'
import styled from 'styled-components'

export const FormContainer = styled.div `
  position: relative;
  width: 600px;
  border: 2px solid ${props => props.theme.primaryColors.primaryDarker};
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.theme.fontSizes.large};
`
export const UserInput = styled.input `
  width: 480px;
  height: 50px;
  margin-top: 30px;
  padding-left: 5px;
  border: 1px solid ${props => props.theme.primaryColors.primaryDark};
  font-size: ${props => props.theme.fontSizes.medium};
`

export const UserButton = styled.button `
  position: relative;
  margin-top: 30px;
  padding: 10px 15px;
  font-size: ${props => props.theme.fontSizes.medium};
  background: ${props => props.theme.primaryColors.primaryLighter};
`

export const Title = styled.div `
  font-size: ${props => props.theme.titles.h3};
  font-weight: bold;
`

export const UserInputContainer = styled.div `
  height: 80px;
`

export const UserButtonBorder = styled.div `
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 480px;
  height: 50px;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-right: 476px;
  border: 2px solid ${props => props.theme.primaryColors.primaryDarker};
  z-index: 2;
  transition: padding-right 0.2s;
  background: white;

  &:hover {
    padding-right: 0px;
  }

  &:hover > div {
    color: white;
  }
`

export const UserButtonBackground = styled.div `
  position: relative;
  width: 100%;
  height: 100%;
  margin-right: 0%;
  z-index: 1;
  background: ${props => props.theme.primaryColors.primaryDarker};
`

export const UserButtonText = styled.div `
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 3;
  color: black;
  font-size: ${props => props.theme.fontSizes.medium};
  transition: color 0.2s;
`

export const ErrorMessage = styled.div `
  position: relative;
  font-size: ${props => props.theme.fontSizes.small};
  color: red;
`