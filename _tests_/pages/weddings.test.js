import React from "react";
import Weddings from "../.././pages/weddings";
import { render } from ".././test-utils";
import { fireEvent, waitFor, act, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getAllWeddings, mockWeddingData } from "../.././pages/api/weddings";
import "@testing-library/jest-dom";
import cloneDeep from "lodash/cloneDeep";
import { handleWeddingNames } from "../../components/common/utils/handleWeddingName";

jest.mock("../.././pages/api/weddings");
jest.mock("lodash/cloneDeep", () =>
  jest.fn().mockImplementation(() => mockWeddingData)
);

cleanup();

describe("Weddings Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render partner names for each wedding in correct order", async () => {
    getAllWeddings.mockResolvedValue({ mockWeddingData });
    const { getAllByTestId } = render(<Weddings data={mockWeddingData} />);

    const renderedWeddingPartners = getAllByTestId("partnerNames").map(
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
    // chose a snapshot over map to cover the order in which it is rendered
    expect(renderedWeddingPhotos).toMatchInlineSnapshot(`
      Array [
        "https://i.vimeocdn.com/video/939711593_960x540.jpg?r=pad",
        "https://i.vimeocdn.com/video/939711593_960x540.jpg?r=pad",
        "https://i.vimeocdn.com/video/939711593_960x540.jpg?r=pad",
      ]
    `);
  });

  it("should render a play Icon for each wedding", async () => {
    getAllWeddings.mockResolvedValue({ mockWeddingData });
    const { getAllByTestId } = render(<Weddings data={mockWeddingData} />);

    // Chose to use map over a snapshot test because all the icons are the same so the order does not matter.
    const playIcons = await waitFor(() => getAllByTestId("imageIcon"));
    playIcons.map(async (icon) => await waitFor(() => icon.toBeVisible()));
  });

  it("should play a video after clicking on each wedding video", async () => {
    getAllWeddings.mockResolvedValue({ mockWeddingData });
    const { getAllByTestId, getByTestId } = render(
      <Weddings data={mockWeddingData} />
    );

    const weddingItems = await waitFor(() => getAllByTestId("item"));

    weddingItems.map(async (item) => {
      fireEvent.click(item);

      const videoOverlay = getByTestId("videoOverlay");
      const loadingSpinner = getByTestId("loadingSpinner");

      expect(videoOverlay).toBeVisible();
      expect(loadingSpinner).toBeVisible();

      const video = getByTestId("video");

      mockWeddingData.map((item) => expect(video.src).toEqual(item.video));
      expect(video).toBeVisible();
    });
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
