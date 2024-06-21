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
    removeWidgets(window.document);
    const cytoscape = window.cyto;
    cytoscape.fit();
    cytoscape.center();
    const path = snapshotPath(designId, theme);
    cy.get(canvasContainer.query).should("exist").screenshot(path, {
        scale: true,
    });
    console.log(`Snapshot taken at ${path}`);
};

const removeWidgets = (document) => {
    const classes = ["MuiBox-root", "MuiSpeedDial-root"];

    classes.forEach((className) => {
        const elements = [...document.getElementsByClassName(className)];
        elements.forEach((element) => {
            element.remove();
        });
    });
};

["light", "dark"].forEach((theme) => {
    InfraShot(theme);
});
