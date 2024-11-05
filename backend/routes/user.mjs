import { Router } from "express";
import { subscribeToPushNotifications } from "../controllers/user.mjs";

const userRouter = Router();

userRouter.post("/subscribe-to-push", subscribeToPushNotifications);

export default userRouter;
