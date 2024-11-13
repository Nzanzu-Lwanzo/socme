// IMPORTS
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect, { dbName } from "./backend/db/connectToDb.mjs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import postRouter from "./backend/routes/post.mjs";
import userRouter from "./backend/routes/user.mjs";
import commentRouter from "./backend/routes/comment.mjs";
import webpush from "web-push";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

// VARIABLES AND CONSTANTS
const App = express();
const ENV = "prod";
const PORT = process.env.PORT || 5000;
const SECRET = process.env.SECRET;
const __dirname = dirname(fileURLToPath(import.meta.url));
const PATH_TO_PAGE = "/frontend/dist";
const WEB_PUSH_MAIL = "mailto:nzanzu.lwanzo.work@gmail.com";
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const ALLOWED_ORIGINS_WHITELIST = [
  "http://localhost:5173",
  "http://localhost:5000",
  "https://socme.onheroku.com",
  "https://socme.onrender.com",
  "https://socme.netlify.com",
];
const ALLOWED_METHODS_WHITELIST = ["GET", "POST", "PATCH", "DELETE"];

// MIDDLEWARES
App.use(express.json());
App.use(cookieParser(SECRET));
App.use(express.static(join(__dirname, PATH_TO_PAGE)));
App.use(
  cors({
    origin: ALLOWED_ORIGINS_WHITELIST,
    methods: ALLOWED_METHODS_WHITELIST,
    credentials: true,
  })
);

if (ENV !== "dev") {
  App.set("trust proxy", 1);
}

App.use(
  session({
    secret: SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      dbName: dbName,
      ttl: 30 * 24 * 60 * 60,
      touchAfter: 24 * 3600,
    }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: ENV !== "dev",
      secure: ENV !== "dev",
      sameSite: ENV !== "dev" ? "none" : "lax",
    },
  })
);
App.use(passport.initialize());
App.use(passport.session());

// ROUTES
App.use("/api/comment", commentRouter);
App.use("/api/user", userRouter);
App.use("/api/post", postRouter);

App.get("*", (req, res) => {
  // Always serve the app page as the unique static file
  res.sendFile(join(__dirname, PATH_TO_PAGE, "index.html"));
});

// WEBPUSH
webpush.setVapidDetails(WEB_PUSH_MAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

// *********************************************************************

App.listen(PORT, () => {
  console.log(`SERVER RUNNING -> OK`);
  dbConnect();
});
