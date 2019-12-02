const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    productName: String,
    category: String,
    quantity: Number,
    color: String,
  });

  module.exports = mongoose.model("ProductsModel", productSchema);