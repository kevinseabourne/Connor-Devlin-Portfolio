import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Videos from "./videos";
import lodash from "lodash";
import { handleWeddingNames } from "./utils/handleWeddingName";
import playIcon from "../../public/images/playIcon.svg";
import ImageLoader from "./imageLoader";
import VideoOverlay from "./videoOverlay";
import downWave from "../../public/images/wave3.svg";
import topWave from "../../public/images/wave4.svg";

const AdminContentPage = ({ data, page }) => {
  const [state, setState] = useState(data || []);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (page === "weddings") {
      const updatedWeddings = handleWeddingNames(data, true);
      setState(updatedWeddings);
    } else {
      setState(data);
    }
  }, [data]);

  const handleClick = (id) => {
    const stateClone = _.cloneDeep(data);

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
      <Title>Wedding Videos</Title>
      {page === "weddings" && (
        <Videos
          page={page}
          data={state}
          isOpen={isOpen}
          closeOverlay={closeOverlay}
          selectedVideo={selectedVideo}
          handleClick={handleClick}
          handleOnLoadOutside={handleOnLoadOutside}
          imageLoaded={imageLoaded}
          showAdminContentData={true}
        />
      )}
      {page === "corporate" && (
        <Videos
          page={page}
          data={state}
          isOpen={isOpen}
          closeOverlay={closeOverlay}
          selectedVideo={selectedVideo}
          handleClick={handleClick}
          handleOnLoadOutside={handleOnLoadOutside}
          imageLoaded={imageLoaded}
          showAdminContentData={true}
        />
      )}
    </Container>
  ) : (
    <Container></Container>
  );
};

export default AdminContentPage;

const Container = styled.div`
  min-height: calc(100vh - 75px);
  height: 100%;
  margin-left: auto;
  width: calc(100% - 280px);
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  @media (max-width: 1250px) {
    width: calc(100% - 200px);
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  margin-left: auto;
  width: calc(100% - 280px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: inherit;
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

const Title = styled.h1`
  margin: 45px 0px;
  @media (max-width: 750px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 640px));
  justify-content: center;
  grid-auto-flow: row;
  grid-column-end: auto;
  grid-gap: 10% 3%;
  padding: 50px 2%;
  padding-top: 0px;
  box-sizing: border-box;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  @media (max-width: 750px) {
    grid-template-columns: repeat(1, minmax(100px, 1fr));
    grid-gap: 5% 20px;
    padding-bottom: 180px;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 9px;
  z-index: 0;
  position: relative;
  border-radius: 10px;
`;

const PlayIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  max-width: 45px;
  max-height: 45px;
  width: 100%;
  height: 100%;
  margin: auto;
  transition: all 0.15s ease-in-out;
  transform: scale(0.9);
  opacity: ${({ imageLoaded }) => (imageLoaded ? 1 : 0)};
  @media (max-width: 750px) {
    max-width: 30px;
    max-height: 30px;
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: all 0.15s ease-in-out;
  &:hover {
    cursor: pointer;
    ${PlayIcon} {
      transform: scale(1);
    }
  }
`;

const Names = styled.label`
  font-size: 1.2rem;
  letter-spacing: 0.8px;
  margin-left: auto;
  margin-right: auto;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 770px) {
    font-size: 1rem;
  }
  @media (max-width: 550px) {
    font-size: 1.2rem;
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
