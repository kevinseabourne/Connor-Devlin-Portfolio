import React, { useState } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazy-load";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const VideoLoader = ({
  src,
  width,
  maxWidth,
  placeholderSize,
  alt,
  keyValue,
  dataTestId,
  delay,
  isFavourite,
  onClick,
  borderRadius,
  hover,
  hoverColor,
  centerVideo,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  return (
    <VideoContainer width={width} maxWidth={maxWidth} centerVideo={centerVideo}>
      <Placeholder
        onClick={onClick}
        placeholderSize={placeholderSize}
        borderRadius={borderRadius}
      />
      <LazyLoad
        width="inherit"
        height="inherit"
        once={true}
        offset={500}
        debounce={false}
      >
        <Video
          isLoaded={isLoaded}
          onLoad={handleOnLoad}
          src={src}
          alt={alt}
          z-index="1"
          key={keyValue}
          data-testid={dataTestId}
          delay={delay}
          isFavourite={isFavourite}
          hover={hover}
          hoverColor={hoverColor}
          borderRadius={borderRadius}
          title="movie-trailer"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen="allowFullScreen"
        />
      </LazyLoad>
    </VideoContainer>
  );
};

export default VideoLoader;

const VideoContainer = styled.div`
  z-index: 1;
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
  z-index: 3;
  object-fit: contain;
  object-position: center;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transform: ${({ isLoaded }) => (isLoaded ? "scale(1)" : "scale(0.5)")};
  transition: all 250ms;
  transition-delay: ${({ delay }) => `${delay}ms`};
  &:hover {
    cursor: pointer;
  }
`;
