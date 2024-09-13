/// <reference types="cypress" />
/// <reference types="../../support" />

import { TIME, canvasContainer } from "../../support/constants";
import {
    beforeEachCallbackForCustomUrl,
    doSnapshotSetup,
    waitFor,
} from "../../support/helpers";

const InfraShot = (theme) => {
    return describe(`Infra Shot Automated Runner ${theme} Mode`, () => {
        beforeEach(() =>
            beforeEachCallbackForCustomUrl(
                `/extension/meshmap?mode=design&design=${getDesignId()}`,
                theme
            )
        );

        it(`take light mode infra shot`, () => {
            const designId = getDesignId();
            waitForDesignRender();
            cy.window().then((window) => {
                cy.wait(TIME.MEDIUM);
                captureSnapshot({
                    window,
                    designId: designId,
                    theme,
                });
            });
        });
    });
};

const getDesignId = () => {
    return Cypress.env("applicationId").replace(/['"]+/g, "");
};

const waitForDesignRender = () => {
    waitFor(canvasContainer.query, { timeout: 60_000 });
    cy.wait(TIME.X4LARGE);
};

const snapshotPath = (designId, theme) => {
    return `snapshot-${theme}`;
};

const captureSnapshot = ({ window, designId, theme }) => {
    console.log("Taking snapshot", designId, theme);
    removeWidgets();
    const cytoscape = cy.window.cyto;
    cytoscape.fit();
    cytoscape.center();
    const path = snapshotPath(designId, theme);
    cy.wait(2000)
    cy.viewport(1280, 720)
    cy.get(canvasContainer.query, { timeout: 10 * 1000 }).should("exist").screenshot(path, {
        scale: true,
    });
    console.log(`Snapshot taken at ${path}`);
};

const removeWidgets = () => {
    const classes = ["MuiToolbar-root", "MuiDrawer-paperAnchorDockedLeft", "MuiSpeedDial-root"] ;

    classes.forEach((className) => {
        cy.get(`.${className}`).each(($el) => {
            cy.wrap($el).invoke('remove');
        });
    });
};

["light", "dark"].forEach((theme) => {
    InfraShot(theme);
});
