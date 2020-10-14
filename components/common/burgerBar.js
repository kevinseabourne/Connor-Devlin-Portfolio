import styled, { createGlobalStyle } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { getCurrentUser } from "../../pages/api/auth";

const BurgerBar = React.forwardRef(
  ({ burgerOpen, handleBurgerClick, links, adminLinks }, ref) => {
    const contentRef = useRef(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    }, []);

    const onClick = () => {
      handleBurgerClick();
      contentRef.current.scrollTop = 0;
    };

    return (
      <React.Fragment>
        <Container ref={ref}>
          <GlobalStyle burgerOpen={burgerOpen} />
          <Burger
            burgerOpen={burgerOpen}
            onClick={onClick}
            id="burgerOpen"
            data-testid="burgerOpen"
          >
            <BurgerInner burgerOpen={burgerOpen} />
          </Burger>
          <Content ref={contentRef} burgerOpen={burgerOpen}>
            {links.map((link) => (
              <Link key={links.indexOf(link)} href={link.link}>
                <BurgerLinkTitle onClick={onClick}>
                  {link.title}
                </BurgerLinkTitle>
              </Link>
            ))}
            {user && <BurgerSubTitle>Admin</BurgerSubTitle>}
            {user &&
              adminLinks.map((link) => (
                <Link key={link.route} href="/admin/[id]" as={link.route}>
                  <BurgerLinkTitle onClick={onClick} user={user}>
                    {link.title}
                  </BurgerLinkTitle>
                </Link>
              ))}
          </Content>
        </Container>
        <TransitionGroup component={null}>
          {burgerOpen && (
            <CSSTransition
              in={burgerOpen}
              classNames="overlayAnimation"
              timeout={300}
              unmountOnExit
            >
              <Overlay burgerOpen={burgerOpen} />
            </CSSTransition>
          )}
        </TransitionGroup>
      </React.Fragment>
    );
  }
);

export default BurgerBar;

const GlobalStyle = createGlobalStyle`
 body {
   overflow: ${({ burgerOpen }) =>
     burgerOpen ? "hidden !important" : "scroll"};
   overscroll-behavior: none;
  }
`;

const Container = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  z-index: 100;
  @media (max-width: 1024px) {
    display: flex;
  }
`;

const Burger = styled.div`
  display: none;
  position: relative;
  width: 32px;
  height: 24px;
  padding: 25.5px;
  margin-left: auto;
  z-index: 200;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1024px) {
    display: inline-block;
  }
  @media (max-width: 330px) {
    padding-left: 21.4px;
    padding-right: 21.4px;
  }
`;

const BurgerInner = styled.div`
  position: absolute;
  width: ${({ burgerOpen }) => (burgerOpen ? "32px" : "28px")};
  height: 3.45px;
  transition-timing-function: ease;
  transition-duration: 0.15s;
  transition-property: transform;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.fontColor};;
  transform: ${({ burgerOpen }) =>
    burgerOpen
      ? `translate3d(0, 10px, 0) rotate(45deg)`
      : `translate3d(0, 0px, 0) rotate(0deg)`}
  };
  &::before {
    display: block;
    content: "";
    top: 10px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform, opacity;
    position: absolute;
    width: 32px;
    height: 3.45px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.fontColor};
        opacity: ${({ burgerOpen }) => (burgerOpen ? 0 : 1)}
  };
  &::after {
    top: 20px;
    display: block;
    content: "";
    position: absolute;
    width: ${({ burgerOpen }) => (burgerOpen ? "32px" : "26px")};
    height: 3.45px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.fontColor};
    bottom: -10px;
    transform: ${({ burgerOpen }) =>
      burgerOpen
        ? `translate3d(0,-20px, 0) rotate(-90deg)`
        : `translate3d(0, 0px, 0) rotate(0deg)`}
  };
`;

const Overlay = styled.div`
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  background-color: ${({ burgerOpen }) =>
    burgerOpen ? "rgba(0, 0, 0, 0.25)" : "transparent"};
  &.overlayAnimation-enter {
    background-color: transparent;
  }
  &.overlayAnimation-enter-active {
    background-color: rgba(0, 0, 0, 0.25);
    transition: all 0.3s;
  }
  &.overlayAnimation-exit {
    background-color: rgba(0, 0, 0, 0.25);
    transition: all 0.3s;
  }
  &.overlayAnimation-exit-active {
    background-color: transparent;
    transition: all 0.3s;
  }
`;

const Content = styled.div`
  top: 0;
  right: ${({ burgerOpen }) => (burgerOpen ? "0px" : "-40px")};
  box-sizing: border-box;
  padding-top: 108px;
  height: 100vh;
  display: flex;
  z-index: 1;
  padding-right: 20px;
  padding-left: 20px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: fixed;
  overflow: scroll;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  transition: width 0.3s ease;
  width: ${({ burgerOpen }) => (burgerOpen ? "280px" : "0px")};
  @media (max-width: 350px) {
    width: ${({ burgerOpen }) => (burgerOpen ? "250px" : "0px")};
  }
`;

const BurgerLinkTitle = styled.span`
  white-space: nowrap;
  padding: 20px 20px;
  padding-left: 10px;
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }) => theme.colors.fontColor};
  transition: all 0.3s ease;
  opacity: 0.9;
  width: 100%;
  background-color: transparent;
  &::after {
  }
  &:hover {
    cursor: pointer;
    opacity: 1;
    background-color: rgba(203, 195, 186, 0.3);
  }
  &:first-child {
    border-top: none;
  }
  &:nth-child(5) {
    border-bottom: ${({ user, theme }) =>
      user ? `1px solid ${theme.colors.fontColor}` : "none"};
  }
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.fontColor};
    margin-bottom: 70px;
  }
`;

const BurgerSubTitle = styled.h4`
  margin-top: 55px;
  margin-bottom: 5.5px;
  font-size: 0.8rem;
  padding-left: 10px;
  font-weight: bold;
  text-align: left;
  &:hover {
    cursor: default;
  }
`;
