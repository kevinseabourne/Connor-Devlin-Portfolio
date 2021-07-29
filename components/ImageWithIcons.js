import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageLoader from "./common/imageLoader";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import playIcon from "../public/images/playIcon.svg";

const ImageWithIcon = ({
  editDeleteContent,
  handleDeleteContentPopUp,
  item,
  selectedVideo,
  page,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleOnLoadOutside = () => {
    setImageLoaded(true);
  };

  const parent = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.8,
      },
    },
    hover: {},
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: [0, 1, 0.84, 1, 0.95, 1],
      transition: {
        type: "spring",
        damping: 12,
        mass: 0.2,
        stiffness: 150,
      },
    },
    hover: {
      scale: 1.1,
    },
  };

  const dotAnimation = {
    hidden: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      opacity: 0,
      scale: 0,
    },
    show: {
      backgroundColor: "rgba(50,172,109,1)",
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 800,
      },
    },
  };

  const variants = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 800,
        bounce: 1,
        damping: 25,
      },
    },
  };

  return (
    <Container
      variants={parent}
      initial="hidden"
      animate="show"
      whileHover="hover"
    >
      <ImageLoader
        item={item}
        maxWidth="100%"
        placeholderSize="56.3%"
        src={item.coverPhoto}
        hover={true}
        borderRadius="19px"
        opacity={0}
        transitionDuration={350}
        loadingSpinner={true}
        transitionTiming="ease"
        boxShadow="0px 9px 20px rgba(0,0,0,0.2)"
        borderRadius={"9px"}
        handleOnLoadOutside={handleOnLoadOutside}
        iconMaxWidth="45px"
        alt={page === "weddings" ? item.displayNames : item.company}
        dataTestId="weddingPhoto"
      />
      {!editDeleteContent && imageLoaded && (
        <PlayIconContainer variants={child}>
          <ImageLoader
            maxWidth="inherit"
            placeholderSize="100%"
            hover={true}
            scale={0}
            alt="play Icon"
            src={playIcon}
            centerImage={true}
          />
        </PlayIconContainer>
      )}

      {editDeleteContent && imageLoaded && (
        <EditDeleteContainer>
          <SelectedVideoButton>
            <Dot
              variants={dotAnimation}
              animate={selectedVideo.id === item.id ? "show" : "hidden"}
            />
          </SelectedVideoButton>
          <AnimatePresence>
            <DeleteIconContainer
              onClick={() => {
                handleDeleteContentPopUp();
                // play();
              }}
              variants={variants}
              animate={selectedVideo.id === item.id ? "show" : "hidden"}
            >
              <ImageLoader
                maxWidth="20px"
                placeholderSize="100%"
                opacity={0}
                hover={true}
                alt="delete"
                src={
                  "https://chpistel.sirv.com/Connor-Portfolio/clear.png?colorlevel.white=0&w=40"
                }
                centerImage={true}
              />
            </DeleteIconContainer>
          </AnimatePresence>
        </EditDeleteContainer>
      )}
    </Container>
  );
};

export default ImageWithIcon;

ImageWithIcon.propTypes = {
  editDeleteContent: PropTypes.bool,
  handleDeleteContentPopUp: PropTypes.func,
  item: PropTypes.obj,
  selectedVideo: PropTypes.obj,
  page: PropTypes.string,
};

const Container = styled(motion.div)`
  width: 100%;
`;

const SelectedVideoButton = styled(motion.div)`
  width: 20px;
  height: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  object-fit: contain;
  object-position: left;
  border-radius: 50%;
  left: 20px;
  top: 20px;
  background-color: white;
  position: absolute;
`;

const EditDeleteContainer = styled(motion.div)``;

const PlayIconContainer = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  max-width: 45px;
  max-height: 45px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const Dot = styled(motion.div)`
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

const DeleteIconContainer = styled(motion.div)`
  position: absolute;
  max-width: 30px;
  width: 100%;
  top: 0px;
  right: 0px;
  padding-top: 20px;
  padding-right: 20px;
`;
