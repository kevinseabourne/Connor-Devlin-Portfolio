import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import VideoLoader from "./videoLoader";

const VideoOverlay = ({
  isOpen,
  closeOverlay,
  src,
  maxWidth,
  width,
  alt,
  borderRadius,
  placeholderSize,
  centerVideo,
}) => {
  const spinnerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (videoRef.current && !videoRef.current.contains(e.target)) {
      closeOverlay();
    }
    if (spinnerRef.current && !spinnerRef.current.contains(e.target)) {
      closeOverlay();
    }
  };

  const closeOverlayWhileLoading = () => {
    closeOverlay();
  };

  return (
    <Container>
      <GlobalStyle isOpen={isOpen} />
      <TransitionGroup component={null}>
        {isOpen && (
          <CSSTransition
            in={isOpen}
            classNames="overlayAnimation"
            timeout={300}
          >
            <Overlay data-testid="videoOverlay">
              <VideoContainer maxWidth={maxWidth} ref={videoRef}>
                <VideoLoader
                  src={src}
                  maxWidth="inherit"
                  alt={alt}
                  borderRadius={borderRadius}
                  width={width}
                  placeholderSize={placeholderSize}
                  centerVideo={centerVideo}
                  lazyLoad={false}
                  closeOverlayWhileLoading={closeOverlayWhileLoading}
                />
              </VideoContainer>
            </Overlay>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Container>
  );
};

export default VideoOverlay;

const GlobalStyle = createGlobalStyle`
 body {
   overflow: ${({ isOpen }) => (isOpen ? "hidden" : "scroll")};
  }
`;

const Container = styled.div``;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(15, 15, 15, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &.overlayAnimation-appear {
    opacity: 0;
  }
  &.overlayAnimation-appear-active {
    opacity: 1;
    transition: all 0.3s;
  }

  &.overlayAnimation-enter {
    opacity: 0;
  }
  &.overlayAnimation-enter-active {
    opacity: 1;
    transition: all 0.3s;
  }
  &.overlayAnimation-exit {
    transition: all 0.3s;
    opacity: 1;
  }
  &.overlayAnimation-exit-active {
    opacity: 0;
  }
`;

const VideoContainer = styled.div`
  width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  @media (max-height: 1000px) {
    width: 1200px;
  }
  @media (max-height: 920px) {
    width: 1100px;
  }
  @media (max-height: 800px) {
    width: 700px;
  }
  @media (max-height: 520px) {
    width: 550px;
  }
  @media (max-height: 432px) {
    width: 400px;
  }
`;
