import React from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ImageLoader from "./imageLoader";

export const UploadButton = React.forwardRef(
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
      uploadValue,
      ...rest
    },
    ref
  ) => {
    return (
      <Container>
        <Label>{label}</Label>
        <InputContainer>
          <Button>Choose a Video</Button>
          <Upload
            {...rest}
            ref={ref}
            type="file"
            name={name}
            onChange={onChange}
            placeholder={label}
            value={value}
            maxLength={maxLength}
            data-testid={`${name}-input`}
            id="innerLabel"
          />
          <UploadValueLabel>{uploadValue}</UploadValueLabel>
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
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  border: 1px solid black;
  border-radius: 9px;
  position: relative;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.div`
  position: absolute;
  border: 1px solid black;
  border-radius: 9px;
  top: 0;
  left: 0;
  margin: 10px;
  padding: 5px 12px;
  transition: 0.2s;
  transform: scale(1);
  background-image: radial-gradient(
    circle at 10% 20%,
    rgb(50, 172, 109) 0%,
    rgb(209, 251, 155) 100.2%
  );
`;

const Upload = styled.input`
  padding: 14px 14px 14px 12px;
  font-size: 1rem;
  border-radius: 9px;
  outline: none;
  box-sizing: border-box;
  font-weight: 500;
  font-family: inherit;
  width: 100%;
  opacity: 0;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.fontColor};
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:active ${Button} {
    transform: scale(0.98) !important;
    outline: 0;
  }
`;

const UploadValueLabel = styled.label`
  position: absolute;
  top: 50%;
  right: 10px;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transform: translate(0%, -50%);
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
