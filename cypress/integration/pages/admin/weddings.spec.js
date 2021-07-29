describe("Weddings Page Tests", () => {
  it("should show a video when clicking on each item and close it when clicking outside the container", () => {
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
    cy.viewport(1280, 920);
    cy.visit("/login");

    const emailInput = cy.findByPlaceholderText("Email");
    const passwordInput = cy.findByPlaceholderText("Password");
    const loginButton = cy.findByRole("button", { name: /send/i });

    emailInput.type(Cypress.env("email")).wait(1000);
    passwordInput.type(Cypress.env("password"), { log: false }).wait(1000);

    loginButton.click();

    const adminWeddingsLink = cy.findByRole("heading", {
      name: /admin weddings/i,
    });
    adminWeddingsLink.click().wait(2000);

    cy.url().should("include", "/admin/weddings", { timeout: 150000 });

    cy.findAllByTestId("item").each((item) => {
      cy.wrap(item).scrollIntoView().wait(500).click();

      cy.findByTestId("videoOverlay").should("be.visible");
      cy.findByLabelText("loading spinner").should("be.visible");

      cy.findByTestId("video").should("be.visible");

      cy.findByTestId("videoOverlay").wait(500).click("left");

      cy.findByTestId("videoOverlay").should("not.exist");
    });
  });
  it("should show a video when clicking on each item and close it when you press the esc key", () => {
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
    cy.viewport(1280, 920);
    cy.visit("/login");

    const emailInput = cy.findByPlaceholderText("Email");
    const passwordInput = cy.findByPlaceholderText("Password");
    const loginButton = cy.findByRole("button", { name: /send/i });

    emailInput.type(Cypress.env("email")).wait(1000);
    passwordInput.type(Cypress.env("password"), { log: false }).wait(1000);

    loginButton.click();

    const adminWeddingsLink = cy.findByRole("heading", {
      name: /admin weddings/i,
    });
    adminWeddingsLink.click().wait(2000);

    cy.url().should("include", "/admin/weddings", { timeout: 150000 });

    cy.findAllByTestId("item").each((item) => {
      cy.wrap(item).scrollIntoView().wait(500).click();

      cy.findByTestId("videoOverlay").should("be.visible");
      cy.findByLabelText("loading spinner").should("be.visible");

      cy.findByTestId("video").should("be.visible");

      cy.get("body").type("{esc}");

      cy.findByTestId("videoOverlay").should("not.exist");
    });
  });
});
