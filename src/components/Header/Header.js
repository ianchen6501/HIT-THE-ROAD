import React, {Component} from 'react'
import styled from 'styled-components'
import {
  Link,
  useLocation,
} from 'react-router-dom';
import logo from '../../static/logo.svg'
import {ReactComponent as LogoSVG} from '../../static/logo.svg'
import "./Header.css"
import { FBdeleteApp } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store';
import { deleteAuthTokenFromLocalStorage } from '../../utils'
import { setUserData } from '../../redux/reducers/usersReducer';

const HeaderContainer =styled.div `
  position: ${props => props.$atHomepage? `relative` : `fixed`};
  height: ${props => props.$atHomepage? props.theme.heights.homepageHeader : props.theme.heights.header};
  width:100%;
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
  background: linear-gradient(${props => props.theme.primaryColors.primaryLight}, ${props => props.theme.secondaryColors.secondaryLighter});
  box-shadow: 0.2px 0.2px 0.3px;
`

const HeaderUpContainer = styled.div `
  width: 100%;
  height: ${props => props.$atHomepage? `auto` : '100%  '};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.div `
  position: relative;
  right: 30px;
  width: ${props => props.$atHomepage? '360px' : '210px'};
  height: ${props => props.$atHomepage? '120px' : '70px'};
  background: url(${logo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${props => props.$atHomepage? '360px 120px' : '210px 70px'};
  ${props => props.$atHomepage && `bottom: 20px;`}
`

const Brand = styled.div `
  margin-left: 20px;
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
  color: ${props => props.theme.secondaryColors.secondaryDarker};
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
  color: ${props => props.theme.secondaryColors.secondaryDarker};
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
  margin-top: 20px;
  padding: 15px 25px;
  border: solid 3px ${props => props.theme.basicColors.white};
  font-size: ${props => props.theme.titles.h3};
  font-weight: bold;
  color: ${props => props.theme.basicColors.white};
  cursor: pointer;
  transition: border 1s;

  &:hover {
    animation: Gradient linear;
    animation-duration: 1s;
    animation-iteration-count: infinite;

    border: 3px solid transparent;
  }
`

export default function Header() {
  const dispatch = useDispatch()
  const location = useLocation()
  const userData = useSelector(store => store.users.userData)

  function handleLogout() {
    // FBdeleteApp()
    deleteAuthTokenFromLocalStorage()
    dispatch(setUserData(null))
  }

  return (
    <HeaderContainer $atHomepage={location.pathname === '/'}>
      <HeaderUpContainer $atHomepage={location.pathname === '/'}>
        <LeftContainer>
          <Brand as={Link} to='/'>HitTheRoad</Brand>
          { location.pathname !== '/' && (
            <Logo $atHomepage={location.pathname === '/'}></Logo>
          )}
        </LeftContainer>
        <NavbarList>
          {!userData && <Nav to='/user/1' $active={location.pathname === '/user'}>編輯行程</Nav>}
          {!userData && <Nav to='/login' $active={location.pathname === '/login'}>登入</Nav>}
          {!userData && <Nav to='/register' $active={location.pathname === '/register'}>註冊</Nav>}
          {userData && <Nav onClick={() => handleLogout()}>登出</Nav>}
        </NavbarList>
      </HeaderUpContainer>
        { location.pathname === '/' && (
          <>
            <LogoSVG className="LogoSVG" stroke="#DB7290" strokeWidth="1rem" fill="#000000"></LogoSVG>
            <Link to={'/create'}><HeaderSlogan>開始探索旅程</HeaderSlogan></Link>
          </>
        )}
    </HeaderContainer>
  )
}
