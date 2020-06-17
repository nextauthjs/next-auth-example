// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe("the sign out page", () => {
  beforeEach(() => {
    cy.visit("/api/auth/signin");
  });
  it("displays the sign out button and descriptive text", () => {
    cy.findByRole("button", { name: "Sign out" }).should("be.visible");

    if (isEmailProvider) {
      cy.getByText("Are you sure you want to sign out?").should("be.visible");
    }
  });
});
