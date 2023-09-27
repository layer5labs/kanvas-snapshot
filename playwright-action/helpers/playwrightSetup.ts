//Playwright configurations for setting up tests
import { makeDeleteRequest } from "./apirequest";
import { designEndpoint } from "./constants";
const path = require("path");

//utility func to generate css selector and return id and strings
function waitFor(str) {
	return `@${str}`;
}

function id(str) {
	return `#${str}`;
}

//set a visiblesize of webpage
export async function setViewportSize(page, width, height) {
	await page.setViewportSize({ width, height });
}

const getFormattedDateTime = () => {
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

//capture and save a screenshot
async function captureAndSaveScreenshot(page, filename) {
	await page.screenshot({ path: filename });
}

//Save meshmapscreenshot and generate a download link.
export async function saveGraph(page, customUrl) {
	await page.goto(customUrl);

	// Capture a screenshot and save it with a custom filename
	const date = new Date();
	// Format: Meshmap_2023_09_23_14_30_45.png
	const fileName = getFormattedDateTime();
	const filePath = path.join(__dirname, fileName); // Full path to the saved screenshot

	await captureAndSaveScreenshot(page, filePath);
	// Create a download link
	const downloadLink = `/download?fileName=${encodeURIComponent(fileName)}`;

	console.log(`Screenshot saved as ${fileName}`);
	console.log("Download link:", downloadLink);

	return downloadLink;
}

// intercept and modify network requests to specific endpoint
// to control network interactions during testing and automation
export async function interceptAndModifyRequest(page, targetUrl, modifiedResponse) {
	await page.route(targetUrl, (route) => {
		route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify(modifiedResponse), //custom response to send when intercepting a network request
		});
	});
}

export async function navigateToCustomURL(page, customPath) {
	await page.goto(customPath);
}

export async function waitForNetworkResponse(page, targetUrl) {
	const timeout = 60000;
	await page.waitForResponse(targetUrl, { timeout });
}

export async function deleteDesign(page, designId) {
	//URL for deleteRequest
	const deleteUrl = `${designEndpoint.absolutePath}/${designId}`;
	const response = await makeDeleteRequest(page, deleteUrl);
	console.log("Delete Design Response:", response);

	// Optionally, check the response status to ensure the delete was successful
	if (response.status === 204) {
		console.log("Design successfully deleted.");
	} else {
		console.error("Failed to delete design. Status code:", response.status);
	}
}

//Set Up Playwright capabilities
// const doInitialSetup = () => {
//       setViewportSize();
//       login();
//       interceptAndModifyRequest();
// }

//a callback hook to perform actions before running individual tests
// export const beforeEachCallbackForCustomUrl = (customPath)=>{
//       doInitialSetup();
//       navigateToCustomURL(customPath)
//       waitForNetworkResponse(customPath)
// }
