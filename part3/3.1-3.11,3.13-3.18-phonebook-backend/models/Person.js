const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => console.log("Connected to MongoDB!"))
  .catch((error) => console.log("Error connecting to MongoDB:", error.message));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

module.exports = mongoose.model("Person", personSchema);
