import Post from "../db/models/post.mjs";
import "../utils/cloudinary.setup.mjs";
import { v2 as cloudinary } from "cloudinary";
import { isValidObjectId } from "mongoose";
import { nanoid } from "nanoid";
import Comment from "../db/models/comments.mjs";
import { populate } from "dotenv";

const saveMediaFilesOnCloud = async (files) => {
  if (!files) return [];

  const registeredFiles = [];

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

        // Push the object in the array to return
        registeredFiles.push({
          url: result.url.replace("http", "https"),
          public_id,
        });
      } catch (e) {}
    }
  }

  return registeredFiles;
};

export const saveAPost = async (req, res) => {
  try {
    const { textContent } = req.body;
    const files = req.files;

    let postMediaFiles = await saveMediaFilesOnCloud(files);

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
        populate: [
          {
            path: "author",
            select: "_id name picture",
          },
          {
            path: "comments",
            populate: {
              path: "author",
              select: "_id name picture",
            },
          },
        ],
        limit: 10,
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

export const updatePost = async (req, res) => {
  try {
    let { id } = req.params;
    const { textContent } = req.body;
    const files = req.files;

    let postMediaFiles = await saveMediaFilesOnCloud(files);

    const post = await Post.findByIdAndUpdate(
      id,
      {
        $set: { textContent: textContent },
        $addToSet: {
          mediaFiles: {
            $each: postMediaFiles,
          },
        },
      },
      {
        populate: {
          path: "author",
          select: "_id name picture",
        },
        new: true,
      }
    );

    res.json(post);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const deletePostImage = async (req, res) => {
  try {
    let { id, public_id } = req.params;

    const deleted = await cloudinary.uploader.destroy(public_id, {
      type: "upload",
      resource_type: "image",
    });

    let post = {};

    if (deleted) {
      post = await Post.findByIdAndUpdate(
        id,
        {
          $pull: { mediaFiles: { public_id } },
        },
        {
          new: true,
          populate: {
            path: "author",
            select: "_id name picture",
          },
        }
      );
    }

    res.status(200).json(post);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const saveCommentOnPost = async (req, res) => {
  try {
    let { id } = req.params;
    let { comment: content } = req.body;

    // Create comment
    const comment = await Comment.create({
      content,
      post: id,
      author: req.user._id,
    });

    // Save in on the post
    const post = await Post.findByIdAndUpdate(
      id,
      { $addToSet: { comments: comment._id } },
      {
        new: true,
        populate: [
          {
            path: "author",
            select: "_id name picture",
          },
          {
            path: "comments",
            populate: {
              path: "author",
              select: "_id name picture",
            },
          },
        ],
      }
    );

    // Return the new comment
    res.status(201).json(post);

    /*

      ************************ OPTIMIZE THIS CONTROLLER ******

      Instead of creating a comment and then saving the comment id on the post and then 
      populating all the comments that are saved on the post to return them back to the user, 
      it would be more performant to only save the comment, save the comment id on the post,
      and then return the comment to the frontend.

      The frontend will then lookup the posts state, loop over all the posts, find the post to which
      this comment belong and add it to the array of comments of that particular post. That will be 
      a lot of work for the frontend (heaving computations when updating the state), but wrapper in a 
      useTransition hook would make things work a little better (especially for user feedback meanwhile 
      the state is being updated.)
    
    
    */
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const deleteComment = async (req, res) => {
  try {
    let { postId, commentId } = req.params;

    if (!isValidObjectId(postId) || !isValidObjectId(commentId)) {
      throw new Error("INVALID_PARAMS");
    }

    // Delete the comment, first
    await Comment.findByIdAndDelete(commentId);

    // Remove the comment id from the post
    await Post.findByIdAndUpdate(postId, {
      $pull: { comments: commentId },
    });

    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
