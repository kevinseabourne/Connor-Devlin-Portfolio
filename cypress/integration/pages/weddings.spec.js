before(function () {
  cy.server({ force404: true });
  cy.route("GET", "http://localhost:3000/_next/webpack-hmr?page=/weddings", {});
});

describe("http GET request", () => {
  beforeEach(() => {
    // cy.server({ force404: true });
    // cy.request({
    //   method: "GET",
    //   status: 404,
    //   url:
    //     "http://localhost:3000/_next/static/webpack/3d99231e483b0ed06148.hot-update.json",
    //   response: {},
    // });
  });
  it("should show an error message of a rejected http request", () => {
    cy.visit("/weddings");

    const loadingContainer = cy.wait(5000).findByRole("alert");
    loadingContainer.should("be.visible");
  });

  // it("should show an error message of a rejected http request", () => {
  //   cy.visit("/weddings");
  //   baseUrl "http://localhost:3000"
  // : if request.auth != null;
  //   const partners = cy.findByTestId("partnerNamesLabelHngMkEcKV5EPekWe9cgH");
  //   partners.should("be.visible");
  // });
});
