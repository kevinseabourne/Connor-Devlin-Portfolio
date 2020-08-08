import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ImageLoader from "./common/imageLoader";
import Link from "next/link";
import BurgerBar from "./burgerBar.js";

const Header = (props) => {
  const ref = useRef(null);
  const [links, setLinks] = useState([
    { title: "About", link: "/about" },
    { title: "Weddings", link: "/weddings" },
    { title: "Corporate", link: "/corporate" },
    { title: "Pricing", link: "/pricing" },
    { title: "Contact", link: "/contact" },
  ]);
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setBurgerOpen(false);
    }
  };

  const handleBurgerClick = () => {
    setBurgerOpen(!burgerOpen);
  };
  return (
    <Container>
      <Link href="/">
        <NameContainer>
          <LogoNameContainer>
            <Name>CONNOR</Name>
            <Logo>
              <ImageLoader
                width="18px"
                placeholderSize="100%"
                src="https://chpistel.sirv.com/Connor-Portfolio/photography.png?w=74&png.optimize=true"
              />
            </Logo>
            <Name>DEVLIN</Name>
          </LogoNameContainer>
          <LogoSecondLabel>Media</LogoSecondLabel>
        </NameContainer>
      </Link>

      <LinksContainer>
        {links.map((link) => (
          <Link key={links.indexOf(link)} href={link.link}>
            <LinkTitle>{link.title}</LinkTitle>
          </Link>
        ))}
      </LinksContainer>
      <BurgerBar
        ref={ref}
        onClick={handleBurgerClick}
        burgerOpen={burgerOpen}
        links={links}
      />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 75px;
  position: sticky;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  ${"" /* background-color: #a6a998; */}
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  box-shadow: 0px 0px 6px 1px rgba(50, 172, 109, 0.7);
    ${"" /* box-shadow: box-shadow: 0px 0px 19px 26px #a6a998; */}
    ${"" /* box-shadow: 0px -10px 16px 26px #cbc3ba; */};
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;
  margin-right: auto;
  margin-left: 50px;
  z-index: 0;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 680px) {
    position: absolute;
    left: 50%;
    right: 50%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const LogoNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LogoSecondLabel = styled.label`
  margin-left: 21.2px;
  font-size: 1rem:
`;

const Logo = styled.div`
  margin-bottom: 4px;
  margin-left: 6px;
  margin-right: 6px;
  top: -9px;
  left: -2px;
  z-index: -1;
`;

const Name = styled.label`
  font-size: 24px;
  white-space: nowrap;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 20px;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: auto;
  margin-right: 50px;
  z-index: 1;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const LinkTitle = styled.span`
  white-space: nowrap;
  margin: 0 15px;
  transition: all 0.3s ease;
  opacity: 0.9;
  background-color: transparent;
  &::after {
  }
  &:hover {
    cursor: pointer;
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.secondary};
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;
