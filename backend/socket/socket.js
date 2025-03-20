/*const Server = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

module.exports = { getReceiverSocketId, io, server };*/

/*const { Server } = require("socket.io");

const userSocketMap = {}; // { userId: socketId }

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173"],
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("🟢 A user connected:", socket.id);

        const userId = socket.handshake.query.userId;

        if (!userId || userId === "undefined") {
            console.warn("⚠️ Invalid userId received:", userId);
            socket.disconnect(true); // Prevents users with undefined IDs from connecting
            return;
        }

        userSocketMap[userId] = socket.id;
        console.log(`✅ User ${userId} connected with socket ID: ${socket.id}`);

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnect", () => {
            console.log("🔴 User disconnected:", socket.id);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });

    module.exports = { getReceiverSocketId, io };
};*/
const { Server } = require("socket.io");
const express = require('express');
const http = require('http'); // Import HTTP module

const app = express();
const server = http.createServer(app); // Create HTTP server
const userSocketMap = {}; // { userId: socketId }
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
    },
});

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};


io.on("connection", (socket) => {
    console.log("🟢 A user connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (!userId || userId === "undefined") {
        console.warn("⚠️ Invalid userId received:", userId);
        socket.disconnect(true);
        return;
    }

    userSocketMap[userId] = socket.id;
    console.log(`✅ User ${userId} connected with socket ID: ${socket.id}`);

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});


module.exports = { getReceiverSocketId, server, app, io };


