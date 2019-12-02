const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    name: String,
    password: String
  });

  module.exports=mongoose.model("PostModel",postSchema)