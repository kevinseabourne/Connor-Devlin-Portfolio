import React from "react";
import Weddings from "../.././pages/weddings";
import ContentPage from "../../components/common/contentPage";
import { render } from ".././test-utils";
import { waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getAllWeddings, mockWeddingData } from "../.././pages/api/weddings";
import "@testing-library/jest-dom";
import { handleWeddingNames } from "../../components/common/utils/handleWeddingName";

jest.mock("../.././pages/api/weddings");
jest.mock("next/link", () => ({ children }) => children);
jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);

// Cypress Test Coverage
// - it should show a video when clicking on each item and close it when clicking outside the container
// - it should show a video when clicking on each item and close it when you press the esc key
// -  it should render all images
// - it should render a play Icon for each video
// - it should navigate to the weddings pricing page after clicking the pricing button link

describe("Weddings Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should simulate a failed get request", async () => {
    render(<ContentPage data={{ data: null }} />);
    const errorMessage = await screen.findByRole("alert");

    expect(errorMessage).toBeVisible();
  });

  it("should render a Weddings title above videos", async () => {
    getAllWeddings.mockResolvedValue({ mockWeddingData });
    render(<Weddings data={mockWeddingData} />);

    const weddingTitle = await waitFor(() =>
      screen.findByRole("heading", { name: /weddings/i })
    );
    expect(weddingTitle).toBeVisible();
  });
  it("should render partner names for each wedding in correct order", async () => {
    getAllWeddings.mockResolvedValue({ mockWeddingData });
    render(<Weddings data={mockWeddingData} />);

    const renderedWeddingPartners = screen
      .getAllByTitle("contentName")
      .map((item) => item.textContent);

    const updatedFakeWeddingPartners = handleWeddingNames(mockWeddingData);
    const fakeWeddingPartners = updatedFakeWeddingPartners.map(
      (item) => item.displayNames
    );

    expect(renderedWeddingPartners).toEqual(fakeWeddingPartners);
    // chose a snapshot over map to cover the order in which it is rendered.
    expect(renderedWeddingPartners).toMatchInlineSnapshot(`
      Array [
        "Jamie & John",
        "Alex & Chris",
        "Rose & Ryan",
      ]
    `);
  });

  it("should render a loading skeleton for each of the image and title elements", async () => {
    getAllWeddings.mockResolvedValue({ mockWeddingData });
    render(<Weddings data={mockWeddingData} />);

    const allImageLoadingSkeletons = await waitFor(() =>
      screen.getAllByTestId("image-video-loading-skeleton")
    );

    const allTextLoadingSkeletons = await waitFor(() =>
      screen.getAllByTestId("text-loading-skeleton")
    );
    allImageLoadingSkeletons.map(
      async (imageLoadingSkeleton) =>
        await waitFor(() => expect(imageLoadingSkeleton).toBeVisible())
    );
    allTextLoadingSkeletons.map(
      async (textLoadingSkeleton) =>
        await waitFor(() => expect(textLoadingSkeleton).toBeVisible())
    );
  });

  it("should render a image for each wedding in correct order", async () => {
    getAllWeddings.mockResolvedValue({ mockWeddingData });
    render(<Weddings data={mockWeddingData} />);

    const weddingImages = await waitFor(() => screen.getAllByTestId("photo"));
    const renderedWeddingPhotos = weddingImages.map((item) => item.src);
    const fakeWeddingPhotos = mockWeddingData.map((item) => item.coverPhoto);

    expect(renderedWeddingPhotos).toEqual(fakeWeddingPhotos);
    // chose a snapshot over map to cover check the order in which it is rendered.
    expect(renderedWeddingPhotos).toMatchInlineSnapshot(`
      Array [
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1649&q=80",
      ]
    `);
  });

  it("should render a testimonial and the partners names from an item that has a testimonial", () => {
    getAllWeddings.mockResolvedValue({ mockWeddingData });
    render(<Weddings data={mockWeddingData} />);

    const testimonial = screen.getByText("Amazing wedding");
    const partnersNames = screen.getByTestId("testimonialPartners");

    expect(partnersNames).toBeVisible();
    expect(testimonial).toBeVisible();
  });
});
