const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            return this.authProvider === "local"; // Password is required only if authProvider is "local"
        },
    },
    
    profilePicture: {
        type: String,
        default: ""
    },
    authProvider: {
        type: String,
        default: "local", // Can be "local" or "google"
        enum: ["local", "google"], // Restrict to valid providers
    },
}, { timestamps: true });

const User = mongoose.model("users", userSchema);
module.exports = User;