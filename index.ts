import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import apiRouter from "./routes";

dotenv.config();

const allowedOrigins = [process.env.CLIENT_DOMAIN, ...(process.env.CLIENT_DOMAINS || "").split(",")]
  .map((origin) => origin?.trim())
  .filter(Boolean) as string[];

const defaultDevOrigins = ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"];
const isProduction = process.env.NODE_ENV === "production";
const resolvedOrigins = allowedOrigins.length > 0 ? allowedOrigins : isProduction ? [] : defaultDevOrigins;

if (isProduction && resolvedOrigins.length === 0) {
  throw new Error("CLIENT_DOMAIN or CLIENT_DOMAINS must be configured in production");
}

const app = express();

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || resolvedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  },
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("Hello World! ");
});

app.use("/api", apiRouter);

app.all("*", (_req, res) => {
  if (!res.headersSent) {
    res.status(404).json({ message: "End point does not exist" });
  }
});

const port = Number(process.env.PORT) || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

void startServer();
