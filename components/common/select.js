import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Controller } from "react-hook-form";
import Select from "react-select";
import ImageLoader from "./imageLoader";
import { motion } from "framer-motion";

export const ReactSelect = React.forwardRef(
  (
    {
      label,
      error,
      onChange,
      onClick,
      options,
      validation,
      name,
      doSubmit,
      value,
      control,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      defaultValue,
      x,
      y,
      opacity,
      scale,
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
      <Controller
        control={control}
        rules={validation}
        name={name}
        defaultValue={defaultValue ? defaultValue : ""}
        render={({ onChange, value, rules }) => (
          <Container
            marginTop={marginTop}
            marginBottom={marginBottom}
            marginLeft={marginLeft}
            marginRight={marginRight}
            variants={animation}
          >
            <Label>{label}</Label>
            <InputContainer>
              <Select
                onChange={onChange}
                ref={ref}
                id="select"
                value={value}
                rules={rules}
                options={options}
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
        )}
      />
    );
  }
);

ReactSelect.propTypes = {
  label: PropTypes.string,
  error: PropTypes.object,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  options: PropTypes.array.isRequired,
  validation: PropTypes.object,
  name: PropTypes.string.isRequired,
  doSubmit: PropTypes.func,
  value: PropTypes.string,
  control: PropTypes.object,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  defaultValue: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  opacity: PropTypes.number,
  scale: PropTypes.number,
};

const Container = styled(motion.div)`
  font-size: 1.1rem;
  margin-bottom: 3px;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 22px;
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};
  @media (max-width: 420px) {
    margin-left: 0px;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  margin-left: 9px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 3px;
  border-radius: 9px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
