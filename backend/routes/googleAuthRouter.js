const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Google OAuth login
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

// Google OAuth callback
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    (req, res) => {
        // Generate a JWT after successful Google login
        const user = req.user;
        
        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send the JWT and user data to the client
        const redirectUrl = `http://localhost:5173/google-callback?token=${token}&email=${user.email}&username=${user.username}&profilePicture=${user.profilePicture}`;
        res.redirect(redirectUrl);
    }
);

module.exports = router;
