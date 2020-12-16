import React, { useState } from "react";
import styled from "styled-components";
import { LoadingSpinner } from "../loading-spinner";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import "intersection-observer";

const ImageLoader = ({
  src,
  srcSet,
  width,
  maxWidth,
  placeholderSize,
  placeholderColor,
  alt,
  itemId,
  keyValue,
  dataTestId,
  onClick,
  borderRadius,
  hover,
  duration,
  transitionTiming,
  transitionDuration,
  boxShadow,
  loadingSpinner, // true or false to show a loading spinner when the image is still loading
  centerImage,
  contentLoaded,
  handleOnLoadOutside,
  y,
  x,
  zIndex,
  blur,
  scale,
  opacity,
  delay,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: "500px 0px",
  });

  const onLoad = () => {
    setIsLoaded(true);
    if (handleOnLoadOutside) {
      handleOnLoadOutside(itemId);
    }
  };

  const animation = {
    hidden: {
      opacity: opacity === undefined ? 1 : opacity,
      y: y ? y : 0,
      x: x ? x : 0,
      scale: scale === undefined ? 1 : scale,
      filter: blur ? `blur(${blur}px)` : `blur(0px)`,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: `blur(0px)`,
      transition: {
        type: "spring",
        duration: duration ? duration : undefined,
        delay: delay ? delay : 0,
      },
    },
  };

  return (
    <ImageContainer
      ref={ref}
      borderRadius={borderRadius}
      width={width}
      maxWidth={maxWidth}
      centerImage={centerImage}
    >
      <Placeholder
        borderRadius={borderRadius}
        onClick={onClick}
        contentLoaded={contentLoaded}
        zIndex={zIndex}
        placeholderSize={placeholderSize}
        placeholderColor={placeholderColor}
      />
      {src && inView && (
        <Image
          variants={animation}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          onLoad={onLoad}
          src={src}
          srcSet={srcSet}
          contentLoaded={contentLoaded}
          alt={alt}
          key={keyValue}
          data-testid={dataTestId}
          transitionTiming={transitionTiming}
          transitionDuration={transitionDuration}
          hover={hover}
          borderRadius={borderRadius}
          boxShadow={boxShadow}
        />
      )}
      {loadingSpinner && !isLoaded && <LoadingSpinner size="39px" />}
    </ImageContainer>
  );
};

export default ImageLoader;

const ImageContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  width: ${({ width }) => (width ? width : "100%")};
  position: relative;
  background: transparent;
  margin: ${({ centerImage }) => (centerImage ? "auto" : "none")};
  z-index: ${({ hoverColor }) => (hoverColor ? "auto" : "0")};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  overflow: ${({ src }) => (src ? "default" : "hidden")};
`;

const Placeholder = styled(motion.div)`
  width: 100%;
  z-index: ${({ zIndex }) => (zIndex ? zIndex : "default")};
  padding-bottom: ${({ placeholderSize }) =>
    placeholderSize ? placeholderSize : "100%"};
  background: ${({ placeholderColor }) =>
    placeholderColor ? placeholderColor : "transparent"};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
`;

const Image = styled(motion.img)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  &:hover {
    cursor: ${({ hover }) => (hover ? "pointer" : "default")};
  }
  }
  `;
