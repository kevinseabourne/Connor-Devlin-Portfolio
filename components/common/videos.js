import React, { useState, useEffect } from "react";
import styled from "styled-components";
import playIcon from "../../public/images/playIcon.svg";
import ImageLoader from "./imageLoader";
import VideoOverlay from "./videoOverlay";
import lodash from "lodash";
import { motion } from "framer-motion";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";

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
  editDeleteContent,
  showAdminContentData,
}) => {
  const [state, setState] = useState([]);
  const [reverseDelay, setReverseDelay] = useState(false);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setState(data);
    setMount(true);
  }, [data]);

  const handleReverseDelay = () => {
    setReverseDelay(!reverseDelay);
  };

  const container = {
    show: {
      transition: {
        delayChildren: 0.4,
        staggerChildren: 0.09,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.07,
        staggerDirection: -1,
      },
    },
  };

  const itemA = {
    hidden: { scale: 0.96, opacity: 0, y: 12 },
    show: { scale: 1, opacity: 1, y: 0 },
  };

  const itemB = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const dot = {
    hidden: { backgroundColor: "white", opacity: 0, transform: "scale(0)" },
    show: {
      backgroundColor: "rgba(50,172,109,1)",
      opacity: 1,
      transform: "scale(1)",
      transition: {
        type: "spring",
        stiffness: 800,
      },
    },
  };

  return (
    <Container
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      key={mount}
    >
      {state.map((item) => (
        <Item key={state.indexOf(item)} variants={itemA}>
          <ImageContainer onClick={() => handleClick(item.id)}>
            <ImageLoader
              maxWidth="100%"
              placeholderSize="56.2%"
              src={item.coverPhoto}
              hover={true}
              borderRadius="19px"
              opacity="0"
              scale="0.99"
              transitionDuration={350}
              handleReverseDelay={handleReverseDelay}
              transitionTiming="ease"
              boxShadow="0px 9px 20px rgba(0,0,0,0.2)"
              borderRadius={"9px"}
              handleOnLoadOutside={handleOnLoadOutside}
              iconSrc={editDeleteContent ? null : playIcon}
              iconMaxWidth="45px"
              editDeleteContent={editDeleteContent}
              iconMaxHeight="45px"
            />
            {editDeleteContent && (
              <SelectedVideoButton>
                <Dot
                  animate={selectedVideo.id === item.id ? dot.show : dot.hidden}
                />
              </SelectedVideoButton>
            )}
          </ImageContainer>
          {!showAdminContentData && (
            <Names
              variants={itemB}
              key={state.indexOf(item)}
              onClick={() => handleClick(item.id)}
            >
              {page === "weddings" ? item.displayNames : item.company}
            </Names>
          )}

          {showAdminContentData && (
            <WrappedNames onClick={() => handleClick(item.id)}>
              {item.displayNames
                ? item.displayNames.replace("&", "\n")
                : item.company}
            </WrappedNames>
          )}

          {showAdminContentData && (
            <AdminVideoContent>
              <EventDate>{item.date}</EventDate>
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

const Container = styled(motion.ul)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 640px));
  justify-content: center;
  align-items: flex-start;
  grid-auto-flow: row;
  grid-column-end: auto;
  grid-gap: calc(100vw * 0.04) 3%;
  padding: 50px 3%;
  padding-top: 0px;
  box-sizing: border-box;
  background-color: transparent;
  @media (max-width: 1250px) {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
    grid-gap: calc(100vw * 0.05) 20px;
    padding-bottom: 390px;
  }
  @media (max-width: 750px) {
    grid-template-columns: repeat(1, minmax(100px, 1fr));
    grid-gap: calc(100vw * 0.1) 20px;
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

const SelectedVideoButton = styled(motion.div)`
  width: 20px;
  height: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  object-fit: contain;
  object-position: left;
  border-radius: 50%;
  left: 15px;
  top: 15px;
  background-color: white;
  position: absolute;
`;

const Dot = styled(motion.div)`
  z-index: 14;
  width: 60%;
  height: 60%;
  border-radius: 50%;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
`;

const Overlay = styled.div``;

const Item = styled(motion.li)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Img = styled(motion.img)`
  width: 100%;
  max-width: 500px;
`;

const Names = styled(motion.label)`
  font-size: 1.2rem;
  letter-spacing: 0.8px;
  margin-left: auto;
  margin-right: auto;
  white-space: normal;
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

const WrappedNames = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-line;
  align-items: center;
  text-align: center;
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
