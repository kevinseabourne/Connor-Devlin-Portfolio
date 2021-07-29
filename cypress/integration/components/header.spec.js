describe("Header Tests", () => {
  const links = [
    {
      linkTitle: "About",
      expected: "about",
    },
    {
      linkTitle: "Weddings",
      expected: "weddings",
    },
    {
      linkTitle: "Corporate",
      expected: "corporate",
    },
    {
      linkTitle: "Pricing",
      expected: "pricing",
    },
    {
      linkTitle: "Contact",
      expected: "contact",
    },
  ];

  links.forEach(({ linkTitle, expected }) => {
    it(`should direct you to the ${expected} page when clicking on the ${linkTitle} link`, () => {
      cy.viewport(1280, 720);
      cy.visit("/");

      const link = cy.findByText(linkTitle);
      link.click();

      cy.url().should("include", `/${expected}`, { timeout: 10000 });
    });
  });

  it("should direct you to the homepage when clicking on the logo", () => {
    cy.viewport(1280, 720);
    cy.visit("/about");

    const logo = cy.findByRole("link", { name: /logo/i });
    logo.click();

    cy.url().should("include", "/", { timeout: 60000 });
  });
});
