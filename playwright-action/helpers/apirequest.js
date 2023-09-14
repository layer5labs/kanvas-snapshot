//@ts-check
const { chromium } = require("@playwright/test");
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

async function makeDeleteRequest(url) {
      const response = await page.evaluate(async (url)=>{
            //send request to specified url 
            const response = await fetch(url, {
                  method: "DELETE",
            })
            return response;
      },url)
      return response
}

async function makePostRequest(url) {
      const response = await page.evaluate(async (url)=>{
            //send request to specified url 
            const response = await fetch(url, {
                  method: "POST",
            })
            return response;
      },url)
      return response
}

async function makeGetRequest(url) {
      const response = await page.evaluate(async (url)=>{
            //send request to specified url 
            const response = await fetch(url, {
                  method: "GET",
            })
            return response;
      },url)
      return response
}


export { makeDeleteRequest, makeGetRequest, makePostRequest}