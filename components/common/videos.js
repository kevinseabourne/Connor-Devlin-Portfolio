import React, { useState, useEffect } from "react";
import styled from "styled-components";
import playIcon from "../../public/images/playIcon.svg";
import ImageLoader from "./imageLoader";
import VideoOverlay from "./videoOverlay";

const Videos = ({
  page,
  data,
  handleClick,
  handleOnLoadOutside,
  imageLoaded,
  selectedVideo,
  isOpen,
  closeOverlay,
  weddingNames,
  showAdminContentData,
}) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(data);
  }, [data]);

  return (
    <Container>
      {state.map((item) => (
        <Item key={item.id}>
          <ImageContainer onClick={() => handleClick(item.id)}>
            <ImageLoader
              maxWidth="100%"
              placeholderSize="56.2%"
              src={item.coverPhoto}
              hover={true}
              borderRadius="19px"
              opacity="0"
              scale="0.99"
              transitionTime="0.4s ease"
              boxShadow="0px 9px 20px rgba(0,0,0,0.2)"
              borderRadius={"9px"}
              delay={state.indexOf(item) * 120}
              handleOnLoadOutside={handleOnLoadOutside}
            />
            <PlayIcon imageLoaded={imageLoaded}>
              <ImageLoader
                maxWidth="100%"
                placeholderSize="100%"
                src={playIcon}
                hover={true}
                centerImage={true}
                opacity="0"
                scale="0.99"
                delay={state.indexOf(item) * 120}
                transitionTime="0.4s ease"
              />
            </PlayIcon>
          </ImageContainer>
          <Names onClick={() => handleClick(item.id)}>
            {page === "weddings" ? item.displayNames : item.company}
          </Names>
          {showAdminContentData && (
            <AdminVideoContent>
              <EventDate>
                {page === "weddings" ? item.weddingDate : item.jobDate}
              </EventDate>
              {page === "wedings" && (
                <Location>{`${item.location.suburb}, ${item.location.state}`}</Location>
              )}
              {page === "corporate" && (
                <Description>{item.description}</Description>
              )}
            </AdminVideoContent>
          )}
        </Item>
      ))}
      <VideoOverlay
        isOpen={isOpen}
        closeOverlay={closeOverlay}
        src={selectedVideo.video}
        maxWidth={"900px"}
        placeholderSize={"56.25%"}
        alt={page === "weddings" ? weddingNames : selectedVideo.company}
        centerVideo={true}
      />
    </Container>
  );
};

export default Videos;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 640px));
  justify-content: center;
  align-items: flex-start;
  grid-auto-flow: row;
  grid-column-end: auto;
  grid-gap: 10% 3%;
  padding: 50px 2%;
  padding-top: 0px;
  box-sizing: border-box;
  background-color: transparent;
  @media (max-width: 750px) {
    grid-template-columns: repeat(1, minmax(100px, 1fr));
    grid-gap: 5% 20px;
    padding-bottom: 180px;
  }
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

const ImageContainer = styled.div`
  margin-bottom: 9px;
  z-index: 0;
  position: relative;
  border-radius: 10px;
  transition: all 0.15s ease-in-out;
  &:hover {
    cursor: pointer;
    ${PlayIcon} {
      transform: scale(1);
    }
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Names = styled.label`
  font-size: 1.2rem;
  letter-spacing: 0.8px;
  margin-left: auto;
  margin-right: auto;
  white-space: nowrap;
  transition: all 0.15s ease-in-out;
  &:hover {
    cursor: pointer;
  }
  &:hover {
    cursor: pointer;
    ${PlayIcon} {
      transform: scale(1);
    }
  }
  @media (max-width: 770px) {
    font-size: 1rem;
  }
  @media (max-width: 550px) {
    font-size: 1.2rem;
  }
`;

const AdminVideoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 1px;
  font-weight: 400;
  &:hover {
    cursor: default;
  }
`;

const EventDate = styled.span``;

const Location = styled.span``;

const Description = styled.p``;
