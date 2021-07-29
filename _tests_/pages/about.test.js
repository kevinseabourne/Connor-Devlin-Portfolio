import React from "react";
import AboutPage from "../.././components/about";
import { render } from ".././test-utils";
import { waitFor, screen } from "@testing-library/react";
import { getAboutMe } from "../.././pages/api/about";
import "@testing-library/jest-dom";

jest.mock("../.././pages/api/about");
jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);

const { getByText, getByRole } = screen;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Failed http request", () => {
  it("should render a error message when the data request fails", async () => {
    const data = null;
    render(<AboutPage data={data} />);

    await waitFor(() => expect(getByRole("alert")).toBeVisible());
  });
});

describe("Successful http request", () => {
  it("should render a error message when the data request fails", async () => {
    const data = { description: "about me description. testing" };

    render(<AboutPage data={data} />);

    // waiting for staggered animation
    await waitFor(
      () => expect(getByText("about me description. testing")).toBeVisible(),
      { timeout: 1200 }
    );
  });
});
