describe("Corporate Page Tests", () => {
  it("should show a video when clicking on each item and close it when clicking outside the container", () => {
    cy.visit("/corporate");

    cy.get(".item").each((item) => {
      cy.wrap(item).scrollIntoView().wait(500).click();

      cy.findByTestId("videoOverlay").should("be.visible");
      cy.findByTestId("loadingSpinner").should("be.visible");

      cy.findByTestId("video").should("be.visible");

      cy.findByTestId("videoOverlay").wait(500).click("left");

      cy.findByTestId("videoOverlay").should("not.be.visible");
    });
  });

  it("should show a video when clicking on each item and close it when you press the esc key", () => {
    cy.visit("/corporate");

    cy.get(".item").each((item) => {
      cy.wrap(item).scrollIntoView().wait(500).click();

      cy.findByTestId("videoOverlay").should("be.visible");
      cy.findByTestId("loadingSpinner").should("be.visible");

      cy.findByTestId("video").should("be.visible");

      cy.get("body").type("{esc}");

      cy.findByTestId("videoOverlay").should("not.be.visible");
    });
  });

  it("should navigate to the corporate pricing page after clicking the pricing button", () => {
    cy.visit("/corporate");

    const pricingLink = cy.findByRole("button", { name: /pricing/i });
    pricingLink.scrollIntoView().wait(1000).click();

    cy.url().should("include", "/pricing/corporate");
  });
});
