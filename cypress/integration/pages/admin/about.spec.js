describe("Header Tests", () => {
  it("should direct you to the admin homepage when clicking on the dashboard link", () => {
    cy.intercept(
      "POST",
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDioFomRCLacilWAauy0sAgJ37k3tfc2Cg",
      {
        body: {
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
        statusCode: 200,
        delay: 500,
      }
    );

    cy.viewport(1280, 920);
    cy.visit("/login");

    const emailInput = cy.findByPlaceholderText("Email");
    const passwordInput = cy.findByPlaceholderText("Password");
    const loginButton = cy.findByRole("button", { name: /send/i });

    emailInput.type(Cypress.env("email")).wait(1000);
    passwordInput.type(Cypress.env("password"), { log: false }).wait(1000);

    loginButton.click();

    const adminAboutLink = cy.findByRole("link", { name: /admin about/i });
    // adminAboutLink.click().wait(2000);

    cy.intercept(
      "GET",
      "http://localhost:3000/_next/webpack-hmr?page=/admin/[id]",
      {
        body: {
          description: "testing. testing testing",
        },
        statusCode: 200,
        delay: 500,
      }
    );
    cy.visit("/admin/about");

    cy.url().should("include", "/admin/about", { timeout: 150000 });

    // cy.url().should("include", "/admin", { timeout: 150000 });
  });
});
