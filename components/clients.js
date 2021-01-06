import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageLoader from "./common/imageLoader";
import downWave from "../public/images/wave3.svg";
import topWave from "../public/images/wave4.svg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "intersection-observer";

const Clients = () => {
  const [state] = useState([
    {
      title: "teach learn grow",
      url:
        "https://chpistel.sirv.com/Connor-Portfolio/tlg.png?cx=105&cy=109&cw=554&ch=493",
    },
    {
      title: "edith cowan university",
      url: "https://chpistel.sirv.com/Connor-Portfolio/Logo_ECU.png?w=700",
    },
    {
      title: "city of kalamunda",
      url:
        "https://chpistel.sirv.com/Connor-Portfolio/Kalamunda%20Logo%2001%20CMYK.png?cw=750&ch=563&w=750&h=563",
    },
  ]);

  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px",
  });

  const container = {
    hidden: {
      transition: {
        delayChildren: 0,
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    show: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };

  const titleAnimation = {
    hidden: { scale: 0.99, opacity: 0, y: 12 },
    show: { scale: 1, opacity: 1, y: 0 },
  };

  const imageAnimation = {
    hidden: { scale: 0.9, opacity: 0, y: 12 },
    show: { scale: 1, opacity: 1, y: 0 },
  };

  return (
    <Container
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
    >
      <Wave src={downWave} alt="wave" />
      <Title variants={titleAnimation}>Clients</Title>
      <IconsContainer>
        {state.map((image) => (
          <ImageContainer key={state.indexOf(image)} variants={imageAnimation}>
            <ImageLoader
              maxWidth="215px"
              placeholderSize="75.7%"
              borderRadius="8px"
              centerImage={true}
              alt={image.title}
              src={image.url}
            />
          </ImageContainer>
        ))}
      </IconsContainer>
      <BottomWave src={topWave} alt="wave" />
    </Container>
  );
};

export default Clients;

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  padding: 20% 20px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  @media (max-width: 680px) {
    height: 100%;
    padding: 40% 20px;
  }
  @media (min-width: 681px) and (max-height: 1200px) {
    min-height: 600px;
  }
  @media (max-width: 355px) {
    padding: 140px 20px;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-top: -70px;
  opacity: 0.8;
  margin-bottom: 65px;
  padding-left: 3px;
  padding-right: 3px;
  @media (max-width: 680px) {
    margin-top: -98px;
    margin-bottom: 25px;
  }
`;

const IconsContainer = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 215px));
  justify-content: center;
  grid-auto-flow: row;
  grid-gap: 12%;
  opacity: 0.8;
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    box-sizing: border-box;
    padding: 0 26%;
  }
`;

const ImageContainer = styled(motion.div)``;

const Wave = styled.img`
  position: absolute;
  top: -20px;
  left: 0px;
  width: 100%;
  object-fit: cover;
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: -20px;
  left: 0px;
  z-index: -100;
  width: 100%;
  object-fit: cover;
  @media (max-width: 680px) {
    bottom: -15px;
  }
`;
