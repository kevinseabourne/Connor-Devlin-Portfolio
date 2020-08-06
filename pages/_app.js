import App from "next/app";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../globalStyle";
import AppContext from "../context/appContext";
import { useRouter } from "next/router";
import Header from "../components/header";

const theme = {
  colors: {
    gradient1: "rgba(50, 172, 109, 1)",
    gradient2: "rgba(209, 251, 155, 1)",
    primary: "rgba(50, 172, 109, 1)",
    secondary: "#E7ECEF",
  },
};

export default class MyApp extends App {
  state = {
    user: null,
  };

  componentDidMount() {
    if (localStorage.getItem("user")) {
      this.setState({ user: localStorage.getItem("user") });
    }
  }

  handleSignIn = () => {
    localStorage.setItem("user", "admin");
  };

  handleSignOut = () => {
    localStorage.setItem("user", null);
  };

  render() {
    const { user, handleUser } = this.state;
    const { Component, pageProps } = this.props;
    return (
      <AppContext.Provider
        value={{
          user: user,
          handleSignIn: this.handleSignIn,
          handleSignOut: this.handleSignOut,
        }}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </AppContext.Provider>
    );
  }
}
