describe("Pricing Page", () => {
  it("should scroll to the contact section at the bottom of the page when you click on the contact button at the bottom of any pricing package", () => {
    cy.visit("/pricing/weddings");

    const pricingPackageContactButton = cy.findByTestId("contact-button-0");

    pricingPackageContactButton.scrollIntoView().wait(1000).click();

    const ContactForm = cy.findByRole("form", { name: /contact form/i });
    ContactForm.should("be.visible");
  });
});
