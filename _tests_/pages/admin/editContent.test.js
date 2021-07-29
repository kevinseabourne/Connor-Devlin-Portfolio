import AdminContent from "../../../components/adminContent";
import { render } from "../../test-utils";
import { waitFor, screen, fireEvent, act } from "@testing-library/react";
import { formatDate } from "react-day-picker/moment";
import {
  getAllWeddings,
  mockWeddingData,
  mockAdminWeddingData,
} from "../../../pages/api/weddings";
import {
  getAllCorporate,
  mockCorporateData,
} from "../../../pages/api/corporate";

jest.mock("../../../pages/api/weddings");
jest.mock("../../../pages/api/corporate");
jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);
jest.mock("use-sound", () =>
  jest.fn().mockImplementation(() => {
    const play = jest.fn();
    return [play];
  })
);

const {
  getByRole,
  getAllByLabelText,
  findByLabelText,
  getByLabelText,
  getAllByTestId,
  getByPlaceholderText,
  getAllByPlaceholderText,
  getByText,
} = screen;

// Cypress Test Coverage
// - After the last item in the array of images has loaded, all images should be visible
// - The first item on the grid should be selected by default on load
// - Clicking another item should change the selected item and change the form values

describe("Admin Edit Wedding Content", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers("legacy");
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("Should show a loading skeleton on each wedding item and once loaded show an image and data", async () => {
    getAllWeddings.mockResolvedValue(mockWeddingData);
    render(<AdminContent operation="Edit" />);

    const weddingsButton = getByRole("button", { name: /weddings/i });
    fireEvent.click(weddingsButton);

    // ------------------------ Loading ------------------------ //

    expect(setTimeout).toHaveBeenCalledTimes(1);

    const loadingSpinner = await findByLabelText("loading spinner");
    await expect(loadingSpinner).toBeVisible();
    expect(weddingsButton).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // ------------------------ Resolved ------------------------ //

    expect(weddingsButton).toBeVisible();

    const weddingImages = await waitFor(() => getAllByTestId("photo"));
    const weddingNames = await waitFor(() => getAllByTestId("fullName"));
    const weddingLocations = await waitFor(() => getAllByTestId("location"));
    const weddingDates = await waitFor(() => getAllByTestId("date"));

    const weddingTestimonials = await waitFor(() =>
      getAllByTestId("testimonial")
    );

    const renderedWeddingPhotos = weddingImages.map((item) => item.src);
    const renderedWeddingNames = weddingNames.map((names) => names.textContent);
    const renderedWeddingLocations = weddingLocations.map(
      (location) => location.textContent
    );

    const renderedWeddingDates = weddingDates.map((date) => date.textContent);
    const renderedWeddingTestimonials = weddingTestimonials.map(
      (testimonial) => testimonial.textContent
    );

    // ------------------------ Assertions ------------------------ //

    expect(renderedWeddingPhotos).toMatchInlineSnapshot(`
          Array [
            "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
            "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1649&q=80",
          ]
        `);

    expect(renderedWeddingNames).toMatchSnapshot(`
      Array [
        "Jamie Mason
       John Wayne",
        "Alex Johnson
       Chris Addams",
        "Rose Wood
       Ryan Davis",
      ]
    `);

    expect(renderedWeddingLocations).toMatchInlineSnapshot(`
      Array [
        "Fremantle, WA",
        "Albany, WA",
        "Perth, WA",
      ]
    `);

    expect(renderedWeddingDates).toMatchInlineSnapshot(`
      Array [
        "02/12/2018",
        "12/11/2015",
        "02/03/2020",
      ]
    `);

    expect(renderedWeddingTestimonials).toMatchInlineSnapshot(`
      Array [
        "Amazing wedding",
        "",
        "Memories to watch forever !",
      ]
    `);
  });

  it("Should show a loading skeleton on each corporate item and once loaded show an image and data", async () => {
    getAllCorporate.mockResolvedValue(mockCorporateData);
    render(<AdminContent operation="Edit" />);

    const corporateButton = getByRole("button", { name: /corporate/i });
    fireEvent.click(corporateButton);

    // ------------------------ Loading ------------------------ //

    expect(setTimeout).toHaveBeenCalledTimes(1);

    const loadingSpinner = await findByLabelText("loading spinner");
    await expect(loadingSpinner).toBeVisible();
    expect(corporateButton).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // ------------------------ Resolved ------------------------ //

    expect(corporateButton).toBeVisible();

    const corporateImages = await waitFor(() => getAllByTestId("photo"));
    const corporateNames = await waitFor(() => getAllByTestId("companyName"));
    const corporateDates = await waitFor(() => getAllByTestId("date"));
    const corporateDescriptions = await waitFor(() =>
      getAllByTestId("description")
    );

    const corporateTestimonials = await waitFor(() =>
      getAllByTestId("testimonial")
    );

    const renderedCorporatePhotos = corporateImages.map((item) => item.src);
    const renderedCorporateNames = corporateNames.map(
      (names) => names.textContent
    );
    const renderedCorporateDescriptions = corporateDescriptions.map(
      (description) => description.textContent
    );
    const renderedCorporateDates = corporateDates.map(
      (date) => date.textContent
    );
    const renderedCorporateTestimonials = corporateTestimonials.map(
      (testimonial) => testimonial.textContent
    );

    // ------------------------ Assertions ------------------------ //

    expect(renderedCorporatePhotos).toMatchInlineSnapshot(`
          Array [
            "https://images.pexels.com/photos/5325104/pexels-photo-5325104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "https://images.pexels.com/photos/5673492/pexels-photo-5673492.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "https://images.pexels.com/photos/5816297/pexels-photo-5816297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          ]
        `);

    expect(renderedCorporateNames).toMatchSnapshot(`
      Array [
        "Company 1 Name Here",
        "Company 2 Name Here",
        "Company 3 Name Here",
      ]
    `);

    expect(renderedCorporateDescriptions).toMatchInlineSnapshot(`
      Array [
        "description goes here 1",
        "description goes here 2",
        "description goes here 3",
      ]
    `);

    expect(renderedCorporateDates).toMatchInlineSnapshot(`
      Array [
        "21/11/2020",
        "01/11/2020",
        "06/01/2010",
      ]
    `);

    expect(renderedCorporateTestimonials).toMatchInlineSnapshot(`
      Array [
        "awesome work",
        "Looking forward to working with you again",
        "",
      ]
    `);
  });
});

