import React from "react";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ImageLoader from "./imageLoader";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export const Input = React.forwardRef(
  (
    {
      label,
      error,
      maxLength,
      onChange,
      onClick,
      name,
      type,
      doSubmit,
      value,
      marginLeft,
      autoFocus,
      marginRight,
      marginTop,
      marginBottom,
      tabIndex,
      defaultValue,
      y,
      x,
      scale,
      opacity,
      ...rest
    },
    ref
  ) => {
    const animation = {
      hidden: {
        scale: scale == undefined ? 1 : scale,
        opacity: opacity == undefined ? 1 : opacity,
        y: y ? y : 0,
        x: x ? x : 0,
      },
      show: {
        scale: 1,
        opacity: 1,
        y: 0,
        x: 0,
      },
    };
    return (
      <Container
        layout
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        tabIndex={tabIndex}
        variants={animation}
      >
        <Label>{label}</Label>
        <InputContainer>
          <TextInput
            {...rest}
            ref={ref}
            type={type ? type : "text"}
            name={name}
            onChange={onChange}
            placeholder={label}
            value={value}
            autoFocus={autoFocus}
            defaultValue=""
            maxLength={maxLength}
            aria-label={`${name}-input`}
          />
        </InputContainer>
        <TransitionGroup component={null}>
          {error && (
            <CSSTransition
              in={error ? true : false}
              classNames="errorAnimation"
              timeout={250}
              unmountOnExit
            >
              <ErrorContainer aria-label={`${name}-error-message`}>
                <ImageLoader
                  opacity={0}
                  scale={0}
                  alt="error icon"
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

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.object,
  maxLength: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  doSubmit: PropTypes.func,
  value: PropTypes.string,
  marginLeft: PropTypes.string,
  autoFocus: PropTypes.bool,
  marginRight: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  tabIndex: PropTypes.number,
  defaultValue: PropTypes.string,
  y: PropTypes.number,
  x: PropTypes.number,
  scale: PropTypes.number,
  opacity: PropTypes.number,
};

const Container = styled(motion.div)`
  width: 100%;
  margin-bottom: 22px;
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 3px;
  border-radius: 9px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const TextInput = styled.input`
  padding: 14px 14px 14px 12px;
  font-size: 1rem;
  border-radius: 9px;
  margin: 0px;
  box-sizing: border-box;
  font-weight: 500;
  font-family: inherit;
  width: 100%;
  color: ${({ theme }) => theme.colors.fontColor};
  border: none;
  outline: none;
`;

const ErrorContainer = styled.div`
  margin-top: 12px;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  border: 2px solid #f1535e;
  border-radius: 9px;
  padding-top: 10px;
  padding-bottom: 10px;
  flex-direction: row;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
