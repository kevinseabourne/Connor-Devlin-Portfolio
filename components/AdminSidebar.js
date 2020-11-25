import styled from "styled-components";
import ImageLoader from "./common/imageLoader";
import React, { useEffect, useState, useContext } from "react";
import AppContext from "../context/appContext";
import { useRouter } from "next/router";
import Link from "next/link";

const AdminSidebar = (props) => {
  const context = useContext(AppContext);
  const { handleSignOut } = context;
  const router = useRouter();
  const [links] = useState([
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
      title: "Add Pricing",
      route: "/admin/add-pricing",
    },
    {
      icon: "https://chpistel.sirv.com/Connor-Portfolio/price-tag.png?w=30",
      title: "Edit Pricing",
      route: "/admin/edit-pricing",
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
  ]);

  const signOut = () => {
    handleSignOut();
    router.push("/login");
  };

  return (
    <Sidebar>
      <LinksContainer>
        {links.map((link) => (
          <Link
            href="/admin/[id]"
            as={link.route}
            key={links.indexOf(link)}
            passHref
          >
            <LinkContainer>
              <ImageLoader
                maxWidth="30px"
                placeholderSize="100%"
                opacity="0"
                transitionDuration={300}
                transitionTiming="ease"
                hover={true}
                src={link.icon}
                delay={links.indexOf(link) * 62}
              />
              <LinkTitle>{link.title}</LinkTitle>
            </LinkContainer>
          </Link>
        ))}
      </LinksContainer>

      <SignOutContainer onClick={signOut}>
        <ImageLoader
          width="30px"
          placeholderSize="100%"
          opacity="0"
          scale="0.99"
          transitionTime="0.250s"
          hover={true}
          src="https://chpistel.sirv.com/Connor-Portfolio/logout%20(1).png?w=30"
        />
        <Signout onClick={signOut}>Sign Out</Signout>
      </SignOutContainer>
    </Sidebar>
  );
};

export default AdminSidebar;

const Sidebar = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  height: calc(100vh - 75px);
  margin-top: 75px;
  overflow: scroll;
  width: 280px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0px 50px;
  background-image: radial-gradient(
    circle at 10% 20%,
    rgb(50, 172, 109) 0%,
    rgb(209, 251, 155) 100.2%
  );
  @media (max-width: 1250px) {
    width: 200px;
    padding: 0 25px;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

const LinksContainer = styled.div`
  margin-top: 70px;
  margin-bottom: 30px;
`;

const LinkContainer = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  padding: 15px;
  border-radius: 15px;
  background-color: rgba(234, 235, 241, 0);
  transition: all 100ms;
  &:hover {
    cursor: pointer;
    background-color: rgba(234, 235, 241, 1);
  }
  &:first-child {
    margin-top: 0px;
  }
`;

const LinkTitle = styled.h3`
  margin-left: 18px;
  font-size: 1.02rem;
  letter-spacing: 0px;
  @media (max-width: 750px) {
    display: none;
  }
`;

const SignOutContainer = styled.button`
  margin-bottom: 60px;
  display: flex;
  border: none;
  align-items: center;
  margin-top: auto;
  justify-content: center;
  flex-direction: row;
  padding: 15px 15px;
  font-family: inherit;
  box-sizing: border-box;
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(255, 197, 118, 1) 0%,
    rgba(254, 106, 103, 1) 47.7%,
    rgba(240, 23, 23, 1) 92.3%
  );
  transform: scale(1);
  border-radius: 15px;
  &:hover {
    cursor: pointer;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

const Signout = styled.span`
  margin-left: 18px;
  margin-bottom: 0.3px;
  font-size: 1.02rem;
  letter-spacing: 0px;
  white-space: nowrap;
  color: white;
  @media (max-width: 750px) {
    display: none;
  }
`;
