const mongoose = require("mongoose");

const blogModel = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogModel.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogModel);
