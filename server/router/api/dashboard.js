const express = require("express");
const mongoose = require("mongoose");
const PostModel =require("../model/postModel");
const router = express.Router();

mongoose.connect(
  "mongodb+srv://thafsil:test123456@thafsil-4zp3x.mongodb.net/Thafsil?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//Get
router.get("/dashboard/get", (req, res) => {
  PostModel.find({}, (err, data) => {
    res.send(data);
  });
});

//login validation
router.post("/dashboard/login/post", (req, res) => {
  PostModel.findOne({
    name: req.body.userName,
    password: req.body.password
  }, (err, data) => {
    console.log(data);
    if (err) {
      res.status(500).send('internal error')
    } else {
      if (data != null) {
        res.status(200).json({
          message: "Success"
        })
      } else {
        res.status(400).json({
          err: "data not fount"
        })
      }
    }
  })
})

//post
router.post("/dashboard/post", (req, res) => {
  PostModel.create(
    {
      name: req.body.userName,
      password: req.body.userPassword
    },
    (err, data) => {
      res.send({
        name: data.name,
        password: data.password
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
