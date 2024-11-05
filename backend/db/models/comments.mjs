import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "No content, no comment"],
  },

  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: [true, "No post, no comment"],
  },

  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "No commentor, no comment"],
  },

  likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
