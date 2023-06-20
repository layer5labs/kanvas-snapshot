const fs = require('fs');
const path = require('path');
const axios = require("axios")

function convertFileToBase64(filePath) {
  try {
    // Read file as binary data
    const fileData = fs.readFileSync(filePath);

    // Convert binary data to Base64
    const base64Data = fileData.toString('base64');

    return base64Data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const filePath = path.join(__dirname, "..", "cypress-action", "cypress", "downloads", "screenshot.png");
const base64Data = convertFileToBase64(filePath);

const url = "https://meshery.layer5.io/api/integrations/github/meta/artifacts";

const headers = {
  "Content-Type": "multipart/form-data",
  "Authorization": `Bearer ${process.env.PROVIDER_TOKEN}`
}

if (base64Data) {
  axios.post(url, base64Data, {
    headers,
  }).then(response => {
    console.log(response.data)
  }).catch(e => {
    console.log(e)
  })
} else {
  console.log(null)
}
