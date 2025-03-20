/*const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('./routes/authRouter')
const connectToMongoDB = require('./models/db')
const passport = require('./middlewares/passportConfig'); // Import Passport configuration
const googleAuthRouter = require('./routes/googleAuthRouter');
const noteRouter = require('./routes/note.route');
const messageRoutes = require('./routes/message.route');
const userRoutes = require('./routes/user.route');

const app = express()
dotenv.config();
const PORT = process.env.PORT

const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api/auth', authRouter);
app.use('/api/auth', googleAuthRouter); // Add Google OAuth routes
app.use('/api/user', authRouter);
app.use('/api/note', noteRouter);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is started at ${PORT} `);


})*/

/*const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('./routes/authRouter');
const connectToMongoDB = require('./models/db');
const passport = require('./middlewares/passportConfig'); // Import Passport configuration
const googleAuthRouter = require('./routes/googleAuthRouter');
const noteRouter = require('./routes/note.route');
const messageRoutes = require('./routes/message.route');
const userRoutes = require('./routes/user.route');
const http = require('http'); // Import HTTP module

const app = express();
dotenv.config();
const PORT = process.env.PORT;

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.use('/api/auth', authRouter);
app.use('/api/auth', googleAuthRouter);
app.use('/api/user', authRouter);
app.use('/api/note', noteRouter);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

const server = http.createServer(app); // Create HTTP server

// Import and initialize Socket.io with the existing server
try {
    require('./socket/socket')(server);
    console.log("✅ WebSocket server initialized");
} catch (error) {
    console.error("❌ Error initializing WebSocket:", error);
}

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is started at ${PORT}`);
});

module.exports = { app, server };*/

/*const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRouter = require('./routes/authRouter');
const googleAuthRouter = require('./routes/googleAuthRouter');
const noteRouter = require('./routes/note.route');
const messageRoutes = require('./routes/message.route');
const userRoutes = require('./routes/user.route');
const passport = require('./middlewares/passportConfig');
const connectToMongoDB = require('./models/db');

const { initSocket } = require('./socket/socket'); // Use initSocket instead

dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/auth', googleAuthRouter);
app.use('/api/user', authRouter);
app.use('/api/note', noteRouter);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Initialize Socket.io
const io = initSocket(server); // Store io instance

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`🚀 Server started at http://localhost:${PORT}`);
});

module.exports = { app, server, io }; // Export io if needed*/


const dotenv = require('dotenv');
const authRouter = require('./routes/authRouter');
const connectToMongoDB = require('./models/db');
const passport = require('./middlewares/passportConfig'); // Import Passport configuration
const googleAuthRouter = require('./routes/googleAuthRouter');
const noteRouter = require('./routes/note.route');
const messageRoutes = require('./routes/message.route');
const userRoutes = require('./routes/user.route');
const { app, server } = require('./socket/socket');


dotenv.config();
const PORT = process.env.PORT;

const bodyParser = require('body-parser');
const cors = require('cors');

//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use(passport.initialize());

app.use('/api/auth', authRouter);
app.use('/api/auth', googleAuthRouter);
app.use('/api/user', authRouter);
app.use('/api/note', noteRouter);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is started at ${PORT}`);
});






