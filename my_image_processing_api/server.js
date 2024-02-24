const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const axios = require('axios');
const unirest = require("unirest");
const cronJob = require('node-cron');
// const { Vonage } = require("@vonage/server-sdk");
const mongoose = require("mongoose");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();
const { uploadToImgur } = require('./imgUploader');
const { collapseClasses } = require('@mui/material');
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
  .connect(mongoURI)
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
  cardFront: String,
  cardBack: String,
  logoImage: String,
  price: String,
  brand: String,
  
});

const shapesSchema = new Schema({
  color: String,
  shapes: Array // You might want to handle images differently, e.g., storing them in a file storage service
});
const Brand = mongoose.model("Brand", brandSchema); // Create a model for brands
const Card = mongoose.model("cards", cardsSchema); // Create a model for cards
const Shape = mongoose.model("Shape", shapesSchema); // Create a model for shapes

const predefinedDataSchema = new mongoose.Schema({
  color: String,
  shapes: [String],
});

const PredefinedData = mongoose.model('shapes', predefinedDataSchema);


app.use(cors())


app.use(express.json());
const receiverInfoSchema = new mongoose.Schema({
   phone: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
 
}, { _id: false });

const cartSchema = new mongoose.Schema({
  items: [{
    cardFront: {
      type: String,
      required: true
    },
    cardBack: {
      type: String,
      required: true
    },
    logoImage: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
     link: {
    type: String,
  },
  date: {
    type: Date,
  },
  receiverInfo: receiverInfoSchema
  }],
 
   // Embedding receiverInfo schema
}, { timestamps: false });





// New custom card schema to include all properties of your custom card
const customCardSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true
  },
  shape: {
    type: String,
    required: true
  },
  brand: brandSchema, // Embedding the brand schema
  message: {
    type: String,
    required: true
  },
  textColor: {
    type: String,
    required: true
  },
  font: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  receiverInfo: receiverInfoSchema // Embedding the receiverInfo schema
});

const cartCustomSchema = new mongoose.Schema({
  items: [customCardSchema], // Array of customCardSchema for custom cards
  // Add any additional fields you might need for the cart
}, { timestamps: true });


