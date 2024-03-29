import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DynamicHead from "../components/dynamicHead";
import styled from "styled-components";
import ImageLoader from "../components/common/imageLoader";
import ErrorMessage from "../components/common/errorMessage";
import topWave from "../public/images/wave4.svg";
import { motion } from "framer-motion";

const AboutPage = ({ data }) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    data && setDescription(data.description);
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const childAnimationDown = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.99,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
      },
    },
  };

  const childAnimationUp = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.99,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
      },
    },
  };

  const waveAnimation = {
    hidden: {
      y: 900,
    },
    show: {
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        mass: 0.4,
        delay: 1.2,
      },
    },
  };

  const wrapperAnimation = {
    hidden: {
      y: 900,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        mass: 0.4,
      },
    },
  };

  return data ? (
    <Container variants={container} initial="hidden" animate="show">
      <DynamicHead title="About Me - Connor Devlin" urlQuery="/about" />
      <ImageWrapper>
        <ImageContainer variants={childAnimationDown}>
          <ImageLoader
            maxWidth="inherit"
            placeholderSize="66.66%"
            borderRadius="19px"
            alt="Connor Delvin"
            src="https://chpistel.sirv.com/Connor-Portfolio/Connor.jpg?w=611"
          />
        </ImageContainer>
        <SmallTitle variants={childAnimationUp}>Connor Devlin</SmallTitle>
        <Name variants={childAnimationUp}>
          <FirstName>ABOUT</FirstName>
          <LastName>ME.</LastName>
        </Name>
        <BottomWave src={topWave} variants={waveAnimation} />
      </ImageWrapper>
      <Wrapper variants={wrapperAnimation}>
        <InfoContainer>
          <Description variants={childAnimationUp}>{description}</Description>
        </InfoContainer>
      </Wrapper>
    </Container>
  ) : (
    <ErrorMessage />
  );
};

export default AboutPage;

AboutPage.propTypes = {
  data: PropTypes.any,
};

const Container = styled(motion.div)`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const Wrapper = styled(motion.div)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const ImageContainer = styled(motion.div)`
  max-width: 650px;
  width: 100%;
  margin-top: 40px;
  box-sizing: border-box;
  padding: 0px 20px;
  position: relative;
`;

const BottomWave = styled(motion.img)`
  position: absolute;
  margin-top: auto;
  bottom: -5%;
  left: -1px;
  width: 100%;
  z-index: -100;
  @media (max-width: 1200px) {
    bottom: -10px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  height: 100%;
  max-width: 700px;
  width: 100%;
  margin-top: 0px;
  box-sizing: border-box;
  padding: 0px 20px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const SmallTitle = styled(motion.span)`
  margin-top: 30px;
  font-size: 1rem;
  font-family: "Karla-ExtraBold", "Karla-ExtraBold-fallback", "sans-serif";
  position: relative;

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
  position: relative;
  flex-direction: row;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 12%;
  font-family: "Att-reborn", "Att-reborn-fallback", "sans-serif";
  font-size: 2rem;
  font-weight: normal;
  letter-spacing: 6px;
  word-spacing: 21.4px;
  @media (max-width: 1600px) {
    margin-bottom: 14%;
  }
  @media (max-width: 1200px) {
    margin-bottom: 18%;
  }
  @media (max-width: 750px) {
    font-size: 1.5rem;
    letter-spacing: 6px;
    word-spacing: 21.4px;
  }
  @media (max-width: 500px) {
    font-size: 1.3rem;
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
  margin-left: 6px;
  text-align: center;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
`;

const Description = styled(motion.p)`
  font-size: 1.05rem;
  font-family: "Karla-Bold";
  white-space: pre-wrap;
  overflow-wrap: break-word;
  padding-bottom: 10%;
  @media (max-width: 424px) {
    font-size: 1rem;
  }
  @media (max-width: 300px) {
    font-size: 0.9rem;
  }
`;
