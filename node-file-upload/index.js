const fs = require("fs");
const path = require("path");
const axios = require("axios");

function convertFileToBase64(filePath) {
  try {
    // Read file as binary data
    const fileData = fs.readFileSync(filePath);

    // Convert binary data to Base64
    const base64Data = fileData.toString("base64");

    return base64Data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

const dirPath = path.join(
  __dirname,
  "..",
  // "cypress-action",
  // "cypress",
  "screenshots",
  "loadDesign.js"
);

fs.readdirSync(dirPath).forEach((fileName, index) => {
  setTimeout(() => {
    const filePath = path.join(dirPath, fileName);
    const base64Data = convertFileToBase64(filePath);
    const formData = new FormData();
    formData.append("image", base64Data);
    const assetLocation = process.env.assetLocation;
    if (assetLocation != "" && assetLocation !== undefined) {
      formData.append(
        "assetLocation",
        process.env.assetLocation[index].concat(fileName)
      );
    }
    const url =
      "https://staging-meshery.layer5.io/api/integrations/github/meta/artifacts";

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlJc0ltdHBaQ0k2SW5CMVlteHBZem95WkRGall6VTJaQzA1TVRKaUxUUmpaRGN0T0RjMlpTMW1Oemc0TnpKalpqUmtZVGNpTENKMGVYQWlPaUpLVjFRaWZRLmV5SmhkV1FpT2x0ZExDSmpiR2xsYm5SZmFXUWlPaUp0WlhOb1pYSjVMV05zYjNWa0lpd2laWGgwSWpwN2ZTd2lhV0YwSWpveE56QTJOamsxTVRFMUxDSnBjM01pT2lKb2RIUndjem92TDNOMFlXZHBibWN0YldWemFHVnllUzVzWVhsbGNqVXVhVzh2YUhsa2NtRWlMQ0pxZEdraU9pSTBaV0UwTnpkbVpDMWlaakJoTFRReU5tSXRPV0UzWWkwek16Qm1NbVEzTURNNE5UVWlMQ0p1WW1ZaU9qRTNNRFkyT1RVeE1UVXNJbk5qY0NJNld5SnZjR1Z1YVdRaUxDSnZabVpzYVc1bElsMHNJbk4xWWlJNklsUldWalpaVjJ4NVZYcEZNVHBhTW13d1lVaFdhU0o5Lnlyb2dEN0NETXFlZC1jRV84dG1zQ2JGd09CbzN5cFBuTjZGZDJ0UmE2N3VIQk5CNHdFSURJaUxka3M1RVhzQngzTGdUenBMS2REZzl0OXNESUp2S0R5dDFJTEdTVlJrY0hqcmNibHFXLXJNN1hkUzNHckc3aHZTTldLQ18yWGpfUzl0UFh2WmQ2U29XcXI0dmh4NFdWcW5UeG95T0xfbkRmWXJzcWN0QlIwc1R4b2ROWHhmS3hsZDN0eTVSNnNucjJUSVFJYmNzSmVpc3BNVjIwNDNFV0ZzSFVETVVEazlrVEt2VGQzUUFiQXhjeFk3R1R6dFNRMlRnMjMydV8zNTduV2owbWhEc29xZlBZMzdUQWNIM0t0SFlhb3JGSUVfaFJmV2hDLTdRVUdlSnZZNG1nVU5XRmFjTGl0RXpjQWFONEdSaE1JR2p0QjBwSzJzeEhkemZNX3JPVXJxY1Y5SEh2UGljVHUzNGpsT0Y3RU9NZ2JrYmU1UnF3MHI4eER5WEdqa2M0VTZxWkhVMm9ZclRTUUdSNDc2cjB6bFJSaGxfbjZoY0xWY3B5OS02SVM0UU9aRm5DQ2twT2JjZWJadjJNYTBJMzIxNWMtTWJwc1BQWE5mOEFza0IwM2JVWkxpbnBHSEZqSHFaS1J5SlNCcDN0MXNBVWQzR3BidC1jZEV0MTdtTVhaRmhPbVZWZVZZR3pwd29RSDNqRG5YRng5Y2k1cGZSczUxaHRGVUVoRTcyQW9LZE9rUGFXUE1TcHNzckpiMjA2WmVac1NfRjBxd2tqNEdId1l1X1hTbkRKS1lxMWNlbndnel9HNmFfOXl6clpQekUyMlQzNUFFNE1YV1NELTh3bGdscExwSnpEOWhpcnVZZGsxTTB1VWhoUWdabWJlSHBqOXBMcVVVIiwiYWxnIjoiUlMyNTYiLCJyZWZyZXNoX3Rva2VuIjoiIiwidG9rZW5fdHlwZSI6ImJlYXJlciJ9`,
    };

    if (formData) {
      axios
        .post(url, formData, {
          headers,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    } else {
      console.log(null);
    }
  }, 5000 * (index + 1));
});
