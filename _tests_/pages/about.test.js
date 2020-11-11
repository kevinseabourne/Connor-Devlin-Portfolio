import React from "react";
import About from "../.././pages/about";
import { render } from ".././test-utils";
import { fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("About Page", () => {
  it("should render", () => {
    const { container } = render(<About />);

    expect(container).toBeVisible();
  });
});
