require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const authRoutes = require("./src/routes/auth");
const videoRoutes = require("./src/routes/video");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
      return done(null, profile);
    }
  )
);

app.use("/auth", authRoutes);
app.use("/video", videoRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Youtube Dashboard");
});

app.listen(3000, () => {
  console.log("App running at 3000");
});
