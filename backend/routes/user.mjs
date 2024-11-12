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
import { validateReqBody, validateSession } from "../utils/middlewares.mjs";
import { credentialsValidator } from "../utils/userValidation.mjs";
import fileUploader from "../utils/multer.setup.mjs";

const userRouter = Router();

userRouter.post(
  "/subscribe-to-push",
  validateSession,
  subscribeToPushNotifications
);
userRouter.post(
  "/",
  checkSchema(credentialsValidator),
  validateReqBody,
  createAccount
);
userRouter.get("/", validateSession, getAccount);
userRouter.post("/auth", passport.authenticate("local"), logUserIn);
userRouter.patch(
  "/",
  validateSession,
  fileUploader.single("picture"),
  updateUserProfile
);
userRouter.get("/auth", logUserOut);

export default userRouter;
