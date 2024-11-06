import { Router } from "express";
import {
  createAccount,
  getAccount,
  logUserIn,
  subscribeToPushNotifications,
} from "../controllers/user.mjs";
import passport from "passport";
import "../auth/strategies/local.mjs";

const userRouter = Router();

userRouter.post("/subscribe-to-push", subscribeToPushNotifications);
userRouter.post("/", createAccount);
userRouter.get("/", getAccount);
userRouter.post("/auth", passport.authenticate("local"), logUserIn);

export default userRouter;
