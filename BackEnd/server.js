const express = require("express");
const app = express();
const connectDB = require("./config.js/connect");
const port = 3000;
const userRouter = require("./Routes/user");
const postRouter = require("./Routes/post");
require("./auth")
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
connectDB();

app.use(session({
  secret: "cats",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
))

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/main",
    failureRedirect: "http://localhost:5173/login",
  })
);

app.use("/users", userRouter);
app.use("/posts", postRouter);


app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    req.session.destroy(() => {
      res.send('Goodbye!');
    });
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on PORT: ${port}`);
});

module.exports = app;
