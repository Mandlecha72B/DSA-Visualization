const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            
        },
        message: {
            type: String,
            required: function () {
                return !this.image; // Message is required only if no image is present
            },
        },
        image: {
            type: String,
        },
        // createdAt, updatedAt
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;