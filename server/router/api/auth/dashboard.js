const express = require("express");
const mongoose = require("mongoose");
const PostModel = require("../../model/postModel");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const router = express.Router();

mongoose.connect(
  "mongodb+srv://thafsil:test123456@thafsil-4zp3x.mongodb.net/Thafsil?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//Get
router.get("/dashboard/get", auth, (req, res) => {
  let user = req.user;
  PostModel.findById(user.id, (err, data) => {
    if (err) console.error("Somehting went wrong");
    else {
      res.json({ data });
    }
  });
});

//login validation
router.post("/login", async (req, res) => {
  let name = req.body.userName;
  if (!name) throw err;
  const user = await PostModel.findOne({
    name: name
  });

  if (!user) return res.status(400).json({ message: "invalid credentials" });
  else {
    PostModel.findOne(
      {
        name: req.body.userName,
        password: req.body.password
      },
      (err, data) => {
        if (data == null || data == undefined) {
          return res.status(404).json({
            message: "User not found"
          });
        } else {
          let payload = {
            user: {
              id: data.id
            }
          };
          jwt.sign(payload, "jwtsecret", (err, token) => {
            if (err) console.error("Something went wrong");
            else {
              res.status(200).json({ token });
            }
          });
        }
      }
    );
  }
});

//User SIGNUP
//Follow similar pattern response throughout project
//will be easy to handle in front end.
router.post("/signup", async (req, res) => {
  let name = req.body.userName;
  if (!name)
    return res.status(400).json({
      message: "Invalid Credentials"
    });

  let user = await PostModel.findOne({ name: name });
  if (!user) {
    await PostModel.create(
      {
        name: req.body.userName,
        password: req.body.userPassword
      },
      (err, data) => {
        if (err) {
          return res.status(500).json({
            message: "Something went wrong"
          });
        } else {
          let payload = {
            user: {
              id: data.id
            }
          };

          jwt.sign(payload, "jwtsecret", (err, token) => {
            if (err) console.err("Something went wrong");
            else {
              res.status(200).json({
                message: "signed up successfully",
                token: token
              });
            }
          });
        }
      }
    );
  } else {
    res.status(400).json({
      message: "user already exists.! Please log in"
    });
  }
});

//Delete
router.delete("/:id", (req, res) => {
  PostModel.deleteOne({ _id: req.params.id }, (err, data) => {
    res.send(data).status(200);
  });
});

module.exports = router;
