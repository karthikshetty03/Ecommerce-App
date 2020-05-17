const express = require("express");
const UsersRepo = require("../../Repositories/users");
const router = express.Router();
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const { check, validationResult } = require("express-validator");

const {
  requireEmail,
  requirePass,
  requirePassconf,
  requireValidEmail,
  requireValidPass,
} = require("./validators");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePass, requirePassconf],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signupTemplate({ req, errors }));
    }

    const { email, pass, passconf } = req.body;
    const user = await UsersRepo.create({ email, pass });
    req.session.userId = user.id;
    res.send(`Account created with email ${email}`);
  }
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  "/signin",
  [requireValidEmail, requireValidPass],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(signinTemplate({ errors }));
    }

    const { email, pass } = req.body;
    const user = await UsersRepo.create({ email, pass });
    req.session.userId = user.id;
    res.send("Signed in successfully");
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

//make all this different routers available to other files of our project
module.exports = router;
