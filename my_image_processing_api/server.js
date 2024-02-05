const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const axios = require('axios');
// const { Vonage } = require("@vonage/server-sdk");
const mongoose = require("mongoose");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();
const {uploadToImgur} = require('./imgUploader');
// Replace with your MongoDB URI

// const { Twilio } = require('twilio');
// Twilio setup - replace with your Twilio credentials
// const accountSid = 'ACa5fb2c6c60350e228fd36d3a66ee8b6a';
// const authToken = '17b492667376584b4ac557fbf0503df6';
// const client = new Twilio(accountSid, authToken);
// 
// 
// const mongoose = require("mongoose");
// Replace with your MongoDB URI
const mongoURI = "mongodb+srv://sarga:A111a111@cluster0.fjdnf.mongodb.net/";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


const Schema = mongoose.Schema;

const brandSchema = new Schema({
  logoName: String,
  logoImage: String, // You might want to handle images differently, e.g., storing them in a file storage service
  brandDescription: String,
  logoWithoutBackground: String, // Same note as above
});

const cardsSchema = new Schema({
  back: String,
  front: String, // You might want to handle images differently, e.g., storing them in a file storage service
 
});

const shapesSchema = new Schema({
  image:String, // You might want to handle images differently, e.g., storing them in a file storage service
});
const Brand = mongoose.model("Brand", brandSchema); // Create a model for brands
const Card = mongoose.model("Card", cardsSchema); // Create a model for cards
const Shape = mongoose.model("Shape", shapesSchema); // Create a model for shapes


// const vonage = new Vonage({
//   apiKey: "d92c0b6a",
//   apiSecret: "Ol9cYQoNaa1TwUk8",
//   applicationId: " dd2cd09a-2c73-4a95-99bc-cc156a670709",
//   privateKey: "./private.key",
// });



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





app.post("/process-payment", async (req, res) => {
    const axios = require("axios");

    const { paymentMethod, amount, currency, customerDetails } = req.body;

    // Define the payment data based on the received details
    const paymentData = {
        PaymentMethodId: determinePaymentMethodId(paymentMethod), // Implement this function based on your logic
        InvoiceValue: amount,
        CurrencyIso: currency,
        CustomerName: customerDetails.name,
        CustomerEmail: customerDetails.email,
        CustomerMobile: customerDetails.mobile,
        // ... add any other required fields
    };

    const url = process.env.MYFATOORAH_API_URL + '/v2/SendPayment';

    try {
        const response = await axios.post(url, paymentData, {
            headers: {
                Authorization: `Bearer ${process.env.MYFATOORAH_API_KEY}`,
                "Content-Type": "application/json",
            },
        });

        // Handle the response from MyFatoorah API
        res.json(response.data);
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ error: "Error processing payment" });
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
const myFatoorahApiKey = process.env.MYFATOORAH_API_KEY;
const myFatoorahApiUrl = process.env.MYFATOORAH_API_URL;

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

function determinePaymentMethodId(paymentMethod) {
    // Define your logic to map paymentMethod to MyFatoorah's PaymentMethodId
    // For example:
    if (paymentMethod === 'mada') {
        return 2; // Assuming '2' is the ID for MADA in MyFatoorah
    }
    // Add more conditions as needed for different payment methods
    return 1; // Default PaymentMethodId
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
   const url = "https://api-sa.myfatoorah.com/v2/InitiateSession";
   const headers = {
     Authorization:
       "Bearer yoyMut7ruJnWX54Ai3S0cDbmEbeJrwOBCxC6EWUOcCk7rCeiLSPOViLoqfB8yueg6lRUwgdptSUgzd44_15apuAlsc9fpCMpdP-Yk-qYE0O9acZxBcGKPRoEmH2fRmH8ALHRhKsvMail6XCCeH2_DPNHd_Zy5uwHiD-EEzJf4wltdZyKMWtIsNdCMBZ8HYvMUa4gN6yZft-OvADDDG6jUxyB3bX1y3QBJYj8N_U0GS-RJp4RgnixWJSuclAzEKZWjCWPp8d-_1emGWFtyOwvKvyTBu0177sTXadNNqlkyWab_ZbNeB1nCpUlfkUvD0mJguNjicMjjRjPDpBG-U_mDBMIgWPCTzkPz9KhygQJFpsO_PzH3VZW8Usmg9xbH-75jsuW0XZWs2oWXAkrsR83ePzhHKvpzwIwaMBoCtzUmnoV3O9iNOG_IvnxL0qr8VhNXV1MOvXQqcuHDqQB5XJLqhc9pv2tPhpNGDtzAhKGU5ASBxyewiDLAsVZFKrPTQdOCbReRf3BhUCR3wsWUYTFgjRT1UvsrmNZnsUoocVhvp8XMBfCff5pNWUIwAK4lgLvwhbti-xdg_pNCmAxYDoYlLskc2rU-wRlTjCq26UrTC4X8EULrimkObxt2_pA6l8e3d-rye3FXGmtSkv4IggkFufViLEGbIc1vhViW-yrEd-aJbJaeieDvNOxqV1m4Kd3QJibTCom7PWAm6Zoyoyp3acm2VZEJ8z1ycN9bGTn1od59OW6", // Replace with your actual API key
     "Content-Type": "application/json",
   };

   axios
     .post(url, {
  "CustomerIdentifier": "123"

}, { headers: headers })
     .then((response) => {
       console.log("Session Initiated Successfully");
       console.log(response.data);
            res.send(response.data)
     })
     .catch((error) => {
       console.error("Error:", error.response.status, error.response.data);
     });

});


