const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  data: {
    number: String,
    firstName: String,
    lastName: String,
    email: String,
    dept: String,
    year: String,
    gender: String,
    dob: Date,
    file: {
      name: String,
      url: String,
    },
  },
});

module.exports = mongoose.model("Item", ItemSchema);
