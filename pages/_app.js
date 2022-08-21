import React, { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import logger from "../pages/api/logger";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle } from "../globalStyle";
import AppContext from "../context/appContext";
import Header from "../components/header";
import { signIn, signOut } from "./api/auth";
import "react-day-picker/lib/style.css";

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
  // Google analytics
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const handleSignIn = async (formData) => {
    const user = await signIn(formData);
    return user;
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <AppContext.Provider
      value={{
        handleSignIn: handleSignIn,
        handleSignOut: handleSignOut,
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <ToastContainer />
        <Main id="main">
          <Component {...pageProps} />
        </Main>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default MyApp;

const Main = styled.main``;
