const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("./Schema/userModel");
const GOOGLE_CLIENT_ID = "59271826044-q07hikmlq4qrnr83ps2hpou0eim8v36i.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log(profile._json.name);
      const existingProfile = await User.findOne({ id: profile.id });
      if (!existingProfile) {
        console.log(profile);

        const newUser = new User({
          id: profile.id,
          name: profile.displayName,
          email: profile.email
        });

        await newUser.save();

        request.res.cookie("userData", JSON.stringify(newUser), {
          httpOnly: false,
        });
        request.res.cookie("name", JSON.stringify(profile.given_name), {
          httpOnly: false,
        });
        console.log(newUser);
        return done(null, newUser);
      }else{
        
        request.res.cookie("userData", JSON.stringify(existingProfile), {
          httpOnly: false,
        });
        request.res.cookie("name", JSON.stringify(profile.given_name), {
          httpOnly: false,
        });
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
