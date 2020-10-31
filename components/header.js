import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import ImageLoader from "./common/imageLoader";
import Link from "next/link";
import BurgerBar from "./common/burgerBar";

const Header = (props) => {
  const ref = useRef(null);
  const [links] = useState([
    { title: "About", link: "/about" },
    { title: "Weddings", link: "/weddings" },
    { title: "Corporate", link: "/corporate" },
    { title: "Pricing", link: "/pricing" },
    { title: "Contact", link: "/contact" },
  ]);
  const [adminLinks] = useState([
    {
      icon:
        "https://chpistel.sirv.com/Connor-Portfolio/speedometer%20(1).png?w=30",
      title: "Dashboard",
      route: "/admin",
    },
    {
      icon: "https://chpistel.sirv.com/Connor-Portfolio/2636907.svg?w=30",
      title: "About",
      route: "/admin/about",
    },
    {
      icon: "https://chpistel.sirv.com/Connor-Portfolio/bride.png?w=30",
      title: "Weddings",
      route: "/admin/weddings",
    },
    {
      icon: "https://chpistel.sirv.com/Connor-Portfolio/husband.png?w=30",
      title: "Corporate",
      route: "/admin/corporate",
    },
    {
      icon: "https://chpistel.sirv.com/Connor-Portfolio/price-tag.png?w=30",
      title: "Pricing",
      route: "/admin/pricing",
    },
    {
      icon: "https://chpistel.sirv.com/Connor-Portfolio/plus.png?w=30",
      title: "Add Content",
      route: "/admin/add-content",
    },
    {
      icon: "https://chpistel.sirv.com/Connor-Portfolio/writing.png?w=30",
      title: "Edit Content",
      route: "/admin/edit-content",
    },
    {
      icon: "https://chpistel.sirv.com/Connor-Portfolio/minus%20(1).png?w=30",
      title: "Delete Content",
      route: "/admin/delete-content",
    },
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
      <Link href="/" passHref>
        <NameContainer>
          <Logo>
            <ImageLoader
              width="100%"
              placeholderSize="13.2%"
              hover={true}
              lazyLoad={true}
              src="https://chpistel.sirv.com/Connor-Portfolio/cdlogo.png?w=350&png.optimize=true"
            />
          </Logo>
        </NameContainer>
      </Link>

      <LinksContainer>
        {links.map((link) => (
          <Link key={links.indexOf(link)} href={link.link} passHref>
            <LinkTitle>{link.title}</LinkTitle>
          </Link>
        ))}
      </LinksContainer>
      <BurgerBar
        ref={ref}
        adminLinks={adminLinks}
        handleBurgerClick={handleBurgerClick}
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
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  box-shadow: 0px 0px 6px 1px rgba(50, 172, 109, 0.7);
`;

const NameContainer = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 50px;
  z-index: 0;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1024px) {
    position: absolute;
    left: 50%;
    right: 50%;
    margin-left: 0px;
  }
  @media (max-width: 414px) {
    position: relative;
    margin-left: 20px;
    left: 0%;
  }
  @media (max-width: 330px) {
    margin-left: 20px;
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
  z-index: -1;
  width: 240px;
  @media (max-width: 680px) {
    width: 220px;
  }
  @media (max-width: 335px) {
    width: 180px;
  }
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

const LinkTitle = styled.a`
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
    color: black;
    ${"" /* background-color: ${({ theme }) => theme.colors.secondary}; */}
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;
