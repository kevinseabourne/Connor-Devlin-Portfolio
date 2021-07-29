describe("Burger Menu Tests", () => {
  it("should open and close the burger menu when clicking on the burgerBar", () => {
    cy.viewport("iphone-x");
    cy.visit("/");

    const burgerBar = cy.findByLabelText("menu");
    burgerBar.click();

    const burgerMenu = cy.findByRole("navigation", { name: /burger menu/i });
    burgerMenu.should("be.visible");

    burgerBar.click();

    burgerMenu.should("not.be.visible");
  });

  it("should close the burger menu when clicking outside the burger menu", () => {
    cy.viewport("iphone-x");
    cy.visit("/");

    const burgerBar = cy.findByLabelText("menu");
    burgerBar.click().wait(2000);

    const burgerMenu = cy.findByRole("navigation", { name: /burger menu/i });
    burgerMenu.should("be.visible");

    const overlay = cy.findByRole("dialog", { name: /overlay/i });
    overlay.click();

    burgerMenu.should("not.be.visible");
  });

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
      cy.viewport("iphone-x");
      cy.visit("/");

      const burgerBar = cy.findByLabelText("menu");
      burgerBar.click().wait(2000);

      const burgerMenu = cy.findByRole("navigation", { name: /burger menu/i });
      burgerMenu.should("be.visible");

      const link = cy.findByText(linkTitle);
      link.click();

      burgerMenu.should("not.be.visible");
      cy.url().should("include", `/${expected}`, { timeout: 10000 });
    });
  });

  const adminLinks = [
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
      linkTitle: "Add Pricing",
      expected: "add-pricing",
    },
    {
      linkTitle: "Edit Pricing",
      expected: "edit-pricing",
    },
    {
      linkTitle: "Add Content",
      expected: "add-content",
    },
    {
      linkTitle: "Edit Content",
      expected: "edit-content",
    },
  ];

  adminLinks.forEach(({ linkTitle, expected }) => {
    it(`should direct you to the ${expected} page when clicking on the ${linkTitle} link`, () => {
      cy.server();
      cy.route({
        method: "POST",
        status: 200,
        url:
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDioFomRCLacilWAauy0sAgJ37k3tfc2Cg",
        response: {
          displayName: "",
          email: "test@email.com",
          expiresIn: "3600",
          idToken:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjb25ub3ItZGV2bGluLXBvcnRmb2xpbyIsImF1dGhfdGltZSI6MTYxNDA2NDQ5MCwidXNlcl9pZCI6IndlZndlZyIsImlhdCI6MTYxNDA2NDQ5MCwiZXhwIjoxNjE0MDY4NTY1LCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAZW1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifSwianRpIjoiZjg4MDBmNjYtOTU1My00ZWMwLTkxMTUtZTRjYTFiNmQzNzBjIn0.eXPyN8Z6bdfpBtQbXVB2yCDLrYrRVOhHflWxYQ9QKf0",
          kind: "identitytoolkit#VerifyPasswordResponse",
          localId: "V4dGl7r2sIZBhrOh2TeNBuvdw3k1asd",
          refreshToken: "fwfwefwefqw",
          registered: true,
        },
        delay: 500,
      });
      cy.viewport("iphone-x");
      cy.visit("/login");
      const emailInput = cy.findByPlaceholderText("Email");
      const passwordInput = cy.findByPlaceholderText("Password");
      const loginButton = cy.findByRole("button", { name: /send/i });

      emailInput.type(Cypress.env("email")).wait(1000);
      passwordInput.type(Cypress.env("password"), { log: false }).wait(1000);

      loginButton.click().wait(2000);

      const burgerBar = cy.findByLabelText("menu");
      burgerBar.click().wait(2000);

      const burgerMenu = cy.findByRole("navigation", { name: /burger menu/i });
      burgerMenu.should("be.visible");

      const link = cy.findByLabelText(`admin - ${linkTitle}`);
      link.scrollIntoView().wait(1000).click().wait(3000);

      burgerMenu.should("not.be.visible");
      cy.url().should("include", `/admin/${expected}`, { timeout: 10000 });
    });
  });
});
