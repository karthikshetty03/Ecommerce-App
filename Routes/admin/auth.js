const express = require("express");
const UsersRepo = require("../../Repositories/users");
const router = express.Router();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/signup", (req, res) => {
  res.send(`
  <div>
  Your id is ${req.session.userId}
  <form method = "POST">
    <input name = "email" placeholder="email"/>
    <input name = "pass" placeholder="password"/>
    <input name = "passconf" placeholder="password confirmation"/>
    <button>Sign up</button>
    </form>
  <div>
  `);
});

router.post("/signup", async (req, res) => {
  const { email, pass, passconf } = req.body;
  if (!email || !pass || !passconf) {
    return res.send("All fields must be filled");
  }

  const existingUser = await UsersRepo.getOneBy({ email });

  if (existingUser) {
    return res.send("Email already in use");
  }

  if (pass !== passconf) {
    return res.send("password and confirm password do not match");
  }

  const user = await UsersRepo.create({ email, pass });
  req.session.userId = user.id;
  res.send(`Account created with email ${email}`);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/signin", (req, res) => [
  res.send(`
  <div>
    <form method = "POST">
    <input name = "email" placeholder="email"/>
    <input name = "pass" placeholder="password"/>
    <button>Sign in</button>
    </form>
  </div>
  `),
]);

router.post("/signin", async (req, res) => {
  const { email, pass } = req.body;
  const user = await UsersRepo.getOneBy({ email });

  if (!user) {
    res.send("email not found");
  }

  const validPassword = await UsersRepo.comparePasswords(user.pass, pass);

  if (!validPassword) {
    res.send("Invalid password");
  }

  req.session.userId = user.id;
  res.send("Signed in successfully");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

//make all this different routers available to other files of our project
module.exports = router;
