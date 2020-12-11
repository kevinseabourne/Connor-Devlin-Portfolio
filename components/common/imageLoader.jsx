import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import "intersection-observer";

const ImageLoader = ({
  src,
  width,
  maxWidth,
  placeholderSize,
  alt,
  keyValue,
  dataTestId,
  onClick,
  borderRadius,
  hover,
  transitionTiming,
  transitionDuration,
  boxShadow,
  centerImage,
  handleOnLoadOutside,
  editDeleteContent,
  y,
  x,
  blur,
  scale,
  opacity,
  delay,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mountAnimationComplete, setMountAnimationComplete] = useState(false);

  const { ref, inView, entry } = useInView({
    triggerOnce: false,
    rootMargin: "500px 0px",
  });

  const onLoad = () => {
    setIsLoaded(true);
    if (handleOnLoadOutside) {
      handleOnLoadOutside();
    }
  };

  const animation = {
    hidden: {
      opacity: opacity ? opacity : 1,
      y: y ? y : 0,
      x: x ? x : 0,
      scale: scale ? scale : 1,
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
        placeholderSize={placeholderSize}
      />

      {inView && (
        <Image
          variants={animation}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          onLoad={onLoad}
          src={src}
          alt={alt}
          key={keyValue}
          data-testid={dataTestId}
          transitionTiming={transitionTiming}
          transitionDuration={transitionDuration}
          hover={hover}
          borderRadius={borderRadius}
          boxShadow={boxShadow}
          editDeleteContent={editDeleteContent}
        />
      )}
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
`;

const Placeholder = styled(motion.div)`
  width: 100%;
  padding-bottom: ${({ placeholderSize }) =>
    placeholderSize ? placeholderSize : "100%"};
  background: transparent;
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

const Icon = styled(motion.img)`
  position: absolute;
  object-fit: contain;
  display: ${({ iconSrc }) => (iconSrc ? "flex" : "none")};
  object-position: center;
  max-width: ${({ iconMaxWidth }) => iconMaxWidth};
  max-height: ${({ iconMaxHeight }) => iconMaxHeight};
  width: 100%;
  height: 100%;
  margin: auto;
  &:hover {
    cursor: ${({ hover }) => (hover ? "pointer" : "default")};
  }
`;
