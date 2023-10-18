// @ts-check
const { test, expect } = require("@playwright/test");
import { login, MesheryPlayground, MeshMap, meshmapdesign } from "../helpers/playwrightUtils";

test("Login Test", async ({ page }) => {
	// 'page' is provided by Playwright
	const username = "leecatcole-admin@layer5.io";
	const password = "meshery23";
	await login(page, username, password); // Use 'page' directly
});

test("Meshery Playground", async ({ page }) => {
	await MesheryPlayground(page);
});

test("Meshmap", async ({ page }) => {
	await MeshMap(page);
});

const appenvId = process.env.APPLICATION_ID;

test("Meshmap Design", async ({ page }) => {
	await meshmapdesign(page, appenvId);
});
