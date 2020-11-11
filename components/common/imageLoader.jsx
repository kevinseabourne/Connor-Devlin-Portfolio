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
  delay,
  blur,
  opacity,
  scale,
  onClick,
  borderRadius,
  hover,
  transitionTiming,
  transitionDuration,
  boxShadow,
  centerImage,
  handleOnLoadOutside,
  iconSrc,
  iconMaxWidth,
  iconMaxHeight,
  editDeleteContent,
  handleReverseDelay,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mountAnimationComplete, setMountAnimationComplete] = useState(false);

  const { ref, inView, entry } = useInView({
    triggerOnce: false,
    rootMargin: "500px 0px",
  });

  useEffect(() => {
    if (entry && handleReverseDelay) {
      if (entry.boundingClientRect && entry.rootBounds) {
        if (entry.boundingClientRect.y < entry.rootBounds.y) {
          handleReverseDelay();
        }
      }
    }
  }, [entry]);

  const onLoad = () => {
    setIsLoaded(true);
    if (handleOnLoadOutside) {
      handleOnLoadOutside();
    }
  };

  const parent = {
    variantA: { scale: 1 },
    variantB: { scale: 1 },
  };

  const child = {
    variantA: { scale: 1 },
    variantB: {
      scale: mountAnimationComplete ? 1.1 : [0, 1, 0.75, 1, 0.84, 1, 0.95, 1],
    },
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: [0, 1, 0.75, 1, 0.84, 1, 0.95, 1],
      transition: {
        delay: 0.2,
      },
    },
  };

  const onComplete = () => {
    setMountAnimationComplete(true);
  };

  return (
    <ImageContainer
      ref={ref}
      borderRadius={borderRadius}
      width={width}
      maxWidth={maxWidth}
      centerImage={centerImage}
      variants={parent}
      initial="variantA"
      whileHover="variantB"
    >
      <Placeholder
        borderRadius={borderRadius}
        onClick={onClick}
        placeholderSize={placeholderSize}
      />

      {inView && (
        <Image
          isLoaded={isLoaded}
          onLoad={onLoad}
          inView={inView}
          src={src}
          alt={alt}
          key={keyValue}
          blur={blur}
          opacity={opacity}
          scale={scale}
          data-testid={dataTestId}
          transitionTiming={transitionTiming}
          transitionDuration={transitionDuration}
          delay={delay}
          hover={hover}
          borderRadius={borderRadius}
          boxShadow={boxShadow}
          editDeleteContent={editDeleteContent}
        />
      )}

      {inView && (
        <Icon
          variants={child}
          src={iconSrc}
          iconSrc={iconSrc}
          iconMaxWidth={iconMaxWidth}
          iconMaxHeight={iconMaxHeight}
          blur={blur}
          delay={delay}
          opacity={opacity}
          scale={scale}
          isLoaded={isLoaded}
          inView={inView}
          data-testid="imageIcon"
          hover={hover}
          initial="hidden"
          onAnimationComplete={onComplete}
          transitionDuration={transitionDuration}
          transitionTiming={transitionTiming}
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

const Placeholder = styled.div`
  width: 100%;
  padding-bottom: ${({ placeholderSize }) =>
    placeholderSize ? placeholderSize : "100%"};
  background: transparent;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
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

// const Image = styled.img.attrs((props) => ({
//   style: {
//     animation: props.imageAnimationMixin,
//     // animationDelay: `${({ delay }) => (delay ? `${delay}ms` : "0ms")}`,
//   },
// }))`
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   margin: auto;
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
//   object-position: center;
//   border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
//    ${"" /* opacity: ${({ isLoaded, inView }) => (inView ? 1 : 0)}; */}
//    ${
//      "" /* transform: ${({ inView }) =>
//      inView
//        ? `scale(1) translate(0px 0px)`
//        : `scale(0.99) translate(0px, 25px)`}; */
//    }
//   ${"" /* transition-delay: ${({ delay }) => (delay ? `${delay}ms` : "0ms")} */}
//   ${"" /* transition: all 0.5s ease; */}
//
//
//   &:hover {
//     cursor: ${({ hover }) => (hover ? "pointer" : "default")};
//   }
//
//
//   }
// `;
