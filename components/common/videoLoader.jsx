import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LoadingSpinner } from "../loading-spinner";
import { useInView } from "react-intersection-observer";
import "intersection-observer";

const VideoLoader = ({
  src,
  width,
  maxWidth,
  placeholderSize,
  alt,
  keyValue,
  dataTestId,
  closeOverlayWhileLoading, // for use when in an overlay
  delay,
  isFavourite,
  onClick,
  borderRadius,
  hover,
  hoverColor,
  centerVideo,
}) => {
  // Cypress Testing Coverage //
  /* istanbul ignore file */
  const [isLoaded, setIsLoaded] = useState(false);
  const timeout = useRef(null);

  const { ref, inView } = useInView({
    rootMargin: "500px 0px",
    triggerOnce: true,
  });

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  const handleOnLoad = () => {
    // function is called before video has fully loaded, added one second delay
    timeout.current = setTimeout(() => setIsLoaded(true), 1000);
  };

  const handleLoadingClick = () => {
    !isLoaded && closeOverlayWhileLoading();
  };

  return (
    <VideoContainer
      width={width}
      maxWidth={maxWidth}
      centerVideo={centerVideo}
      ref={ref}
      onClick={handleLoadingClick}
    >
      <Placeholder
        onClick={onClick}
        placeholderSize={placeholderSize}
        borderRadius={borderRadius}
      />
      {!isLoaded && <LoadingSpinner size="80px" />}
      {inView && (
        <Video
          isLoaded={isLoaded}
          onLoad={handleOnLoad}
          src={src}
          alt={alt}
          key={keyValue}
          data-testid="video"
          delay={delay}
          isFavourite={isFavourite}
          hover={hover}
          dataTestId={dataTestId}
          hoverColor={hoverColor}
          borderRadius={borderRadius}
          title="movie-trailer"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
          frameBorder="0"
        />
      )}
    </VideoContainer>
  );
};

export default VideoLoader;

VideoLoader.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  placeholderSize: PropTypes.string,
  alt: PropTypes.string.isRequired,
  keyValue: PropTypes.string,
  dataTestId: PropTypes.string,
  closeOverlayWhileLoading: PropTypes.func,
  delay: PropTypes.string,
  isFavourite: PropTypes.string,
  onClick: PropTypes.func,
  borderRadius: PropTypes.string,
  hover: PropTypes.bool,
  hoverColor: PropTypes.string,
  centerVideo: PropTypes.bool,
};

const VideoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  width: ${({ width }) => (width ? width : "100%")};
  position: relative;
  border-radius: 10px;
  background: transparent;
  margin: ${({ centerVideo }) => (centerVideo ? "auto" : "none")};
`;

const Placeholder = styled.div`
  width: 100%;
  padding-bottom: ${({ placeholderSize }) =>
    placeholderSize ? placeholderSize : "100%"};
  background: transparent;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  pointer-events: none;
`;

const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  visibility: ${({ isLoaded }) => (isLoaded ? "visible" : "hidden")};
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transform: ${({ isLoaded }) => (isLoaded ? "scale(1)" : "scale(0.5)")};
  transition: all 250ms;
  transition-delay: ${({ delay }) => `${delay}ms`};
  &:hover {
    cursor: pointer;
  }
`;
