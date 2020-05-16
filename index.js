const express = require("express");
const UsersRepo = require("./Repositories/users");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["dsfgvbhgdfsadrfwfsedcqads324r4w"],
  })
);

app.get("/signup", (req, res) => {
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

app.get("/signin", (req, res) => [
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

app.post('/signin', async (req, res)=> {

  console.log(req.body);
  const {email, pass} = req.body;
  const user = await UsersRepo.getOneBy({email});

  if(!user) {
    res.send("email not found");
  }

  if(user.pass !== pass) {
    res.send("Invalid password");
  }

  req.session.userId = user.id;
  res.send('Signed in successfully');
})

app.get('/signout', (req, res) => {
  req.session = null;
  res.send("You are logged out");
})

app.post("/signup", async (req, res) => {
  const { email, pass, passconf } = req.body;
  if(!email || !pass || !passconf) {
    return res.send("All fields must be filled");
  }

  const existingUser = await UsersRepo.getOneBy({ email });
  console.log(existingUser);
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

app.listen(3000, () => {
  console.log("Listening");
});
