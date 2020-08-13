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
  const [videoLoaded, setVideLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {};

    // fetchData();
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

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <React.Fragment>
      <GlobalStyle isOpen={isOpen} />
      <TransitionGroup component={null}>
        {isOpen && (
          <CSSTransition
            in={isOpen}
            classNames="animateVideoOverlay"
            timeout={300}
            unmountOnExit
          >
            <Overlay>
              {!videoLoaded && <Spinner ref={spinnerRef} />}
              <VideoContainer ref={videoRef}>
                <VideoLoader
                  src={src}
                  maxWidth={maxWidth}
                  alt={alt}
                  borderRadius={borderRadius}
                  width={width}
                  placeholderSize={placeholderSize}
                  centerVideo={centerVideo}
                />
              </VideoContainer>
            </Overlay>
          </CSSTransition>
        )}
      </TransitionGroup>
    </React.Fragment>
  );
};

export default VideoOverlay;

const GlobalStyle = createGlobalStyle`
 body {
   overflow: ${({ isOpen }) => (isOpen ? "hidden" : "scroll")};
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(15, 15, 15, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 93px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  transition: all 0.3s;

  &.animateVideoOverlay-enter {
    opacity: 0;
  }
  &.animateVideoOverlay-enter-active {
    opacity: 1;
    transition: all 0.3s;
  }
  &.animateVideoOverlay-exit {
    opacity: 1;
  }
  &.animateVideoOverlay-exit-active {
    opacity: 0;
    transition: all 0.3s;
  }
`;

const Spinner = styled.div``;

const Trailer = styled.iframe`
  height: 59%;
  width: 65%;
  padding-top: 77px;
  box-shadow: 0px 17px 10px -10px rgba(0, 0, 0, 0.4);
`;

const VideoContainer = styled.div`
  width: 1500px;
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
