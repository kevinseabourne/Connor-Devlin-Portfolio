import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ImageLoader from "./imageLoader";

export const Input = React.forwardRef(
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
      ...rest
    },
    ref
  ) => {
    return (
      <Container>
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
            maxLength={maxLength}
            data-testid={`${name}-input`}
            id="innerLabel"
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
                  maxWidth="18px"
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

const Container = styled.div`
  width: 100%;
  margin-bottom: 22px;
`;

const Label = styled.label`
  font-size: 1.1rem;
  margin-bottom: 3px;
  margin-left: 9px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid black;
  border-radius: 9px;
`;

const TextInput = styled.input`
  padding: 14px 14px 14px 12px;
  font-size: 1rem;
  border-radius: 9px;
  outline: none;
  box-sizing: border-box;
  font-weight: 500;
  font-family: inherit;
  width: 100%;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.fontColor};
  border: none;
`;

const ErrorContainer = styled.div`
  margin-top: 12px;
  padding-left: 12px;
  display: flex;
  align-items: center;
  border: 1.2px solid red;
  border-radius: 9px;
  padding-top: 6px;
  letter-spacing: 1px;
  padding-bottom: 6px;
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
  margin-top: 3px;
  margin-left: 8px;
  font-size: 1rem;
  color: red;
`;