//@ts-check
const { chromium } = require("@playwright/test");
const fs = require('fs');
const path = require('path');

//utility func to generate css selector and return id and strings
function waitFor(str) {
      return `@${str}`;
}

function id(str) {
      return `#${str}`;
}



//create a fresh testing env for testcases
async function InitialEnvSetup() {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();

      return { browser, context, page };
}


//capture and save a screenshot
async function captureAndSaveScreenshot(page, filename) {
      await page.screenshot({ path: filename });
}

//Save meshmapscreenshot and generate a download link.    
async function saveGraph(customUrl) {
      const browser = await chromium.launch();
      const page = await browser.newPage();
    
      await page.goto(customUrl);
    
      // Capture a screenshot and save it with a custom filename
      const date = new Date();
      // Format: MeshMap-Fri Sep 09 2023-10:30:45 AM.png
      const fileName = `MeshMap-${date.toDateString()}-${date.toLocaleTimeString()}.png`;
      const filePath = path.join(__dirname, fileName); // Full path to the saved screenshot
    
      await captureAndSaveScreenshot(page, filePath);
      await browser.close();
    
      // Create a download link
      const downloadLink = `/download?fileName=${encodeURIComponent(fileName)}`;
    
      console.log(`Screenshot saved as ${fileName}`);
      console.log('Download link:', downloadLink);
    
      return downloadLink; 
}

export { waitFor, id, InitialEnvSetup, captureAndSaveScreenshot, saveGraph };