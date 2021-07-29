import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DynamicHead from "../dynamicHead";
import { errorMessage } from "./utils/errorMessage";
import styled from "styled-components";
import bottomWave from "../../public/images/top-wave.svg";
import { useForm } from "react-hook-form";
import { DayPicker } from "./dayPicker";
import { Input } from "./input";
import { ReactSelect } from "./select";
import { TextArea } from "./textArea";
import { sendEmail } from "../../pages/api/email";
import { LoadingSpinner } from "../loading-spinner";
import { motion } from "framer-motion";

const ContactForm = ({ data }) => {
  const timeout = useRef(null);
  const [status, setStatus] = useState("idle");
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    handleFormPackages();
    return () => clearTimeout(timeout.current);
  }, []);

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
      options: packages,
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
    setStatus("pending");
    const response = await sendEmail(data);
    if (response && response.status === 200) {
      // clear inputs
      setValue("dayPicker", "");
      setValue("topic", "");
      reset();
      setStatus("resolved");
      timeout.current = setTimeout(() => setStatus("idle"), 3000);
    } else {
      errorMessage();
    }
  };

  const handleFormPackages = () => {
    const selectPackageOptions = [];
    data.map((pack) =>
      selectPackageOptions.push({
        value: `${pack.packageName} Package`,
        label: `${pack.packageName} Package`,
      })
    );

    setPackages(selectPackageOptions);
  };

  const containerAnimation = {
    hidden: {
      transition: {
        staggerChildren: 0.15,
      },
    },
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const titleAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  const waveAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <Container variants={containerAnimation} initial="hidden" animate="show">
      <DynamicHead title="Contact - Connor Devlin" urlQuery="/contact" />
      <Title variants={titleAnimation}>Contact</Title>
      <Form onSubmit={handleSubmit(onSubmit)} aria-label="contact form">
        <Input
          name="name"
          label="Name"
          ref={register(schema.name)}
          error={errors.name}
          opacity={0}
          y={20}
        />
        <Input
          name="email"
          label="Email"
          ref={register(schema.email)}
          error={errors.email}
          opacity={0}
          y={20}
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
            opacity={0}
            y={20}
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
            opacity={0}
            y={12}
          />
        </InnerContainer>

        <TextArea
          name="enquiry"
          label="Enquiry"
          ref={register(schema.enquiry)}
          error={errors.enquiry}
          opacity={0}
          y={12}
        />
        <SubmitButton
          type="submit"
          aria-label="submit button"
          variants={titleAnimation}
          disabled={status === "pending" ? true : false}
        >
          {status === "pending" ? (
            <LoadingSpinner size="30px" />
          ) : status === "resolved" ? (
            "Success"
          ) : (
            "Send"
          )}
        </SubmitButton>
      </Form>
      <BottomWave src={bottomWave} variants={waveAnimation} />
    </Container>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  data: PropTypes.array.isRequired,
};

const Container = styled(motion.div)`
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
  padding-bottom: 200px;
  @media (min-width: 1023px) and (max-height: 810px) {
    height: 100%;
  }
`;

const Title = styled(motion.h1)`
  margin-top: 50px;
  margin-bottom: 20px;
`;

const Form = styled(motion.form)`
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

const SubmitButton = styled(motion.button)`
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
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
  @media (max-width: 420px) {
    width: 100%;
    min-width: 100%;
  }
  @media (max-width: 250px) {
    padding: 18px 40px;
  }
`;

const BottomWave = styled(motion.img)`
  position: absolute;
  bottom: 0px;
  left: -1px;
  width: 100%;
  z-index: -100;
  @media (max-width: 1024px) {
    bottom: -1px;
  }
`;
