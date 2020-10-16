import React, { useState, useEffect } from "react";
import styled from "styled-components";
import bottomWave from "../public/images/top-wave.svg";
import { useForm } from "react-hook-form";
import { DayPicker } from "../components/common/dayPicker";
import { Input } from "../components/common/input";
import { ReactSelect } from "../components/common/select";
import { TextArea } from "../components/common/textArea";
import { sendEmail } from "./api/email";
import { LoadingSpinner } from "../components/loading-spinner";

const Contact = (props) => {
  const [status, setStatus] = useState("idle");
  const {
    register,
    handleSubmit,
    control,
    errors,
    reset,
    setValue,
  } = useForm();

  const schema = {
    pricing: {
      required: "A price is required !",
    },
    name: {
      required: "A name is required !",
      minLength: {
        value: 1,
        message: "Name should be greater than 1 character !",
      },
      pattern: {
        value: /^[a-zA-Z '.-]*$/,
        message: "Letters only !",
      },
    },
    email: {
      required: "An Email is required !",
      pattern: {
        value: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        message: "A valid email is required !",
      },
    },
    enquiry: {
      required: "A message is required !",
      minLength: { value: 3, message: "message is too short !" },
    },
    date: {
      required: "A date is required !",
    },
    topic: {
      required: "select a topic !",
    },
  };

  const topicOptions = [
    {
      label: "Wedding",
      options: [
        { value: "Wedding Standard Package", label: "Standard Package" },
        { value: "Wedding Deluxe Package", label: "Deluxe Package" },
      ],
    },
    {
      label: "Corporate",
      options: [
        { value: "Corporate Interviews", label: "Interviews" },
        { value: "Corporate Events", label: "Events" },
      ],
    },
    {
      label: "Other",
      options: [{ value: "Other", label: "Other" }],
    },
  ];

  const onSubmit = async (data) => {
    if (status !== "pending") {
      setStatus("pending");
      const response = await sendEmail(data);
      if (response.status === 200) {
        setStatus("resolved");

        // clear inputs
        setValue("dayPicker", "");
        setValue("topic", "");
        reset();
      }
    }
  };

  return (
    <Container>
      <Title>Contact</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="name"
          label="Name"
          ref={register(schema.name)}
          error={errors.name}
        />
        <Input
          name="email"
          label="Email"
          ref={register(schema.email)}
          error={errors.email}
        />

        <InnerContainer>
          <DayPicker
            control={control}
            ref={register}
            label="Date"
            name="dayPicker"
            validation={schema.date}
            error={errors.dayPicker}
            marginRight="5px"
          />
          <ReactSelect
            control={control}
            ref={register}
            label="Topic"
            name="topic"
            options={topicOptions}
            validation={schema.topic}
            error={errors.topic}
            marginLeft="5px"
          />
        </InnerContainer>

        <TextArea
          name="enquiry"
          label="Enquiry"
          ref={register(schema.enquiry)}
          error={errors.enquiry}
        />
        <SubmitButton type="submit">
          {status !== "pending" ? "Send" : <LoadingSpinner size="30px" />}
        </SubmitButton>
      </Form>
      <BottomWave src={bottomWave} />
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  height: 100%;
  min-height: calc(100vh - 75px);
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 0px 20px;
  @media (min-width: 1023px) and (max-height: 810px) {
    height: 100%;
  }
`;

const Title = styled.h1`
  margin-top: 50px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
  @media (max-width: 420px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  font-size: 1rem;
  min-height: 54px;
  min-width: 200px;
  padding: 18px 80px;
  border-radius: 9px;
  border: none;
  color: white;
  position: relative;
  font-weight: 600;
  transition: all 0.2s ease;
  outline: none;
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: scale(0.95);
    outline: 0;
  }
`;

const BottomWave = styled.img`
  position: absolute;
  bottom: 0px;
  left: -1px;
  width: 100%;
  z-index: -100;
  @media (max-width: 1024px) {
    bottom: -1px;
  }
`;
