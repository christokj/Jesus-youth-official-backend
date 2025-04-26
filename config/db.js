const mongoose = require("mongoose");
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.error("Database connection failed:", err));
};
module.exports = connectDB;