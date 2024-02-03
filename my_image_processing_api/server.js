const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const axios = require('axios');
const { Vonage } = require("@vonage/server-sdk");
// const { Twilio } = require('twilio');
// Twilio setup - replace with your Twilio credentials
// const accountSid = 'ACa5fb2c6c60350e228fd36d3a66ee8b6a';
// const authToken = '17b492667376584b4ac557fbf0503df6';
// const client = new Twilio(accountSid, authToken);
const vonage = new Vonage({
  apiKey: "b6ceeb0c",
  apiSecret: "d92c0b6a",
  applicationId: " dd2cd09a-2c73-4a95-99bc-cc156a670709",
  privateKey: "./private.key",
});
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
 " ABC123": { isValid: true, discountValue: 100 },
  "XYZ789": { isValid: true, discountValue: 100 },
  // Add more codes as needed
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
// app.post("/api/validate-gift-card", (req, res) => {
//   const { code } = req.body;

//   if (validDiscountCodes[code]) {
//     // res.json(validDiscountCodes[code]);
//     res.status(200).json(validDiscountCodes.isValid);
//   } else {
//    res.status(500)
//   }
  
// });
app.post("/api/validate-gift-card", (req, res) => {
  const { code } = req.body;

  if (validDiscountCodes[code] && validDiscountCodes[code].isValid) {
    res.json({ discountValue: validDiscountCodes[code].discountValue });
  } else {
    res.status(400).json({ error: req.body });
  }
});



