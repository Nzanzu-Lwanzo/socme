import { Router } from "express";
import {
  getPosts,
  saveAPost,
  dislikePost,
  likePost,
  deletePost,
} from "../controllers/post.mjs";
import { validateIdParam, validateSession } from "../utils/middlewares.mjs";
import fileUploader from "../utils/multer.setup.mjs";

const postRouter = Router();

postRouter.post(
  "/",
  validateSession,
  fileUploader.array("mediaFiles"),
  saveAPost
);

postRouter.get("/", validateSession, getPosts);
postRouter.patch("/like", validateSession, likePost);
postRouter.patch("/dislike", validateSession, dislikePost);
postRouter.delete("/:id", validateIdParam, validateSession, deletePost);

export default postRouter;
