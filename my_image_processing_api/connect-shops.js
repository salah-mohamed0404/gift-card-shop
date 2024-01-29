// universal-gift-card-api.js
// Enhanced Universal API with API key authentication

const express = require("express");
const app = express();
app.use(express.json());

// Mock data for valid discount codes
const validDiscountCodes = {
  ABC123: { isValid: true, discountValue: 10 },
  XYZ789: { isValid: true, discountValue: 20 },
};

// Mock API keys storage
const validApiKeys = ["12345", "67890"]; // In real scenario, this should be stored securely

// Middleware for API key authentication
function authenticateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (validApiKeys.includes(apiKey)) {
    next();
  } else {
    res.status(401).json({ message: "Invalid API Key" });
  }
}

// POST endpoint to validate gift cards with API key authentication
app.post("/api/validate-gift-card", authenticateApiKey, (req, res) => {
  const { code } = req.body;

  if (validDiscountCodes[code]) {
    res.json(validDiscountCodes[code]);
  } else {
    res.json({ isValid: false, discountValue: 0 });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Universal Gift Card API running on port ${PORT}`);
});
