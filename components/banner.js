import styled from "styled-components";
import Link from "next/link";
import ImageLoader from "./common/imageLoader";
import topWave from "../public/images/top-wave.svg";
import { motion } from "framer-motion";
import { useFontLoaded } from "../components/common/utils/hooks";

const Banner = () => {
  const [fontLoaded] = useFontLoaded("2rem Att-reborn");
  const [fontExtraBoldLoaded] = useFontLoaded("1rem Karla-ExtraBold");
  const container = {
    hidden: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const textAnimation = {
    hidden: {
      x: -40,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
      },
    },
  };

  return (
    <Container layout variants={container} initial="hidden" animate="show">
      <InnerContainer layout>
        <InfoContainer>
          <SmallTitle
            fontExtraBoldLoaded={fontExtraBoldLoaded}
            variants={textAnimation}
          >
            Videographer
          </SmallTitle>
          <Name variants={textAnimation} fontLoaded={fontLoaded}>
            <FirstName>CONNOR</FirstName>
            <LastName>DEVLIN.</LastName>
          </Name>
          <Description variants={textAnimation}>
            Digital media producer and filmmaker based out of Perth WA. Creating
            videos for weddings, businesses and everything in between.
          </Description>

          <Link href="/about" passHref>
            <ReadMoreLink
              fontExtraBoldLoaded={fontExtraBoldLoaded}
              tabIndex="0"
              role="button"
              variants={textAnimation}
            >
              Read More
            </ReadMoreLink>
          </Link>
        </InfoContainer>
        <ImageContainer layout variants={textAnimation}>
          <ImageLoader
            maxWidth="inherit"
            placeholderSize="66.66%"
            borderRadius="19px"
            alt="Connor Devlin"
            opacity={0}
            boxShadow="0px 20px 40px rgba(0,0,0,0.4)"
            src="https://chpistel.sirv.com/Connor-Portfolio/Connor%20Devlin%20Media.png?w=701"
            srcSet="
            https://chpistel.sirv.com/Connor-Portfolio/Connor%20Devlin%20Media.png?w=622 1200w,
            https://chpistel.sirv.com/Connor-Portfolio/Connor%20Devlin%20Media.png?w=522 1100w,
            https://chpistel.sirv.com/Connor-Portfolio/Connor%20Devlin%20Media.png?w=501 1024w,
            https://chpistel.sirv.com/Connor-Portfolio/Connor%20Devlin%20Media.png?w=386 425w,
            https://chpistel.sirv.com/Connor-Portfolio/Connor%20Devlin%20Media.png?w=336 375w,
          "
          />
        </ImageContainer>
      </InnerContainer>
      <BottomWave src={topWave} alt="wave" />
    </Container>
  );
};

export default Banner;

const Container = styled(motion.div)`
  height: 100%;
  min-height: calc(100vh - 75px);
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  @media (max-width: 1024px) {
    justify-content: flex-start;
  }
  @media (min-width: 1023px) and (max-height: 810px) {
    height: 100%;
  }
  @media (max-width: 1024px) and (max-height: 910px) {
    height: 100%;
  }
  @media only screen and (max-width: 768px) {
    .animated {
      all: unset;
    }
  }
`;

const InnerContainer = styled(motion.div)`
  padding: 0px 50px;
  width: 100%;
  margin-top: -6%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  @media (max-width: 1024px) {
    margin-top: 0px;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 20px;
  }
  @media (max-width: 1024px) and (max-height: 910px) {
    padding-bottom: 146.4px;
  }
  @media (min-width: 1023px) and (max-height: 810px) {
    margin-top: 80px;
    padding-bottom: 246.4px;
  }
`;

const InfoContainer = styled(motion.div)`
  display: flex;
  max-width: 450px;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 110px;
  margin-right: 10%;
  &:hover {
    cursor: default;
  }
  @media (max-width: 1024px) {
    margin-top: 60px;
    margin-right: 0px;
    margin-bottom: 50px;
    order: 2;
  }
  @media (min-width: 1023px) and (max-height: 810px) {
    margin-bottom: 0px;
  }
`;

const SmallTitle = styled(motion.span)`
  font-family: "Karla-ExtraBold", "Arial", "sans-serif";
  font-size: 1rem;
  @media (max-width: 424px) {
    font-size: 0.9rem;
  }
  @media (max-width: 300px) {
    font-size: 0.8rem;
    word-spacing: inherit;
  }
`;

const Name = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  font-family: "Att-reborn", "Brush Script MT", "sans-serif";
  font-size: 2rem;
  letter-spacing: 6px;
  word-spacing: 21.4px;
  @media (max-width: 570px) {
    font-size: 1.6rem;
    letter-spacing: 6px;
    word-spacing: 21.4px;
  }
  @media (max-width: 470px) {
    font-size: 1.3rem;
    letter-spacing: 6px;
    word-spacing: 21.4px;
  }
  @media (max-width: 380px) {
    font-size: 1rem;
  }
  @media (max-width: 300px) {
    font-size: 1.6rem;
  }
`;

const FirstName = styled(motion.h1)`
  white-space: nowrap;
  position: relative;
  margin-right: 12px;
  &::after {
    content: "";
    position: absolute;
    height: 4px;
    border-radius: 20px;
    width: 75%;
    background-image: ${({ theme }) =>
      `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
    bottom: 0;
    left: 0;
  }
`;

const LastName = styled(motion.h1)`
  white-space: nowrap;
  position: relative;
  padding-left: 3px;
  text-align: center;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
`;

const Description = styled(motion.p)`
  font-size: 1.05rem;
  width: 95%;
  margin-bottom: 90px;
  @media (max-width: 1024px) {
    margin-bottom: 40px;
  }
  @media (max-width: 424px) {
    font-size: 1rem;
  }
  @media (max-width: 380px) {
    font-size: 0.9rem;
  }
`;

const ReadMoreLink = styled(motion.a)`
  font-family: "Karla-ExtraBold", "Arial", "sans-serif";
  font-size: 1rem;
  z-index: 0;
  position: relative;
  &::after {
    transition: all 0.2s;
    content: "";
    position: absolute;
    height: 3px;
    border-radius: 20px;
    width: 0%;
    background-image: ${({ theme }) =>
      `linear-gradient( to right,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100% )`};
    bottom: -4.5px;
    left: 0;
  }
  &:hover {
    cursor: pointer;
    &::after {
      width: 100%;
    }
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media (max-width: 424px) {
    font-size: 0.9rem;
  }
  @media (max-width: 300px) {
    font-size: 0.8rem;
    word-spacing: inherit;
  }
`;

const ImageContainer = styled(motion.div)`
  max-width: 700px;
  width: 100%;
  margin-bottom: 75px;
  display: flex;
  @media (max-width: 1024px) {
    margin-top: 50px;
    margin-bottom: 0px;
    max-width: 500px;
  }
  @media (min-width: 1023px) and (max-height: 810px) {
    margin-bottom: 0px;
  }
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: -50px;
  left: 0px;
  width: 100%;
  z-index: -100;
  @media (max-width: 1024px) {
    bottom: -1px;
  }
`;