describe("Admin Edit Content Delete", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("Should show the data values of the first corporate video by default in the form", async () => {
    getAllCorporate.mockResolvedValue(mockCorporateData);
    const { debug } = render(<AdminContent operation="Edit" />);

    const corporateButton = getByRole("button", { name: /corporate/i });
    fireEvent.click(corporateButton);

    // ------------------------ Loading ------------------------ //

    expect(setTimeout).toHaveBeenCalledTimes(1);

    const loadingSpinner = await findByLabelText("loading spinner");
    await expect(loadingSpinner).toBeVisible();
    expect(corporateButton).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // ------------------------ Resolved ------------------------ //

    expect(corporateButton).toBeVisible();

    const videoIdInput = getByRole("textbox", {
      name: /corporatevideoid\-input/i,
    });
    const companyInput = getByRole("textbox", {
      name: /company\-input/i,
    });
    const currentDate = `${formatDate(new Date(), "DD/MM/YYYY")}`;
    const dayPickerInput = getByPlaceholderText(currentDate);
    const testimonialInput = getByRole("textbox", {
      name: /corporatetestimonial\-input/i,
    });

    // ------------------------ Assertions ------------------------ //

    expect(videoIdInput).toHaveValue("3233232");
    expect(companyInput).toHaveValue("Company 1 Name Here");
    expect(dayPickerInput).toHaveValue("21/11/2020");
    expect(testimonialInput).toHaveValue("awesome work");

    const allItems = getAllByTestId("item");
    const mappedItems = allItems.map((item) => item);
    const secondItem = mappedItems[1];

    fireEvent.click(secondItem);

    // ------------------------ Form Data changes when you click on a different item ------------------------ //

    expect(videoIdInput).toHaveValue("3233639");
    expect(companyInput).toHaveValue("Company 2 Name Here");
    expect(dayPickerInput).toHaveValue("01/11/2020");
    expect(testimonialInput).toHaveValue(
      "Looking forward to working with you again"
    );
  });
});

