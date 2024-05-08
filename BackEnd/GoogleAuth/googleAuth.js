// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const usermodel = require("../Schema/userModel");

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const secretKey = process.env.JWT_SECRET;

// const generateToken = (data) => {
//   const { _id, name, username, email } = data;
//   const expiresIn = "7h";
//   const payload = { _id, name, username, email };
//   const token = jwt.sign(payload, secretKey, { expiresIn });
//   return token;
// };

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/google/callback",
//       passReqToCallback: true,
//     },
//     async function (request, accessToken, refreshToken, profile, done) {
//       try {
//         async function createUser(profile) {
//           return {
//             username: profile.name.givenName,
//             name: profile.name.givenName,
//             email: profile.email,
//             password: "",
//           };
//         }

//         const existingProfile = await Profilemodel.findOne({
//           email: profile.email,
//           name : profile.name.givenName
//         });

//         if (existingProfile) {
//           const existingUser = await usermodel.findOne({
//             email: profile.email,
//             name : profile.name.givenName
//           });

//           if (!existingUser) {
//             return done(new Error("User not found."));
//           }

//           const userDataJSON = JSON.stringify(existingUser);
//           const profileJSON = JSON.stringify(existingProfile);
//           const token = generateToken(existingProfile)

//           request.res.cookie("token", token, {
//             maxAge: 7 * 24 * 60 * 60 * 1000,
//             httpOnly: false,
//           });  

//           return done(null, existingProfile);
//         }

//         const userDetail = await createUser(profile);

//         const userProfile = {
//           name: profile.name.givenName,
//           username: profile.name.givenName,
//           email: profile.email,
//           posts: [],
//           // profilepic : ""
//         };

//         const userData = await usermodel.create(userDetail);
//         const profileData = await Profilemodel.create(userProfile);

//         const token = generateToken(profileData);

//         const userDataJSON = JSON.stringify(userData);
//         const profileJSON = JSON.stringify(profileData);

//         request.res.cookie("token", token, {
//           maxAge: 7 * 24 * 60 * 60 * 1000,
//           httpOnly: false,
//         });

//         return done(null, profileData);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

// module.exports = passport;