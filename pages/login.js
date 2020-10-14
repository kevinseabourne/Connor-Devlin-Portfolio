import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import AppContext from "../context/appContext";
import { useForm } from "react-hook-form";
import { getCurrentUser } from "../pages/api/auth";

const Login = () => {
  const { handleSignIn, currentUser } = useContext(AppContext);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("idle");
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      router.push("/admin");
    }
  }, []);

  const onSubmit = async (query) => {
    if (status !== "pending") {
      setStatus("pending");
      const response = await handleSignIn(query);
      if (response) {
        router.push("/admin");
      }
      setStatus("resolved");
    }
  };

  return user ? null : (
    <Container>
      <Title>Login</Title>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        {errors.username && <ErrorMessage>false</ErrorMessage>}
        {errors.password && <ErrorMessage>false</ErrorMessage>}
        <InputLabel>Username</InputLabel>
        <Username
          name="username"
          ref={register({ required: true, maxLength: 100 })}
        />
        <InputLabel>Password</InputLabel>
        <Password
          type="password"
          name="password"
          ref={register({ required: true, maxLength: 100 })}
        />
        <SubmitButton type="submit" />
      </LoginForm>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 5px;
`;

const LoginForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ErrorMessage = styled.label`
  color: red;
`;

const InputLabel = styled.label`
  font-size: 1rem;
  margin-top: 10px;
  margin-bottom: 3px;
  margin-right: auto;
  margin-left: 5px;
`;

const Username = styled.input`
  font-size: 1.2rem;
  &:focus {
    outline: none;
  }
`;

const Password = styled.input`
  font-size: 1.2rem;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.input`
  margin-top: 10px;
  font-size: 1rem;
  padding: 3px 12px;
`;
