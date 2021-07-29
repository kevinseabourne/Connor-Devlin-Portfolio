describe("Corporate pricing Page", () => {
  // test coverage for this page is done in jest
  it("should render an contact form", () => {
    cy.visit("/pricing/corporate");

    const contactForm = cy.findByLabelText("contact form");

    contactForm.should("be.visible");
  });
});
