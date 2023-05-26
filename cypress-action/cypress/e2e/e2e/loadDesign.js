// type definitions for Cypress object "cy"
/// <reference types="cypress" />
/// <reference types="../../support" /> 

import { TIME } from "../../support/constants";
import { beforeEachCallbackForCustomUrl } from "../../support/helpers";

describe("Canvas Double Click Test", () => {
  beforeEach(()=> beforeEachCallbackForCustomUrl(`/extension/meshmap?application=${Cypress.env("applicationId")}`))

  it("load a design/application with ID", () => {
    cy.intercept({ url: "/api/application/*", method: "GET"}).as("applicationget")
    cy.wait("@applicationget", {timeout: 10_000})
    cy.wait(TIME.XXXLARGE)
    cy.get("#download").click({force: true});
  })
})

