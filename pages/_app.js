import App from "next/app";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../globalStyle";
import AppContext from "../context/appContext";
import { useRouter } from "next/router";

const theme = {
  colors: {
    primary: "#0070f3",
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
          <Component {...pageProps} />
        </ThemeProvider>
      </AppContext.Provider>
    );
  }
}