const Cart = mongoose.model('carts', cartSchema);
app.post('/api/cartReady', async (req, res) => {
  try {
    const cart = new Cart({
      items: [req.body.card], // Assuming req.body.card contains the item data
      receiverInfo: req.body.receiverInfo, // Correctly pulling receiverInfo from the request body
    });

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
app.post('/api/cartCustom', async (req, res) => {
  try {
    // Directly pass req.body assuming it matches the custom card structure
    const cart = new cartCustomSchema({
      items: [req.body], // req.body should match the CustomCard schema
    });

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Add item to cart
app.post('/api/cart/add', async (req, res) => {
  console.log(req.body.receiverInfo)
    try {
    // Create a new cart with the received items
    const cart = new Cart({
      items: [req.body.card], // Assuming req.body.card contains the item data
      receiverInfo: req.body.receiverInfo // Assuming req.body.receiverInfo contains the receiver info
      // You might need to adjust these according to the actual structure of req.body
    });

    await cart.save();
    console.log(cart)
    res.status(201).json(cart); // Send back the newly created cart
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
// Remove item from cart
app.delete('/api/cart/remove/:cartId', async (req, res) => {
  const cartId = req.params.cartId;
  try {
    const result = await Cart.findByIdAndDelete(cartId);
    if (result) {
      res.json({ message: 'Cart removed successfully', _id: cartId });
    } else {
      res.status(404).send('Cart not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});






// Search to get specific cart
app.get('/api/cart/:cartId', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).send('Cart not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
})


cronJob.schedule("30 5 13 * * *", async () => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    const carts = await Cart.find({
      date: {
        $gte: currentDate,
        $lt: nextDate
      }
    });
    for (const cart of carts) {
      // Send Link as a message in WhatsApp
      const request = unirest("GET", "https://api.4whats.net/sendMessage/");
      request.query({
        "instanceid": process.env.INSTANCE_ID,
        "token": process.env.API_TOKEN_whatapp,
        "phone": `${cart.receiverInfo.phone}`,
        "body": `${cart.link}`
      });
      request.end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log(res.body);
      });
    }
  } catch (error) {
    console.log(error);
  }
})



app.post("/api/process-payment", async (req, res) => {
  const axios = require("axios");
  // Define the payment data based on the received details
  const paymentData = {
    PaymentMethodId: '2',
    CustomerName: 'Ahmed',
    DisplayCurrencyIso: 'KWD',
    MobileCountryCode: '+965',
    CustomerMobile: '12345678',
    CustomerEmail: 'xx@yy.com',
    InvoiceValue: 100,
    CallBackUrl: 'https://google.com',
    ErrorUrl: 'https://google.com',
    Language: 'en',
    CustomerReference: 'ref 1',
    CustomerCivilId: 12345678,
    UserDefinedField: 'Custom field',
    ExpireDate: '',
    CustomerAddress:
    {
      Block: '',
      Street: '',
      HouseBuildingNo: '',
      Address: '',
      AddressInstructions: ''
    },
    InvoiceItems: [{ ItemName: 'Product 01', Quantity: 1, UnitPrice: 100 }]
    // ... add any other required fields
  };

  const url = process.env.MYFATOORAH_API_URL + '/v2/ExecutePayment';

  try {
    const executePayment = await axios.post(url, paymentData, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.MYFATOORAH_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    //console.log(executePayment['data']['Data']['PaymentURL']);
    const paymentURL = executePayment['data']['Data']['PaymentURL'];
    const response = await axios.post(paymentURL, {
      paymentType: 'card',
      card: { Number: '5123450000000008', expiryMonth: '05', expiryYear: '21', securityCode: '100' },
      saveToken: false
    }, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.MYFATOORAH_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    // Handle the response from MyFatoorah API
    console.log("Payment processed successfully:", response.status);
    res.status(200).json(response.status)
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
// const myFatoorahApiKey = process.env.MYFATOORAH_API_KEY;
// const myFatoorahApiUrl = process.env.MYFATOORAH_API_URL;

// Mock API keys storage
//const validApiKeys = ["12345", "67890"]; // In real scenario, this should be stored securely

// Middleware for API key authentication
// function authenticateApiKey(req, res, next) {
//   const apiKey = req.headers["x-api-key"];
//   if (validApiKeys.includes(apiKey)) {
//     next();
//   } else {
//     res.status(401).json({ message: "Invalid API Key" });
//   }
// }


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



app.get("/stores", async (req, res) => {
  const { price, brands, page = 1, limit = 6 } = req.query;


  try {
    // Fetch all brands data from MongoDB
    let allBrands = await Brand.find({});



    // Pagination logic
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBrands = allBrands.slice(startIndex, endIndex);

    res.json({
      data: paginatedBrands,
      totalPages: Math.ceil(allBrands.length / limit),
    });
  } catch (error) {
    console.error("Error fetching brands data", error);
    res.status(500).json({ message: "Error fetching brands data" });
  }
});

app.get("/api/cards", async (req, res) => {
  const { price, brands, page = 1, limit = 6 } = req.query;
  let filter = {};

  if (price) {
    let [minPrice, maxPrice] = price.split("-").map(Number);
    filter.price = { $gte: minPrice, $lte: maxPrice };
  }

  if (brands) {
    filter.brand = { $in: brands.split(",") };
  }
  console.log(filter)
  try {
    const cards = await Card.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Card.countDocuments(filter);

    res.json({
      data: cards,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching cards data", error);
    res.status(500).json({ message: "Error fetching cards data" });
  }
});



app.get('/get-custom-cards', async (req, res) => {
  try {
    // Fetch predefined data (colors and shapes)
    const predefinedData = await PredefinedData.find({});
    const colors = predefinedData.map(data => data.color);
    const shapes = predefinedData.reduce((acc, data) => [...acc, ...data.shapes], []);

    // Fetch logoWithoutBackground from Brand collection
    const brandsData = await Brand.find({});
    const logoWithoutBackgroundUrls = brandsData.map(brand => brand.logoWithoutBackground);

    const responseData = {
      colors: colors,
      shapes: shapes,
      logoWithoutBackgroundUrls: logoWithoutBackgroundUrls
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching predefined data", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});


app.get('/price', async (req, res) => {
  try {
    // Fetch predefined data (colors and shapes)
    const predefinedData = await PredefinedData.find({});


    // Fetch logoWithoutBackground from Brand collection
    const brandsData = await Brand.find({});
    const logoWithoutBackgroundUrls = brandsData.map(brand => brand.logoWithoutBackground);

    const responseData = {
      colors: colors,
      shapes: shapes,
      logoWithoutBackgroundUrls: logoWithoutBackgroundUrls
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching predefined data", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});



app.get('/get-card-data', async (req, res) => {
  const { page = 1, limit = 6 } = req.query;

  try {
    // Fetch card data
    const cards = await Card.find({});
    console.log(cards.length)

    // const logoImages = brands.map(brand => brand.logoImage);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCards = cards.slice(startIndex, endIndex);
    const responseData = {
      cards: paginatedCards,
      totalPages: Math.ceil(cards.length / limit),
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching card data", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.get('/get-shops-logos', async (req, res) => {


  try {
    // Fetch card data
    const brandsData = await Brand.find({});


    // const logoImages = brands.map(brand => brand.logoImage);

    const responseData = {
      brandsData: brandsData,

    };

    res.json(brandsData);
  } catch (error) {
    console.error("Error fetching card data", error);
    res.status(500).json({ message: "Error fetching data" });
  }
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

app.get('/shapes', async (req, res) => {
  try {
    // Fetch predefined data (colors and shapes)
    const predefinedData = await PredefinedData.find({});
    const colors = predefinedData.map(data => data.color);
    const shapes = predefinedData.reduce((acc, data) => [...acc, ...data.shapes], []);

    // Fetch logoWithoutBackground from Brand collection

    const responseData = {

      shapes: shapes,

    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching predefined data", error);
    res.status(500).json({ message: "Error fetching data" });
  }
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
    { name: "logoImage", maxCount: 1 },
    { name: "cardFront", maxCount: 1 },
    { name: "cardBack", maxCount: 1 },


  ]),
  async (req, res) => {



    try {
      // Extract text fields
      const { price, brand } = req.body;

      // Extract file fields
      const logoImage = req.files["logoImage"]
        ? req.files["logoImage"][0]
        : null;
      const cardFront = req.files["cardFront"]
        ? req.files["cardFront"][0]
        : null;
      const cardBack = req.files["cardBack"]
        ? req.files["cardBack"][0]
        : null;

      // Upload files to Imgur and get URLs
      const logoImageUrl = logoImage
        ? await uploadToImgur(logoImage.path)
        : null;
      // Upload files to Imgur and get URLs
      const cardFrontImageUrl = cardFront
        ? await uploadToImgur(cardFront.path)
        : null;
      const cardBackImageUrl = cardBack
        ? await uploadToImgur(cardBack.path)
        : null;

      const newBrand = new Card({
        price: price,
        cardFront: cardFrontImageUrl,
        cardBack: cardBackImageUrl,
        logoImage: logoImageUrl,
        brand: brand
      });

      await newBrand.save();
      res.status(201).send("Form data saved");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error saving form data");
    }
  }
);
app.post('/submit-custom-card', upload.fields([
  { name: 'shapes', maxCount: 100 }
]), async (req, res) => {
  const colors = req.body.color; // Array of colors
  const shapeFiles = req.files['shapes']; // Array of shape files
  // Extract file fields

  try {

    const shapeImageUrls = await Promise.all(
      shapeFiles.map(file => uploadToImgur(file.path))
    );

    // Create a new CustomCard instance
    const newCustomCard = new Shape({
      color: colors, // Assuming colors is an array of color strings
      shapes: shapeImageUrls // Array of Imgur URLs
    });


    await newCustomCard.save(); // Save the new CustomCard to the database
    res.status(201).send('Custom card data received and processed.');
  } catch (error) {
    console.error('Error saving custom card data', error);
    res.status(500).send('Error processing custom card data');
  }
});

// Sample data array - replace with your actual data retrieval logic
// Sample data array with dummy objects
// CROWD
//




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
