import { waitFor, screen, fireEvent } from "@testing-library/react";
import {
  updatePricingPackage,
  getAllPricingPackages,
  getAddOns,
  updateAddOns,
} from "../../../pages/api/pricing";
import { render } from "../../test-utils";
import AdminPricing from "../../../components/common/adminPricing";
jest.mock("../../../pages/api/pricing");
jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);
jest.mock("use-sound", () =>
  jest.fn().mockImplementation(() => {
    const play = jest.fn();
    return [play];
  })
);

const { findByRole, getByRole, findByText, findByLabelText } = screen;

const fakePricingPackageData = [
  {
    description:
      "Shorter way to capture your day. The best moments, with a cheaper price",
    id: "5CNTXZXqjuVxQSumF0zQ",
    packageDetails: [
      "One Videographer",
      "Up to 4 hours of coverage",
      "Highlights Video (4mins)",
      "Recieve a USB drive with all video footage of the day",
      "Pre-wedding consultation with videographer",
    ],
    packageName: "Standard",
    price: "900",
  },
  {
    description: "Nothing but the best coverage of the entire day",
    id: "4KNTXZXqjuVxQSumF0zV",
    packageDetails: [
      "Two Videographer",
      "Full day of coverage",
      "Highlights Video (10mins)",
      "Recieve a USB drive with all video footage of the day",
      "Pre-wedding consultation with videographer",
    ],
    packageName: "Deluxe",
    price: "1500",
  },
];

const updatedPricingPackagesData = [
  {
    description:
      "Shorter way to capture your day. The best moments, with a cheaper price",
    id: "5CNTXZXqjuVxQSumF0zQ",
    packageDetails: [
      "One Videographer",
      "Up to 4 hours of coverage",
      "Highlights Video (4mins)",
      "Recieve a USB drive with all video footage of the day",
      "Pre-wedding consultation with videographer",
    ],
    packageName: "Standard",
    price: "900",
  },
  {
    description: "package description",
    id: "1ANTXZXqjuVxQSumF0zP",
    packageDetails: [
      "Two Videographer",
      "Full day of coverage",
      "Highlights Video (10mins)",
      "Recieve a USB drive with all video footage of the day",
      "Pre-wedding consultation with videographer",
    ],
    packageName: "VIP",
    price: "2000",
  },
];

describe("Edit Pricing Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers("legacy");
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  it("should render a error message when the http request fails via getAboutMe", async () => {
    updatePricingPackage.mockImplementation(() =>
      Promise.resolve({
        data: {},
        status: 200,
      })
    );

    getAllPricingPackages.mockResolvedValue(fakePricingPackageData);

    render(<AdminPricing operation="Edit" />);

    const packagesButton = getByRole("button", { name: /packages/i });
    fireEvent.click(packagesButton);

    const loadingSpinner = await findByLabelText("loading spinner");

    const titleInput = await findByRole("textbox", {
      name: /packagename\-input/i,
    });
    const priceInput = await findByRole("textbox", { name: /price\-input/i });
    const descriptionInput = await findByRole("textbox", {
      name: /description\-input/i,
    });

    fireEvent.change(titleInput, {
      target: {
        value: "VIP",
      },
    });

    fireEvent.change(priceInput, {
      target: {
        value: 2000,
      },
    });

    fireEvent.change(descriptionInput, {
      target: {
        value: "package description",
      },
    });

    getAllPricingPackages.mockResolvedValue(updatedPricingPackagesData);

    const submitButton = getByRole("button", { name: /update/i });
    fireEvent.click(submitButton);

    expect(submitButton).toHaveValue("");

    expect(submitButton).toHaveValue("Success");

    expect(titleInput).toHaveValue("VIP");
    expect(priceInput).toHaveValue("2000");
    expect(descriptionInput).toHaveValue("package description");

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);

    expect(submitButton).toHaveValue("update");
  });
});
