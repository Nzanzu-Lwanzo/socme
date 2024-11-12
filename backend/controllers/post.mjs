import { populate } from "dotenv";
import Post from "../db/models/post.mjs";
import "../utils/cloudinary.setup.mjs";
import { v2 as cloudinary } from "cloudinary";
import { isValidObjectId } from "mongoose";

export const saveAPost = async (req, res) => {
  try {
    const { textContent } = req.body;
    const files = req.files;

    let postMediaFiles = [];

    if (files) {
      for (let file of files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            public_id: "post_media_file",
          });
          postMediaFiles.push(result.url);
        } catch (e) {}
      }
    }

    const post = await Post.create({
      textContent,
      mediaFiles: postMediaFiles.length >= 1 ? postMediaFiles : undefined,
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(
      {},
      {},
      {
        populate: {
          path: "author",
          select: "_id name picture",
        },
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
