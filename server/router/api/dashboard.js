const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

mongoose.connect(
  "mongodb+srv://thafsil:test123456@thafsil-4zp3x.mongodb.net/Thafsil?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const postSchema = new mongoose.Schema({
  name: String,
  password: String
});

const PostModel = mongoose.model("PostModel", postSchema);

//Get
router.get("/dashboard/get", (req, res) => {
  PostModel.find({}, (err, data) => {
    console.log("im in");
    res.send(data);
  });
});

//post
router.post("/dashboard/post", (req, res) => {
  PostModel.create(
    {
      name: req.body.userName,
      password: req.body.userPassword
    },
    (err, data) => {
      res.send({
        name : data.name,
        password : data.password
      }).status(200);
    }
  );
});

//Delete
router.delete("/:id", (req, res) => {
  PostModel.deleteOne({ _id: req.params.id }, (err, data) => {
    res.send(data).status(200);
  });
});

module.exports = router;
