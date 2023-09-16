import  { waitFor, id, InitialEnvSetup, captureAndSaveScreenshot, saveGraph, login, setViewportSize,interceptAndModifyRequest, navigateToCustomURL, waitForNetworkResponse } from "./playwrightUtils"


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