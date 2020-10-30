import React from "react";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Controller } from "react-hook-form";
import Select from "react-select";
import ImageLoader from "./imageLoader";

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
      marginLeft,
      marginRight,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    return (
      <Controller
        control={control}
        rules={validation}
        name={name}
        defaultValue=""
        render={({ onChange, value, rules }) => (
          <Container marginLeft={marginLeft} marginRight={marginRight}>
            <Label>{label}</Label>
            <InputContainer>
              <Select
                onChange={onChange}
                ref={ref}
                id="select"
                value={value}
                rules={rules}
                options={options}
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
        )}
      />
    );
  }
);
const Container = styled.div`
  font-size: 1.1rem;
  margin-bottom: 3px;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 22px;
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
  border: 1.2px solid black;
  border-radius: 9px;
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 14px;
  margin-left: auto;
  width: 25px;
  height: 25px;
  pointer-events: none;
`;

const Image = styled.img``;

const ErrorContainer = styled.div`
  margin-top: 12px;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  border: 1.2px solid red;
  border-radius: 9px;
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
