import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import Home from ".././pages/index";
import preloadAll from "jest-next-dynamic";
import AppContext from "../context/appContext";
import { GlobalStyle } from "../globalStyle";
import Header from "../components/header";
import { ToastContainer } from "react-toastify";

const theme = {
  colors: {
    gradient1: "rgba(50, 172, 109, 1)",
    gradient2: "rgba(209, 251, 155, 1)",
    primary: "rgba(50, 172, 109, 1)",
    secondary: "#E7ECEF",
    fontColor: "#272932",
  },
};

const currentUser = jest.fn();
const handleSignIn = jest.fn();
const handleSignOut = jest.fn();

const customRender = (component) => {
  return render(
    <AppContext.Provider
      value={{
        currentUser: currentUser,
        handleSignIn: handleSignIn,
        handleSignOut: handleSignOut,
      }}
    >
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <GlobalStyle />
        <Header />
        {component}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export { customRender as render };

// -------- Test -------- //

describe("react router", () => {
  beforeAll(async () => {
    await preloadAll();
  });
  it("render homePage component", async () => {
    const data = jest.fn();
    const { container } = customRender(<Home />);
    expect(container).toBeInTheDocument();
  });
  it("should render Header", () => {
    const { container } = customRender(<Header />);

    expect(container).toBeVisible();
  });
});
