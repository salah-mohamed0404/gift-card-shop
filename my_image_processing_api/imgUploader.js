const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const IMGUR_CLIENT_ID = "sargaharrey"; // Replace with your Imgur Client ID

async function uploadToImgur(filePath) {
  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(filePath));

    const response = await axios.post(
      "https://api.imgur.com/3/image",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
      }
    );

    return response.data.data.link; // URL of the uploaded image
  } catch (error) {
    console.error("Error uploading to Imgur:", error);
    throw error;
  }
}

module.exports = { uploadToImgur };
