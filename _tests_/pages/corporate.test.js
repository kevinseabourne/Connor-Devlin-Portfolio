import React from "react";
import Corporate from "../.././pages/corporate";
import { render } from ".././test-utils";
import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  getAllCorporate,
  mockCorporateData,
} from "../.././pages/api/corporate";
import "@testing-library/jest-dom";
import cloneDeep from "lodash/cloneDeep";

jest.mock("../.././pages/api/corporate");
jest.mock("lodash/cloneDeep", () =>
  jest.fn().mockImplementation(() => mockCorporateData)
);

describe("Corporate Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render a Corporate title above videos", async () => {
    getAllCorporate.mockResolvedValue({ mockCorporateData });
    const { findByRole } = render(<Corporate data={mockCorporateData} />);

    const corporateTitle = await waitFor(() =>
      findByRole("heading", { name: /corporate/i })
    );
    expect(corporateTitle).toBeVisible();
  });
  it("should render partner names for each wedding in correct order", async () => {
    getAllCorporate.mockResolvedValue({ mockCorporateData });
    const { getAllByTitle } = render(<Corporate data={mockCorporateData} />);

    const renderedCorporateNames = getAllByTitle("contentName").map(
      (item) => item.textContent
    );

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

  it("should render a image for each wedding in correct order", async () => {
    getAllCorporate.mockResolvedValue({ mockCorporateData });
    const { getAllByTestId } = render(<Corporate data={mockCorporateData} />);

    const corporateImages = await waitFor(() => getAllByTestId("weddingPhoto"));
    const renderedCorporatePhotos = corporateImages.map((item) => item.src);
    const fakeCorporatePhotos = mockCorporateData.map(
      (item) => item.coverPhoto
    );

    expect(renderedCorporatePhotos).toEqual(fakeCorporatePhotos);
    // chose a snapshot over map to cover check the order in which it is rendered.
    expect(renderedCorporatePhotos).toMatchInlineSnapshot(`
      Array [
        "https://i.vimeocdn.com/video/944223589_960x540.jpg?r=pad",
        "https://i.vimeocdn.com/video/944223589_960x540.jpg?r=pad",
        "https://i.vimeocdn.com/video/944223589_960x540.jpg?r=pad",
      ]
    `);
  });

  it("should render a play Icon for each wedding video", async () => {
    getAllCorporate.mockResolvedValue({ mockCorporateData });
    const { getAllByTestId, debug } = render(
      <Corporate data={mockCorporateData} />
    );

    // Chose to use map over a snapshot test because all the icons are the same, so the order does not matter.
    const playIcons = await waitFor(() => getAllByTestId("imageIcon"));
    playIcons.map(async (icon) => await waitFor(() => icon.toBeVisible()));
  });

  it("should render three clients images", async () => {
    getAllCorporate.mockResolvedValue({ mockCorporateData });
    const { getByAltText } = render(<Corporate data={mockCorporateData} />);

    const tlgImage = await waitFor(() => getByAltText("teach learn grow"));
    const ecuImage = await waitFor(() =>
      getByAltText("edith cowan university")
    );
    const kalamundaImage = await waitFor(() =>
      getByAltText("city of kalamunda")
    );

    expect(tlgImage).toBeVisible();
    expect(ecuImage).toBeVisible();
    expect(kalamundaImage).toBeVisible();
  });

  it("should simulate a failed get request", async () => {
    getAllCorporate.mockImplementation(() =>
      Promise.reject("error").catch((error) => {
        expect(error).toEqual("error");
      })
    );
    const data = null;
    const { getByRole } = render(<Corporate data={data} />);
    const errorMessage = await waitFor(() => getByRole("alert"));

    await waitFor(() => expect(errorMessage).toBeVisible());
  });
});
