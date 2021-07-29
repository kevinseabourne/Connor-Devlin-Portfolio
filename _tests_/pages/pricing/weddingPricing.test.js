import WeddingPricing from "../../../components/weddingPricing";
import { render } from "../../test-utils";
import { mockData } from "../../.././pages/api/__mocks__/weddingPricingPackages";
import { waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("next/link", () => ({ children }) => children);
jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);

// ------------------------ Notes ------------------------ //
// Contact form has been tested in another test, Just tested that it was rendered and visible

const { getAllByTestId, getByText, getByRole } = screen;

describe("wedding Pricing Page", () => {
  it("should render packages in order from lowest price to highest price", () => {
    render(<WeddingPricing data={mockData} />);

    const allPackageNames = getAllByTestId("package name").map(
      (item) => item.textContent
    );
    const allPackagePrices = getAllByTestId("package price").map(
      (item) => item.textContent
    );

    const allPackageDescription = getAllByTestId("package description").map(
      (item) => item.textContent
    );

    const allPackageDetails = getAllByTestId("package details").map(
      (item) => item.textContent
    );

    const fakePackageNamesData = mockData[0].map((pack) => pack.packageName);
    const fakePackagePricesData = mockData[0].map((pack) => {
      pack.price = `$${pack.price}`;
      return pack.price;
    });

    const fakePackageDescriptionsData = mockData[0].map(
      (pack) => pack.description
    );

    expect(allPackageNames).toEqual(fakePackageNamesData);
    expect(allPackagePrices).toEqual(fakePackagePricesData);
    expect(allPackageDescription).toEqual(fakePackageDescriptionsData);
    // I did not check packageDetails data from jsdom matched that from the fake data due to the way the data from jsdom was bunched together. It would have involved some weird data maniplation to match it.

    // chose a snapshot over map to cover the order in which it is rendered.
    expect(allPackageNames).toMatchInlineSnapshot(`
Array [
  "Standard",
  "Deluxe",
]
`);

    expect(allPackagePrices).toMatchInlineSnapshot(`
Array [
  "$900",
  "$1500",
]
`);

    expect(allPackageDescription).toMatchInlineSnapshot(`
Array [
  "Shorter way to capture your day. The best moments, with a cheaper price",
  "Nothing but the best coverage of the entire day",
]
`);

    expect(allPackageDetails).toMatchInlineSnapshot(`
Array [
  "One VideographerUp to 4 hours of coverageHighlights Video (4mins)Recieve a USB drive with all video footage of the dayPre-wedding consultation with videographer",
  "Two VideographerFull day of coverageHighlights Video (10mins)Recieve a USB drive with all video footage of the dayPre-wedding consultation with videographer",
]
`);
  });

  it("should render pricing add ons for weddings", () => {
    render(<WeddingPricing data={mockData} />);

    const allPackageNames = getAllByTestId("package name").map(
      (item) => item.textContent
    );

    const fakePackageNamesData = mockData[0].map((pack) => pack.packageName);

    expect(allPackageNames).toEqual(fakePackageNamesData);

    // chose a snapshot over map to cover the order in which it is rendered.
    expect(allPackageNames).toMatchInlineSnapshot(`
Array [
  "Standard",
  "Deluxe",
]
`);
  });

  test.each([
    [
      {
        question:
          "If I choose the standard package what parts of the wedding can be part of the coverage ?",
        answer:
          "we can cover any part of the wedding from pre ceremony to reception.",
      },
      {
        question: "What is the highlights video ?",
        answer:
          "All the best moments from your wedding day edited together beautifully in your very own personalised wedding movie.",
      },
      {
        question: "How long will the highlights video take for me to recieve ?",
        answer:
          "Depending on the length of the video it can take a couple of week to at most 2 - 3 months. Don't worry you will be given an estimated time of arrival.",
      },
      {
        question: "How do I book a package ?",
        answer:
          "Contact me in the form below, select the package you will like and I will be in touch with you.",
      },
      {
        question:
          "I need a last minute wedding videographer is there any point in getting in touch with you ? and do you charger extra for last minute bookings ?",
        answer:
          "I am usually booked in advance but feel free to contact me. Rest assured, There's absolutely no extra cost for last minute bookings.",
      },
      {
        question: "Do you travel to regional Australia or overseas ?",
        answer: "Absolutely! I can travel anywhere over Australia or overseas",
      },
    ],
  ])(
    "should render six questions and answers in the FAQ section",
    ({ question, answer }) => {
      render(<WeddingPricing data={mockData} />);

      const questionElement = getByText(question);
      const answerElement = getByText(answer);

      expect(questionElement).toBeVisible();
      expect(answerElement).toBeVisible();
    }
  );

  it("should render contact form", () => {
    render(<WeddingPricing data={mockData} />);

    const contactForm = getByRole("form", { name: /contact form/i });

    expect(contactForm).toBeVisible();
  });
});
