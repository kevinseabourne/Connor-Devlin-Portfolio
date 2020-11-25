import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { TextArea } from "./common/textArea";
import { LoadingSpinner } from "./loading-spinner";
import { getAboutMe, updateAboutMe } from ".././pages/api/about";
import { motion, AnimateSharedLayout } from "framer-motion";

const AdminAbout = ({ data }) => {
  const [state, setState] = useState("");
  const [status, setStatus] = useState("idle");
  const timeout = useRef(null);

  useEffect(() => {
    const { description } = data;
    setState(description);
    return () => clearTimeout(timeout.current);
  }, []);

  const { register, handleSubmit, reset, errors } = useForm();

  const onSubmit = async (data) => {
    const { about } = data;
    setStatus("pending");
    const aboutMe = about.replace(/\r?\n/g, "\n");
    await updateAboutMe(aboutMe);
    const response = await getAboutMe();
    const { description } = response;
    setState(description);
    reset();
    setStatus("resolved");
    timeout.current = setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <AnimateSharedLayout>
      <Container layout>
        <Title>Preview</Title>
        <About layout>{state}</About>
        <Title layout>Edit About Me Content</Title>
        <Form onSubmit={handleSubmit(onSubmit)} layout>
          <TextArea
            name="about"
            label="About Me"
            ref={register}
            error={errors.about}
          />
          <SubmitButton
            layout
            type="submit"
            whileTap={{ scale: 0.9 }}
            disabled={status === "pending" ? true : false}
          >
            {status === "pending" ? (
              <LoadingSpinner size={"28px"} />
            ) : status === "resolved" ? (
              "Success"
            ) : (
              "Update"
            )}
          </SubmitButton>
        </Form>
      </Container>
    </AnimateSharedLayout>
  );
};

export default AdminAbout;

const Container = styled(motion.div)`
  min-height: calc(100vh - 75px);
  width: calc(100% - 280px);
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: ${({ theme }) =>
    `linear-gradient(to right,  ${theme.colors.gradient1} 10%, ${theme.colors.gradient2} 100% )`};
  margin-left: auto;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const About = styled(motion.p)`
  max-width: 660px;
  width: 100%;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

const Title = styled(motion.h1)`
  margin: 70px 0px;
  text-align: center;
  @media (max-width: 750px) {
    margin: 10% 0px;
    font-size: 1.4rem;
  }
`;

const Form = styled(motion.form)`
  width: 100%;
  max-width: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SubmitButton = styled(motion.button)`
  margin-top: 10px;
  font-size: 1rem;
  min-height: 54px;
  min-width: 200px;
  max-width: 214.23px;
  padding: 18px 80px;
  border-radius: 9px;
  border: none;
  color: white;
  position: relative;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.02) 0px -5.9px 2.7px,
    rgba(0, 0, 0, 0.024) 0px -1.2px 6.9px, rgba(0, 0, 0, 0.03) 0px 8px 14.2px,
    rgba(0, 0, 0, 0.04) 0px 21.9px 29.2px, rgba(0, 0, 0, 0.07) 0px 49px 80px;
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
  @media (max-width: 609px) {
    margin-bottom: 60px;
    max-width: 100%;
    width: 100%;
  }
`;
