import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { Controller } from "react-hook-form";
import { formatDate, parseDate } from "react-day-picker/moment";
import "moment/locale/it";
import ImageLoader from "./imageLoader";
import { motion } from "framer-motion";

export const DayPicker = React.forwardRef(
  (
    {
      label,
      error,
      onChange,
      validation,
      name,
      value,
      scale,
      control,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      defaultValue,
      x,
      y,
      opacity,
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
        transition: {
          delayChildren: 0.9,
          staggerChildren: 0.9,
        },
      },
    };
    return (
      <Controller
        control={control}
        rules={validation}
        name={name}
        defaultValue={defaultValue ? defaultValue : ""}
        render={({ onChange, onBlur, value, rules }) => (
          <Container
            marginTop={marginTop}
            marginBottom={marginBottom}
            marginLeft={marginLeft}
            marginRight={marginRight}
            variants={animation}
          >
            <Label>{label}</Label>
            <InputContainer>
              <DayPickerInput
                rules={rules}
                name={name}
                ref={ref}
                onDayChange={onChange}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                formatDate={formatDate}
                format="DD/MM/YYYY"
                parseDate={parseDate}
                placeholder={`${formatDate(new Date(), "DD/MM/YYYY")}`}
                inputProps={{
                  name: `${name}-input`,
                  title: "dayPicker",
                }}
              />
              <Icon>
                <ImageLoader
                  lazyLoad={true}
                  maxWidth="inherit"
                  placeholderSize="100%"
                  opacity={0}
                  x={5}
                  alt="calender"
                  delay={0.3}
                  scale={0.9}
                  src="https://chpistel.sirv.com/Connor-Portfolio/time-and-date.png?w=50&png.optimize=true"
                />
              </Icon>
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
                      maxWidth="15px"
                      placeholderSize="100%"
                      opacity={0}
                      scale={0}
                      alt="error sign"
                      transitionTime="0.250s ease"
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

DayPicker.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.object,
  onChange: PropTypes.func,
  validation: PropTypes.object,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  scale: PropTypes.number,
  control: PropTypes.object,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  defaultValue: PropTypes.func,
  x: PropTypes.number,
  y: PropTypes.number,
  opacity: PropTypes.number,
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

const Icon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 14px;
  margin-left: auto;
  width: 25px;
  height: 25px;
  pointer-events: none;
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
