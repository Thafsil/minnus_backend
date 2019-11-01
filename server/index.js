const express = require("express");
const cors = require("cors");

const app = express();

// app.use(cors({
//     origin: '*'
// }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const post = require("./router/api/post");

app.use("/api/post", post);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server connected on ${port}`));
