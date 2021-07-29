import { useState, useEffect } from "react";
import styled from "styled-components";
import ImageLoader from "./common/imageLoader";
import Link from "next/link";
import Image from "next/image";
import BurgerBar from "./common/burgerBar";

const Header = () => {
  // Cypress Testing Coverage //
  /* istanbul ignore file */
  const [showSkipLink, setShowSkipLink] = useState(false);
  const [renderLinks, setRenderLinks] = useState(false);
  const [links] = useState([
    { title: "About", route: "/about" },
    { title: "Weddings", route: "/weddings" },
    { title: "Corporate", route: "/corporate" },
    { title: "Pricing", route: "/pricing" },
    { title: "Contact", route: "/contact" },
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

  useEffect(() => {
    window.innerWidth > 1024 && setRenderLinks(true);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleWindowResize = () => {
    if (window.innerWidth > 1024) {
      setRenderLinks(true);
    }
  };
  return (
    <Container>
      <InnerContainer>
        <SkipHeaderLink
          href="#main"
          onFocus={() => setShowSkipLink(true)}
          onBlur={() => setShowSkipLink(false)}
          showSkipLink={showSkipLink}
        >
          Skip to Content
        </SkipHeaderLink>
        <Link href="/" passHref>
          <Logo aria-label="logo">
            <Image
              src="https://chpistel.sirv.com/Connor-Portfolio/cdlogo.png?w=225&png.optimize=true"
              width={225}
              height={29}
              alt="Connor Devlin Media"
            />
          </Logo>
        </Link>
        {renderLinks && (
          <LinksContainer>
            {links.map((link) => (
              <Link key={links.indexOf(link)} href={link.route} passHref>
                <LinkTitle>{link.title}</LinkTitle>
              </Link>
            ))}
          </LinksContainer>
        )}
        <BurgerBar adminLinks={adminLinks} links={links} />
      </InnerContainer>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  width: 100%;
  min-width: 100%;
  height: 75px;
  position: sticky;
  position: -webkit-sticky;
  z-index: 5;
  top: 0;
  left: 0;
  display: block;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  box-shadow: 0px 0px 6px 1px rgba(50, 172, 109, 0.7);
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const SkipHeaderLink = styled.a`
  opacity: ${({ showSkipLink }) => (showSkipLink ? 1 : 0)};
  padding: 16px 24px;
  position: absolute;
  top: 92px;
  left: 62px;
  font-family: "Karla-Bold";
  font-size: 1rem;
  border-radius: 9px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.02) 0px -5.9px 2.7px,
    rgba(0, 0, 0, 0.024) 0px -1.2px 6.9px, rgba(0, 0, 0, 0.03) 0px 8px 14.2px,
    rgba(0, 0, 0, 0.04) 0px 21.9px 29.2px, rgba(0, 0, 0, 0.07) 0px 49px 80px;
  &:focus {
    outline: initial solid initial;
  }
`;

// const NameContainer = styled.a`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   margin-left: 50px;
//   z-index: 0;
//   position: relative;
//   &:hover {
//     cursor: pointer;
//   }
//   @media (max-width: 1024px) {
//     position: absolute;
//     left: 50%;
//     right: 50%;
//     margin-left: 0px;
//   }
//   @media (max-width: 414px) {
//     position: relative;
//     margin-left: 20px;
//     left: 0%;
//   }
//   @media (max-width: 330px) {
//     margin-left: 20px;
//   }
// `;

const Logo = styled.a`
  ${"" /* z-index: -1; */}
  margin-left: 50px;
  width: 240px;
  @media (max-width: 680px) {
    width: 220px;
  }
  @media (max-width: 335px) {
    width: 180px;
  }
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
    visibility: hidden;
  }
`;

const LinkTitle = styled.a`
  white-space: nowrap;
  margin: 0 15px;
  transition: all 0.3s ease;
  font-family: "Karla-Bold";
  background-color: transparent;
  font-size: 1.05rem;
  &:hover {
    cursor: pointer;
    opacity: 1;
    color: black;
  }
  @media (max-width: 1024px) {
    display: none;
    visibility: hidden;
  }
  @media (max-width: 424px) {
    font-size: 1rem;
  }
  @media (max-width: 300px) {
    font-size: 0.9rem;
  }
`;
