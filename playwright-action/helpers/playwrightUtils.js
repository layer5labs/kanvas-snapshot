//@ts-check
//Playwright configurations for setting up tests
const { chromium } = require("@playwright/test");
const path = require('path');
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

const getFormattedDateTime = () =>{
      const now = new Date();
    
      // Extract date components (YYYY_MM_DD format)
      const year = now.getFullYear();
    
      // Add 1 because months are 0-indexed
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
    
      // Extract time components (HH_MM_SS format)
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
    
      // Concatenate date and time components into the desired format
      const formattedString = `Meshmap_${year}_${month}_${day}_${hours}_${minutes}_${seconds}.png`;
    
      return formattedString;
};

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
async function captureAndSaveScreenshot(filename) {
      await page.screenshot({ path: filename });
}

//Save meshmapscreenshot and generate a download link.    
async function saveGraph(customUrl) {
      const browser = await chromium.launch();
      const page = await browser.newPage();
    
      await page.goto(customUrl);
    
      // Capture a screenshot and save it with a custom filename
      const date = new Date();
      // Format: Meshmap_2023_09_23_14_30_45.png
      const fileName = getFormattedDateTime();
      const filePath = path.join(__dirname, fileName); // Full path to the saved screenshot
    
      await captureAndSaveScreenshot(filePath);
      await browser.close();
    
      // Create a download link
      const downloadLink = `/download?fileName=${encodeURIComponent(fileName)}`;
    
      console.log(`Screenshot saved as ${fileName}`);
      console.log('Download link:', downloadLink);
    
      return downloadLink; 
}

//Login to be used for settingup tests
async function Login(page, username, password) {
      await page.goto('https://meshery.layer5.io/login');

      await page.locator('input[name="identifier"]').fill(username);
      // Press the Tab key (to move to the password field)
      await page.locator('input[name="identifier"]').press('Tab');
      await page.fill('input[name="password"]').fill(password);
      await page.getByRole('button', { name: 'Sign in', exact: true }).click();
}      

//set a visiblesize of webpage
async function setViewportSize(width, height) {
      await page.setViewportSize({ width, height });
}
   
// intercept and modify network requests to specific endpoint 
// to control network interactions during testing and automation
async function interceptAndModifyRequest(targetUrl, modifiedResponse) {
      await page.route(targetUrl, (route) => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(modifiedResponse),//custom response to send when intercepting a network request
        });
      });
}
    
async function navigateToCustomURL(customPath) {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(customPath);
}

async function waitForNetworkResponse(targetUrl) { 
      const timeout = 60000
      await page.waitForResponse(targetUrl, { timeout });
    }
    

export { waitFor, id, InitialEnvSetup, captureAndSaveScreenshot, saveGraph, Login, setViewportSize, interceptAndModifyRequest, navigateToCustomURL, waitForNetworkResponse };