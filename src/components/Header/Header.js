import React from 'react'
import styled from 'styled-components'
import {
  Link,
  useLocation,
  useHistory
} from 'react-router-dom';
import logo from '../../static/logo.png'

const HeaderContainer =styled.div `
  position: ${props => props.$atHomepage? `relative` : `absolute`};
  height: ${props => props.$atHomepage? props.theme.heights.homepageHeader : props.theme.heights.header};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  ${props => props.$atHomepage&& `padding-top: 30px`};
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 0px, 30px;
  background: ${props => props.theme.primaryColors.primaryLighter};
  box-shadow: 0.2px 0.2px 0.3px;
  z-index: 2;
`

const HeaderUpContainer = styled.div `
  width: 100%;
  height: ${props => props.$atHomepage? `auto` : '100%  '};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.div `
  height: 60px;
  width: 180px;
  background: url(${logo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 180px 60px;
`

const Brand = styled.div `
  margin-left: 20px;
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
  color: ${props => props.theme.primaryColors.black};
`

const NavbarList = styled.div `
  display: flex;
  align-items: center;
`

const Nav = styled(Link) ` 
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 10px;
  color: ${props => props.theme.primaryColors.black};
  font-weight: bold;
  text-decoration: none;
  transition: font-size 0.3s, background 0.3s;
  margin-right: 10px;

  &:hover {
    font-size:18px
  }

  ${(props) => 
    props.$active && `background: ${props => props.theme.primaryColors.primaryDarker};`
  }
`

const LeftContainer = styled.div `
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 32px;
  }
`

const HeaderSlogan = styled.div `
  position: relative;
  top: -40px;
  display: flex;
  align-items: center;
  padding: 25px;
  border: solid 2px ${props => props.theme.primaryColors.primaryDarker};
  font-size: ${props => props.theme.titles.h3};
  font-weight: bold;
`

export default function Header() {
  const location = useLocation()

  return (
    <HeaderContainer $atHomepage={location.pathname === '/'}>
      <HeaderUpContainer $atHomepage={location.pathname === '/'}>
      <LeftContainer>
          <Brand as={Link} to='/'>HitTheRoad</Brand>
        </LeftContainer>
        <Logo></Logo>
        <NavbarList>
          <Nav to='/login' $active={location.pathname === '/login'}>登入</Nav>
          <Nav to='/register' $active={location.pathname === '/register'}>註冊</Nav>
          <Nav >登出</Nav>
        </NavbarList>
      </HeaderUpContainer>
        {location.pathname === '/' && (
          <HeaderSlogan>開始探索旅程</HeaderSlogan>
        )}
    </HeaderContainer>
  )
}
