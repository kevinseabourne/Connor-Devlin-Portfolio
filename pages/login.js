import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import AppContext from "../context/appContext";
import { useForm } from "react-hook-form";
import { getCurrentUser } from "../pages/api/auth";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "../components/loading-spinner";
import { Input } from "../components/common/input";
import ImageLoader from "../components/common/imageLoader";
import { toast } from "react-toastify";

const Login = () => {
  // Cypress Testing Coverage //
  /* istanbul ignore file */
  const { handleSignIn } = useContext(AppContext);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("idle");
  const { register, handleSubmit, setError, errors } = useForm();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      router.push("/admin");
    }
  }, []);

  const onSubmit = async (query) => {
    setStatus("pending");
    const response = await handleSignIn(query);
    if (response.registered) {
      router.push("/admin");
    } else if (response.type === "error") {
      setError(response.name, {
        type: "manual",
        message: response.message,
      });
    } else {
      toast.error("an unexpected occured", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setStatus("resolved");
  };

  const schema = {
    email: {
      required: "An Email is required !",
      pattern: {
        value: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        message: "A valid email is required !",
      },
    },
    password: {
      required: "A password is required !",
    },
  };

  const errorAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      y: 0,
      opacity: 1,
    },
  };

  return user ? null : (
    <Container layout>
      <Title layout>Login</Title>
      <AnimatePresence>
        {Object.values(errors).map((error, index) => (
          <ErrorContainer
            layout
            key={index}
            variants={errorAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <ImageLoader
              opacity={0}
              scale={0}
              maxWidth="15px"
              placeholderSize="100%"
              src="https://chpistel.sirv.com/Connor-Portfolio/error.png?w=24&png.optimize=true"
            />
            <ErrorMessage>{error.message}</ErrorMessage>
          </ErrorContainer>
        ))}
      </AnimatePresence>
      <LoginForm onSubmit={handleSubmit(onSubmit)} layout>
        <Input
          name="email"
          label="Email"
          ref={register(schema.email)}
          marginTop="20px"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          ref={register(schema.password)}
        />
        <SubmitButton
          type="submit"
          disabled={status === "pending" ? true : false}
        >
          {status !== "pending" ? "Send" : <LoadingSpinner size="30px" />}
        </SubmitButton>
      </LoginForm>
    </Container>
  );
};

export default Login;

const Container = styled(motion.div)`
  min-height: calc(100vh - 75px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px 20px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.gradient1};
  background-image: ${({ theme }) =>
    `radial-gradient( circle farthest-corner at 10% 20%,  ${theme.colors.gradient1} 0%, ${theme.colors.gradient2} 100.2% )`};
`;

const Title = styled(motion.h1)`
  margin-bottom: 10px;
`;

const ErrorContainer = styled(motion.div)`
  margin: 12px 0px;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  max-width: 450px;
  width: 100%;
  align-items: center;
  border: 2px solid red;
  overflow: hidden;
  border-radius: 9px;
  padding-top: 10px;
  padding-bottom: 10px;
  flex-direction: row;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const ErrorMessage = styled.label`
  margin-top: 1.9px;
  margin-left: 8px;
  font-size: 0.9rem;
  color: red;
`;

const LoginForm = styled(motion.form)`
  max-width: 450px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
