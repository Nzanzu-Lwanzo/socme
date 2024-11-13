import Post from "../db/models/post.mjs";
import "../utils/cloudinary.setup.mjs";
import { v2 as cloudinary } from "cloudinary";
import { isValidObjectId } from "mongoose";
import { nanoid } from "nanoid";

export const saveAPost = async (req, res) => {
  try {
    const { textContent } = req.body;
    const files = req.files;

    let postMediaFiles = [];

    if (files) {
      for (let file of files) {
        try {
          // We'll need this unique identifier later
          // when we need to delete the asset (image, video)
          // from our cloudinary
          let public_id = nanoid();

          const result = await cloudinary.uploader.upload(file.path, {
            public_id: public_id,
            type: "upload",
            resource_type: "image",
          });
          postMediaFiles.push({
            url: result.url,
            public_id,
          });
        } catch (e) {}
      }
    }

    // Optimize this *******************************************
    // The goal is to create a post and get directly the "author" path
    // populated. We need that data on the frontend
    const post = new Post({
      textContent,
      mediaFiles: postMediaFiles.length >= 1 ? postMediaFiles : undefined,
      author: req.user._id,
    });

    await post.save();

    const createdPost = await Post.findById(
      post._id,
      {},
      {
        populate: {
          path: "author",
          select: "_id name picture",
        },
      }
    );

    // *******************************************************

    res.status(201).json(createdPost);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find(
      {},
      {},
      {
        populate: {
          path: "author",
          select: "_id name picture",
        },
        sort: "-createdAt -updatedAt",
      }
    );
    res.json(posts);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!isValidObjectId(postId)) {
      return res.sendStatus(400);
    }

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $addToSet: { likes: req.user._id },
        $pull: { dislikes: req.user._id },
      },
      {
        new: true,
        populate: {
          path: "author",
          select: "_id name picture",
        },
      }
    );

    res.json(post);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const dislikePost = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!isValidObjectId(postId)) {
      return res.sendStatus(400);
    }

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $addToSet: { dislikes: req.user._id },
        $pull: { likes: req.user._id },
      },
      {
        new: true,
        populate: {
          path: "author",
          select: "_id name picture",
        },
      }
    );

    res.json(post);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const deletePost = async (req, res) => {
  try {
    let { id } = req.params;

    // Delete the post
    const deletedPost = await Post.findOneAndDelete(
      { _id: id, author: req.user._id },
      { new: true }
    );

    // Return a response to the client
    res.sendStatus(204);

    // Delete the media files related to this post from the cloudinary
    try {
      const mediaFiles = deletedPost.mediaFiles;
      const publid_ids = mediaFiles.map((file) => file.public_id);

      cloudinary.api.delete_resources(publid_ids, {
        resource_type: "image",
        invalidate: true,
        type: "upload",
      });
    } catch (e) {}
  } catch (e) {}
};
