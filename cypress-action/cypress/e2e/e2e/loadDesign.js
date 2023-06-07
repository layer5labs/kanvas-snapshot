// type definitions for Cypress object "cy"
/// <reference types="cypress" />
/// <reference types="../../support" /> 

import { TIME } from "../../support/constants";
import { beforeEachCallbackForCustomUrl } from "../../support/helpers";

describe("Infra Shot Automated Runner", () => {
  beforeEach(()=> beforeEachCallbackForCustomUrl(`/extension/meshmap?application=${Cypress.env("applicationId").replace(/['"]+/g, '')}`))

  it("load a design/application with ID", () => {
    cy.wait(TIME.XXXLARGE)
    cy.get("#download").click({force: true});
  })
})