app.get("/api/cards", (req, res) => {
  const { price, brands, page = 1, limit = 6 } = req.query;
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




app.post('ok',(req,res)=>{

res.send(ok)
})

app.get('/get-predefined-data', (req, res) => {
    const responseData = {
        imageUrls: predefinedImageUrls,
        svgUrls: predefinedSvgUrls,
        colorCodes: predefinedColorCodes
    };

    res.json(responseData);
});

// Function to send card data and image via WhatsApp

// POST endpoint to send the card
// app.post('/send-card', async (req, res) => {
//   const { cardData, userPhone, method } = req.body; // Extract data from request body
//   try {
//     let messageId;
//     if (method === 'whatsapp') {
//       // Assume `imageUrl` is provided or generated previously
//       messageId = await sendWhatsAppMessage(cardData, 'http://example.com/image.png', userPhone);
//     } else if (method === 'sms') {
//       messageId = await sendSMS(cardData, userPhone);
//     } else {
//       return res.status(400).send({ error: 'Invalid messaging method' });
//     }
    
//     res.send({ success: true, messageId });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

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
  "ABC123": { valid: true, discount: 100 }, // 10% discount
  "XYZ789": { valid: true, discount: 100 }, // 15% discount
  "cool": { valid: true, discount: 100 }, // 15% discount
  // ... more codes
};


app.post('/api/initiateSession', async (req, res) => {
   const url = "https://apitest.myfatoorah.com/v2/InitiateSession";
   const headers = {
     Authorization:
       "Bearer gfeOJzUq7K-9u3KgsPlrPWSbzTUPuS1rVUEwbqUJjeMHsLfsWoZgoXuhC0T3dib4LGeI-ttl3Oynxgw0uMuf1xKyGjmqvbRHaaas7B2SfYzH2vuWc2xXLwANaSSuW6la8tzqmyXkmVYH9nOxEnXtpa5kRfnyYJrjHzz58kvFQGqNzaoVHlP5Kb7WruKQ1_6mac_ueeEHhyTmDe89tqCXEm5DAmunUlc5KjbBgp8wE1fipASl5xQ0zuN6vBA3mp0rC1XxI69AtXehIB2wK-Rs6KmA09964kHpxGMIKWVcXZzJvpsqwwWpQCXY5y1nmNNfhI9SJfH2_wTn1_DtzpEbHbYHK70_wCfGHERyAYvCpVbr9r6x02x5t7cJ50U5RtHl1CGGeb-NjjhdYiHO9nWD_WMop1uFRQmn126W7shAQxgVIxOBviAYO9G6A3svU67U7aGCty6nPAzDdm5uJkfeVWSjam6GNdjOhSlwPXUBDkUAbWf-eThl6lTn6T0DZXEDoNW5EZWEAuUV90rW_upBQGFy4CseeJMUsvidkbsTxb3JiBWKHdiUxxyPsMX4GYXDLLAHRX_ufAFRKfmbCwOlGELjauMiuPCcv4o2bpvLNl9I5YRqeS1an-KNYJgaPAup3eGtDzespETDzS8ZX2smjUR22mHfLzaduKm7f3D3GOX8ynzraySsBh412axytAX_R3H3OEgWaS1-5MzTsrHwsv78RiWmKCO0lcQ8HsTr7ixOOB1s-t5XZM7V6fCW7oP-uXGX-sMOajeX65JOf6XVpk29DP6ro8WTAflCDANC193yof8-f5_EYY-3hXhJj7RBXmizDpneEQDSaSz5sFk0sV5qPcARJ9zGG73vuGFyenjPPmtDtXtpx35A-BVcOSBYVIWe9kndG3nclfefjKEuZ3m4jL9Gg1h2JBvmXSMYiZtp9MR5I6pvbvylU_PP5xJFSjVTIz7IQSjcVGO41npnwIxRXNRxFOdIUHn0tjQ-7LwvEcTXyPsHXcMD8WtgBh-wxR8aKX7WPSsT1O8d8reb2aR7K3rkV3K82K_0OgawImEpwSvp9MNKynEAJQS6ZHe_J_l77652xwPNxMRTMASk1ZsJL", // Replace with your actual API key
     "Content-Type": "application/json",
   };

   axios
     .post(url, {}, { headers: headers })
     .then((response) => {
       console.log("Session Initiated Successfully");
       console.log(response.data);
     })
     .catch((error) => {
       console.error("Error:", error.response.status, error.response.data);
     });
});


app.post("/send-card", async (req, res) => {
  const { cardData, userPhone, method } = req.body; // Extract data from request body

  try {
    let messageId;

    if (method === "whatsapp") {
      // Send a WhatsApp message
      const from = "14157386102"; // Your WhatsApp number from Vonage
      const to = "201201095475"; // The recipient's number
      const text = "good"; // The text message

      vonage.channel.send(
        { type: "whatsapp", number: to },
        { type: "whatsapp", number: from },
        {
          content: {
            type: "text",
            text: text,
          },
        },
        (err, data) => {
          if (err) {
            console.error(err);
          } else {
            messageId = data.message_uuid;
            res.send({ success: true, messageId });
          }
        }
      );
    } else if (method === "sms") {
      // Send an SMS message
      vonage.message.sendSms(
        "VONAGE_NUMBER",
        userPhone,
        cardData,
        (err, responseData) => {
          if (err) {
            console.log(err);
          } else {
            if (responseData.messages[0]["status"] === "0") {
              messageId = responseData.messages[0]["message-id"];
              res.send({ success: true, messageId });
            } else {
              console.log(
                `Message failed with error: ${responseData.messages[0]["error-text"]}`
              );
            }
          }
        }
      );
    } else {
      return res.status(400).send({ error: "Invalid messaging method" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
  // const text = 'A text message sent using the Vonage SMS API'
// const from = "Vonage APIs";
// const to = "1201095475";
//  const text = "A text message sent using the Vonage SMS API";

//  async function sendSMS() {
//    await vonage.sms
//      .send({ to, from, text })
//      .then((resp) => {
//        console.log("Message sent successfully");
//        console.log(resp);
//      })
//      .catch((err) => {
//        console.log("There was an error sending the messages.");
//        console.error(err);
//      });
//  }

//  sendSMS();
//  res.status(200)
});


// Sample data array - replace with your actual data retrieval logic
// Sample data array with dummy objects
// CROWD
const cardsData = [
{
    id: 0,
    name: "Gift Card A",
    price: 100,
    brand: "HEZEL",
    imageUrl: "https://i.ibb.co/bBF9Px6/shop0.png",
    description: "Amazon Gift Card worth $100",
  },
  {
    id: 1,
    name: "Gift Card A",
    price: 100,
    brand: "GETHER 2",
    imageUrl: "https://i.ibb.co/DkfXmPN/shop1.jpg",
    description: "Amazon Gift Card worth $100",
  },
  {
    id: 2,
    name: "Gift Card B",
    price: 200,
    brand: "ELCT",
    imageUrl: "https://i.ibb.co/FVMr576/shop2.png",
    description: "Apple Store Gift Card worth $200",
  },
  {
    id: 3,
    name: "Gift Card C",
    price: 300,
    brand: "THE POP UP",
    imageUrl: "https://i.ibb.co/PTcKjC2/shop3.png",
    description: "Google Play Gift Card worth $300",
  },
  {
    id: 4,
    name: "Gift Card D",
    price: 100,
    brand: "DURMA",
    imageUrl: "https://i.ibb.co/yqvgtWJ/shop4.png",
    description: "Steam Gift Card worth $100",
  },
  {
    id: 5,
    name: "Gift Card E",
    price: 200,
    brand: "FUN VIBES",
    imageUrl: "https://i.ibb.co/6YQbQtg/shop5.png",
    description: "PlayStation Gift Card worth $200",
  },
  {
    id: 6,
    name: "Gift Card E",
    price: 200,
    brand: "RUMORS",
    imageUrl: "https://i.ibb.co/0XT0TM0/shop6.png",
    description: "PlayStation Gift Card worth $200",
  },
  {
    id: 7,
    name: "Gift Card E",
    price: 200,
    brand: "KIN",
    imageUrl: "https://i.ibb.co/68ZnHbD/shop7.png",
    description: "PlayStation Gift Card worth $200",
  },
  {
    id: 8,
    name: "Gift Card E",
    price: 200,
    brand: "SHAHIN",
    imageUrl: "https://i.ibb.co/NZcqYk2/shop8.png",
    description: "PlayStation Gift Card worth $200",
  },
  {
    id: 9,
    name: "Gift Card E",
    price: 200,
    brand: "4TWINS",
    imageUrl: "https://i.ibb.co/841wCL7/shop9.png",
    description: "PlayStation Gift Card worth $200",
  },
  {
    id: 9,
    name: "Gift Card E",
    price: 300,
    brand: "CROWD",
    imageUrl: "https://i.ibb.co/2MFhbkb/shop10.png",
    description: "PlayStation Gift Card worth $200",
  },
 
   {
    id: 11,
    name: "Gift Card F",
    price: 500,
    brand: "NAGD",
    imageUrl: "https://i.ibb.co/QK0gpFG/shop12.png", // Note: This image URL may not be correct as it's the same as the previous one
    description: "PlayStation Gift Card worth $200",
  }, 
   {
    id: 12,
    name: "Gift Card F",
    price: 500,
    brand: "MOVEN",
    imageUrl: "https://i.ibb.co/BVVxvkT/shop14.png", // Note: This image URL may not be correct as it's the same as the previous one
    description: "PlayStation Gift Card worth $200",
  }, 
  
  //
  //  ... add more objects as necessary
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
