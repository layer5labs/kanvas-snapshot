//@ts-check
//Playwright configurations for setting up tests
import { makeDeleteRequest } from "./apirequest";
import { designEndpoint } from "./constants";
import { chromium, expect, firefox, webkit } from "@playwright/test";
const path = require('path');

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

export async function MesheryPlayground(page){
      await page.goto('https://playground.meshery.io/')
      const mesheryHeading = await page.locator('h1:has-text("Meshery")');
      // Describe the "Dashboard" element 
      const dashboardLink = await page.locator('h2:has-text("Dashboard")');
      const lifecycleLink = await page.locator('a[href="/management"]');
      const configurationsLink = await page.locator('a[href="/configuration/application"]');
      const performanceLink = await page.locator('a[href="/performance"]');
      const extensionsLink = await page.locator('a[href="/extension"]');
      const meshmapLink = await page.locator('a[href="/extension/meshmap"]');
      await page.waitForTimeout(30000)
      await page.close()
}

export async function MeshMap(page){
      await page.goto('https://playground.meshery.io/extension/meshmap');
      const meshMapBetaHeading = page.locator('h1:has-text(/MeshMap\s*beta/i)');
     // Use page.locator() to describe the headings under "MeshMap beta."
      const designsHeading = page.locator('h1:has-text(/MeshMap\\s*beta/i) + h2:has-text("Designs")');
      const componentsHeading = page.locator('h1:has-text(/MeshMap\\s*beta/i) + h2:has-text("Components")');
      const applicationsHeading = page.locator('h1:has-text(/MeshMap\\s*beta/i) + h2:has-text("Applications")');
      // Describe the headings.
      const designsText = await designsHeading.innerText();
      const componentsText = await componentsHeading.innerText();
      const applicationsText = await applicationsHeading.innerText();
      await page.waitForTimeout(10000)
      await page.close()
}

//capture and save a screenshot
async function captureAndSaveScreenshot(page, filename) {
      await page.screenshot({ path: filename });
}

//Save meshmapscreenshot and generate a download link.    
async function saveGraph(page,customUrl) {
      await page.goto(customUrl);
    
      // Capture a screenshot and save it with a custom filename
      const date = new Date();
      // Format: Meshmap_2023_09_23_14_30_45.png
      const fileName = getFormattedDateTime();
      const filePath = path.join(__dirname, fileName); // Full path to the saved screenshot
    
      await captureAndSaveScreenshot(filePath);
      // Create a download link
      const downloadLink = `/download?fileName=${encodeURIComponent(fileName)}`;
    
      console.log(`Screenshot saved as ${fileName}`);
      console.log('Download link:', downloadLink);
    
      return downloadLink; 
}

//Login to be used for settingup tests
export async function login(page, username, password) {
      await page.goto('https://meshery.layer5.io/login');

      await page.locator('input[name="identifier"]').fill(username);
      // Press the Tab key (to move to the password field)
      await page.locator('input[name="identifier"]').press('Tab');
      await page.fill('input[name="password"]',password)
      await page.waitForSelector('input[name="password"]');
      await page.fill('input[name="password"]', password);

      // Wait for the "Sign in" button to appear and then click it
      const signInButton = await page.waitForSelector('button[type="submit"]');
      await signInButton.click(); 
      // Wait for some time (e.g., 5 seconds) for any post-login actions or page navigation to complete
      await page.waitForTimeout(5000);
      const logout =  await page.locator('a[href="/logout"]')
      await page.close()
}     

//set a visiblesize of webpage
export async function setViewportSize(page,width, height) {
      await page.setViewportSize({ width, height });
}
   
// intercept and modify network requests to specific endpoint 
// to control network interactions during testing and automation
export async function interceptAndModifyRequest(page, targetUrl, modifiedResponse) {
      await page.route(targetUrl, (route) => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(modifiedResponse),//custom response to send when intercepting a network request
        });
      });
}
    
export async function navigateToCustomURL(page, customPath) {
      await page.goto(customPath);
}

export async function waitForNetworkResponse(page, targetUrl) { 
      const timeout = 60000
      await page.waitForResponse(targetUrl, { timeout });
}
    
export async function deleteDesign(designId) {
      //URL for deleteRequest
      const deleteUrl =  `${designEndpoint.absolutePath}/${designId}`;
      const response = await makeDeleteRequest(deleteUrl);
      console.log("Delete Design Response:", response);

      // Optionally, check the response status to ensure the delete was successful
      if (response.status === 204) {
      console.log("Design successfully deleted.");
       } else {
      console.error("Failed to delete design. Status code:", response.status);
     }
}

