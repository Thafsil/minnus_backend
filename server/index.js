const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

// app.use(cors({
//     origin: '*'
// }));
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json({}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const auth = require("./router/api/auth/dashboard");
const products = require("./router/api/products")

app.use("/api", auth);
app.use("/api", products);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server connected on ${port}`));
