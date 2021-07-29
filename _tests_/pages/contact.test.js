import { render } from ".././test-utils";
import ContactForm from "../../components/common/contactForm";
import Contact from "../../pages/contact";
import { waitFor, screen, fireEvent, act } from "@testing-library/react";
import selectEvent from "react-select-event";
import "@testing-library/jest-dom";
import { sendEmail } from "../../pages/api/email";
import { mockData } from "../.././pages/api/__mocks__/contactMockData";
import { formatDate } from "react-day-picker/moment";

jest.mock("../../pages/api/email");
jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);

describe("Successful Email", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should show an error message for a failed http request", async () => {
    const { findByRole } = screen;
    const data = null;
    render(<Contact data={data} />);

    const errorMessage = await findByRole("alert");

    expect(errorMessage).toBeVisible();
  });

  it("should show an error message on each input for failing validation requirments", async () => {
    const {
      getByRole,
      getByText,
      getByPlaceholderText,
      getByLabelText,
      findByText,
    } = screen;
    render(<ContactForm data={mockData} />);
    const currentDate = `${formatDate(new Date(), "DD/MM/YYYY")}`;

    const nameInput = getByRole("textbox", { name: /name\-input/i });
    const emailInput = getByRole("textbox", { name: /email\-input/i });
    const dayPickerInput = getByPlaceholderText(currentDate);
    const selectInput = getByText("Select...");
    const enquiryInput = getByRole("textbox", { name: /enquiry\-input/i });
    const sendButton = getByLabelText("submit button");

    fireEvent.change(nameInput, { target: { value: "1234" } });
    fireEvent.change(emailInput, { target: { value: "test@hotmail" } });
    fireEvent.change(enquiryInput, { target: { value: "" } });
    fireEvent.click(sendButton);

    const nameInputErrorMessage = await findByText("Letters only !");
    const emailInputErrorMessage = await findByText(
      "A valid email is required !"
    );
    const dayPickerInputErrorMessage = await findByText("A date is required !");
    const selectInputErrorMessage = await findByText("select a topic !");
    const enquiryInputErrorMessage = await findByText(
      "A message is required !"
    );

    // ------------------------ Assertions ------------------------ //

    await waitFor(() => expect(nameInputErrorMessage).toBeVisible());
    await waitFor(() => expect(emailInputErrorMessage).toBeVisible());
    await waitFor(() => expect(dayPickerInputErrorMessage).toBeVisible());
    await waitFor(() => expect(selectInputErrorMessage).toBeVisible());
    await waitFor(() => expect(enquiryInputErrorMessage).toBeVisible());

    expect(nameInput).toHaveValue("1234");
    expect(emailInput).toHaveValue("test@hotmail");
    expect(selectInput).toHaveTextContent("Select...");
    expect(dayPickerInput).toHaveValue("");
    expect(enquiryInput).toHaveValue("");

    expect(sendButton).toHaveTextContent("Send");
  });

  it("should show an error message on a failed http request even when meeting validation", async () => {
    sendEmail.mockImplementation(() =>
      Promise.reject("Async error").catch((error) => {
        expect(error).toEqual("Async error");
      })
    );
    const {
      getByRole,
      getByText,
      getByPlaceholderText,
      getByLabelText,
      findByLabelText,
      findByText,
      findByRole,
    } = screen;

    render(<ContactForm data={mockData} />);
    const currentDate = `${formatDate(new Date(), "DD/MM/YYYY")}`;

    const nameInput = getByRole("textbox", { name: /name\-input/i });
    const emailInput = getByRole("textbox", { name: /email\-input/i });
    const dayPickerInput = getByPlaceholderText(currentDate);
    const selectInput = getByText("Select...");
    const enquiryInput = getByRole("textbox", { name: /enquiry\-input/i });
    const sendButton = getByLabelText("submit button");

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "test@hotmail.com" } });
    fireEvent.change(dayPickerInput, { target: { value: "01/01/2021" } });
    selectEvent.select(selectInput);
    fireEvent.click(await findByText("Standard Package"));
    fireEvent.change(enquiryInput, { target: { value: "message" } });
    fireEvent.click(sendButton);

    const loadingSpinner = await findByLabelText("loading spinner");
    const errorMessage = await findByRole("alert");

    // ------------------------ Assertions ------------------------ //

    // expect(loadingSpinner).toBeVisible();
    await waitFor(() => expect(sendButton).toHaveTextContent(""));
    expect(errorMessage).toBeVisible();

    // ------------------------ Function Called ------------------------ //

    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith({
      name: "name",
      email: "test@hotmail.com",
      dayPicker: new Date("01-01-2021"),
      topic: { label: "Standard Package", value: "Standard Package" },
      enquiry: "message",
    });
  });
});

describe("Successful Email", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers("legacy");
  });

  it("should clear the inputs if the response is successful with status 200", async () => {
    sendEmail.mockImplementation(() =>
      Promise.resolve({ data: {}, status: 200 })
    );
    const {
      getByRole,
      getByText,
      getByPlaceholderText,
      getByLabelText,
      findByText,
    } = screen;

    render(<ContactForm data={mockData} />);
    const currentDate = `${formatDate(new Date(), "DD/MM/YYYY")}`;

    const nameInput = getByRole("textbox", { name: /name\-input/i });
    const emailInput = getByRole("textbox", { name: /email\-input/i });
    const dayPickerInput = getByPlaceholderText(currentDate);
    const selectInput = getByText("Select...");
    const enquiryInput = getByRole("textbox", { name: /enquiry\-input/i });
    const sendButton = getByLabelText("submit button");

    fireEvent.change(nameInput, { target: { value: "name" } });
    fireEvent.change(emailInput, { target: { value: "test@hotmail.com" } });
    fireEvent.change(dayPickerInput, { target: { value: "01/01/2021" } });
    selectEvent.select(selectInput);
    fireEvent.click(await findByText("Standard Package"));
    fireEvent.change(enquiryInput, { target: { value: "message" } });
    fireEvent.click(sendButton);

    // ------------------------ Assertions ------------------------ //

    await waitFor(() => expect(sendButton).toHaveTextContent(""));

    // const loadingSpinner = await findByLabelText("loading spinner");
    // expect(loadingSpinner).toBeVisible();

    await waitFor(() => expect(nameInput).toHaveValue(""));
    await waitFor(() => expect(emailInput).toHaveValue(""));
    await waitFor(() => expect(selectInput).toHaveTextContent("Select..."));
    await waitFor(() => expect(dayPickerInput).toHaveValue(""));
    await waitFor(() => expect(enquiryInput).toHaveValue(""));
    //
    await waitFor(() => expect(sendButton).toHaveTextContent("Success"));

    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith({
      name: "name",
      email: "test@hotmail.com",
      dayPicker: new Date("01-01-2021"),
      topic: { label: "Standard Package", value: "Standard Package" },
      enquiry: "message",
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(setTimeout).toHaveBeenCalled();

    await waitFor(() => expect(sendButton).toHaveTextContent("Send"));
  });
});
