const express = require("express");
const authRouter = require("./Routes/admin/auth");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    keys: ["dsfgvbhgdfsadrfwfsedcqads324r4w"],
  })
);

app.use(authRouter);

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

app.listen(3000, () => {
  console.log("Listening");
});
