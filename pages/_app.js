import App from "next/app";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import logger from "../pages/api/logger";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle } from "../globalStyle";
import AppContext from "../context/appContext";
import Header from "../components/header";
import { signIn, getCurrentUser, signOut } from "./api/auth";
import "react-day-picker/lib/style.css";
import "rc-slider/assets/index.css";

logger.init();

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
      const user = getCurrentUser();
      setCurrentUser(user);
    }
  }, []);

  const handleSignIn = async (formData) => {
    const user = await signIn(formData);
    setCurrentUser(user);
  };

  const handleSignOut = () => {
    signOut();
    setCurrentUser(null);
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
