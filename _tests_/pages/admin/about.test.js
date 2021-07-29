import React from "react";
import AdminAbout from "../../../components/adminAbout";
import { render } from "../../test-utils";
import { waitFor, screen, fireEvent, act } from "@testing-library/react";
import { getAboutMe, updateAboutMe } from "../../../pages/api/about";
import "@testing-library/jest-dom";

jest.mock("../../../pages/api/about");
jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);
const {
  getByRole,
  getByText,
  findByRole,
  findByText,
  findByLabelText,
  getByLabelText,
} = screen;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Failed http request", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render a error message when the data request fails", async () => {
    const data = null;
    render(<AdminAbout data={data} />);

    await waitFor(() => expect(getByRole("alert")).toBeVisible());
  });

  it("should render a error message when the http request fails via updateAboutMe", async () => {
    updateAboutMe.mockImplementation(() =>
      Promise.reject("Async error").catch((error) => {
        expect(error).toEqual("Async error");
      })
    );
    getAboutMe.mockImplementation(() =>
      Promise.resolve({
        description:
          "testing testing. testing if the about input will update to this now",
        status: 200,
      })
    );
    const data = { description: "about me description. testing" };
    render(<AdminAbout data={data} />);

    await waitFor(
      () => expect(getByText("about me description. testing")).toBeVisible(),
      { timeout: 1200 }
    );

    const aboutInput = screen.getByRole("textbox", { name: /about\-input/i });
    fireEvent.change(aboutInput, {
      target: {
        value:
          "testing testing. testing if the about input will update to this now",
      },
    });

    const submitButton = getByRole("button", { name: /update/i });
    fireEvent.click(submitButton);

    const loadingSpinner = await findByLabelText("loading spinner");
    expect(loadingSpinner).toBeVisible();

    await waitFor(() => expect(getByRole("alert")).toBeVisible());
  });

  it("should render a error message when the http request fails via getAboutMe", async () => {
    updateAboutMe.mockImplementation(() =>
      Promise.resolve({
        data: {},
        status: 200,
      })
    );
    getAboutMe.mockImplementation(() =>
      Promise.reject("Async error").catch((error) => {
        expect(error).toEqual("Async error");
      })
    );

    const data = { description: "about me description. testing" };
    render(<AdminAbout data={data} />);

    await waitFor(
      () => expect(getByText("about me description. testing")).toBeVisible(),
      { timeout: 1200 }
    );

    const aboutInput = screen.getByRole("textbox", { name: /about\-input/i });
    fireEvent.change(aboutInput, {
      target: {
        value:
          "testing testing. testing if the about input will update to this now",
      },
    });

    const submitButton = getByRole("button", { name: /update/i });
    fireEvent.click(submitButton);

    const loadingSpinner = await findByLabelText("loading spinner");
    expect(loadingSpinner).toBeVisible();

    await waitFor(() => expect(getByRole("alert")).toBeVisible());
  });

  it("should render an error message when you do not meet the validation requirments of the form when submitting", async () => {
    const data = { description: "about me description. testing" };
    render(<AdminAbout data={data} />);

    const aboutInput = getByRole("textbox", { name: /about\-input/i });
    fireEvent.change(aboutInput, { target: { value: "to short" } });

    const submitButton = getByRole("button", { name: /update/i });
    fireEvent.click(submitButton);

    expect(await findByText("About section is too short !")).toBeVisible();
  });
});

describe("Successful http request", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the mock data on mount", async () => {
    const data = { description: "about me description. testing" };
    render(<AdminAbout data={data} />);

    // waiting for staggered animation
    await waitFor(
      () => expect(getByText("about me description. testing")).toBeVisible(),
      { timeout: 1200 }
    );
  });

  it("should show the loading state after a successful http request", async () => {
    getAboutMe.mockImplementation(() =>
      Promise.resolve({
        description:
          "testing testing. testing if the about input will update to this now",
        status: 200,
      })
    );
    const data = { description: "about me description. testing" };
    render(<AdminAbout data={data} />);

    // waiting for staggered animation
    await waitFor(
      () => expect(getByText("about me description. testing")).toBeVisible(),
      { timeout: 1200 }
    );

    const aboutInput = screen.getByRole("textbox", { name: /about\-input/i });
    fireEvent.change(aboutInput, {
      target: {
        value:
          "testing testing. testing if the about input will update to this now",
      },
    });

    const submitButton = getByRole("button", { name: /update/i });
    fireEvent.click(submitButton);

    // const loadingSpinner = await findByLabelText("loading spinner");
    // expect(loadingSpinner).toBeVisible();

    await waitFor(
      () => expect(getByLabelText("loading spinner")).toBeVisible(),
      { timeout: 1200 }
    );
  });
});

describe("Successful http request", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers("legacy");
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should update the about section with what is submitted through the form (mocked setTimeout)", async () => {
    updateAboutMe.mockImplementation(() =>
      Promise.resolve({
        data: {},
        status: 200,
      })
    );
    getAboutMe.mockImplementation(() =>
      Promise.resolve({
        description:
          "testing testing. testing if the about input will update to this now",

        status: 200,
      })
    );
    const data = { description: "about me description. testing" };
    render(<AdminAbout data={data} />);

    // Additional time needed to wait for element to be visible due to staggered animation
    await waitFor(
      () => expect(getByText("about me description. testing")).toBeVisible(),
      { timeout: 1200 }
    );

    const aboutInput = screen.getByRole("textbox", { name: /about\-input/i });
    const submitButton = getByRole("button", { name: /update/i });

    fireEvent.change(aboutInput, {
      target: {
        value:
          "testing testing. testing if the about input will update to this now",
      },
    });

    fireEvent.click(submitButton);

    // ------------------------ Unable to find loading state elements when mocking setTimeout ------------------------ //

    // const loadingSpinner = await findByLabelText("loading spinner");
    // expect(loadingSpinner).toBeVisible();

    await waitFor(() => expect(aboutInput).toHaveValue(""));
    await waitFor(() =>
      expect(getByRole("button", { name: /success/i })).toBeVisible()
    );

    expect(updateAboutMe).toHaveBeenCalledTimes(1);
    expect(updateAboutMe).toHaveBeenCalledWith(
      "testing testing. testing if the about input will update to this now"
    );
    expect(getAboutMe).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(setTimeout).toHaveBeenCalled();

    await waitFor(() =>
      expect(
        getByText(
          "testing testing. testing if the about input will update to this now"
        )
      ).toBeVisible()
    );

    await waitFor(() =>
      expect(getByRole("button", { name: /update/i })).toBeVisible()
    );
  });
});
