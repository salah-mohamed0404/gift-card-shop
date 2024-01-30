const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const axios = require('axios');
// const { Twilio } = require('twilio');
// Twilio setup - replace with your Twilio credentials
// const accountSid = 'ACa5fb2c6c60350e228fd36d3a66ee8b6a';
// const authToken = '17b492667376584b4ac557fbf0503df6';
// const client = new Twilio(accountSid, authToken);

app.use(cors())
// Predefined data
const predefinedImageUrls = [
   './1.svg',
   './2.svg',
   './3.svg',
   './4.svg',
   './5.svg',
   './6.svg',
   './7.svg'

    // ... add more as needed
];


const predefinedSvgUrls = [
   './logoipsum-263.svg',
   './logoipsum-274.svg',
   './logoipsum-291.svg',
   './logoipsum-294.svg',
   './logoipsum-295.svg',
   './logoipsum-297.svg',
   './logoipsum-332.svg',
   './logoipsum-287.svg',
   './logoipsum-269.svg',
   './logoipsum-298.svg'

    // ... add more as needed
];

const predefinedColorCodes = [
    "#FF5733", // Example color code
    "#33FF57", // Example color code
    "#000000",
    "#ffffff",
    "orange",
    "#f7f8fa",
    "#a43a34"
    // ... add more as needed
];


app.use(express.json());


// async function createMyFatoorahInvoice(apiUrl, apiKey, invoiceData) {
//   try {
//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${apiKey}`
//     };

//     const response = await axios.post(`${apiUrl}/v2/SendPayment`, invoiceData, { headers });
//     return response.data; // Process response data as needed
//   } catch (error) {
//     console.error('Error creating MyFatoorah invoice:', error);
//     // Handle error appropriately
//     return null;
//   }
// }


const myFatoorahApiUrl = "https://apitest.myfatoorah.com/";
token='rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL'
const myFatoorahApiKey = ''; // Keep this secret

