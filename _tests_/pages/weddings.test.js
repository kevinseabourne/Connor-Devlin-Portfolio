import React from "react";
import Weddings from "../.././pages/weddings";
import { render } from ".././test-utils";
import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getAllWeddings, mockWeddingData } from "../.././pages/api/weddings";
import "@testing-library/jest-dom";
import cloneDeep from "lodash/cloneDeep";
import { handleWeddingNames } from "../../components/common/utils/handleWeddingName";

jest.mock("../.././pages/api/weddings");
jest.mock("lodash/cloneDeep", () =>
  jest.fn().mockImplementation(() => mockWeddingData)
);

describe("Weddings Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render a Weddings title above videos", async () => {
    getAllWeddings.mockResolvedValue({ mockWeddingData });
    const { findByRole } = render(<Weddings data={mockWeddingData} />);

    const weddingTitle = await waitFor(() =>
      findByRole("heading", { name: /weddings/i })
    );
    expect(weddingTitle).toBeVisible();
  });
  it("should render partner names for each wedding in correct order", async () => {
    getAllWeddings.mockResolvedValue({ mockWeddingData });
    const { getAllByTitle } = render(<Weddings data={mockWeddingData} />);

    const renderedWeddingPartners = getAllByTitle("contentName").map(
      (item) => item.textContent
    );

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

  it("should render a image for each wedding in correct order", async () => {
    getAllWeddings.mockResolvedValue({ mockWeddingData });
    const { getAllByTestId } = render(<Weddings data={mockWeddingData} />);

    const weddingImages = await waitFor(() => getAllByTestId("weddingPhoto"));
    const renderedWeddingPhotos = weddingImages.map((item) => item.src);
    const fakeWeddingPhotos = mockWeddingData.map((item) => item.coverPhoto);

    expect(renderedWeddingPhotos).toEqual(fakeWeddingPhotos);
    // chose a snapshot over map to cover check the order in which it is rendered.
    expect(renderedWeddingPhotos).toMatchInlineSnapshot(`
      Array [
        "https://i.vimeocdn.com/video/939711593_960x540.jpg?r=pad",
        "https://i.vimeocdn.com/video/939711593_960x540.jpg?r=pad",
        "https://i.vimeocdn.com/video/939711593_960x540.jpg?r=pad",
      ]
    `);
  });

  it("should render a play Icon for each wedding video", async () => {
    getAllWeddings.mockResolvedValue({ mockWeddingData });
    const { getAllByTestId } = render(<Weddings data={mockWeddingData} />);

    // Chose to use map over a snapshot test because all the icons are the same, so the order does not matter.
    const playIcons = await waitFor(() => getAllByTestId("imageIcon"));
    playIcons.map(async (icon) => await waitFor(() => icon.toBeVisible()));
  });

  it("should render the a testimonial and the partners names from the first item in the data", () => {
    getAllWeddings.mockResolvedValue({ mockWeddingData });
    const { getByText, getByTestId } = render(
      <Weddings data={mockWeddingData} />
    );

    const testimonialPartnersNames = getByTestId("testimonialPartners");
    const testimonial = getByText("Amazing wedding");

    expect(testimonialPartnersNames).toBeVisible();
    expect(testimonial).toBeVisible();
    expect(testimonialPartnersNames.textContent).toEqual(
      mockWeddingData[0].displayNames
    );
    expect(testimonial.textContent).toEqual(mockWeddingData[0].testimonial);
  });

  it("should simulate a failed get request", async () => {
    getAllWeddings.mockImplementation(() =>
      Promise.reject("error").catch((error) => {
        expect(error).toEqual("error");
      })
    );
    const data = null;
    const { getByRole } = render(<Weddings data={data} />);
    const errorMessage = await waitFor(() => getByRole("alert"));

    await waitFor(() => expect(errorMessage).toBeVisible());
  });
});
