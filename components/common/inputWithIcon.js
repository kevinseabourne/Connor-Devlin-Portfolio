import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ImageLoader from "./imageLoader";
import popSound from "../../public/sounds/pop_waterdrip_hi.mp3";
import useSound from "use-sound";
import { motion } from "framer-motion";

export const InputWithIcon = React.forwardRef(
  (
    {
      label,
      error,
      maxLength,
      onChange,
      onClick,
      name,
      doSubmit,
      value,
      marginLeft,
      marginRight,
      defaultValue,
      toolTipMessage,
      icon,
      iconMaxWidth,
      iconPlaceHolderSize,
      iconBorderRadius,
      toolTipImage,
      toolTipMaxWidth,
      toolTipImagePlaceHolderSize,
      toolTipImageBorderRadius,
      opacity,
      y,
      x,
      ...rest
    },
    ref
  ) => {
    const [toolTipOpen, setToolTipOpen] = useState(false);
    const [play] = useSound(popSound, { volume: 0.5 });

    const animation = {
      hidden: {
        opacity: opacity ? opacity : 1,
        y: y ? y : 0,
        x: x ? x : 0,
      },
      show: {
        opacity: 1,
        y: 0,
        x: 0,
      },
    };
    return (
      <Container
        marginLeft={marginLeft}
        marginRight={marginRight}
        variants={animation}
      >
        <Label>{label}</Label>
        <InputContainer>
          <TextInput
            {...rest}
            ref={ref}
            type="text"
            name={name}
            onChange={onChange}
            placeholder={label}
            value={value}
            defaultValue=""
            maxLength={maxLength}
            data-testid={`${name}-input`}
            id="innerLabel"
          />
          {icon && (
            <IconBox
              tabIndex="0"
              role="button"
              onMouseEnter={() => {
                play();
                setToolTipOpen(true);
              }}
              onMouseLeave={() => setToolTipOpen(false)}
              onKeyDown={(e) => {
                const key = e.key === 13 || e.keyCode === 13;
                key && play();
                setToolTipOpen(!toolTipOpen);
              }}
              onBlur={() => setToolTipOpen(false)}
            >
              <ImageLoader
                {...rest}
                maxWidth={iconMaxWidth}
                placeholderSize={iconPlaceHolderSize}
                borderRadius={iconBorderRadius}
                src={icon}
                opacity={0}
                scale={0.9}
                hover={true}
              />
            </IconBox>
          )}
          {icon && (
            <ToolTipContainer
              toolTipOpen={toolTipOpen}
              borderRadius={toolTipImageBorderRadius}
            >
              {toolTipImage && (
                <ImageLoader
                  maxWidth={toolTipMaxWidth}
                  placeholderSize={toolTipImagePlaceHolderSize}
                  borderRadius={toolTipImageBorderRadius}
                  src={toolTipImage}
                />
              )}
              {toolTipMessage && (
                <ToolTipMessage>{toolTipMessage}</ToolTipMessage>
              )}
            </ToolTipContainer>
          )}
        </InputContainer>

        <TransitionGroup component={null}>
          {error && (
            <CSSTransition
              in={error ? true : false}
              classNames="errorAnimation"
              timeout={250}
              unmountOnExit
            >
              <ErrorContainer>
                <ImageLoader
                  lazyLoad={true}
                  maxWidth="15px"
                  placeholderSize="100%"
                  src="https://chpistel.sirv.com/Connor-Portfolio/error.png?w=24&png.optimize=true"
                />
                <ErrorMessage>{error.message}</ErrorMessage>
              </ErrorContainer>
            </CSSTransition>
          )}
        </TransitionGroup>
      </Container>
    );
  }
);

const Container = styled(motion.div)`
  width: 100%;
  margin-bottom: 22px;
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
  @media (max-width: 609px) {
    margin-left: 0px;
    margin-right: 0px;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  margin-left: 9px;
`;

const ToolTipContainer = styled.div`
  max-width: 400px;
  width: 100%;
  position: absolute;
  visibility: ${({ toolTipOpen }) => (toolTipOpen ? "visible" : "hidden")};
  opacity: ${({ toolTipOpen }) => (toolTipOpen ? 1 : 0)};
  transform: ${({ toolTipOpen }) =>
    toolTipOpen
      ? `rotateX(0deg) scale(1)  translateY(0px)`
      : `rotateX(20deg) scale(0.8)  translateY(35px)`};
  z-index: 4;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  transition: all 300ms cubic-bezier(0.3, 0, 0, 1) 0ms;
  bottom: 35px;
  margin-bottom: 10px;
  right: -179px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.02) 0px -5.9px 2.7px,
    rgba(0, 0, 0, 0.024) 0px -1.2px 6.9px, rgba(0, 0, 0, 0.03) 0px 8px 14.2px,
    rgba(0, 0, 0, 0.04) 0px 21.9px 29.2px, rgba(0, 0, 0, 0.07) 0px 49px 80px;
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    right: 50%;
    margin-right: -6px;
    width: 0;
    margin-top: -1px;
    border: 6px solid transparent;
    border-top-color: black;
  }
  @media (max-width: 1157px) {
    right: 0%;
    transform: ${({ toolTipOpen }) =>
      toolTipOpen
        ? `rotateX(0deg) scale(1)  translateY(0px) translateX(0px)`
        : `rotateX(20deg) scale(0.8)  translateY(35px) translateX(40px)`};
    &::after {
      right: 22px;
    }
  }
  @media (max-width: 357px) {
    bottom: 45px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid black;
  border-radius: 9px;
  position: relative;
`;

const TextInput = styled.input`
  padding: 14px 46px 14px 12px;
  font-size: 1rem;
  border-radius: 9px;
  outline: none;
  margin: 0px;
  box-sizing: border-box;
  font-weight: 500;
  font-family: inherit;
  width: 100%;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.fontColor};
  border: none;
`;

const IconBox = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  padding: 0px;
  border: none;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 100%;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  &:hover {
    cursor: pointer;
  }
`;

const ToolTipMessage = styled.span`
  color: white;
  font-size: 0.8rem;
  position: absolute;
  bottom: 20px;
  padding: 0px 30px;
  @media (max-width: 290px) {
    font-size: 0.7rem;
    bottom: 15px;
    padding: 0px 15px;
  }
`;

const ErrorContainer = styled.div`
  margin-top: 12px;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  border: 1.2px solid red;
  border-radius: 9px;
  letter-spacing: 1px;
  padding-top: 10px;
  padding-bottom: 10px;
  flex-direction: row;

  &.errorAnimation-enter {
    transform: scale(0.4);
    opacity: 0;
  }
  &.errorAnimation-enter-active {
    transform: scale(1);
    transition: all 0.25s ease-in-out;
    opacity: 1;
  }
  &.errorAnimation-exit {
    transform: scale(1);
    opacity: 1;
  }
  &.errorAnimation-exit-active {
    transform: scale(0.4);
    opacity: 0;
    transition: all 0.25s ease-in-out;
  }
`;

const ErrorMessage = styled.label`
  margin-top: 1.9px;
  margin-left: 8px;
  font-size: 0.9rem;
  color: red;
`;
