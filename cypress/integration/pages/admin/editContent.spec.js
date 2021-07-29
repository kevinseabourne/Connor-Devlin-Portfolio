describe("Header Tests", () => {
  // it("should show all images and data are visible after loading", () => {
  //   cy.intercept(
  //     "POST",
  //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDioFomRCLacilWAauy0sAgJ37k3tfc2Cg",
  //     {
  //       body: {
  //         displayName: "",
  //         email: "test@email.com",
  //         expiresIn: "3600",
  //         idToken:
  //           "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjb25ub3ItZGV2bGluLXBvcnRmb2xpbyIsImF1dGhfdGltZSI6MTYxNDA2NDQ5MCwidXNlcl9pZCI6IndlZndlZyIsImlhdCI6MTYxNDA2NDQ5MCwiZXhwIjoxNjE0MDY4NTY1LCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAZW1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifSwianRpIjoiZjg4MDBmNjYtOTU1My00ZWMwLTkxMTUtZTRjYTFiNmQzNzBjIn0.eXPyN8Z6bdfpBtQbXVB2yCDLrYrRVOhHflWxYQ9QKf0",
  //         kind: "identitytoolkit#VerifyPasswordResponse",
  //         localId: "V4dGl7r2sIZBhrOh2TeNBuvdw3k1asd",
  //         refreshToken: "fwfwefwefqw",
  //         registered: true,
  //       },
  //       statusCode: 200,
  //       delay: 500,
  //     }
  //   );
  //
  //   cy.viewport(1280, 920);
  //   cy.visit("/login");
  //
  //   const emailInput = cy.findByPlaceholderText("Email");
  //   const passwordInput = cy.findByPlaceholderText("Password");
  //   const loginButton = cy.findByRole("button", { name: /send/i });
  //
  //   emailInput.type(Cypress.env("email")).wait(1000);
  //   passwordInput.type(Cypress.env("password")).wait(1000);
  //
  //   loginButton.click();
  //
  //   const adminEditContentLink = cy.findByRole("link", {
  //     name: /admin edit content/i,
  //   });
  //   adminEditContentLink.click().wait(2000);
  //
  //
  //   cy.url().should("include", "/admin/edit-content", { timeout: 150000 });
  //
  //   const packagesButton = cy.findByRole("button", { name: /corporate/i });
  //   packagesButton.click().wait(5000);
  //
  //   // ------------------------ Assertions ------------------------ //
  //
  //   cy.findAllByTestId("photo").each((photo) =>
  //     cy.wrap(photo).should("be.visible")
  //   );
  //
  //   cy.findAllByTestId("companyName").each((company) =>
  //     cy.wrap(company).should("be.visible")
  //   );
  //
  //   cy.findAllByTestId("date").each((date) =>
  //     cy.wrap(date).should("be.visible")
  //   );
  //
  //   cy.findAllByTestId("description").each((photo) =>
  //     cy.wrap(photo).should("be.visible")
  //   );
  //
  //   // ------------------------ No Testimonial in live data ------------------------ //
  //   // cy.findAllByTestId("testimonial").each((photo) =>
  //   //   cy.wrap(photo).should("be.visible")
  //   // );
  // });

  // it("should show the first item in the grid of items is selected by default on load", () => {
  //   cy.intercept(
  //     "POST",
  //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDioFomRCLacilWAauy0sAgJ37k3tfc2Cg",
  //     {
  //       body: {
  //         displayName: "",
  //         email: "test@email.com",
  //         expiresIn: "3600",
  //         idToken:
  //           "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjb25ub3ItZGV2bGluLXBvcnRmb2xpbyIsImF1dGhfdGltZSI6MTYxNDA2NDQ5MCwidXNlcl9pZCI6IndlZndlZyIsImlhdCI6MTYxNDA2NDQ5MCwiZXhwIjoxNjE0MDY4NTY1LCJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAZW1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifSwianRpIjoiZjg4MDBmNjYtOTU1My00ZWMwLTkxMTUtZTRjYTFiNmQzNzBjIn0.eXPyN8Z6bdfpBtQbXVB2yCDLrYrRVOhHflWxYQ9QKf0",
  //         kind: "identitytoolkit#VerifyPasswordResponse",
  //         localId: "V4dGl7r2sIZBhrOh2TeNBuvdw3k1asd",
  //         refreshToken: "fwfwefwefqw",
  //         registered: true,
  //       },
  //       statusCode: 200,
  //       delay: 500,
  //     }
  //   );
  //
  //   cy.viewport(1280, 920);
  //   cy.visit("/login");
  //
  //   const emailInput = cy.findByPlaceholderText("Email");
  //   const passwordInput = cy.findByPlaceholderText("Password");
  //   const loginButton = cy.findByRole("button", { name: /send/i });
  //
  //   emailInput.type(Cypress.env("email")).wait(1000);
  //   passwordInput.type(Cypress.env("password")).wait(1000);
  //
  //   loginButton.click();
  //
  //   const adminEditContentLink = cy.findByRole("link", {
  //     name: /admin edit content/i,
  //   });
  //   adminEditContentLink.click().wait(2000);
  //
  //   cy.url().should("include", "/admin/edit-content", { timeout: 150000 });
  //
  //   const packagesButton = cy.findByRole("button", { name: /corporate/i });
  //   packagesButton.click().wait(5000);
  //
  //   // ------------------------ Assertions ------------------------ //
  //
  //   cy.get(".item")
  //     .first()
  //     .findByLabelText("Selected Item")
  //     .scrollIntoView()
  //     .should("be.visible");
  // });

  it("should show the first item in the grid of items is selected by default on load", () => {
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

    const adminEditContentLink = cy.findByRole("link", {
      name: /admin edit content/i,
    });
    adminEditContentLink.click().wait(2000);

    cy.url().should("include", "/admin/edit-content", { timeout: 150000 });

    const packagesButton = cy.findByRole("button", { name: /corporate/i });
    packagesButton.click().wait(5000);

    // ------------------------ Assertions ------------------------ //

    cy.get(".item")
      .first()
      .findByLabelText("Selected Item")
      .scrollIntoView()
      .should("be.visible");

    cy.get(".item")
      .first()
      .findByLabelText("Delete")
      .scrollIntoView()
      .should("be.visible");
  });

  it("should show the a pop up box when clicking on the delete button of a selected Item", () => {
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

    const adminEditContentLink = cy.findByRole("link", {
      name: /admin edit content/i,
    });

    adminEditContentLink.click().wait(2000);

    cy.url().should("include", "/admin/edit-content", { timeout: 150000 });

    const packagesButton = cy.findByRole("button", { name: /corporate/i });
    packagesButton.click().wait(5000);

    // ------------------------ Assertions ------------------------ //

    cy.get(".item").first().findByLabelText("Delete").scrollIntoView().click();

    cy.findByText("Are you sure you want to delete this content ?").should(
      "be.visible"
    );

    const checkbox = cy.findByRole("checkbox");
    checkbox.click();
    checkbox.should("be.visible");
    const deleteFormButton = cy.findByText("Delete");
    deleteFormButton.should("be.visible");

    const outsideContainer = cy.findByTestId("deleteOverlay");
    outsideContainer.click("left");

    outsideContainer.should("not.exist");
  });
});
