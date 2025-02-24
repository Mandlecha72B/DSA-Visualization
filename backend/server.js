const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('./routes/authRouter')
const connectToMongoDB = require('./models/db')
const passport = require('./middlewares/passportConfig'); // Import Passport configuration
const googleAuthRouter = require('./routes/googleAuthRouter');

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

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is started at ${PORT} `);


})


/*app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies and credentials
}));*/