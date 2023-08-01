// type definitions for Cypress object "cy"
/// <reference types="cypress" />
/// <reference types="../../support" /> 

import { TIME } from "../../support/constants";
import { beforeEachCallbackForCustomUrl, saveGraph } from "../../support/helpers";

describe("Infra Shot Automated Runner", () => {
  beforeEach(() => beforeEachCallbackForCustomUrl(`/extension/meshmap?application=${Cypress.env("applicationId").replace(/['"]+/g, '')}`))

  it("load a design/application with ID", () => {
    cy.wait(TIME.X4LARGE);
    cy.window().then(window => {
      cy.wait(TIME.SMALL);
      const cyto = window.cyto;
      saveGraph(cyto);
    })
  })
})

