import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazy-load";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { LoadingSpinner } from "../loading-spinner";

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
  lazyLoad, // turn lazyLoading off when using component inside react-transition-group as it messes with it's enter animation,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  const handleOnLoad = () => {
    // video loaded to early, added one second delay
    timeout.current = setTimeout(() => setIsLoaded(true), 1000);
  };

  return (
    <VideoContainer width={width} maxWidth={maxWidth} centerVideo={centerVideo}>
      <Placeholder
        onClick={onClick}
        placeholderSize={placeholderSize}
        borderRadius={borderRadius}
      />
      {!isLoaded && <LoadingSpinner size="80px" />}
      {lazyLoad && (
        <LazyLoad
          width="inherit"
          height="inherit"
          once={true}
          offset={500}
          debounce={true}
        >
          <Video
            isLoaded={isLoaded}
            onLoad={handleOnLoad}
            src={src}
            alt={alt}
            data-testid="video"
            key={keyValue}
            data-testid={dataTestId}
            delay={delay}
            isFavourite={isFavourite}
            hover={hover}
            hoverColor={hoverColor}
            borderRadius={borderRadius}
            title="movie-trailer"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
            frameBorder="0"
          />
        </LazyLoad>
      )}

      {!lazyLoad && (
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
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transform: ${({ isLoaded }) => (isLoaded ? "scale(1)" : "scale(0.5)")};
  transition: all 250ms;
  transition-delay: ${({ delay }) => `${delay}ms`};
  &:hover {
    cursor: pointer;
  }
`;
