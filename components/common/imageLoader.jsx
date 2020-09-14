import React, { useState } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazy-load";

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
  transitionTime,
  boxShadow,
  centerImage,
  handleOnLoadOutside,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => {
    setIsLoaded(true);
    if (handleOnLoadOutside) {
      handleOnLoadOutside();
    }
  };

  return (
    <ImageContainer
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
      <LazyLoad
        width="unset"
        height="unset"
        once={true}
        offset={500}
        debounce={false}
      >
        <Image
          isLoaded={isLoaded}
          onLoad={onLoad}
          src={src}
          alt={alt}
          key={keyValue}
          blur={blur}
          opacity={opacity}
          scale={scale}
          data-testid={dataTestId}
          transitionTime={transitionTime}
          delay={delay}
          hover={hover}
          borderRadius={borderRadius}
          boxShadow={boxShadow}
        />
      </LazyLoad>
    </ImageContainer>
  );
};

export default ImageLoader;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  width: ${({ width }) => (width ? width : "100%")};
  position: relative;
  background: transparent;
  margin: ${({ centerImage }) => (centerImage ? "auto" : "none")};
  z-index: ${({ hoverColor }) => (hoverColor ? "auto" : "-1")};
`;

const Placeholder = styled.div`
  width: 100%;
  padding-bottom: ${({ placeholderSize }) =>
    placeholderSize ? placeholderSize : "100%"};
  background: transparent;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
`;

const Image = styled.img`
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
  box-shadow: ${({ boxShadow }) => (boxShadow ? boxShadow : "none")};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  filter: ${({ isLoaded, blur }) => (isLoaded ? "blur(0px)" : `blur(${blur})`)};
  opacity: ${({ isLoaded, opacity }) => (isLoaded ? 1 : opacity)};
  transform: ${({ isLoaded, scale }) =>
    isLoaded ? "scale(1)" : `scale(${scale})`};
  transition: ${({ transitionTime }) =>
    transitionTime ? `all ${transitionTime}` : "all 250ms"};
  transition-delay: ${({ delay }) => `${delay}ms`};
  &:hover {
    cursor: ${({ hover }) => (hover ? "pointer" : "default")};
  }
`;
