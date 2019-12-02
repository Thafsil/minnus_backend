const express = require("express");
const mongoose = require("mongoose");
const ProductsModel = require("../model/productModel");
const router = express.Router();

mongoose.connect(
    "mongodb+srv://thafsil:test123456@thafsil-4zp3x.mongodb.net/Thafsil?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

//   post products
router.post("/product/post", (req, res) => {
    ProductsModel.create(
        {
            productName : req.body.productName,
            quantity : req.body.quantity,
            category : req.body.category,
            color : req.body.color
        }, (err, data)=> {
            res.json({
                productName : data.productName,
                quantity : data.quantity,
                category : req.body.category,
                color : data.color
            }).status(200)
        }
    )
})

//  get products
router.get("/products/get", (req,res)=> {
    ProductsModel.find({}, (err,data) => {
        console.log(data,'data');
        res.status(200).json(data);
    })
})

module.exports = router;
