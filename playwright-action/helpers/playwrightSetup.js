//@ts-check
import  { waitFor, id, InitialEnvSetup, captureAndSaveScreenshot, saveGraph, Login, setViewportSize,interceptAndModifyRequest, navigateToCustomURL, waitForNetworkResponse } from "./playwrightUtils"


//Set Up Playwright capabilities
const doInitialSetup = () => {
      InitialEnvSetup()
      setViewportSize();
      Login();
      interceptAndModifyRequest();
}

//a callback hook to perform actions before running individual tests
export const beforeEachCallbackForCustomUrl = (customPath)=>{
      doInitialSetup();
      navigateToCustomURL(customPath)
      waitForNetworkResponse(customPath)
}