import React, { useState } from "react";
import PropTypes from "prop-types";
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
    triggerOnce: true,
    rootMargin: "150px 0px",
  });

  const onLoad = () => {
    setIsLoaded(true);
    if (handleOnLoadOutside) {
      handleOnLoadOutside(itemId);
    }
  };

  const animation = {
    hidden: {
      opacity: opacity == undefined ? 0 : opacity,
      y: y ? y : 0,
      x: x ? x : 0,
      scale: scale == undefined ? 1 : scale,
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
      variants={animation}
      initial="hidden"
      animate={isLoaded ? "show" : "hidden"}
    >
      <Placeholder
        layout
        borderRadius={borderRadius}
        onClick={onClick}
        contentLoaded={contentLoaded}
        zIndex={zIndex}
        placeholderSize={placeholderSize}
        placeholderColor={placeholderColor}
      />
      {src && inView && (
        <Image
          onLoad={onLoad}
          src={src}
          srcSet={srcSet}
          contentLoaded={contentLoaded}
          alt={alt}
          key={keyValue}
          data-testid={dataTestId}
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

ImageLoader.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  placeholderSize: PropTypes.string,
  placeholderColor: PropTypes.string,
  alt: PropTypes.string.isRequired,
  itemId: PropTypes.string,
  keyValue: PropTypes.string,
  dataTestId: PropTypes.string,
  onClick: PropTypes.func,
  borderRadius: PropTypes.string,
  hover: PropTypes.bool,
  duration: PropTypes.number,
  boxShadow: PropTypes.string,
  loadingSpinner: PropTypes.bool,
  centerImage: PropTypes.bool,
  contentLoaded: PropTypes.bool,
  handleOnLoadOutside: PropTypes.func,
  y: PropTypes.number,
  x: PropTypes.number,
  zIndex: PropTypes.number,
  blur: PropTypes.number,
  scale: PropTypes.number,
  opacity: PropTypes.number,
  delay: PropTypes.number,
};

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
