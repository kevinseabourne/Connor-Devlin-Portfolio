import React from "react";
import ContentPage from "../../components/common/contentPage";
import { render } from ".././test-utils";
import { waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  getAllCorporate,
  mockCorporateData,
} from "../.././pages/api/corporate";
import "@testing-library/jest-dom";

jest.mock("../.././pages/api/corporate");
jest.mock("next/link", () => ({ children }) => children);
jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);

// Cypress Test Coverage
// - it should show a video when clicking on each item and close it when clicking outside the container
// - it should show a video when clicking on each item and close it when you press the esc key
// - it should render all images,
// - it should render a play Icon for each video
// - it should navigate to the corporate pricing page after clicking the pricing button link

// ------------------------ Notes ------------------------ //
// I could not test the images, due to jsdom not loading images
// the image is hidden until onLoad is called and then the placeholder animates out
// jsdom does not load images in tests, so onLoad is never called, this could not be tested in jest

const { findByRole, findAllByAltText, getAllByTestId } = screen;

describe("Corporate Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should simulate a failed get request", async () => {
    const data = null;
    render(<ContentPage data={data} />);
    const errorMessage = await findByRole("alert");

    expect(errorMessage).toBeVisible();
  });

  it("should render a Corporate title above videos", async () => {
    getAllCorporate.mockResolvedValue({ mockCorporateData });
    render(<ContentPage data={mockCorporateData} />);

    const corporateTitle = await waitFor(() =>
      findByRole("heading", { name: /corporate/i })
    );

    expect(corporateTitle).toBeVisible();
  });

  it("should render company title in correct order", async () => {
    getAllCorporate.mockResolvedValue({ mockCorporateData });
    render(<ContentPage data={mockCorporateData} />);

    const renderedCorporateNames = screen
      .getAllByTitle("contentName")
      .map((item) => item.textContent);

    const fakeCorporateNames = mockCorporateData.map((item) => item.company);

    expect(renderedCorporateNames).toEqual(fakeCorporateNames);

    // chose a snapshot over map to cover the order in which it is rendered.
    expect(renderedCorporateNames).toMatchInlineSnapshot(`
      Array [
        "Company 1 Name Here",
        "Company 2 Name Here",
        "Company 3 Name Here",
      ]
    `);
  });

  it("should render a loading skeleton for each of the image and title elements", async () => {
    getAllCorporate.mockResolvedValue({ mockCorporateData });
    render(<ContentPage data={mockCorporateData} />);

    const allImageLoadingSkeletons = await waitFor(() =>
      getAllByTestId("image-video-loading-skeleton")
    );

    const allTextLoadingSkeletons = await waitFor(() =>
      getAllByTestId("text-loading-skeleton")
    );
    allImageLoadingSkeletons.map((imageLoadingSkeleton) =>
      expect(imageLoadingSkeleton).toBeInTheDocument()
    );
    allTextLoadingSkeletons.map((textLoadingSkeleton) =>
      expect(textLoadingSkeleton).toBeInTheDocument()
    );
  });

  it("should render a image for each video in correct order", async () => {
    getAllCorporate.mockResolvedValue({ mockCorporateData });
    render(<ContentPage data={mockCorporateData} />);

    // could not use findByAlt due to different alt values
    const corporateImages = await waitFor(() => getAllByTestId("photo"));
    const renderedCorporatePhotos = corporateImages.map((item) => item.src);
    const fakeCorporatePhotos = mockCorporateData.map(
      (item) => item.coverPhoto
    );

    expect(renderedCorporatePhotos).toEqual(fakeCorporatePhotos);
    // chose a snapshot over map to cover check the order in which it is rendered.
    expect(renderedCorporatePhotos).toMatchInlineSnapshot(`
      Array [
        "https://images.pexels.com/photos/5325104/pexels-photo-5325104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/5673492/pexels-photo-5673492.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "https://images.pexels.com/photos/5816297/pexels-photo-5816297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      ]
    `);
  });
});
