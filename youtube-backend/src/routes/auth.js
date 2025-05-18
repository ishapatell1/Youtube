const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.force-ssl']
  }));

  router.get('/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
      successRedirect: '/auth/profile',
    })
  );

  router.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send('Unauthorized');
    res.send(`Hello ${req.user.displayName}`);
  });
  
  module.exports = router;