const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../Schema/userModel");

require("dotenv").config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

console.log(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        console.log(profile._json.name);
        
        // Find user by Google profile ID or email
        let user = await User.findOne({ $or: [{ id: profile.id }, { email: profile.email }] });

        if (!user) {
          console.log(profile);

          user = new User({
            id: profile.id,
            name: profile.displayName,
            email: profile.email,
          });

          await user.save();
        } else {
          // If user exists, update user details if needed
          user.id = profile.id;
          user.name = profile.displayName;
          user.email = profile.email;

          await user.save();
        }

        // Set cookies
        request.res.cookie("userId", JSON.stringify(user._id), {
          httpOnly: false,
        });
        request.res.cookie("name", JSON.stringify(profile.given_name), {
          httpOnly: false,
        });

        console.log(user);
        return done(null, user);
      } catch (error) {
        console.error("Error in Google strategy:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
