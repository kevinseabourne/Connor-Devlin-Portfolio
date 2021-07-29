describe("Login Page Tests", () => {
  it("should show you an error message when you do not meet the input requirments", () => {
    cy.visit("/login");

    const loginButton = cy.findByRole("button", { name: /send/i });

    loginButton.click().wait(1000);

    cy.findByText("An Email is required !").should("be.visible");
    cy.findByText("A password is required !").should("be.visible");
  });

  it("should show you an error message when you meet the validation requirments but you provide the wrong email and password", () => {
    cy.visit("/login");

    const emailInput = cy.findByPlaceholderText("Email");
    const passwordInput = cy.findByPlaceholderText("Password");
    const loginButton = cy.findByRole("button", { name: /send/i });

    emailInput.type("test@hotmail.com").wait(1000);
    passwordInput.type(1234).wait(1000);

    loginButton.click().wait(1000);

    cy.findByText("Invalid Email").should("be.visible");
  });

  it("should show you an error message when you meet the validation requirments but you provide the wrong password", () => {
    cy.visit("/login");

    const emailInput = cy.findByPlaceholderText("Email");
    const passwordInput = cy.findByPlaceholderText("Password");
    const loginButton = cy.findByRole("button", { name: /send/i });

    emailInput.type(Cypress.env("email")).wait(1000);
    passwordInput.type(1234).wait(1000);

    loginButton.click().wait(1000);

    cy.findByText("Invalid Password").should("be.visible");
  });

  it("should login and direct you to the admin page when providing the correct email and password", () => {
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
    cy.visit("/login");

    const emailInput = cy.findByPlaceholderText("Email");
    const passwordInput = cy.findByPlaceholderText("Password");
    const loginButton = cy.findByRole("button", { name: /send/i });

    emailInput.type(Cypress.env("email")).wait(1000);
    passwordInput.type(Cypress.env("password"), { log: false }).wait(1000);

    loginButton.click();

    cy.url().should("include", "/admin", { timeout: 10000 });
  });

  it("should show an error message. On a failed http post request", () => {
    cy.server({ force404: true });
    cy.route({
      method: "POST",
      url:
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDioFomRCLacilWAauy0sAgJ37k3tfc2Cg",
      response: [{ status: 404 }],
    });
    cy.visit("/login");

    const emailInput = cy.findByPlaceholderText("Email");
    const passwordInput = cy.findByPlaceholderText("Password");
    const loginButton = cy.findByRole("button", { name: /send/i });

    emailInput.type(Cypress.env("email")).wait(1000);
    passwordInput.type(Cypress.env("password"), { log: false }).wait(1000);

    const sendButton = cy.findByText("Send");
    sendButton.click();

    // Assertion //

    const toastErrorMessage = cy.wait(2000).findByRole("alert");
    toastErrorMessage.should("be.visible");
  });
});
