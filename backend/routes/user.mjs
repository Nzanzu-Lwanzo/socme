import { Router } from "express";
import {
  createAccount,
  getAccount,
  logUserIn,
  logUserOut,
  subscribeToPushNotifications,
  updateUserProfile,
} from "../controllers/user.mjs";
import passport from "passport";
import "../auth/strategies/local.mjs";
import { checkSchema } from "express-validator";
import { validateReqBody } from "../utils/middlewares.mjs";
import { credentialsValidator } from "../utils/userValidation.mjs";
import uploadFile from "../utils/multer.setup.mjs";

const userRouter = Router();

userRouter.post("/subscribe-to-push", subscribeToPushNotifications);
userRouter.post(
  "/",
  checkSchema(credentialsValidator),
  validateReqBody,
  createAccount
);
userRouter.get("/", getAccount);
userRouter.post("/auth", passport.authenticate("local"), logUserIn);
userRouter.patch("/", uploadFile.single("picture"), updateUserProfile);
userRouter.get("/auth", logUserOut);

export default userRouter;
