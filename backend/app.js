import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { dbConnection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import timelineRouter from "./routes/timelineRouter.js";
import messageRouter from "./routes/messageRouter.js";
import skillRouter from "./routes/skillRouter.js";
import softwareApplicationRouter from "./routes/softwareApplicationRouter.js";
import projectRouter from "./routes/projectRouter.js";

const app = express();
dotenv.config();

// app.use(
//   cors({
//     origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );


// Helper to clean trailing slashes
const normalizeOrigin = (origin) => origin?.replace(/\/+$/, "");

// Main allowed URLs from .env
const allowedOrigins = [
  normalizeOrigin(process.env.PORTFOLIO_URL),
  normalizeOrigin(process.env.DASHBOARD_URL),
];

// Allow also Vercel preview deployments
const isAllowedOrigin = (origin) => {
  const normalizedOrigin = normalizeOrigin(origin);
  return (
    !origin ||
    allowedOrigins.includes(normalizedOrigin) ||
    /^https:\/\/portforlio-[a-z0-9\-]+\.vercel\.app$/.test(normalizedOrigin)
  );
};

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming request origin:", origin);
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);




app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/project", projectRouter);

dbConnection();
app.use(errorMiddleware);

export default app;
