const express = require('express');
const app = express();
const port = 3000;
const stripe = require('stripe')('your_stripe_secret_key');
const { Twilio } = require('twilio');
// Twilio setup - replace with your Twilio credentials
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = new Twilio(accountSid, authToken);


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


const calculateOrderAmount = (items) => {
  // Replace this with the logic to calculate the order amount
  // based on the `items` parameter from the request
  return 1400; // Example amount in cents ($14.00)
};


app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'usd',
      // Add any other required payment intent parameters here
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
