import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  textContent: {
    type: String,
    validate: function () {
      // if no textContent and no mediaFile, then return an error
    },
  },

  mediaFiles: {
    type: [String],
    validate: function () {
      // if no textContent and no mediaFile, then return an error
    },
  },

  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    populate: true,
  },

  likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  seen: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
