import  {InitialEnvSetup, captureAndSaveScreenshot, saveGraph, login, setViewportSize,interceptAndModifyRequest, navigateToCustomURL, waitForNetworkResponse } from "./playwrightUtils"

//Playwright configurations for setting up tests

//utility func to generate css selector and return id and strings
function waitFor(str) {
      return `@${str}`;
}

function id(str) {
      return `#${str}`;
}

//Set Up Playwright capabilities
const doInitialSetup = () => {
      setViewportSize();
      login();
      interceptAndModifyRequest();
}

//a callback hook to perform actions before running individual tests
export const beforeEachCallbackForCustomUrl = (customPath)=>{
      doInitialSetup();
      navigateToCustomURL(customPath)
      waitForNetworkResponse(customPath)
}