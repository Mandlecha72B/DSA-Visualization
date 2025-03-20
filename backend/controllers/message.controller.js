/*const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getReceiverSocketId, io } = require("../socket/socket.js");
const cloudinary = require("../utils/cloudinaryConfig");
const mongoose = require("mongoose");

const sendMessage = async (req, res) => {
    try {
        const { message,image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }


        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            image: imageUrl,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();

        // this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json({
            success: true,
            message: "message send successfully",
            newMessage,
        });
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        console.log("🔍 Received Params:", req.params);
        console.log("🔍 Authenticated User ID:", senderId);
        console.log("🔍 Chat User ID:", userToChatId);

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(userToChatId)) {
            return res.status(400).json({ success: false, message: "Invalid User IDs" });
        }

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json({ success: true, messages: [] });
        }

        res.status(200).json({
            success: true,
            message: "Messages retrieved successfully",
            messages: conversation.messages,
        });
    } catch (error) {
        console.error("❌ Error in getMessages controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
module.exports = { sendMessage, getMessages };*/

const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getReceiverSocketId, io } = require("../socket/socket"); // Import only getReceiverSocketId

const cloudinary = require("../utils/cloudinaryConfig");
const mongoose = require("mongoose");
const User = require("../models/user.model");

/*const sendMessage = async (req, res) => {
    try {
        const { message, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
            /*const uploadResponse = await cloudinary.uploader.upload(image, {
            quality: "auto:low",   // Auto optimize quality
            folder: "chat_images", // Store in a specific folder
            }); 
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            image: imageUrl,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Save conversation and message in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO FUNCTIONALITY
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // Send the new message event to the specific receiver
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json({
            success: true,
            message: "Message sent successfully",
            newMessage,
        });
    } catch (error) {
        console.log("❌ Error in sendMessage controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};*/
const sendMessage = async (req, res) => {
    try {
        const { message, image } = req.body; // Add isBroadcast flag
        const senderId = req.user._id;



        const isBroadcast = req.body.isBroadcast || !req.params.id; // If no ID, treat as broadcast
        const receiverIds = isBroadcast
            ? (await User.find({}, "_id")).map(user => user._id).filter(id => id.toString() !== senderId.toString())
            : [req.params.id];

        let conversation;

        if (isBroadcast) {
            // Find existing conversation that contains ALL users
            conversation = await Conversation.findOne({
                participants: { $all: [...receiverIds, senderId] },
            });

            if (!conversation) {
                // Create new broadcast conversation
                conversation = await Conversation.create({
                    participants: [...receiverIds, senderId],
                });
            }
        } else {
            // Normal private conversation
            conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverIds[0]] },
            });

            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverIds[0]],
                });
            }
        }

        let imageUrl;
        if (image) {
            // Upload image to Cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId: isBroadcast ? null : receiverIds[0], // Set to null if broadcast
            message,
            image: imageUrl,
        });

        // Add message to conversation
        conversation.messages.push(newMessage._id);

        // Save conversation and message
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET.IO FUNCTIONALITY
        if (isBroadcast) {
            io.emit("newMessage", newMessage); // Broadcast to all users
        } else {
            const receiverSocketId = getReceiverSocketId(receiverIds[0]);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", newMessage);
            }
        }

        res.status(200).json({
            success: true,
            message: "Message sent successfully",
            newMessage,
        });
    } catch (error) {
        console.log("❌ Error in sendMessage controller:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        console.log("🔍 Received Params:", req.params);
        console.log("🔍 Authenticated User ID:", senderId);
        console.log("🔍 Chat User ID:", userToChatId);

        // Validate IDs
        if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(userToChatId)) {
            return res.status(400).json({ success: false, message: "Invalid User IDs" });
        }

        /*const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");*/

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        // 🔥 Fetch broadcast messages separately (receiverId is null)
        const broadcastMessages = await Message.find({ receiverId: null });

        // 🔥 Combine both private and broadcast messages
        const allMessages = [...broadcastMessages, ...(conversation ? conversation.messages : [])];

        // ✅ Return both private and broadcast messages
        


        /*if (!conversation) {
            return res.status(200).json({ success: true, messages: [] });
        }*/

        res.status(200).json({
            success: true,
            message: "Messages retrieved successfully",
            messages: allMessages,
        });

        /*res.status(200).json({
            success: true,
            message: "Messages retrieved successfully",
            messages: conversation.messages,
        });*/
    } catch (error) {
        console.error("❌ Error in getMessages controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { sendMessage, getMessages };
