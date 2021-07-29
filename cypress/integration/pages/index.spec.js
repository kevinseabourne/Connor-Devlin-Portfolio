describe("Home Page Tests", () => {
  it("render the homepage", () => {
    cy.visit("/");
    cy.findByTestId("homePageContainer").should("be.visible");
  });
  it("should change to direct you to the about page when clicking on the read more button", () => {
    cy.visit("/");

    const readMoreButton = cy.findByRole("button", { name: /read more/i });
    readMoreButton.scrollIntoView().wait(1000).click();

    cy.url().should("include", "/about", { timeout: 60000 });
  });

  it("should direct you to the contact page when clicking on the contact button", () => {
    cy.visit("/");

    const readMoreButton = cy.findByRole("button", { name: /contact/i });
    readMoreButton.scrollIntoView().wait(1000).click();

    cy.url().should("include", "/contact", { timeout: 60000 });
  });
});
