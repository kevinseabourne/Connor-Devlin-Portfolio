import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import ImageLoader from "./common/imageLoader";
import TextLoadingPlaceholder from "../components/common/textLoadingPlaceholder";
import ImageVideoLoadingPlaceholder from "../components/common/imageVideoLoadingPlaceholder";
import AppContext from "../context/appContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
  const [contentLoaded, setContentLoaded] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  const signOut = () => {
    handleSignOut();
    router.push("/login");
  };

  const handleOnLoadOutside = (route) => {
    if (route === "signOutIcon") {
      timeout.current = setTimeout(() => {
        setContentLoaded(true);
      }, 500);
    }
  };

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0,
      },
    },
  };

  const linkAnimation = {
    hidden: {
      opacity: 0,
      y: -5,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
      },
    },
  };

  const fade = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        type: "spring",
      },
    },
  };

  const fadeLink = {
    hidden: {
      opacity: 0,
      visibility: "hidden",
    },
    show: {
      opacity: 1,
      visibility: "visible",
    },
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
            <LinkContainer variants={linkAnimation}>
              <InnerLinkContainer
                variants={fadeLink}
                initial="hidden"
                animate={contentLoaded ? "show" : "hidden"}
                exit="hidden"
              >
                <ImageLoader
                  itemId={link.route}
                  maxWidth="30px"
                  placeholderSize="100%"
                  hover={true}
                  contentLoaded={contentLoaded}
                  src={link.icon}
                  handleOnLoadOutside={handleOnLoadOutside}
                />
                <LinkTitle>{link.title}</LinkTitle>
              </InnerLinkContainer>
              <AnimatePresence>
                {!contentLoaded && (
                  <LoadingContainer
                    variants={fade}
                    initial="hidden"
                    animate={!contentLoaded ? "show" : "hidden"}
                    exit="hidden"
                  >
                    <ImageVideoLoadingPlaceholder
                      placeholderSize="100%"
                      maxWidth="47px"
                      marginLeft="-10px"
                      marginRight="10px"
                      borderRadius="50%"
                      duration={1.3}
                    />
                    <TextLoadingPlaceholder
                      marginTop="0px"
                      marginRight="0px"
                      maxWidth="80%"
                      height="28px"
                      borderRadius="9px"
                      duration={1.3}
                    />
                  </LoadingContainer>
                )}
              </AnimatePresence>
            </LinkContainer>
          </Link>
        ))}
      </LinksContainer>

      <SignOutContainer onClick={signOut} variants={linkAnimation}>
        <InnerSignOutContainer
          variants={fadeLink}
          initial="hidden"
          animate={contentLoaded ? "show" : "hidden"}
          exit="hidden"
        >
          <ImageLoader
            itemId={"signOutIcon"}
            width="30px"
            placeholderSize="100%"
            hover={true}
            handleOnLoadOutside={handleOnLoadOutside}
            src="https://chpistel.sirv.com/Connor-Portfolio/logout%20(1).png?w=30"
          />
          <Signout onClick={signOut}>Sign Out</Signout>
        </InnerSignOutContainer>
        <AnimatePresence>
          {!contentLoaded && (
            <LoadingContainer
              backgroundColor="#F9FAFB"
              variants={fade}
              initial="hidden"
              animate={!contentLoaded ? "show" : "hidden"}
              exit="hidden"
            >
              <ImageVideoLoadingPlaceholder
                placeholderSize="100%"
                maxWidth="40px"
                marginLeft="0px"
                marginRight="10px"
                borderRadius="50%"
                duration={1.3}
              />
              <TextLoadingPlaceholder
                marginTop="0px"
                marginRight="0px"
                maxWidth="40%"
                height="24px"
                borderRadius="9px"
                duration={1.3}
              />
            </LoadingContainer>
          )}
        </AnimatePresence>
      </SignOutContainer>
    </Sidebar>
  );
};

export default AdminSidebar;

const Sidebar = styled(motion.div)`
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

const LinksContainer = styled(motion.div)`
  margin-top: 70px;
  margin-bottom: 30px;
`;

const LinkContainer = styled(motion.a)`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
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

const InnerLinkContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  justify-content: flex-start;
  border-radius: 15px;
`;

const LinkTitle = styled(motion.h3)`
  margin-left: 18px;
  font-size: 1.02rem;
  letter-spacing: 0px;
  @media (max-width: 750px) {
    display: none;
  }
`;

const LoadingContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "transparent"};
`;

const SignOutContainer = styled(motion.button)`
  margin-bottom: 60px;
  display: flex;
  border: none;
  align-items: center;
  margin-top: auto;
  justify-content: center;
  flex-direction: row;
  position: relative;
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

const InnerSignOutContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
