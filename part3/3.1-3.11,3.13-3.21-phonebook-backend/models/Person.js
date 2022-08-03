const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => console.log("Connected to MongoDB!"))
  .catch((error) => console.log("Error connecting to MongoDB:", error.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    validate: {
      validator: (string) => !!string.replace(/\s/g, ""),
      message: "Invalid Name!",
    },
    required: true,
  },
  number: {
    type: String,
    minLength: 9,
    validate: {
      validator: (string) => {
        if (string.includes("-")) {
          const splitString = string.split("-");
          if (
            splitString.length > 2 ||
            splitString[0].length > 3 ||
            splitString[0].length < 2 ||
            !/^\d+$/.test(splitString[0]) ||
            !/^\d+$/.test(splitString[1])
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      },
      message: "Invalid Phone Number!",
    },
    required: true,
  },
});

module.exports = mongoose.model("Person", personSchema);
