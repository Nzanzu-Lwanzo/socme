import { Router } from "express";
import {
  getPosts,
  saveAPost,
  dislikePost,
  likePost,
  deletePost,
  updatePost,
  deletePostImage,
  saveCommentOnPost,
  deleteComment,
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

postRouter.post(
  "/comment/:id",
  validateSession,
  validateIdParam,
  saveCommentOnPost
);

postRouter.delete(
  "/comment/:postId/:commentId",
  validateSession,
  deleteComment
);

postRouter.get("/", validateSession, getPosts);
postRouter.patch(
  "/:id",
  validateSession,
  validateIdParam,
  fileUploader.array("mediaFiles"),
  updatePost
);
postRouter.patch("/like", validateSession, likePost);
postRouter.patch("/dislike", validateSession, dislikePost);
postRouter.delete("/:id", validateIdParam, validateSession, deletePost);
postRouter.delete(
  "/:id/:public_id", // :id -> post if and :public_id -> image public id
  validateIdParam,
  validateSession,
  deletePostImage
);

export default postRouter;
