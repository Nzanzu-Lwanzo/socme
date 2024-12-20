import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    textContent: {
      type: String,
      validate: function () {
        // if no textContent and no mediaFile, then return an error
        if (!this.mediaFiles && !this.textContent) {
          throw new Error("INVALID_POST_DATA");
        }
      },
    },

    mediaFiles: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      validate: function () {
        // if no textContent and no mediaFile, then return an error
        if (!this.mediaFiles && !this.textContent) {
          throw new Error("INVALID_POST_DATA");
        }
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

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
    minimize: false,
    strict: true,
  }
);

PostSchema.index({ textContent: "text" });

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
