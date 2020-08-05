import React, { useState } from "react";
import styled from "styled-components";
import ImageLoader from "./common/imageLoader";
import Link from "next/link";

const Header = (props) => {
  const [links, setLinks] = useState([
    { title: "About", link: "/about" },
    { title: "Weddings", link: "/weddings" },
    { title: "Corporate", link: "/corporate" },
    { title: "Pricing", link: "/pricing" },
    { title: "Contact", link: "/contact" },
  ]);
  return (
    <Container>
      <NameContainer>
        <ImageLoader /> <Name>CONNOR DEVLIN</Name>
      </NameContainer>

      <LinksContainer>
        {links.map((link) => (
          <Link key={links.indexOf(link)} href={link.link}>
            <LinkTitle>{link.title}</LinkTitle>
          </Link>
        ))}
      </LinksContainer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  height: 75px;
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  background-color: rgba(242, 66, 54, 1);
  box-shadow: 0px -10px 16px 26px rgba(242, 66, 54, 1);
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-right: auto;
  margin-left: 50px;
`;

const Name = styled.span`
  font-size: 24px;
  white-space: nowrap;
  font-weight: 700;
  letter-spacing: -1px;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: auto;
  margin-right: 50px;
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
    background-color: grey;
  }
`;