describe("Admin Edit Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("Should show a loading skeleton on each wedding item and once loaded show an image and data", async () => {
    getAllWeddings.mockResolvedValue(mockWeddingData);
    render(<AdminContent operation="Edit" />);

    const weddingsButton = getByRole("button", { name: /weddings/i });
    fireEvent.click(weddingsButton);

    // ------------------------ Loading ------------------------ //

    expect(setTimeout).toHaveBeenCalledTimes(1);

    const loadingSpinner = await findByLabelText("loading spinner");
    await expect(loadingSpinner).toBeVisible();
    expect(weddingsButton).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // ------------------------ Resolved ------------------------ //

    expect(weddingsButton).toBeVisible();

    const videoIdInput = getByRole("textbox", {
      name: /weddingvideoid\-input/i,
    });
    const allAddPartnerButtons = getAllByLabelText("Add Partner");
    const allDeletePartnerButtons = getAllByLabelText("Delete Partner");
    const allFirstNameInput = getAllByPlaceholderText("First Name");
    const allLastNameInput = getAllByPlaceholderText("Last Name");

    const firstNameInputValues = allFirstNameInput.map(
      (firstName) => firstName.value
    );

    const lastNameInputValues = allLastNameInput.map(
      (lastName) => lastName.value
    );

    const suburbInput = getByRole("textbox", { name: /suburb\-input/i });
    const stateSelectInput = getByText("WA");
    const currentDate = `${formatDate(new Date(), "DD/MM/YYYY")}`;
    const dayPickerInput = getByPlaceholderText(currentDate);
    const testimonialInput = getByRole("textbox", {
      name: /testimonial\-input/i,
    });

    // ------------------------ Assertions ------------------------ //

    expect(videoIdInput).toHaveValue("3233232");
    expect(allAddPartnerButtons).toHaveLength(2);

    await waitFor(() =>
      expect(firstNameInputValues).toEqual(
        expect.arrayContaining(["Jamie", "John"])
      )
    );

    await waitFor(() =>
      expect(lastNameInputValues).toEqual(
        expect.arrayContaining(["Mason", "Wayne"])
      )
    );

    expect(allDeletePartnerButtons).toHaveLength(2);
    expect(suburbInput).toHaveValue("Fremantle");
    expect(stateSelectInput).toHaveTextContent("WA");
    expect(dayPickerInput).toHaveValue("02/12/2018");
    expect(testimonialInput).toHaveValue("Amazing wedding");

    const allItems = getAllByTestId("item");
    const mappedItems = allItems.map((item) => item);
    const secondItem = mappedItems[1];

    fireEvent.click(secondItem);

    // ------------------------ Form Data changes when you click on a different item ------------------------ //

    expect(videoIdInput).toHaveValue("3233183");
    expect(allAddPartnerButtons).toHaveLength(2);

    const secondItemsfirstNameInputValues = allFirstNameInput.map(
      (firstName) => firstName.value
    );

    const secondItemslastNameInputValues = allLastNameInput.map(
      (lastName) => lastName.value
    );

    await waitFor(() =>
      expect(secondItemsfirstNameInputValues).toEqual(
        expect.arrayContaining(["Alex", "Chris"])
      )
    );

    await waitFor(() =>
      expect(secondItemslastNameInputValues).toEqual(
        expect.arrayContaining(["Johnson", "Addams"])
      )
    );

    expect(allDeletePartnerButtons).toHaveLength(2);
    expect(suburbInput).toHaveValue("Albany");
    expect(stateSelectInput).toHaveTextContent("WA");
    expect(dayPickerInput).toHaveValue("12/11/2015");
    expect(testimonialInput).toHaveValue("");
  });

  it("Should show the data values of the first corporate video by default in the form", async () => {
    getAllCorporate.mockResolvedValue(mockCorporateData);
    const { debug } = render(<AdminContent operation="Edit" />);

    const corporateButton = getByRole("button", { name: /corporate/i });
    fireEvent.click(corporateButton);

    // ------------------------ Loading ------------------------ //

    expect(setTimeout).toHaveBeenCalledTimes(1);

    const loadingSpinner = await findByLabelText("loading spinner");
    await expect(loadingSpinner).toBeVisible();
    expect(corporateButton).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // ------------------------ Resolved ------------------------ //

    expect(corporateButton).toBeVisible();

    const videoIdInput = getByRole("textbox", {
      name: /corporatevideoid\-input/i,
    });
    const companyInput = getByRole("textbox", {
      name: /company\-input/i,
    });
    const currentDate = `${formatDate(new Date(), "DD/MM/YYYY")}`;
    const dayPickerInput = getByPlaceholderText(currentDate);
    const testimonialInput = getByRole("textbox", {
      name: /corporatetestimonial\-input/i,
    });

    // ------------------------ Assertions ------------------------ //

    expect(videoIdInput).toHaveValue("3233232");
    expect(companyInput).toHaveValue("Company 1 Name Here");
    expect(dayPickerInput).toHaveValue("21/11/2020");
    expect(testimonialInput).toHaveValue("awesome work");

    const allItems = getAllByTestId("item");
    const mappedItems = allItems.map((item) => item);
    const secondItem = mappedItems[1];

    fireEvent.click(secondItem);

    // ------------------------ Form Data changes when you click on a different item ------------------------ //

    expect(videoIdInput).toHaveValue("3233639");
    expect(companyInput).toHaveValue("Company 2 Name Here");
    expect(dayPickerInput).toHaveValue("01/11/2020");
    expect(testimonialInput).toHaveValue(
      "Looking forward to working with you again"
    );
  });
});
