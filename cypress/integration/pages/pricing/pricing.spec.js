describe("Pricing Page", () => {
  it("should direct you to the weddings pricing package when clicking the associtated button", () => {
    cy.visit("/pricing");

    const weddingsPricingButton = cy.findByRole("link", {
      name: /weddings weddings/i,
    });
    weddingsPricingButton.wait(1000).click();

    cy.wait(4000).url().should("include", "/pricing/weddings");
  });

  it("should direct you to the corporate pricing package when clicking the associtated button", () => {
    cy.visit("/pricing");

    const corporatePricingButton = cy.findByRole("link", {
      name: /corporate/i,
    });

    corporatePricingButton.scrollIntoView().wait(1000).click();

    cy.wait(4000).url().should("include", "/pricing/corporate");
  });
});
