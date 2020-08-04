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
  isFavourite,
  onClick,
  borderRadius,
  hover,
  hoverColor,
  centerImage,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <ImageContainer
      width={width}
      maxWidth={maxWidth}
      centerImage={centerImage}
      hoverColor={hoverColor}
    >
      <Placeholder
        onClick={onClick}
        placeholderSize={placeholderSize}
        borderRadius={borderRadius}
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
          data-testid={dataTestId}
          delay={delay}
          isFavourite={isFavourite}
          hover={hover}
          hoverColor={hoverColor}
          borderRadius={borderRadius}
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
  border-radius: 10px;
  background: transparent;
  margin: ${({ centerImage }) => (centerImage ? "auto" : "0")};
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
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  filter: ${({ isFavourite }) =>
    isFavourite
      ? "invert(43%) sepia(48%) saturate(1134%) hue-rotate(320deg) brightness(89%) contrast(105%)"
      : "none"};
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transform: ${({ isLoaded }) => (isLoaded ? "scale(1)" : "scale(0.5)")};
  transition: all 250ms;
  transition-delay: ${({ delay }) => `${delay}ms`};
  &:hover {
    cursor: ${({ hover }) => (hover ? "pointer" : "default")};
    filter ${({ hoverColor }) => (hoverColor ? hoverColor : "none")};
  }
`;
