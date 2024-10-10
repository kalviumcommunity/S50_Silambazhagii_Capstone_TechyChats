const express = require("express");
const app = express();
const connectDB = require("./config.js/connect");
const port = 3000;
const userRouter = require("./Routes/user");
const postRouter = require("./Routes/post");
require("./GoogleAuth/auth")
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
    origin: "https://lively-chebakia-535084.netlify.app",
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
  passport.authenticate("google", { failureRedirect: "https://lively-chebakia-535084.netlify.app/login" }),
  (req, res) => {
    // Successful authentication
    const userId = req.user._id;
    const name = req.user.name;
    // Redirect to main with user data
    res.redirect(`https://lively-chebakia-535084.netlify.app/main?userId=${userId}&name=${encodeURIComponent(name)}`);
  }
);

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    req.session.destroy(function (err) {
      if (err) {
        return res.status(500).send("Error destroying session");
      }
      res.send("User logged out successfully");
    });
  });

});

app.listen(port, () => {
  console.log(`🚀 Server running on PORT: ${port}`);
});

module.exports = app;
