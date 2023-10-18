import playwright from "@playwright/test";

export async function makeDeleteRequest(page, url) {
	const response = await page.evaluate(async (url) => {
		//send request to specified url
		const response = await fetch(url, {
			method: "DELETE",
		});
		return response;
	}, url);
	return response;
}

export async function makePostRequest(page, url) {
	const response = await page.evaluate(async (url) => {
		//send request to specified url
		const response = await fetch(url, {
			method: "POST",
		});
		return response;
	}, url);
	return response;
}

export async function makeGetRequest(page, url) {
	const response = await page.evaluate(async (url) => {
		//send request to specified url
		const response = await fetch(url, {
			method: "GET",
		});
		return response;
	}, url);
	return response;
}
