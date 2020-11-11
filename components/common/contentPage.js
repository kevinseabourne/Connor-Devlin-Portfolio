import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import cloneDeep from "lodash/cloneDeep";
import Videos from "./videos";
import { handleWeddingNames } from "../common/utils/handleWeddingName";
import downWave from "../../public/images/wave3.svg";
import topWave from "../../public/images/wave4.svg";
import Clients from "../clients";
import { toast } from "react-toastify";

const ContentPage = ({ data, page }) => {
  const [state, setState] = useState(data || []);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (page === "weddings") {
      const updatedWeddings = handleWeddingNames(data);
      setState(updatedWeddings);
    } else {
      setState(data);
    }
  }, []);

  const handleClick = (id) => {
    const stateClone = cloneDeep(data);

    const selectedVideo = stateClone.find((item) => item.id === id);
    setSelectedVideo(selectedVideo);
    setIsOpen(!isOpen);
  };

  const closeOverlay = () => {
    setIsOpen(false);
  };

  const handleOnLoadOutside = () => {
    setImageLoaded(true);
  };

  return state.length > 0 ? (
    <Container>
      <TopContainer>
        <Title>{page === "weddings" ? "Weddings" : "Corporate"}</Title>
      </TopContainer>
      <VideoContainer>
        <Videos
          page={page}
          data={state}
          isOpen={isOpen}
          closeOverlay={closeOverlay}
          selectedVideo={selectedVideo}
          handleClick={handleClick}
          handleOnLoadOutside={handleOnLoadOutside}
          imageLoaded={imageLoaded}
        />
      </VideoContainer>
      {page === "corporate" && <Clients />}
      {page === "weddings" && (
        <QuotesContainer>
          <Quote>
            <Wave src={downWave} />
            <WeddingPartners>{state[0].displayNames}</WeddingPartners>
            <Description>{state[0].testimonial}</Description>
          </Quote>
          <TopWave src={topWave} />
        </QuotesContainer>
      )}
      <Pricing>
        <Link
          href="/pricing/[id]"
          as={page === "weddings" ? "/pricing/weddings" : "/pricing/corporate"}
        >
          <ContactButton>PRICING</ContactButton>
        </Link>
      </Pricing>
    </Container>
  ) : (
    <Container></Container>
  );
};

export default ContentPage;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TopContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
`;

const VideoContainer = styled.div`
  width: 100%;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
`;

const Title = styled.h1`
  margin: 70px 0px;
  @media (max-width: 750px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;

const Wave = styled.img`
  z-index: -20;
  position: absolute;
  top: -20px;
  left: -1px;
  width: 100%;
  object-fit: cover;
`;

const TopWave = styled.img`
  position: absolute;
  bottom: -20px;
  left: -1px;
  z-index: -100;
  width: 100%;
  object-fit: cover;
  @media (max-width: 680px) {
    bottom: -15px;
  }
`;

const Quote = styled.div`
  max-width: 600px;
`;

const WeddingPartners = styled.span`
  align-self: flex-start;
  font-size: 1rem;
`;

const QuotesContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20% 20px;
  margin: auto;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 750px) {
    padding: 25% 20px;
  }
`;

const Description = styled.div`
  margin-top: 9px;
  font-family: exmouth;
  font-size: 3.5rem;
  text-align: center;
  letter-spacing: 1px;
  @media (max-width: 1024px) {
    font-size: 3.2rem;
  }
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  @media (max-width: 524px) {
    font-size: 2.7rem;
  }
`;

const Pricing = styled.div`
  width: 100%;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ContactButton = styled.button`
  margin: 135px;
  font-size: 1.1rem;
  display: flex;
  z-index: 0;
  font-weight: 700;
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 15px 26px;
  margin-top: 100px;
  margin-bottom: 100px;
  color: ${({ theme }) => theme.colors.fontColor};
  border-radius: 8px;
  border: none;
  justify-content: center;
  opacity: 0.9;
  &:hover {
    cursor: pointer;
    opacity: 1;
    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.fontColor};
  }
`;
