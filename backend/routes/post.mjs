import { Router } from "express";
import {
  getAllPosts,
  saveAPost,
  dislikePost,
  likePost,
} from "../controllers/post.mjs";
import { validateSession } from "../utils/middlewares.mjs";
import fileUploader from "../utils/multer.setup.mjs";

const postRouter = Router();

postRouter.post(
  "/",
  validateSession,
  fileUploader.array("mediaFiles"),
  saveAPost
);

postRouter.get("/", validateSession, getAllPosts);
postRouter.patch("/like", validateSession, likePost);
postRouter.patch("/dislike", validateSession, dislikePost);

export default postRouter;
