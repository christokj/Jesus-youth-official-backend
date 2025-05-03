const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const apiRouter = require("./routes");
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();


const corsOptions = {
    origin: [process.env.CLIENT_DOMAIN],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials (cookies, etc.)
    optionSuccessStatus: 200, // Success status for older browsers (IE11, etc.)
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB Database
connectDB();

// Routes
app.get("/", (req, res) => {
    res.send("Hello World! ");
});

app.use("/api", apiRouter);

app.all("*", (req, res, next) => {
    if (!res.headersSent) {
        res.status(404).json({ message: "End point does not exist" });
    }
});

const PORT = process.env.PORT;


// Start Server
app.listen(PORT, () => {
    // console.log(`Server is running on port ${PORT}`);
});