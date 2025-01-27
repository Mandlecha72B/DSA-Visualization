const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const signup = async (req, res) => {

    try {
        const { username, email, password, confirmPassword } = req.body;

        console.log(req.url, req.method);
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and confirm password should be same", success: false });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User is already exist, you can login', success: false });
        }

        const userModel = new User({ username, email, password, authProvider: 'local' });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(200)
            .json({
                message: "Signup successfully",
                success: true
            });

    }
    catch (err) {
        console.log(err);
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken,
            email,
            username: user.username,
            profilePicture: user.profilePicture, // Include profile picture in response
        })
    } catch (err) {
        console.log(err);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and confirm password should be same", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.status(200).json({ message: "Password updated successfully", success: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}



module.exports = {
    signup,
    login,
    forgotPassword,

}


//const { OAuth2Client } = require('google-auth-library');
/*const googleAuth = async (req, res) => {
    try {
        const { token } = req.body; // Google ID Token from client
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        // Verify token with Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        const { email, name, picture } = payload;

        // Check if user already exists in the database
        let user = await User.findOne({ email });

        if (!user) {
            // If user does not exist, create a new user
            user = new User({
                username: name,
                email,
                profilePicture: picture,
                authProvider: 'google',
            });
            await user.save();
        }

        // Generate a JWT token for the user
        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({
            message: "Google Authentication Successful",
            success: true,
            jwtToken,
            email: user.email,
            username: user.username,
            profilePicture: user.profilePicture,
        });
    } catch (err) {
        console.error("Error exchanging code for tokens:", err.response?.data || err.message);
        console.error(err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};*/


/*const { oauth2Client } = require('../utils/googleClient');
const axios = require('axios');

const googleAuth = async (req, res, next) => {
    const code = req.query.code;
    console.log('Received Authorization Code:', code);

    if (!code) {
        return res.status(400).json({ message: "Authorization code is missing" });
    }

    try {
        // Exchange the authorization code for an access token
        const googleRes = await oauth2Client.getToken(code);
        console.log("Google Token Response:", googleRes); // Check the token response

        oauth2Client.setCredentials(googleRes.tokens); // Set the token credentials

        // Fetch user info using the access token
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name, picture } = userRes.data;
        console.log('Google User Info:', userRes.data);

        // Check if the user already exists in the database
        let user = await User.findOne({ email });

        if (!user) {
            // If the user doesn't exist, create a new one
            user = await User.create({
                username: name,
                email,
                profilePicture: picture,
                authProvider: "google",
            });
        }

        const { _id } = user;
        // Generate JWT token for the authenticated user
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
            expiresIn: '24h',  // Token expiration
        });

        // Send the JWT token and user data back to the frontend
        res.status(200).json({
            message: 'success',
            token,
            user,
        });
    } catch (err) {
        console.error("Error exchanging code for tokens:", err.response?.data || err.message);
        return res.status(500).json({
            message: err.response?.data?.error || "Error during Google token exchange"
        });
    }
};*/