app.post("/send-card", async (req, res) => {
  const { cardData, userPhone, method } = req.body; // Extract data from request body

  // try {
  //   let messageId;

  //   if (method === "whatsapp") {
  //     // Send a WhatsApp message
  //     const from = "14157386102"; // Your WhatsApp number from Vonage
  //     const to = userPhone; // The recipient's number
  //     const text = "good"; // The text message

  //     vonage.channel.send(
  //       { type: "whatsapp", number: to },
  //       { type: "whatsapp", number: from },
  //       {
  //         content: {
  //           type: "text",
  //           text: text,
  //         },
  //       },
  //       (err, data) => {
  //         if (err) {
  //           console.error(err);
  //         } else {
  //           messageId = data.message_uuid;
  //           res.send({ success: true, messageId });
  //         }
  //       }
  //     );
  //   } else if (method === "sms") {
  //     const from = "Abdullah mostaql";
  //     const to = userPhone;
  //     const text = "A text message sent using the Vonage SMS API";

  //     async function sendSMS() {
  //       await vonage.sms
  //         .send({ to, from, text })
  //         .then((resp) => {
  //           console.log("Message sent successfully");
  //           console.log(resp);
  //         })
  //         .catch((err) => {
  //           console.log("There was an error sending the messages.");
  //           console.error(err);
  //         });
  //     }

  //     sendSMS();
async function sendSMS() {
  try {
    const phoneNumber = '+201201095475'; // The recipient's phone number in E.164 format (e.g., +1234567890)
    const message = 'Hello, GiuveAgift!';

    const response = await axios.post(
      `${infobipApiBaseUrl}/sms/2/text/single`,
      {
        from: "GiveGift", // Use your Infobip sender ID
        to: "+966556446053",
        text: message,
      },
      {
        headers: {
          Authorization: `App ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log('SMS sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending SMS:', error.response ? error.response.data : error.message);
  }
}
sendSMS()
      // // Send an SMS message
      // vonage.message.sendSms(
      //   "VONAGE_NUMBER",
      //   userPhone,
      //   cardData,
      //   (err, responseData) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       if (responseData.messages[0]["status"] === "0") {
      //         messageId = responseData.messages[0]["message-id"];
      //         res.send({ success: true, messageId });
      //       } else {
      //         console.log(
      //           `Message failed with error: ${responseData.messages[0]["error-text"]}`
      //         );
      //       }
      //     }
      //   }
      // );
  //   } else {
  //     return res.status(400).send({ error: "Invalid messaging method" });
  //   }
  // } catch (error) {
  //   res.status(500).send({ error: error.message });
  // }
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

app.post(
  "/submit-form",
  upload.fields([
    { name: "logoImage", maxCount: 1 },
    { name: "logoWithoutBackground", maxCount: 1 },
  ]),
  async (req, res) => {



    try {
      // Extract text fields
      const { logoName, brandDescription } = req.body;

      // Extract file fields
      const logoImage = req.files["logoImage"]
        ? req.files["logoImage"][0]
        : null;
      const logoWithoutBackground = req.files["logoWithoutBackground"]
        ? req.files["logoWithoutBackground"][0]
        : null;


        console.log(req.files);
      // Upload files to Imgur and get URLs
      const logoImageUrl = logoImage
        ? await uploadToImgur(logoImage.path)
        : null;
      const logoWithoutBgUrl = logoWithoutBackground
        ? await uploadToImgur(logoWithoutBackground.path)
        : null;

      const newBrand = new Brand({
        logoName,
        logoImage: logoImageUrl,
        brandDescription,
        logoWithoutBackground: logoWithoutBgUrl,
      });

      await newBrand.save();
      res.status(201).send("Form data saved");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error saving form data");
    }
  }
);




app.post(
  "/submit-card",
  upload.fields([
    { name: "cardFront", maxCount: 1 },
    { name: "cardBack", maxCount: 1 },
  ]),
  async (req, res) => {



    try {
      // Extract text fields
      const { price } = req.body;

      // Extract file fields
      const cardFront = req.files["cardFront"]
        ? req.files["cardFront"][0]
        : null;
      const cardBack = req.files["cardBack"]
        ? req.files["cardBack"][0]
        : null;


      // Upload files to Imgur and get URLs
      const cardFrontImageUrl = cardFront
        ? await uploadToImgur(cardFront.path)
        : null;
      const cardBackImageUrl = cardBack
        ? await uploadToImgur(cardBack.path)
        : null;

      const newBrand = new Card({
        price:price,
        cardFront: cardFrontImageUrl,
        cardBack:cardBackImageUrl,
      
      });

      await newBrand.save();
      res.status(201).send("Form data saved");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error saving form data");
    }
  }
);
app.post('/submit-custom-card',  upload.array('shapes'),async (req, res) => {
    const colors = req.body.color; // Array of colors
    const shapeFiles = req.files; // Array of shape files
console.log(shapeFiles)
    // Upload each shape file to Imgur and get the URLs
    // const shapeImageUrls = await Promise.all(
    //     req.files.map(file => uploadToImgur(file.path))
    // );

    // // Create a new CustomCard instance
    // const newCustomCard = new Shape({
    //     colors: colors, // Assuming colors is an array of color strings
    //     shapeImages: shapeImageUrls // Array of Imgur URLs
    // });

    // try {
    //     await newCustomCard.save(); // Save the new CustomCard to the database
    //     res.status(201).send('Custom card data received and processed.');
    // } catch (error) {
    //     console.error('Error saving custom card data', error);
    //     res.status(500).send('Error processing custom card data');
    // }
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