app.post("/process-payment", async (req, res) => {
  console.log("Processing payment with MyFatoorah");
  try {
    const paymentData = req.body;
    console.log(req.body)
    const response = await axios.post(
      `${myFatoorahApiUrl}/v2/ExecutePayment`,
      paymentData, // data received from the client
      {
        headers: {
          Authorization: `Bearer ${token}`, // Replace with actual API key
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Payment Response:", response.data);
    res.send(response.data); // Send back the response from MyFatoorah
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).send("Payment processing failed.");
  }
});
// createMyFatoorahInvoice(myFatoorahApiUrl, myFatoorahApiKey, invoiceData)
//   .then((invoice) => console.log("Invoice created:", invoice))
//   .catch((err) => console.error("Error:", err));

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

app.get("/api/cards", (req, res) => {
  const { price, brands, page = 1, limit = 10 } = req.query;
  console.log("Filters received:", { price, brands });

  let filteredCards = cardsData;

  // Apply price filter
  if (price) {
    const priceRange = price.split("-").map(Number);
    console.log(priceRange)
    filteredCards = filteredCards.filter((card) =>
    card.price  >= priceRange[0] && card.price <= priceRange[1]
      
    );
  }

  // Apply brand filter
  if (brands) {
    const selectedBrands = brands.split(",");
    filteredCards = filteredCards.filter((card) =>
      selectedBrands.includes(card.brand)
    );
  }

  // Pagination logic
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCards = filteredCards.slice(startIndex, endIndex);

  res.json({
    data: paginatedCards,
    totalPages: Math.ceil(filteredCards.length / limit),
  });
});


const calculateOrderAmount = (items) => {
  // Replace this with the logic to calculate the order amount
  // based on the `items` parameter from the request
  return 1400; // Example amount in cents ($14.00)
};





app.get('/get-predefined-data', (req, res) => {
    const responseData = {
        imageUrls: predefinedImageUrls,
        svgUrls: predefinedSvgUrls,
        colorCodes: predefinedColorCodes
    };

    res.json(responseData);
});

// Function to send card data and image via WhatsApp
const sendWhatsAppMessage = async (cardData, imageUrl, userPhone) => {
  try {
    const message = await client.messages.create({
      from: 'whatsapp:YOUR_TWILIO_WHATSAPP_NUMBER',
      to: `whatsapp:${userPhone}`,
      body: `Card: ${cardData.message}`, // Customize your message
      mediaUrl: imageUrl,
    });

    return message.sid;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
};

// Function to send card data via SMS
const sendSMS = async (cardData, userPhone) => {
  try {
    const message = await client.messages.create({
      from: 'YOUR_TWILIO_SMS_NUMBER',
      to: userPhone,
      body: `Card: ${cardData.message}`, // Customize your message
      // No mediaUrl for SMS, as it's plain text
    });

    return message.sid;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

// POST endpoint to send the card
app.post('/send-card', async (req, res) => {
  const { cardData, userPhone, method } = req.body; // Extract data from request body
  try {
    let messageId;
    if (method === 'whatsapp') {
      // Assume `imageUrl` is provided or generated previously
      messageId = await sendWhatsAppMessage(cardData, 'http://example.com/image.png', userPhone);
    } else if (method === 'sms') {
      messageId = await sendSMS(cardData, userPhone);
    } else {
      return res.status(400).send({ error: 'Invalid messaging method' });
    }
    
    res.send({ success: true, messageId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/card/:cardId', (req, res) => {
  const cardId = req.params.cardId;
  const cardDetails = cardDatabase[cardId];
  if (cardDetails) {
    res.render('cardDetails', { card: cardDetails });
  } else {
    res.status(404).send('Card not found');
  }
});



// Utility function to apply discount
const applyDiscount = async (cardCode, website, productId) => {
  if (!giftCards[cardCode] || !giftCards[cardCode].isActive) {
    throw new Error('Invalid or inactive gift card');
  }

  // Here you would integrate with the website's API
  // This is a placeholder for the actual API call, which will vary depending on the website's API
  try {
    const discountAmount = giftCards[cardCode].discount;
    const response = await axios.post(`https://${website}/api/discounts`, {
      productId,
      discountAmount
    });

    // You would process the response here and return a success message or the discounted price
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Endpoint to receive gift card discount requests
app.post('/apply-discount', async (req, res) => {
  const { cardCode, website, productId } = req.body;

  try {
    const result = await applyDiscount(cardCode, website, productId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const discountCodes = {
  ABC123: { valid: true, discount: 10 }, // 10% discount
  XYZ789: { valid: true, discount: 15 }, // 15% discount
  // ... more codes
};


app.post('/api/initiateSession', async (req, res) => {
    try {
        const myFatoorahResponse = await axios.post(
          "https://apitest.myfatoorah.com/v2/InitiateSession",
          {
            headers: {
              Authorization: "rLtt6JWvbUHDDhsZnfpAhpYk4dxYDQkbcPTyGaKp2TYqQgG7FGZ5Th_WD53Oq8Ebz6A53njUoo1w3pjU1D4vs_ZMqFiz_j0urb_BH9Oq9VZoKFoJEDAbRZepGcQanImyYrry7Kt6MnMdgfG5jn4HngWoRdKduNNyP4kzcp3mRv7x00ahkm9LAK7ZRieg7k1PDAnBIOG3EyVSJ5kK4WLMvYr7sCwHbHcu4A5WwelxYK0GMJy37bNAarSJDFQsJ2ZvJjvMDmfWwDVFEVe_5tOomfVNt6bOg9mexbGjMrnHBnKnZR1vQbBtQieDlQepzTZMuQrSuKn-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL",
            },
          }
        );

        res.json({
            countryCode: myFatoorahResponse.data.CountryCode,
            sessionId: myFatoorahResponse.data.SessionId
        });
    } catch (error) {
        console.error('Error initiating MyFatoorah session:', error);
        res.status(500).send('Error initiating session');
    }
});
// Sample data array - replace with your actual data retrieval logic
// Sample data array with dummy objects
const cardsData = [
  {
    id: 1,
    name: "Gift Card A",
    price: 100,
    brand: "Amazon",
    imageUrl: "/13.jpg",
    description: "Amazon Gift Card worth $100",
  },
  {
    id: 2,
    name: "Gift Card B",
    price: 200,
    brand: "Apple",
    imageUrl: "/HEZEL.png",
    description: "Apple Store Gift Card worth $200",
  },
  {
    id: 3,
    name: "Gift Card C",
    price: 300,
    brand: "xBOX",
    imageUrl: "/13.jpg",
    description: "Google Play Gift Card worth $300",
  },
  {
    id: 4,
    name: "Gift Card D",
    price: 100,
    brand: "Steam",
    imageUrl: "/HEZEL.png",
    description: "Steam Gift Card worth $100",
  },
  {
    id: 5,
    name: "Gift Card E",
    price: 200,
    brand: "Google Play",
    imageUrl: "/HEZEL.png",
    description: "PlayStation Gift Card worth $200",
  },
  {
    id: 6,
    name: "Gift Card E",
    price: 200,
    brand: "iTunes",
    imageUrl: "/HEZEL.png",
    description: "PlayStation Gift Card worth $200",
  },
  // ... add more objects as necessary
];


// Function to filter and paginate data
function getPaginatedAndFilteredData(data, page, pageSize, filters) {
    // Implement filtering logic based on filters
    let filteredData = data; // Placeholder for actual filtering logic

    // Implement pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return filteredData.slice(startIndex, endIndex);
}

// Route to handle requests for cards with pagination and filters



app.post("/api/validate-code", (req, res) => {
  const { code } = req.body;
  const discount = discountCodes[code];

  if (discount && discount.valid) {
    res.json({ valid: true, discount: discount.discount });
  } else {
    res.json({ valid: false });
  }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
