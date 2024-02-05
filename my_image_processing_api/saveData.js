const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
// Replace with your MongoDB URI
const mongoURI = "your_mongodb_uri";



const Schema = mongoose.Schema;

const brandSchema = new Schema({
  logoName: String,
  logoImage: String, // You might want to handle images differently, e.g., storing them in a file storage service
  brandDescription: String,
  logoWithoutBackground: String, // Same note as above
});

module.exports = mongoose.model("Brand", brandSchema);




mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;




app.listen(port, () => console.log(`Server running on port ${port}`));
