import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import logo from "../../static/logo_static.svg";
import { ReactComponent as LogoSVG } from "../../static/logo.svg";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAuthTokenFromLocalStorage } from "../../utils";
import { setUserData } from "../../redux/reducers/usersReducer";
import { MEDIA_QUERY_SM } from "../../constants/break_point";

const HeaderContainer = styled.div`
  position: ${(props) => (props.$atHomepage ? `relative` : `fixed`)};
  height: ${(props) =>
    props.$atHomepage
      ? props.theme.heights.homepageHeader
      : props.theme.heights.header};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 0px, 30px;
  ${(props) => props.$atHomepage && `padding-top: 30px`};
  z-index: 2;
  background: linear-gradient(
    ${(props) => props.theme.primaryColors.primaryLight},
    ${(props) => props.theme.secondaryColors.secondaryLighter}
  );
  box-shadow: 0px 2px 2px grey;

  ${MEDIA_QUERY_SM} {
    width: 100vw;
  }
`;

const HeaderUpContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.$atHomepage ? `auto` : "100%  ")};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  position: relative;
  top: 3px;
  bottom: 3px;
  width: ${(props) => (props.$atHomepage ? "360px" : "180px")};
  height: ${(props) => (props.$atHomepage ? "120px" : "60px")};
  background: url(${logo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${(props) =>
    props.$atHomepage ? "360px 120px" : "180px 60px"};
  ${(props) => props.$atHomepage && `bottom: 20px;`}

  ${MEDIA_QUERY_SM} {
    bottom: 0px;
    transform: scale(0.8);
    width: 120px;
  }
`;

const Brand = styled.div`
  margin-left: 20px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  color: ${(props) => props.theme.secondaryColors.secondary};

  ${MEDIA_QUERY_SM} {
    display: none;
  }

  &:hover {
    color: ${(props) => props.theme.basicColors.white};
  }
`;

const NavbarWrapper = styled.div``;

const NavbarButton = styled.div`
  display: none;

  ${MEDIA_QUERY_SM} {
    position: relative;
    display: block;
    margin-right: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;

    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      border-top: 2px solid ${(props) => props.theme.basicColors.white};
      border-bottom: 2px solid ${(props) => props.theme.basicColors.white};
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      transform: translateY(-50%);
      width: 100%;
      height: 100%;
      border-top: 2px solid ${(props) => props.theme.basicColors.white};
    }
  }
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
    position: absolute;
    top: ${(props) => props.theme.heights.header};
    left: ${(props) => (props.$isNavbarListShow ? "0px" : "-100%")};
    padding-left: 5px;
    padding-right: 5px;
    width: 100px;
    text-align: center;
    background: ${(props) => props.theme.secondaryColors.secondaryLighter};
    box-shadow: -3px 3px 3px grey;
    transition: left 1s ease;
  }
`;

const Nav = styled(Link)`
  box-sizing: border-box;
  padding: 10px 15px 5px;
  border-bottom: 1px solid transparent;
  color: ${(props) => props.theme.secondaryColors.secondary};
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    border-bottom: 1px solid ${(props) => props.theme.basicColors.white};
    color: ${(props) => props.theme.basicColors.white};
  }

  ${(props) =>
    props.$active &&
    `background: ${(props) => props.theme.primaryColors.primaryDarker};`}

  ${MEDIA_QUERY_SM} {
    display: block;
    margin: 0;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.basicColors.white};
    border-radius: 0;
    color: ${(props) => props.theme.secondaryColors.secondaryDark};
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 32px;
  }
`;

const HeaderSlogan = styled.div`
  position: relative;
  top: -40px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 15px 25px;
  border: solid 3px ${(props) => props.theme.basicColors.white};
  font-size: ${(props) => props.theme.titles.h3};
  font-weight: bold;
  color: ${(props) => props.theme.basicColors.white};
  cursor: pointer;
  transition: border 1s;

  &:hover {
    animation: Gradient linear;
    animation-duration: 1s;
    animation-iteration-count: infinite;

    border: 3px solid transparent;
  }
`;

export default function Header({ isCheckedLogin }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = useSelector((store) => store.users.userData);
  const [isNavbarListShow, setIsNavbarListShow] = useState(false);

  function handleLogout() {
    deleteAuthTokenFromLocalStorage();
    dispatch(setUserData(null));
  }

  return (
    <HeaderContainer $atHomepage={location.pathname === "/"}>
      <HeaderUpContainer $atHomepage={location.pathname === "/"}>
        <LeftContainer>
          {location.pathname === "/" && (
            <Brand as={Link} to="/">
              HitTheRoad
            </Brand>
          )}
          {location.pathname !== "/" && (
            <Logo as={Link} $atHomepage={location.pathname === "/"} to="/" />
          )}
        </LeftContainer>
        {isCheckedLogin && (
          <NavbarWrapper>
            <NavbarButton
              onClick={() => setIsNavbarListShow(!isNavbarListShow)}
            />
            <NavbarList $isNavbarListShow={isNavbarListShow}>
              <Nav
                to="/explore/location/全部"
                $active={location.pathname === "/user"}
                onClick={() => setIsNavbarListShow(false)}
              >
                探索行程
              </Nav>
              {userData && (
                <Nav
                  to="/user"
                  $active={location.pathname === "/user"}
                  onClick={() => setIsNavbarListShow(false)}
                >
                  編輯行程
                </Nav>
              )}
              {!userData && (
                <Nav
                  to="/login"
                  $active={location.pathname === "/login"}
                  onClick={() => setIsNavbarListShow(false)}
                >
                  登入
                </Nav>
              )}
              {!userData && (
                <Nav
                  to="/register"
                  $active={location.pathname === "/register"}
                  onClick={() => setIsNavbarListShow(false)}
                >
                  註冊
                </Nav>
              )}
              {userData && (
                <Nav
                  to="/"
                  onClick={() => {
                    setIsNavbarListShow(false);
                    handleLogout();
                  }}
                >
                  登出
                </Nav>
              )}
            </NavbarList>
          </NavbarWrapper>
        )}
      </HeaderUpContainer>
      {location.pathname === "/" && (
        <>
          <LogoSVG
            className="LogoSVG"
            stroke="#DB7290"
            strokeWidth="1rem"
            fill="#000000"
          ></LogoSVG>
          <Link to={userData ? "/create" : "/login"}>
            <HeaderSlogan>開始探索旅程</HeaderSlogan>
          </Link>
        </>
      )}
    </HeaderContainer>
  );
}
