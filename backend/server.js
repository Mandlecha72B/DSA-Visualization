const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('./routes/authRouter')
const connectToMongoDB = require('./models/db')


const app = express()
dotenv.config();
const PORT = process.env.PORT

const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRouter);
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is started at ${PORT} `);


})


/*app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies and credentials
}));*/