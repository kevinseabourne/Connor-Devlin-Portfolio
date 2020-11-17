import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { deleteWedding } from ".././pages/api/weddings";
import { deleteCorporate } from ".././pages/api/corporate";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "./loading-spinner";
import useSound from "use-sound";
import ImageLoader from "./common/imageLoader";
import popSound from ".././public/sounds/music_kalimba_off.mp3";

const DeleteContent = ({ handleDeleteContentPopUp, selectedVideo }) => {
  const [play] = useSound(popSound, { volume: 0.2 });

  const variants = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
    },
  };

  return (
    <AnimatePresence>
      <DeleteIconContainer
        onClick={() => {
          handleDeleteContentPopUp();
          play();
        }}
        variants={variants}
        animate={selectedVideo.id === item.id ? "show" : "hidden"}
        exit={"hidden"}
      >
        <ImageLoader
          maxWidth="30px"
          placeholderSize="100%"
          opacity="0"
          transitionTime="300ms ease"
          hover={true}
          src={"https://chpistel.sirv.com/Connor-Portfolio/clear.png?w=40"}
        />
      </DeleteIconContainer>
    </AnimatePresence>
  );
};

export default DeleteContent;

const Container = styled.div``;

const DeleteIconContainer = styled.div`
  position: absolute;
  width: 30px;
  top: 15px;
  right: 20px;
`;
