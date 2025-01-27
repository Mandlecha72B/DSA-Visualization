const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongodb");

    } catch (err) {
        console.log("error in connecting to MongoDB", err.message);

    }
}

module.exports = connectToMongoDB;