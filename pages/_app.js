import App from "next/app";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "../globalStyle";
import AppContext from "../context/appContext";
import { useRouter } from "next/router";
import Header from "../components/header";
import { SignIn, SignOut } from "./api/auth";

const theme = {
  colors: {
    gradient1: "rgba(50, 172, 109, 1)",
    gradient2: "rgba(209, 251, 155, 1)",
    primary: "rgba(50, 172, 109, 1)",
    secondary: "#E7ECEF",
    fontColor: "#272932",
  },
};

const MyApp = ({ Component, pageProps }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("currentUser") && !currentUser) {
      const currentUser = window.localStorage.getItem("currentUser");
      setCurrentUser(JSON.parse(currentUser));
    }
  }, []);

  const handleSignIn = async (data) => {
    const response = await SignIn(data);
    if (response) {
      const { user } = response;
      setCurrentUser(user.email);
      localStorage.setItem("currentUser", user.email);
    }
  };

  const handleSignOut = async () => {
    const response = await SignOut();
    setCurrentUser(null);
    localStorage.setItem("currentUser", null);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser: currentUser,
        handleSignIn: handleSignIn,
        handleSignOut: handleSignOut,
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ToastContainer />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default MyApp;
