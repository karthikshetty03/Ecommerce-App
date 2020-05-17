const express = require("express");
const authRouter = require("./Routes/admin/auth");
const productsRouter = require("./Routes/admin/products");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public")); //make everthing available in public folder to the outside world

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    keys: ["dsfgvbhgdfsadrfwfsedcqads324r4w"],
  })
);

app.use(authRouter);
app.use(productsRouter);

//const bodyParser = (req, res, next) => {
//  if (req.method == "POST") {
//    req.on("data", (data) => {x
//      const parsed = data.toString("utf8").split("&");
//      const formData = {};

//      for (const pair of parsed) {
//        const [key, value] = pair.split("=");
//        formData[key] = value;
//      }

//      req.body = formData;
//      next();
//    });
//  } else {
//    next();
//  }
//};

app.listen(8080, () => {
  console.log("Listening");
});
