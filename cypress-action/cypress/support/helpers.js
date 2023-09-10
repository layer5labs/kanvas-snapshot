import { DESIGNER, extension, MESHMAP_PATH } from "./constants"

//utility func that return strings and id
export function waitFor(str) {
  return "@" + str;
}

export function id(str) {
  return "#" + str
}

//cypress setup capabilities
const doInitialSetup = () => {
  cy.setViewPort();
  cy.login();
  cy.setReleaseTag();
  cy.interceptCapabilities();//intercept request to specific endpoint 
  cy.setMode(DESIGNER);
}

//a callback hook to perform actions before running individual tests
export const beforeEachCallback = () => {
  doInitialSetup();
  cy.intercept(extension.path).as(extension.alias);
  cy.visit(MESHMAP_PATH)
  cy.wait(waitFor(extension.alias), { timeout: 15000 });
}

export const beforeEachCallbackForCustomUrl = (customPath) => {
  doInitialSetup();
  cy.intercept(extension.path).as(extension.alias);
  cy.visit(customPath);
  cy.wait(waitFor(extension.alias), { timeout: 60_000 });
}
//captures meshmap graph screenshots and generates download link
export const saveGraph = (cy) => {
  let image = cy.png();
  let lnk = document.createElement("a"),
    date = new Date(),
    e;
  lnk.href = image;
  lnk.download =
    "MeshMap-" + date.toDateString() + "/" + date.toLocaleTimeString() + ".png";

  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent(
      "click",
      true,
      true,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
};